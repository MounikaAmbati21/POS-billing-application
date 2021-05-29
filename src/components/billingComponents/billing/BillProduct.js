import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, startGetAllProducts } from '../../../actions/billingActions'
import Select from 'react-select'

const BillProduct = (props) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetAllProducts())
    }, [])

    const products = useSelector((state) => {
        return state.details.products
    })

    const options = products.map(ele => ({
        'value': ele._id,
        'label': ele.name
    }))

    const handleBlur = () => {
        if (name !== '') {
            setPrice(productData.price)
        } else {
            setPrice('')
        }
    }
    const productData = products.find((ele) => {
        if (name === ele._id) {
            return ele
        }
    })

    // console.log(productData)

    const handleOnChange = (e) => {
        setName(e.value)
    }
    // console.log(name)

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            products: productData,
            quantity: 1
        }
        dispatch(addToCart(formData))
        setPrice('')
        setName('')
    }

    return (
        <div className="col-md-8">
            <h3 className="col-md-3">Add products</h3>
            <form onSubmit={handleSubmit} >
                <div className="row">
                    <div className="col-md-4">
                        <Select
                            options={options}
                            placeholder='select product'
                            onChange={handleOnChange}
                            name='name'
                            onBlur={handleBlur}
                            isSearchable
                            className="form-group"
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type='text'
                            value={price}
                            placeholder='price'
                            onChange={handleOnChange}
                            className="form-control  mb-2"
                            disabled={true}
                        />
                    </div>
                    <div class="col-md-1">
                        <input
                            type='submit'
                            value='Add to Cart'
                            className="btn btn-primary btn-sm mx-sm-3 mb-2"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default BillProduct