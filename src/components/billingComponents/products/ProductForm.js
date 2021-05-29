import React from 'react'
import { useDispatch } from 'react-redux'
import { Field, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { startAddProductData } from '../../../actions/billingActions'

const ProductForm = (props) => {
    const dispatch = useDispatch()

    const initialValues = {
        name: '',
        price: '',
    }

    const validationSchema = Yup.object({
        name: Yup.string('Product name').required('Product name is required'),
        price: Yup.number('Price of product')
            .required('Price is required')
    })

    const onSubmit = (values, onSubmitProps) => {
        onSubmitProps.resetForm()
        dispatch(startAddProductData(values))
    }

    return (
        <div className="col-md-12" >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit} >
                {(formik) => (
                    <div>
                        <Form className="form-inline">
                                <Field
                                    type='text'
                                    name='name'
                                    placeholder='enter name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="form-group mb-2"
                                />
                            {formik.touched.name && formik.errors.name && <span>{formik.errors.name}</span>}
                                <Field
                                    type='number'
                                    name='price'
                                    placeholder='enter price'
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="form-group mx-sm-4 mb-2"
                                />
                            {formik.touched.price && formik.errors.price && <span>{formik.errors.price}</span>}
                                <Field
                                    type='submit'
                                    value='Add'
                                    className="btn btn-primary btn-sm mb-2"/>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default ProductForm