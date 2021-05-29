import React, { useEffect, useState } from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { startLoginUser } from '../../actions/userActions'

const Login = (props) => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { userAuth } = props
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => {
        return state.user
    })

    useEffect(() => {
        if (isSubmitted) {
            userAuth()
            props.history.push('/dashboard')
        }
    }, [userLogin])

    const initialValues = {
        email: '',
        password: ''
    }


    const validate = Yup.object({
        email: Yup.string().email('Invalid email').required('* email required'),
        password: Yup.string()
            .min(6, 'password should minimum 6 characters')
            .required('* password required')
    })

    const handleSubmit = (values, onSubmitProps) => {
        //console.log(values)
        setIsSubmitted(true)
        dispatch(startLoginUser(values))
        onSubmitProps.resetForm()
    }

    return (
        <div className="container col-md-4 mt-3">
            <h2>Login</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validate} >
                {(formik) => (
                    <div>
                        <Form>
                            <div class="form-group">
                                <Field type="email"
                                    value={formik.values.email}
                                    name="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="email" className="form-control form-control-sm mt-4" />
                                {formik.errors.email && formik.touched.email && <span style={{ color: "red" }}>{formik.errors.email}</span>}
                                <br />
                                <Field type="password"
                                    value={formik.values.password}
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="password" className="form-control form-control-sm" />
                                {formik.errors.password && formik.touched.password && <span style={{ color: "red" }}>{formik.errors.password}</span>}
                                <br />
                                <button type="submit" className="btn btn-sm btn-primary">Login</button>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default Login