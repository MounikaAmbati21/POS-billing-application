import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGetAllBills, startGetAllProducts, startGetAllCustomers } from '../../actions/billingActions'

const Dashboard = (props) => {
    const { customers, products, bills } = useSelector((state) => {
        return state.details
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetAllCustomers())
        dispatch(startGetAllProducts())
        dispatch(startGetAllBills())
    }, [])

    return (
            <div className="row mt-5">
                  <div className="col-sm-4">
                <div className="card">
                    <div className="card-body">
                        <h2>Total Customers - {customers.length}</h2>
                    </div>
                </div>
                </div>
                <div className="col-sm-4">
                <div className="card">
                    <div className="card-body">
                        <h2>Total Products - {products.length}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard