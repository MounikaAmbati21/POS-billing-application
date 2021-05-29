import React,{useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { clearBillCustomerData, startCreateBill , clearCart} from '../../../actions/billingActions'

const BillMerge=(props)=>{
    const {handleInvoice} = props
    const [customerData, setCustomerData] = useState({})
    const dispatch=useDispatch()

    const cart=useSelector((state)=>{
        return state.details.cart
    })

    const custData=useSelector((state)=>{
        return state.details.billCustomerData
    })
    useEffect(()=>{
        setCustomerData(custData)
    },[])
    console.log(customerData)

    const handleClick=(data=customerData,items=cart)=>{
        const formData={
            date : new Date(),
            customer : data.customers,
            lineItems : items.map((ele)=>{
                return {
                    product : ele.products._id,
                    quantity : ele.quantity
                }
            })
        }
        // console.log('formData',formData)
        dispatch(startCreateBill(formData))
        dispatch(clearBillCustomerData())
        dispatch(clearCart())
        handleInvoice(data._id)
        setCustomerData({})
        // handleInvoice(data.customers)
    }

    return (
        <div  className="col-md-2">
            <button onClick={()=>{
                handleClick(customerData,cart)
            }} className="btn btn-primary">Generate Bill</button>
        </div>
    )
}

export default BillMerge