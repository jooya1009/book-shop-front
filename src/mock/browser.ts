import { setupWorker } from "msw/browser"
import { banners } from "./banner"
import { bestBooks } from "./books"
import { addReview, reviewForMain, reviewsById } from "./review"

const handlers = [reviewsById, addReview, reviewForMain, bestBooks, banners]

export const worker = setupWorker(...handlers)