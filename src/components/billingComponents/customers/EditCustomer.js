import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
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
        <div class='container'>
            <Formik
                initialValues={initialValues}
                validationSchema={validateForm()}
                onSubmit={onSubmit}>
                {(formik) => (
                    <Form>
                        <div class="form-group form-group-sm">
                            <div class='form-row'>
                                <div class="col-lg-3 col-lg-offset-4">
                                    <Field
                                        type='text'
                                        name='name'
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder='name'
                                        class="form-control"
                                    />
                                    {formik.touched.name && 
                                            formik.errors.name && ( <div>{formik.errors.name}</div>
                                        )}
                                </div>
                                <div class="col-lg-3 col-lg-offset-4">
                                    <Field
                                        type='text'
                                        name='mobile'
                                        value={formik.values.mobile}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder='mobile'
                                        class="form-control"
                                    />
                                    {formik.touched.mobile && formik.errors.mobile && (
                                        <div>{formik.errors.mobile}</div>
                                    )}
                                </div>
                                <div class="col-lg-3 col-lg-offset-4">
                                    <Field
                                        type='text'
                                        name='email'
                                        placeholder='email'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        class="form-control"
                                    />
                                    {formik.touched.email && formik.errors.email && (
                                        <div>{formik.errors.email}</div>
                                    )}
                                </div>
                                <div>


                                    <div>
                                        <Field
                                            type='submit'
                                            className="btn btn-primary"
                                            value='update'
                                            id='update'
                                        />

                                        <Field
                                            type='submit'
                                            className="btn btn-primary"
                                            id='cancel'
                                            value='cancel'
                                            onClick={() => {
                                                handleToggle(false)
                                                dispatch(clearCustomerData())
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>

    )
}

export default EditCustomer