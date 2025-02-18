import { useEffect, useState } from "react"
import { fetchCart, deleteCart } from "../api/carts.api"
import { Cart } from "../models/cart.model"

export const useCart = () => {
    const [carts, setCarts] = useState<Cart[]>([])
    const [isEmpty, setIsEmpty] = useState(true)
    
    const deleteCartItem = (id: number) => {
        deleteCart(id).then(() => {
            setCarts(carts.filter((cart) => cart.id !== id))
            // cart에 각 아이템의 id가 주어진 id가 아닌 것으로 setCarts를 하겠다.
        })
    }

    useEffect(() => {
        fetchCart().then((carts) => {
            setCarts(carts)
            setIsEmpty(carts.length === 0)
        })
    }, [])

    return { carts, isEmpty, deleteCartItem }
}