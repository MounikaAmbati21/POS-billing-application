import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { clearCustomerData, startUpdateCustomer } from '../../../actions/billingActions'

const EditCustomer = (props) => {
    const { handleToggle, _id, name, email, mobile } = props
    const dispatch = useDispatch()

    const initialValues = {
        name: name,
        mobile: mobile,
        email: email
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
        dispatch(startUpdateCustomer(_id, values))
        onSubmitProps.resetForm()
        handleToggle(false)
    }

    return (
        <div className="col-md-12">
            <Formik
                initialValues={initialValues}
                validationSchema={validateForm()}
                onSubmit={onSubmit}>
                {(formik) => (
                    <Form className="form-inline">
                                    <Field
                                        type='text'
                                        name='name'
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder='name'
                                        className="form-group mb-2"
                                    />
                                    {formik.touched.name && 
                                            formik.errors.name && ( <span>{formik.errors.name}</span>
                                        )}
                                    <Field
                                        type='text'
                                        name='mobile'
                                        value={formik.values.mobile}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder='mobile'
                                        className="form-group mx-sm-3 mb-2"
                                    />
                                    {formik.touched.mobile && formik.errors.mobile && (
                                        <span>{formik.errors.mobile}</span>
                                    )}
                                    <Field
                                        type='text'
                                        name='email'
                                        placeholder='email'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} className="form-group mx-sm-3 mb-2"
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <span>{formik.errors.email}</span>
                                    )}
                                        <Field
                                            type='submit'
                                            value='update'                             className="btn btn-primary btn-sm mb-2"
                                        />

                                        <Field
                                            type='submit'
                                            value='cancel'
                                            onClick={() => {
                                                handleToggle(false)
                                                dispatch(clearCustomerData())
                                            }} className="btn btn-danger btn-sm mb-2"
                                        />
                    </Form>
                )}
            </Formik>
        </div>

    )
}

export default EditCustomer