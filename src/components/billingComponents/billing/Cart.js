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
                return (ele.quantity=ele.quantity-1)
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
        <div>
            {/* <h1>{cart.length}</h1> */}
            <div>
                {customerData && <h1> {customerData.name}</h1>}

                <table class='table'>
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((ele,i)=>{
                            return <tr key={ele.products._id}>
                                <td>{i+1}</td>
                                <td>{ele.products.name}</td>
                                <td> <button onClick={()=>{
                                        decrement(ele.products._id)
                                        }} class="btn btn-link">-</button>
                                                {ele.quantity}
                                        <button onClick={()=>{
                                            increment(ele.products._id)
                                        }} class="btn btn-link">+</button></td>
                                <td>{ele.products.price*ele.quantity}</td>
                                <td><button onClick={()=>{
                                            handleRemove(ele.products._id)
                                        }} className="btn btn-primary">
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