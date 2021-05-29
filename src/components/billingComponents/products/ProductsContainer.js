import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProductsList from './ProductList'
import ProductForm from './ProductForm'
import { startGetAllProducts, startGetProductData } from '../../../actions/billingActions'
import EditProduct from './EditProduct'

const ProductsContainer = (props) => {
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()
    const productData = useSelector(state => {
        return state.details.singleProduct
    })
    useEffect(() => {
        dispatch(startGetAllProducts())
    }, [])

    const handleToggle = (value) => {
        setToggle(value)
    }

    const handleEdit = (id) => {
        handleToggle(true)
        dispatch(startGetProductData(id))
    }

    return (
        <div className="col-md-12 mb-2">
            {
                toggle && Object.keys(productData).length > 0 ? (
                    <div className="col-md-6">
                        <h1 className="col-md-10"> Update Product Details</h1>
                        <EditProduct
                            toggle={toggle}
                            handleToggle={handleToggle}
                            {...productData}
                        />
                    </div>
                ) : (
                    <div className="col-md-5">
                        <h1 className="col-md-6">Add Product</h1>
                        <ProductForm />
                    </div>
                )
            } <hr />
            <div className="col-md-12">
                <ProductsList handleEdit={handleEdit} />
            </div>
        </div>
    )
}

export default ProductsContainer