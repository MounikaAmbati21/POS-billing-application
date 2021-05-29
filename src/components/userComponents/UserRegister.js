import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { startRegisterUser } from '../../actions/userActions'

const UserRegister = (props) => {
    const [isRegistered, setIsRegistered] = useState(false)
    const dispatch = useDispatch()

    const userData = useSelector((state) => {
        return state.user
    })

    useEffect(() => {
        if (isRegistered) {
            props.history.push('/login')
        }
    }, [userData])

    const initialValues = {
        username: '',
        email: '',
        password: '',
        businessName: '',
        address: ''
    }
    const validateForm = () => {
        const validate = Yup.object({
            username: Yup.string()
                .min(5, 'Too short')
                .required('* required'),
            email: Yup.string().email('Invalid Email').required('Required'),
            password: Yup.string()
                .min(6, 'Password is too short,should be minimum 6 characters')
                .required('* required'),
            businessName: Yup.string()
                .required('* required'),
            address: Yup.string().required('* required'),
        })
        return validate
    }
    const handleSubmit = (values, onSubmitProps) => {
        //console.log(values)
        setIsRegistered(true)
        onSubmitProps.resetForm()
        dispatch(startRegisterUser(values))
    }

    return (
        <div className="container col-md-4 mt-3">
            <h3>Register!!!</h3>
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validateForm()}
                    onSubmit={handleSubmit} >
                    {(formik) => (
                        <div>
                            <Form >
                                <div class="form-group">
                                    <Field type="text"
                                        name="username"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter your Name"
                                        className="form-control form-control-sm mt-3" />
                                    {formik.touched.username && formik.errors.username && (<span style={{ color: "red" }}>{formik.errors.username}</span>)} <br />

                                    <Field type="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Email"
                                        className="form-control form-control-sm" />
                                    {formik.errors.email && formik.touched.email && (<span style={{ color: "red" }}>{formik.errors.email}</span>)} <br />

                                    <Field type="text"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="password"
                                        className="form-control form-control-sm" />
                                    {formik.errors.password && formik.touched.password && (<span style={{ color: "red" }}>{formik.errors.password}</span>)} <br />

                                    <Field type="text"
                                        name="businessName"
                                        value={formik.values.businessName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="business Name"
                                        className="form-control form-control-sm" />
                                    {formik.errors.businessName && formik.touched.businessName && (<span style={{ color: "red" }}>{formik.errors.businessName}</span>)} <br />

                                    <Field type="text"
                                        name="address"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="address"
                                        className="form-control form-control-sm" />
                                    {formik.errors.address && formik.touched.address && (<span style={{ color: "red" }}>{formik.errors.address}</span>)}<br />

                                    <button type="submit" className="btn btn-sm btn-primary">Register</button>
                                </div>
                            </Form>
                        </div>
                    )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default UserRegister