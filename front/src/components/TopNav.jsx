import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { fromStorage, removeStorage } from "../lib"
import { clearUser } from "../store"
import { Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import http from "../http"
import { toast } from "react-toastify"

export const TopNav = () => {
    const user = useSelector(state => state.user.value)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(Object.keys(user).length == 0) {
            const token = fromStorage('12fronttoken')
            if (token) {
                http.get('profile/detail')
                    .then(({data}) => {
                        dispatch(setUser(data))
                    })
                    .catch(err => {
                        removeStorage('12fronttoken') 
                    })
            }
        }
    }, [user])

    const handleLogout = () => {
        removeStorage('12fronttoken')
        dispatch(clearUser())
    }


    return <ul className="top-nav">
    {Object.keys(user).length ?  <>
        <li>
            <Link to="/profile"><i className="fas fa-user-circle me-2 p-6"></i>{user.name}</Link>
        </li>
        <li>
            <Button variant="link" className="link-light text-decoration-none p-0" onClick={handleLogout}>
                <i className="fa-solid fa-sign-out-alt me-2"></i>Logout
            </Button>
        </li>
    </> : <>
        <li>
            <Link to="register"><i className="fas fa-user-edit me-2"></i>Register</Link>
        </li>
        <li>
            <Link to="login"><i className="fas fa-sign-in-alt me-2"></i>Login</Link>
        </li>
    </>}
</ul>
}