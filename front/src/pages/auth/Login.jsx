import { useState } from "react"
import { FormField, SubmitBtn } from "../../components"
import { inStorage, setInForm } from "../../lib"
import { useNavigate } from "react-router-dom"
import http from "../../http"
import { useDispatch } from "react-redux"
import { setUser } from "../../store"

export const Login = () => {
    const [form, setForm] = useState({})
    const [remember, setRemember] = useState(false)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.post('auth/login', form)
            .then(({data}) => {
                dispatch(setUser(data.user))
                inStorage('12fronttoken', data.token, remember)
                navigate('/')
            })
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return <div className="col-12">
    <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
            <h2>Login</h2>
        </div>
    </div>

    <main className="row">
        <div className="col-lg-4 col-md-6 col-sm-8 mx-auto bg-white py-3 mb-4">
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit}>

                        <FormField title="email" label="Email">
                            <input type="email" id="email" name="email" className="form-control" required onChange={ev => setInForm(ev, form, setForm)} />
                        </FormField>

                        <FormField title="password" label="Password">
                            <input type="password" id="password" name="password" className="form-control" required onChange={ev => setInForm(ev, form, setForm)}/>
                        </FormField>

                            <div className="form-check">
                                <input type="checkbox" id="remember" className="form-check-input" checked={remember} onChange={() => setRemember(!remember)} />
                                <label htmlFor="remember" className="form-check-label ml-2">Remember Me</label>
                            </div>

                        <div className="form-group">
                            <SubmitBtn label="Login" icon="fa-sign-in-alt" loading={loading} />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </main>
</div>
}