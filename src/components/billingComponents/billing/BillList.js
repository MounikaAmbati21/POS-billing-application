import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startDeleteBill, startGetAllBills } from '../../../actions/billingActions'

const BillList = (props) => {
    const { handleInvoice } = props
    const dispatch = useDispatch()

    const billing = useSelector((state) => {
        return state.details.bills
    })

    const customerData = useSelector((state) => {
        return state.details.customers
    })

    useEffect(() => {
        dispatch(startGetAllBills())
    }, [])

    const handleDelete = (id) => {
        const confirm = window.confirm('Are you sure')
        if (confirm) {
            dispatch(startDeleteBill(id))
        }
    }
    return (
        <div className='col-md-10'>
            <h2 className="col-md-4 mb-2">Total no. of bills -{billing.length}</h2>
            <table className='table table-light table-hover '>
                <thead className='thead-dark'>
                    <tr>
                        <th scope="col">Sl.No</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Total</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {billing.map((ele, i) => {
                        return <tr key={ele._id}>
                            <td scope="row">{i + 1}</td>
                            {customerData.map((data) => {
                                return (
                                    data._id === ele.customer && (
                                        <td key={ele._id}>{data.name}</td>
                                    )
                                )
                            })}
                            <td>{ele.total}</td>
                            <td><button onClick={() => {
                                handleInvoice(ele._id)
                            }} className="btn btn-primary btn-sm">View</button></td>

                            <td><button onClick={() => {
                                handleDelete(ele._id)
                            }} className="btn btn-danger btn-sm">Delete</button></td>

                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default BillList