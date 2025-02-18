import { useMemo, useState } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import CartItem from "../components/cart/CartItem"
import CartSummary from "../components/cart/CartSummary"
import Button from "../components/common/Button"
import Empty from "../components/common/Empty"
import Title from "../components/common/Title"
import { useAlert } from "../hooks/useAlert"
import { useCart } from "../hooks/useCart"
import { OrderSheet } from "../models/order.model"

function Cart() {
    const { showAlert, showConfirm } = useAlert()
    const navigate = useNavigate()

    const { carts, deleteCartItem, isEmpty } = useCart()
    
    const [checkedItems, setCheckedItems] = useState<number[]>([]) // id만 넣을 예정이라 타입은 number

    const handleCheckItem = (id: number) => {
        if (checkedItems.includes(id)) { // 체크 -> 언체크
            setCheckedItems(checkedItems.filter((item) => item !== id))
        } else { // 언체크 -> 체크
            setCheckedItems([ ...checkedItems, id ])
        }
    }

    const handleItemDelete = (id: number) => {
        deleteCartItem(id)
    }

    const totalQuantity = useMemo(() => {
        return carts.reduce((acc, cart) => {
            if (checkedItems.includes(cart.id)) {
                return acc + cart.quantity // 0부터 시작해서 포함된 상품이라면 누적계산
            }
            return acc
        }, 0)
    }, [carts, checkedItems])

    const totalPrice = useMemo(() => {
        return carts.reduce((acc, cart) => {
            if (checkedItems.includes(cart.id)) {
                return acc + (cart.quantity * cart.price)
            }
            return acc
        }, 0)
    }, [carts, checkedItems])

    const handleOrder = () => {
        if (checkedItems.length === 0) {
            showAlert("주문할 상품을 선택해 주세요.")
            return
        }

        // 주문 액션 -> 주문서 작성으로 데이터 전달
        const orderData: Omit<OrderSheet, "delivery"> = {
            items: checkedItems,
            totalQuantity,
            totalPrice,
            firstBookTitle: carts[0].title,
        }
        
        showConfirm("주문 하시겠습니까?", () => {
            // state로 orderData를 포함해주면 order 페이지로 이동과 동시에 order라는 라우터에서 데이터를 수신할 수 있음
            navigate("/order", { state: orderData })
        })
    }

    return (
        <>
            <Title size="large">장바구니</Title>
            <CartStyle>
                <>
                    <div className="empty-cart">
                        { isEmpty && <Empty icon={<FaShoppingCart />} title="장바구니가 비었습니다." description={<>장바구니를 채워보세요.</>} /> }
                    </div>
                    {!isEmpty && (
                        <>
                            <div className="content">
                                {carts.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        cart={item}
                                        checkedItems={checkedItems}
                                        onCheck={handleCheckItem}
                                        onDelete={handleItemDelete}
                                    />
                                ))}
                            </div>
                            <div className="summary">
                                <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
                                <Button size="large" scheme="primary" onClick={handleOrder}>
                                    주문하기
                                </Button>
                            </div>
                        </>
                    )}
                </>
            </CartStyle>
        </>
    )
}

export const CartStyle = styled.div`
    .empty-cart {
        margin: 0 auto;
    }

    display: flex;
    justify-content: space-between;
    gap: 24px;
    padding: 24px 0 0 0;

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .summary {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .order-info {
        h1 {
            padding: 0 0 24px 0;
        }

        border: 1px solid ${({ theme }) => theme.color.border};
        border-radius: ${({ theme}) => theme.borderRadius.default};
        padding: 12px;
    }

    .delivery {
        fieldset {
            border: 0;
            margin: 0;
            padding: 0 0 12px 0;
            display: flex;
            justify-content: start;
            gap: 8px;

            label {
                width: 80px
            }

            .input {
                flex: 1;
                input {
                    width: 100%;
                }
            }
        }

        .error-text {
            color: red;
            margin-top: -5px;
            padding: 0 0 12px 0;
            text-align: right;
            font-size: 0.85rem

        }
    }
`

export default Cart