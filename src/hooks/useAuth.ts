import { login, resetPassword, resetRequest, signup } from "@/api/auth.api"
import { LoginProps } from "@/pages/Login"
import { SignupProps } from "@/pages/Signup"
import { useAuthStore } from "@/store/authStore"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAlert } from "./useAlert"

export const useAuth = () => {
    const navigate = useNavigate()
    const { showAlert } = useAlert()

    const { storeLogin, storeLogout, isloggedIn } = useAuthStore()

    const userLogin = (data: LoginProps) => {
        login(data).then((res) => {
            storeLogin(res.token) // 상태 변화

            showAlert("로그인이 완료되었습니다.")
            navigate("/")
        }, (error) => {
            showAlert("로그인이 실패했습니다.")
        })
    }

    const userSignUp = (data: SignupProps) => {
        signup(data).then((res) => {
            showAlert("회원가입이 완료되었습니다.") // 성공
            navigate("/login")
        })
    }

    const userResetPassword = (data: SignupProps) => {  // 초기화
        resetPassword(data).then(() => {
            showAlert("비밀번호가 초기화되었습니다.")
            navigate('/login')
        })
    }

    const [resetRequested, setResetRequested] = useState(false)

    const userResetRequest = (data: SignupProps) => {  // 요청
        resetRequest(data).then(() => {
            setResetRequested(true)
        })
    }

    return { userLogin, userSignUp, userResetPassword, userResetRequest, resetRequested }
}