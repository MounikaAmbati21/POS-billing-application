import React from 'react'
import {Formik,Field,Form} from 'formik'
import * as Yup from 'yup'
import {useDispatch} from 'react-redux'
import { startUpdateProductData,clearProductData } from '../../../actions/billingActions'
 
const EditProduct=(props)=>{
    const {toggle,handleToggle,name,price,_id } =props

    const initialValues={
        name : name,
        price : price
    }
    const dispatch=useDispatch()

    const validationSchema=()=>{
        const validate=Yup.object({
            name : Yup.string(),
            price : Yup.number()
        })
        return validate
    } 

    const onSubmit=(values,onSubmitProps)=>{
            onSubmitProps.resetForm()
            dispatch(startUpdateProductData(_id,values))
            handleToggle(false)
        }
        
    return(
        <div class='container'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema()}
                onSubmit={onSubmit}>
                    {(formik)=>(
                
            <Form class="form-horizontal justify-content-center">
                
                <div class="form-group form-group-sm">
                <div class='form-row'>
                <Field 
                    type='text' 
                    placeholder='enter name' 
                    value={formik.values.name} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                    name='name'
                />
                {formik.touched.name && (
                    formik.errors.name && <div>{formik.errors.name}</div>
                )}
                <Field 
                    type='number' 
                    placeholder='enter price' 
                    value={formik.values.price} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                    name='price'
                />
                {formik.touched.price && (
                    formik.errors.price && <div>{formik.errors.price}</div>    
                )}                            
                    <div>
                        <Field 
                        type='submit' 
                        value='update'      
                    />
                    
                    <Field 
                        type='submit' 
                        value='cancel'
                        onClick={()=>{
                            handleToggle(false)
                            dispatch(clearProductData())
                        }}    
                    />
                    </div>
                </div>
        </div>        
        </Form>
        
        )}
            </Formik>
        </div>
    )
}

export default EditProduct
