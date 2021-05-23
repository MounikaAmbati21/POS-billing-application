import React,{useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { startGetAllBills,startGetAllProducts,startGetAllCustomers } from '../../actions/billingActions'

const Dashboard = (props)=>{
    const {customers , products , bills } = useSelector((state)=>{
        return state.details
    })
    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(startGetAllCustomers())
        dispatch(startGetAllProducts())
        dispatch(startGetAllBills())
    },[])

    return (
        <div>
            <h2>Total Customers - {customers.length}</h2>
            <h2>Total Products - {products.length}</h2>
            <h2>Total bill Amount -{bills.length} </h2>
        </div>
    )
}

export default Dashboard