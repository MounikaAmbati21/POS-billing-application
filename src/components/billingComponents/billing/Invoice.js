import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { useSelector,useDispatch } from 'react-redux'
import './invoice.css'
import { startGetAllProducts ,startGetAllCustomers} from '../../../actions/billingActions'
import {startGetUserDetails} from '../../../actions/userActions'



const Invoice=(props)=>{
    const {handleToggle} =props

    const dispatch=useDispatch()
    const billData=useSelector((state)=>{
        return state.details.singleBill
    })
    const customer=useSelector((state)=>{
        return state.details.customers
    })

    const product=useSelector((state)=>{
        return state.details.products
    })
    const userData = useSelector((state)=>{
        return state.user
    })

    useEffect(()=>{
        dispatch(startGetAllProducts())
        dispatch(startGetAllCustomers())
        dispatch(startGetUserDetails())
    },[dispatch])

    const customerName=customer.find((ele)=>{
        if(ele.user === billData.user){
            return ele
        }  
    })
    // console.log('customer',customerName)

    const lineItems=billData.lineItems
    // console.log('lineItems',lineItems)
    // console.log( 'bill',billData)
    
    // return(
    //     <div>
    //     <h1>Invoice</h1>
    //         <div class="receipt-content">
    //             <div class="container bootstrap snippets bootdey">
    //                 <div class="row">
	// 		            <div class="col-md-12">
	// 			            <div class="invoice-wrapper">
	// 				            <div class="intro">
    //                                   Hi <strong>{customerName.name}</strong>, 
    //                                 <br/>
    //                                 This is the receipt for a payment of <strong>Rs-{billData.total}</strong> for your works
    //                             </div>
    //                             <div class="payment-info">
	// 					            <div class="row">
    //                                     <div class="col-sm-6">
    //                                         <span>Invoice No.</span>
    //                                         <strong>{billData._id}</strong>
    //                                     </div>
    //                                     <div class="col-sm-6 text-right">
    //                                         <span>Payment Date</span>
    //                                         <strong>{billData.date}</strong>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <hr/>
    //                             <div>
    //                                 <table class='table' border='2'>
    //                                     <thead class='thead-light'>
    //                                         <tr>
    //                                             <th scope="col">Sl.No</th>
    //                                             <th scope="col">Decription</th>
    //                                             <th scope="col">Quantity</th>
    //                                             <th scope="col">price</th>
    //                                         </tr>
    //                                     </thead>
    //                                     <tbody>
                                            
                                            // {lineItems.map((ele,i)=>{
                                            //     return <tr key={ele._id} scope="row">
                                            //             <td >{i+1}</td>
                                            //             {product.map((data)=>{
                                            //                 return (ele.product===data._id &&(
                                            //                     <td>{data.name}</td>                                                                                                                 ))
                                            //             })}
                                            //             <td>{ele.quantity}</td>
                                            //             <td>{ele.subTotal}</td>
                                            //         </tr>
                                            // })}
    //                                     </tbody>
    //                                 </table>
    //                             </div>

    //                             <div class="line-items">	
	// 					<div class="total text-right">
	// 						<p class="extra-notes">
	// 							<strong>Extra Notes</strong>
	// 							Please send all items at the same time to shipping address by next week.
	// 							Thanks a lot.
	// 						</p>
	// 						<div class="field">
	// 							Subtotal <span>{billData.total}</span>
	// 						</div>
	// 						<div class="field">
	// 							Shipping <span>0.00</span>
	// 						</div>
	// 						{/* <div class="field">
	// 							Discount <span>4.5%</span>
	// 						</div> */}
	// 						<div class="field grand-total">
	// 							Total <span>{billData.total}</span>
	// 						</div>
	// 					</div>

	// 					<div class="print">
	// 						<a href="#">
	// 							<i class="fa fa-print"></i>
	// 							Print this receipt
	// 						</a>
	// 					</div>
	// 				</div>
	// 			</div>

	// 			<div class="footer">
	// 				Copyright © 2021. pos billing
    //                         </div>
    //                     </div>
    //                 </div>            
    //              </div>
    //         </div>
    //         </div>
    // )
    return (
        <div class="col-md-12">   
 <div class="row">

        <div class="receipt-main ">
            <div class="row">
    			<div class="receipt-header">
                <div class="col-xs-6 col-sm-6 col-md-6">
                <div class="receipt-left">
                <img class="img-responsive" alt="iamgurdeeposahan" src="https://bootdey.com/img/Content/avatar/avatar6.png" style={{width: "71px", borderRadius: "43px"}}/>
                    </div>
                    </div>
					<div class="col-xs-6 col-sm-6 col-md-6 text-right">
						<div class="receipt-right">
							<h5>{userData.businessName}</h5>
							<p>{userData.email} <i class="fa fa-envelope-o"></i></p>
							<p>{userData.address} <i class="fa fa-location-arrow"></i></p>
						</div>
                    </div>
				</div>
            </div>
			
			<div class="row">
				<div class="receipt-header receipt-header-mid">
					<div class="col-xs-8 col-sm-8 col-md-8 text-left">
						<div class="receipt-right">
							<h5>{customerName.name} </h5>
							<p><b>Mobile :</b>{customerName.mobile} </p>
							<p><b>Email :</b>{customerName.email} </p>
						</div>
					</div>
					<div class="col-xs-4 col-sm-4 col-md-4">
						<div class="receipt-left">
							<h3>INVOICE #{billData._id.slice(18)}</h3>
						</div>
					</div>
				</div>
            </div>
			
            <div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>sl.no</th>
                            <th>Items</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td class="col-md-9">Payment for August 2016</td>
                            <td class="col-md-3"><i class="fa fa-inr"></i> 15,000/-</td>
                        </tr>
                        <tr>
                            <td class="col-md-9">Payment for June 2016</td>
                            <td class="col-md-3"><i class="fa fa-inr"></i> 6,00/-</td>
                        </tr>
                        <tr>
                            <td class="col-md-9">Payment for May 2016</td>
                            <td class="col-md-3"><i class="fa fa-inr"></i> 35,00/-</td>
                        </tr> */}
                                                                {lineItems.map((ele,i)=>{
                                                return <tr key={ele._id} scope="row">
                                                        <td class="col-md-3" >{i+1}</td>
                                                        {product.map((data)=>{
                                                            return (ele.product===data._id &&(
                                                                <td class="col-md-3">{data.name}</td>                                                                                                                 ))
                                                        })}
                                                        <td class="col-md-3">{ele.quantity}</td>
                                                        <td class="col-md-3">{ele.subTotal}</td>
                                                    </tr>
                                            })}
                        <tr>
                            <td class="text-right">
                            <p>
                                <strong>Total Amount: </strong>
                            </p>
                            <p>
                                <strong>Shipping Charges: </strong>
                            </p>
							</td>
                            <td>
                            <p>
                                <strong><i class="fa fa-inr"></i> {billData.total}/-</strong>
                            </p>
                            <p>
                                <strong><i class="fa fa-inr"></i> 0.00/-</strong>
                            </p>
							</td>
                        </tr>
                        <tr>
                           
                            <td class="text-right"><h2><strong>Total: </strong></h2></td>
                            <td class="text-left text-danger"><h2><strong><i class="fa fa-inr"></i> {billData.total}/-</strong></h2></td>
                        </tr>
                    </tbody>
                </table>
            </div>
			
			<div class="row">
				<div class="receipt-header receipt-header-mid receipt-footer">
					<div class="col-xs-8 col-sm-8 col-md-8 text-left">
						<div class="receipt-right">
							<p><b>Date :</b>{billData.date.slice(0,10)}</p>
							<h5 style={{color: "rgb(140, 140, 140)"}}>Thanks for shopping.!</h5>
						</div>
					</div>
				</div>
            </div>
        </div>    
	</div>
</div>
    )

}

export default Invoice