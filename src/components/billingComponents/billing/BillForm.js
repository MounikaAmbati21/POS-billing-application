import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { startGetAllCustomers, billCustomerData } from '../../../actions/billingActions'


const BillForm=(props)=>{
    const [name,setName]=useState('')
    const [mobile,setMobile]=useState('')

    const dispatch=useDispatch()

    const customers=useSelector((state)=>{
        return state.details.customers
    })

    useEffect(()=>{
        dispatch(startGetAllCustomers())
    },[])

    const addData=(number)=>{
        const customerData=customers.find((ele)=>{
            if(number === ele.mobile){
                return ele
            }
        })
        return customerData
    }

    const handleChange=(e)=>{
        if(e.target.name === 'mobile'){
            setMobile(e.target.value)
        }
    }

    const handleBlur=()=>{
        if(mobile!== ''){
            const data=addData(mobile)
            setName(data.name)
        }else{
            setName('')
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const data=addData(mobile)
        const formData={
            customers : data._id,
            ...data
        }
        dispatch(billCustomerData(formData))
        setName('')
        setMobile('')
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit} class="form-horizontal justify-content-center">
                
            <div class="form-group form-group-sm">
            <div class='form-row'>
                
                <div class="col-lg-3 col-lg-offset-4">
                <input 
                    type='text'
                    value={mobile}
                    name='mobile'
                    placeholder='enter mobile no**'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    class="form-control"
                />
                </div>
                <div class="col-lg-3 col-lg-offset-4">
                <input 
                    type='text'
                    value={name}
                    name='name'
                    placeholder='enter customer name'
                    class="form-control" 
                />
                </div>
                <input type='submit' value='Add' className="btn btn-primary" />
                </div>
                </div>
            </form>
        </div>
    )
}

export default BillForm