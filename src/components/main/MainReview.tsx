import { BookReviewItem as IBookReviewItem } from "@/models/book.model"
import styled from "styled-components"
import BookReviewItem from "../book/BookReviewItem"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useMediaQuery } from "@/hooks/useMediaQuery"

interface Props {
    reviews: IBookReviewItem[]
}

function MainReview({ reviews }: Props) {
    const { isMobile } = useMediaQuery()

    const sliderSettings = {
        dots: true, // 페이지네이션 처럼 점 이 생김
        infinite: true, // 계속 넘어가는 슬라이드
        speed: 500,
        slidesToShow: isMobile ? 1 : 3, // 한 번에 몇 개 보여지는가
        slidesToScroll: isMobile ? 1 : 3, // 한 번에 몇 개가 슬라이드 되는가
        gap: 16,
    }

    return (
        <MainReviewStyle>
            <Slider {...sliderSettings}>
                {reviews.map((review) => (
                    <BookReviewItem key={review.id} review={review} />
                ))}
            </Slider>
        </MainReviewStyle>
        
    )
}

const MainReviewStyle = styled.div`
    padding: 0 0 24px 0;

    .slick-track {
        padding: 8px 0;
    }

    .slick-slide > div {
        margin: 0 12px;
    }

    .slick-prev:before,
    .slick-next:before {
        color: #777;
    }

    @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
        .slick-prev {
            left: 0;
        }

        .slick-next {
            right: 0;
        }
    }
`

export default MainReview