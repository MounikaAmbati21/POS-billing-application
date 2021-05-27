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
        setCustomerData({})
        //handleInvoice(data._id)
    }

    return (
        <div>
            <button onClick={()=>{
                handleClick(customerData,cart)
            }} className="btn btn-primary">Generate</button>
        </div>
    )
}

export default BillMerge