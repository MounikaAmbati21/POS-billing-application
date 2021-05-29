import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGetAllProducts, startGetAllCustomers } from '../../../actions/billingActions'

const ViewBillData = (props) => {
    const { billData } = props
    const dispatch = useDispatch()

    const customer = useSelector((state) => {
        return state.details.customers
    })

    const product = useSelector((state) => {
        return state.details.products
    })

    useEffect(() => {
        dispatch(startGetAllProducts())
        dispatch(startGetAllCustomers())
    }, [dispatch])

    const customerName = customer.find((ele) => {
        if (ele._id === billData.customer) {
            return ele
        }
    })
    const lineItems = billData.lineItems

    return (
        <div className="col-md-12">
            <h1>Customer Details</h1>
            <div className="row">
                <p>Name : <strong>{customerName.name}</strong></p>
            </div>
            <div className="row">
                <span>Invoice No. :<strong>{billData._id}</strong></span>
            </div>
            <div className="row ">
                <span>Payment Date : <strong>{billData.date.slice(0, 10)}</strong></span>
            </div>
            <div className="row">
                <span>Bill Amount : <strong>{billData.total}/-</strong></span>
            </div>
            <div>
                <table className='table' border='2'>
                    <thead className='thead-light'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Decription</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lineItems.map((ele, i) => {
                            return <tr key={ele._id} scope="row">
                                <td >{i + 1}</td>
                                {product.map((data) => {
                                    return (ele.product === data._id && (
                                        <td>{data.name}</td>))
                                })}
                                <td>{ele.quantity}</td>
                                <td>{ele.subTotal}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewBillData