import React, {useState, useEffect} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import ProductsList from './ProductList'
import ProductForm from './ProductForm'
import {startGetAllProducts, startGetProductData} from '../../../actions/billingActions'
import EditProduct from './EditProduct'

const ProductsContainer =(props)=>{
    const [toggle,setToggle] = useState(false)
    const dispatch = useDispatch()
    const productData = useSelector(state=>{
        return state.details.singleProduct
    })
    useEffect(()=>{
        dispatch(startGetAllProducts())
    },[])

    const handleToggle = (value)=>{
        setToggle(value)
    }

    const handleEdit = (id)=>{
        handleToggle(true)
        dispatch(startGetProductData(id))
    }

    return (
        <div>
            {
                toggle &&  Object.keys(productData).length > 0 ? (
                    <div>
                        <h1> Update Product Details</h1>
                        <EditProduct
                            toggle={toggle}
                            handleToggle={handleToggle}
                            {...productData}
                        />
                    </div>
                ) : (
                    <div>
                        <h1>Add Product</h1>
                        <ProductForm />
                    </div>
                )
            } <hr/>
            <ProductsList handleEdit={handleEdit} />
        </div>
    )
}

export default ProductsContainer