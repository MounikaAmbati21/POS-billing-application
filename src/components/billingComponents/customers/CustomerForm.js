import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { startAddCustomer } from '../../../actions/billingActions'

const CustomerForm = (props) => {
    const dispatch = useDispatch()

    const initialValues = {
        name: '',
        mobile: '',
        email: ''
    }

    const validateForm = () => {
        const validate = Yup.object({
            name: Yup.string()
                .min(5, 'must be equal to 5 characters and above')
                .required('Required'),
            mobile: Yup.string().required('Required'),
            email: Yup.string().email('Email is invalid').required('Required'),
        })
        return validate
    }

    const onSubmit = (values, onSubmitProps) => {
        // console.log(values)
        dispatch(startAddCustomer(values))
        onSubmitProps.resetForm()
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validateForm()}
                onSubmit={onSubmit}>
                {(formik) => (
                    <div>
                        <Form>

                            <Field
                                type='text'
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='name'
                            />
                            {formik.touched.name &&
                                formik.values.name.length < 5 && (
                                    formik.errors.name && <div>{formik.errors.name}</div>
                                )}
                            <Field
                                type='text'
                                name='mobile'
                                value={ formik.values.mobile}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder='mobile'
                            />
                            {formik.touched.mobile && formik.errors.mobile && (
                                <div>{formik.errors.mobile}</div>
                            )}
                            <Field
                                type='text'
                                name='email'
                                placeholder='email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div>{formik.errors.email}</div>
                            )}
                            <br />
                                <Field type='submit' className="btn btn-primary" value='save' id='save' />
                        </Form>
                    </div>
                )}
            </Formik>
        </div>

    )
}

export default CustomerForm