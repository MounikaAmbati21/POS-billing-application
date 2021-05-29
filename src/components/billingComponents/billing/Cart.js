import React, { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getBillCustomerData, getCartItems,  removeCartData} from '../../../actions/billingActions'

const Cart=()=>{
    const cart=useSelector((state)=>{
        return state.details.cart
    })
    const customerData=useSelector((state)=>{
        return state.details.billCustomerData
    })
console.log(customerData)
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getBillCustomerData())
        dispatch(getCartItems())
    },[])

    const increment=(id)=>{
        return cart.map((ele)=>{
            if(ele.products._id===id){
                dispatch(getCartItems())
                return (ele.quantity=ele.quantity+1)
            }
        })
    }

    const decrement=(id)=>{
        return cart.map((ele)=>{
            if(ele.products._id===id){
                dispatch(getCartItems())
                if(ele.quantity>1){
                return (ele.quantity=ele.quantity-1)
                }
            }
        })
    }

    const handleRemove=(id)=>{
        const confirm=window.confirm('Are you Sure')
        if(confirm){
            dispatch(removeCartData(id))
        }        
    }

    return (
        <div className='col-md-12'>
            <h3 className="col-md-3 mt-3">Total cart items - {cart.length}</h3>
                {customerData && <h1> {customerData.name}</h1>}
                <div className="col-md-10">
                <table className='table table-light table-hover'>
                    <thead className='thead-dark'>
                        <tr>
                            <th scope="col">Sl.No</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((ele,i)=>{
                            return <tr key={ele.products._id}>
                                <td>{i+1}</td>
                                <td>{ele.products.name}</td>
                                <td> <button onClick={()=>{
                                        decrement(ele.products._id)
                                        }} className="btn btn-outline-primary btn-sm">-</button>
                                                {ele.quantity}
                                        <button onClick={()=>{
                                            increment(ele.products._id)
                                        }} className="btn btn-outline-primary btn-sm">+</button></td>
                                <td>{ele.products.price*ele.quantity}</td>
                                <td><button onClick={()=>{
                                            handleRemove(ele.products._id)
                                        }} className="btn btn-primary btn-sm mx-sm-3 mb-2">
                                            remove
                                    </button>
                                </td>
                            </tr>
                        })}
                        <tr>
                        </tr>
                    </tbody>
                </table>
                </div>
        </div>
    )
}

export default Cart