import React, {useState,useEffect} from 'react'
import {Formik, Form, Field} from 'formik'
import * as Yup from 'yup'
import {useDispatch, useSelector} from 'react-redux'
import { startRegisterUser } from '../../actions/userActions'

const UserRegister = (props)=>{
    const [isRegistered,setIsRegistered] = useState(false)
    const dispatch = useDispatch()

    const userData=useSelector((state)=>{
        return state.user
    })

    useEffect(()=>{
        if(isRegistered){
            props.history.push('/login')
        }
    },[userData])

    const initialValues = {
        username:'',
        email:'',
        password:'',
        businessName:'',
        address:''
    }
    const validateForm = ()=>{
        const validate=Yup.object({
            username : Yup.string()
            .min(5,'Too short')
            .required('Required'),
            email : Yup.string().email('Invalid Email').required('Required'),
            password : Yup.string()
            .min(6,'Password is too short,should be minimum 6 characters')
            .required('Required'),
            businessName : Yup.string()
            .required('Required'),
            address : Yup.string().required('required'),
        })
        return validate
    }
    const handleSubmit=(values,onSubmitProps)=>{
        //console.log(values)
        setIsRegistered(true)
        onSubmitProps.resetForm()
       dispatch(startRegisterUser(values))
   }

    return (
        <div>
            <h3>Register!!!</h3>
            <div>
                <Formik
                initialValues={initialValues}
                validationSchema={validateForm()}
                onSubmit={handleSubmit} >
                    {(formik)=>(
                        <div>
                            <Form >
                                <Field type="text"
                                        name="username"
                                        value={formik.values.username}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter your Name" /> <br/>
                                        {formik.touched.username && formik.errors.username && (<div>{formik.errors.username}</div> )}

                                <Field  type="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange = {formik.handleChange}
                                        onBlur = {formik.handleBlur}
                                        placeholder="Email" /> <br/>
                                        {formik.errors.email && formik.touched.email &&( <div>{formik.errors.email}</div> )}

                                <Field  type="text"
                                        name="password"
                                        value={formik.values.password}
                                        onChange = {formik.handleChange}
                                        onBlur = {formik.handleBlur}
                                        placeholder="password" /> <br/>
                                        {formik.errors.password && formik.touched.password &&( <div>{formik.errors.password}</div> )}

                                <Field  type="text"
                                        name="businessName"
                                        value={formik.values.businessName}
                                        onChange = {formik.handleChange}
                                        onBlur = {formik.handleBlur}
                                        placeholder="business Name" /> <br/>
                                        {formik.errors.businessName && formik.touched.businessName &&( <div>{formik.errors.businessName}</div> )}

                                <Field  type="text"
                                        name="address"
                                        value={formik.values.address}
                                        onChange = {formik.handleChange}
                                        onBlur = {formik.handleBlur}
                                        placeholder="address" /> <br/>
                                        {formik.errors.address && formik.touched.address &&( <div>{formik.errors.address}</div> )}

                                <button type="submit" >Register</button>
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