import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGetAllBills, startGetAllProducts, startGetAllCustomers } from '../../actions/billingActions'
import BillChart from './BillChart'

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

    const totalAmount = () => {
        let total = 0
        bills.forEach((ele) => (total += ele.total))
        return total
    }

    return (
        <div className="row mt-4">
                            <div className="col-sm-6">
            <div className="row mt-3">
                <div className="col-sm-8">
                    <div className="card border border-dark rounded">
                        <div className="card-body">
                            <h2>Total Customers - {customers.length}</h2>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-sm-8">
                        <div className="card border border-dark rounded">
                            <div className="card-body">
                                <h2>Total Products - {products.length}</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-sm-8">
                        <div className="card border border-dark rounded">
                            <div className="card-body">
                                <h2>Total Orders - {bills.length}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-sm-10">
                            <div className="card border border-dark rounded">
                                <div className="card-body ">
                                    <h2>Total Bill Amount - {totalAmount()}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="col-sm-6">
            <BillChart />
            </div>
        </div>
    )
}

export default Dashboard