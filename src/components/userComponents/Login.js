import React,  { useEffect,useState } from 'react'
import {Formik, Field, Form} from 'formik'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import { startLoginUser } from '../../actions/userActions'

const Login = (props)=>{
    const[isSubmitted,setIsSubmitted]=useState(false)
    const {userAuth} = props
    const dispatch = useDispatch()

    const userLogin=useSelector((state)=>{
        return state.user
    })

    useEffect(()=>{
        if(isSubmitted){
            userAuth()
            props.history.push('/dashboard')
    }
    },[userLogin])

    const initialValues = {
        email : '',
        password : ''
    }


    const validate = Yup.object({
        email: Yup.string().email('Invalid email').required('email required'),
        password : Yup.string()
        .min(6,'password should minimum 6 characters')
        .required('password required')
    })

    const handleSubmit = (values,onSubmitProps)=>{
        //console.log(values)
        setIsSubmitted(true)
        dispatch(startLoginUser(values))
        onSubmitProps.resetForm()
    }

    return (
        <div>
            <h2>Login</h2>
            <Formik 
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validate} >
                    {(formik)=>(
                        <div>
                            <Form>
                                <Field type="email"
                                       value={formik.values.email}
                                       name="email"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       placeholder="email" /> <br/>
                                       {formik.errors.email && formik.touched.email && <span>{formik.errors.email}</span>} <br/>
                                
                                <Field type="password"
                                       value={formik.values.password}
                                       name="password"
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                       placeholder="password" /> <br/>
                                       {formik.errors.password && formik.touched.password && <span>{formik.errors.password}</span>} <br/>

                                <button type="submit">Login</button>
                            </Form>
                        </div>
                    )}
                </Formik>
        </div>
    )
}

export default Login