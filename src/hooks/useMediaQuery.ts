import { getTheme } from "@/style/theme"
import { useEffect, useState } from "react"

export const useMediaQuery= () => {
    const [isMobile, setIsMobile] = useState(window.matchMedia(getTheme("light").mediaQuery.mobile).matches) // max-width 가 768px 이하면 true

    useEffect(() => {
        const isMobileQuery = window.matchMedia(getTheme("light").mediaQuery.mobile)

        setIsMobile(isMobileQuery.matches)
    }, [])

    return { isMobile }
}