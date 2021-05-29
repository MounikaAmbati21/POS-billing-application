import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetAllCustomers, billCustomerData } from '../../../actions/billingActions'
import Select from 'react-select'

const BillForm = (props) => {
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const customers = useSelector((state) => {
        return state.details.customers
    })

    useEffect(() => {
        dispatch(startGetAllCustomers())
    }, [])

    const options = customers.map(ele => ({
        'value': ele._id,
        'label': ele.mobile
    }))

    const handleBlur = () => {
        if (mobile !== '') {
            setName(customerData.name)
            setEmail(customerData.email)
        } else {
            setName('')
            setEmail('')
        }
    }

    const customerData = customers.find((ele) => {
        if (mobile === ele._id) {
            return ele
        }
    })

    const handleOnChange = (e) => {
        setMobile(e.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            customers: mobile,
            ...customerData
        }
        setName('')
        setEmail('')
        //  console.log('formData',formData)
        if (Object.values(customerData).includes('') !== true) {
            dispatch(billCustomerData(formData))
        } else {
            alert('Enter the correct mobile number')
        }
    }

    return (
        <div className="col-md-12 mb-2">
            <h3 className="col-md-3">Add customer details</h3>
            <form onSubmit={handleSubmit} >
                <div className="row">
                    <div className="col-md-2">
                        <Select
                            options={options}
                            placeholder='select mobile'
                            onChange={handleOnChange}
                            name='mobile'
                            onBlur={handleBlur}
                            isSearchable
                            className='form-group'
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type='text'
                            value={name}
                            name='name'
                            placeholder='customer name'
                            onChange={handleOnChange}
                            className="form-control  mb-2"
                            disabled={true}
                        />
                    </div>
                    <div className="col-md-3">
                        <input
                            type='text'
                            value={email}
                            name='email'
                            placeholder='customer email'
                            onChange={handleOnChange}
                            className="form-control  mb-2"
                            disabled={true}
                        />
                    </div>
                    <div className="col-md-1">
                        <input type='submit' value='Add' className="btn btn-primary btn-sm mb-2" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default BillForm