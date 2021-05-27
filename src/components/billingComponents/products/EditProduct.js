import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { startUpdateProductData, clearProductData } from '../../../actions/billingActions'

const EditProduct = (props) => {
    const { toggle, handleToggle, name, price, _id } = props

    const initialValues = {
        name: name,
        price: price
    }
    const dispatch = useDispatch()

    const validationSchema = () => {
        const validate = Yup.object({
            name: Yup.string(),
            price: Yup.number()
        })
        return validate
    }

    const onSubmit = (values, onSubmitProps) => {
        onSubmitProps.resetForm()
        dispatch(startUpdateProductData(_id, values))
        handleToggle(false)
    }

    return (
        <div className="col-md-12">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema()}
                onSubmit={onSubmit}>
                {(formik) => (

                    <Form className="form-inline">
                        <Field
                            type='text'
                            placeholder='enter name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='name'
                            className="form-group mb-2"
                        />
                        {formik.touched.name && (
                            formik.errors.name && <span>{formik.errors.name}</span>
                        )}
                        <Field
                            type='number'
                            placeholder='enter price'
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='price'
                            className="form-group mx-sm-3 mb-2"
                        />
                        {formik.touched.price && (
                            formik.errors.price && <span>{formik.errors.price}</span>
                        )}
                        <Field
                            type='submit'
                            value='update'
                            className="btn btn-primary btn-sm mb-2"
                        />

                        <Field
                            type='submit'
                            value='cancel'
                            onClick={() => {
                                handleToggle(false)
                                dispatch(clearProductData())
                            }} className="btn btn-danger btn-sm mb-2"
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default EditProduct
