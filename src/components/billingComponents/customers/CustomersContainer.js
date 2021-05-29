import React, {useState,useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import CustomerList from './CustomerList'
import {startGetAllCustomers, startGetOneCustomer} from '../../../actions/billingActions'
import CustomerForm from './CustomerForm'
import EditCustomer from './EditCustomer'

const Customers =(props)=>{
    const [toggle,setToggle] = useState(false)
    const dispatch = useDispatch()

    const customerData = useSelector((state)=>{
        return state.details.singleCustomer
    })
    const customers = useSelector((state)=>{
        return state.details.customers
    })
    useEffect(()=>{
        dispatch(startGetAllCustomers())
    },[])

    const handleToggle = (values)=>{
        setToggle(values)
    }

    const handleEdit = (id)=>{
        //console.log(id)
        setToggle(true)
        dispatch(startGetOneCustomer(id))
    }

    return (
        <div className="col-md-12 mb-2">
            {
                toggle && Object.keys(customerData).length > 0 ? (
                    <div className="col-md-8">
                       <h2 className="col-md-6 mt-3">Update Customer Details</h2>
                       <EditCustomer {...customerData} 
                                      handleToggle={handleToggle}
                            />
                    </div>
                ) : (
                    <div className="col-md-8">
                       <h2 className="col-md-4">Add Customer</h2>
                       <CustomerForm />
                    </div>
                )
            }
            <hr/>
            {
                customers.length === 0 ? (
                    <div className="col-md-12">
                    <h4>No Customers found</h4>
                    </div>
                ) : (
                    <div className="col-md-12">
                        <CustomerList customers={customers} handleEdit={handleEdit}/>
                    </div>
                )
            }
        </div>
    )
}

export default Customers