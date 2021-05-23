import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { addToCart, startGetAllProducts} from '../../../actions/billingActions'

const BillProduct=(props)=>{
    const [name,setName]=useState('')
    const [price,setPrice] = useState('')

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(startGetAllProducts())
    },[])

    const products=useSelector((state)=>{
        return state.details.products
    })

    const addProduct=(pName)=>{
        const productData=products.find((ele)=>{
            if(pName===ele.name){
                return ele
            }
        })
        console.log(productData)
        return productData
    }

    const handleChange=(e)=>{
        if(e.target.name==='name'){
            setName(e.target.value)
        }
    }

    const handleBlur=()=>{
        if(name !== ''){
            const finalData=addProduct(name)
            setPrice(finalData.price)
        }else{
            setPrice('')
        }
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        const finalData = addProduct(name)
        const formData={
            products: finalData,
            quantity : 1
        }
        dispatch(addToCart(formData))
        setPrice('')
        setName('')
    }

    return (
        <div class='container'>
            <form onSubmit={handleSubmit} class="form-horizontal justify-content-center">
            <div class="form-group form-group-sm">
            <div class='form-row'>
            <div class="col-lg-2 col-lg-offset-6">
            <input 
                type='text'
                name='name'
                value={name}
                placeholder='productName'
                onChange={handleChange}
                onBlur={handleBlur}
                class="form-control"
            />
            </div>
                
            <div class="col-lg-2 col-lg-offset-6">
            <input 
                type='text'
                value={price}
                placeholder='price'
                class="form-control"
            />
            </div>

            <div>
            <input 
                type='submit'
                value='Add to Cart'
                className="btn btn-primary"
            />
            </div>
            </div>
        </div>                   
     </form>
     
     
 </div>
       
    )
}

export default BillProduct