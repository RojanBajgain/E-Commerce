import { useDispatch, useSelector } from "react-redux"
import { setCart } from "../store"
import { toast } from "react-toastify"
import { useState } from "react"

export const CartBtn = ({product, qty = 1}) => {
    const cart = useSelector(state => state.cart.value)

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const handleCart = () => {
        setLoading(true)
        let id = product._id

        let price = product.discounted_price > 0 ? product.discounted_price : product.price

        let qt = qty
        let total = price * qty

        if(id in cart) {
            qty += cart[id]['qty']
            total += price * qt
        }

        dispatch(setCart({
            ...cart,
            [id]: {
                product,
                qty: qt,
                total,
                price,
            }
        }))

        setLoading(false)

        toast.success("product added to cart.")

    }

    return <button className="btn btn-outline-dark" type="button" onClick={handleCart}>
        <i className={`fas ${loading ? 'fa-spinner fa-spin' : 'fas fa-cart-plus me-2' } me-2`}></i>Add to cart
    </button>
}

// cart button