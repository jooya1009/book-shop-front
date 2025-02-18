import { useEffect } from "react"
import Button from "../common/Button"

interface Props {
    onCompleted: (address: string) => void
}

const SCRIPT_URL = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"

function FindAddressButton({ onCompleted }: Props) {
    const handleOpen = () => {  // 핸들러
        new window.daum.Postcode({
            onComplete: (data: any) => {
                onCompleted(data.address as string)
            },
        }).open()
    }

    useEffect(() => {  // 입력
        const script = document.createElement("script") // <script></script>
        script.src = SCRIPT_URL // <script>SCRIPT_URL</script>
        script.async = true
        document.head.appendChild(script) // <head><script>SCRIPT_URL</script></head>

        return () => {
            document.head.removeChild(script)
        }
    }, [])

    return (
        <Button type="button" size="medium" scheme="normal" onClick={handleOpen}>
            주소 찾기
        </Button>
    )
}
export default FindAddressButton