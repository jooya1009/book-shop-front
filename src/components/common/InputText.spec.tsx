import { render, screen } from '@testing-library/react'
import { BookStoreThemeProvider } from '../../context/themeContext'
import InputText from './InputText'

describe("InputText 컴포넌트 테스트", () => {
    it('렌더를 확인', () => {
        // 1. 렌더
        render(
            <BookStoreThemeProvider>
                <InputText placeholder="여기에 입력"></InputText>
            </BookStoreThemeProvider>
        )

        // 2. 확인
        expect(screen.getByPlaceholderText("여기에 입력")).toBeInTheDocument()
    })
})