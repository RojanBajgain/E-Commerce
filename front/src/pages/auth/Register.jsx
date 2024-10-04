import { useState } from "react"
import { FormField, SubmitBtn } from "../../components"
import { setInForm } from "../../lib"
import { useNavigate } from "react-router-dom"
import http from "../../http"

export const Register = () => {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.post('auth/register', form)
            .then(() => navigate('/login'))
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return <div className="col-12">
    <div className="row">
        <div className="col-12 mt-3 text-center text-uppercase">
            <h2>Register</h2>
        </div>
    </div>

    <main className="row">
        <div className="col-lg-4 col-md-6 col-sm-8 mx-auto bg-white py-3 mb-4">
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit}>
                        <FormField title="name" label="Name">
                            <input type="text" id="name" name="name" className="form-control" required onChange={ev => setInForm(ev, form, setForm)}/>
                        </FormField>

                        <FormField title="email" label="Email">
                            <input type="email" id="email" name="email" className="form-control" required onChange={ev => setInForm(ev, form, setForm)} />
                        </FormField>

                        <FormField title="password" label="Password">
                            <input type="password" id="password" name="password" className="form-control" required onChange={ev => setInForm(ev, form, setForm)}/>
                        </FormField>

                        <FormField title="confirm_password" label="Confirm Password">
                            <input type="password" id="confirm_password" name="confirm_password" className="form-control" required onChange={ev => setInForm(ev, form, setForm)}/>
                        </FormField>

                        <FormField title="phone" label="Phone">
                            <input type="text" id="phone" name="phone" className="form-control" required onChange={ev => setInForm(ev, form, setForm)}/>
                        </FormField>

                        <FormField title="address" label="Address">
                            <input type="text" id="address" name="address" className="form-control" required onChange={ev => setInForm(ev, form, setForm)}/>
                        </FormField>

                            <div className="form-check">
                                <input type="checkbox" id="agree" className="form-check-input" required />
                                <label htmlFor="agree" className="form-check-label ml-2">I agree to Terms and Conditions</label>
                            </div>
                        <div className="form-group">
                            <SubmitBtn label="Register" icon="fa-user-plus" loading={loading} />
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </main>
</div>
}