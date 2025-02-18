import { addBookReview, fetchBookReview } from "@/api/review.api"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchBook, likeBook, unLikeBook } from "../api/books.api"
import { addCart } from "../api/carts.api"
import { BookDetail, BookReviewItem, BookReviewItemWrite } from "../models/book.model"
import { useAuthStore } from "../store/authStore"
import { useAlert } from "./useAlert"
import { useToast } from "./useToast"

export const useBook = (bookId: string | undefined) => {
    const [book, setBook] = useState<BookDetail | null>(null)
    const [cartAdded, setCartAdded] = useState(false)
    const [reviews, setReviews] = useState<BookReviewItem[]>([])

    const { isloggedIn } = useAuthStore()

    const { showAlert } = useAlert()
    const navigate = useNavigate()

    const { showToast } = useToast()

    const likeToggle = () => {
        // 권한 확인
        if (!isloggedIn) {
            showAlert('로그인이 필요합니다.')
            navigate('/login')
            return
        }

        if (!book) return

        if (book.liked) { // 좋아요 누른 상태
            unLikeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: false,
                    likes: book.likes - 1,
                })
                showToast("좋아요가 취소되었습니다.")
            })
        } else {
            likeBook(book.id).then(() => {
                setBook({
                    ...book,
                    liked: true,
                    likes: book.likes + 1,
                })
                showToast("좋아요를 눌렀습니다.")
            })
        }
    }

    const addToCart = (quantity: number) => {
        if (!isloggedIn) {
            showAlert('로그인이 필요합니다.')
            navigate('/login')
            return
        }
        
        if (!book) return

        addCart({
            book_id: book.id,
            quantity: quantity
        }).then(() => {
            setCartAdded(true)
            setTimeout(() => {
                setCartAdded(false)
            }, 3000)
        })
    }

    useEffect(() => {
        if(!bookId) return

        fetchBook(bookId).then((book) => {
            setBook(book)
        })

        fetchBookReview(bookId).then((reviews) => {
            setReviews(reviews)
        })
    }, [bookId])

    const addReview = (data: BookReviewItemWrite) => {
        if (!book) return

        addBookReview(book.id.toString(), data).then((res) => {
            showAlert(res.message)
        })
    }

    return { book, likeToggle, addToCart, cartAdded, reviews, addReview }
}