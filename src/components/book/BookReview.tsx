import { BookReviewItem as IBookReveiwItem, BookReviewItemWrite } from "@/models/book.model"
import styled from "styled-components"
import BookReviewAdd from "./BookReviewAdd"
import BookReviewItem from "./BookReviewItem"

interface Props {
    reviews: IBookReveiwItem[]
    onAdd: (data: BookReviewItemWrite) => void
}

function BookReview({ reviews, onAdd }: Props) {
    return (
        <BookReviewStyle>
            <BookReviewAdd onAdd={onAdd} />
            {reviews.map((review) => (
                <BookReviewItem review={review} />
            ))}
        </BookReviewStyle>
    )
}

const BookReviewStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export default BookReview