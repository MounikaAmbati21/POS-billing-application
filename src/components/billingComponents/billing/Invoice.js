import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { useSelector, useDispatch } from 'react-redux'
import './invoice.css'
import { startGetAllProducts, startGetAllCustomers } from '../../../actions/billingActions'
import { startGetUserDetails } from '../../../actions/userActions'
import html2pdf from 'html2pdf.js'
import moment from 'moment'

const Invoice = (props) => {
    const { handleToggle, billData } = props

    const dispatch = useDispatch()

    const customer = useSelector((state) => {
        return state.details.customers
    })

    const product = useSelector((state) => {
        return state.details.products
    })
    const userData = useSelector((state) => {
        return state.user
    })

    useEffect(() => {
        dispatch(startGetAllProducts())
        dispatch(startGetAllCustomers())
        dispatch(startGetUserDetails())
    }, [dispatch])

    const customerName = customer.find((ele) => {
        if (ele._id === billData.customer) {
            return ele
        }
    })

    const lineItems = billData.lineItems
    // console.log('lineItems',lineItems)

    const handleInvoiceDownload = () => {
        var opt = {
            margin: 0,
            html2canvas: { scale: 3 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        }
        let invoice = document.getElementById('invoice')
        html2pdf()
            .from(invoice)
            .set(opt)
            .save(`Bill-${customerName.name}-${moment(billData.createdAt).format('l')}`)
    }

    return (
        <div class="col-md-12">
            <div class="row">

                <div class="receipt-main ">
                    <div class="row">
                        <div class="col-md-6">
                            <img class="img-responsive" alt="iamgurdeeposahan" src="https://bootdey.com/img/Content/avatar/avatar6.png" style={{ width: "71px", borderRadius: "43px" }} />
                        </div>
                        <div class="col-md-5 col-sm-8">
                            <h5>{userData.businessName}</h5>
                            <p><b>email:</b>{userData.email}</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-8 col-sm-8 col-md-8 text-left">
                            <div class="receipt-right">
                                <h5>{customerName.name} </h5>
                                <p><b>Mobile :</b>{customerName.mobile} </p>
                                <p><b>Email :</b>{customerName.email} </p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <h3>INVOICE #{billData._id.slice(18)}</h3>
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
                                {lineItems.map((ele, i) => {
                                    return <tr key={ele._id} scope="row">
                                        <td class="col-md-3" >{i + 1}</td>
                                        {product.map((data) => {
                                            return (ele.product === data._id && (
                                                <td class="col-md-3">{data.name}</td>))
                                        })}
                                        <td class="col-md-3">{ele.quantity}</td>
                                        <td class="col-md-3">{ele.subTotal}</td>
                                    </tr>
                                })}
                                <tr>
                                    <td class="text-right">
                                        <p class="col-md-4">
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
                                    <p><b>Date :</b>{billData.date.slice(0, 10)}</p>
                                    <h5 style={{ color: "rgb(140, 140, 140)" }}>Thanks for shopping.!</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button
                style={{ marginLeft: '20%' }}
                variant='contained'
                color='danger'
                align='right'
                onClick={() => {
                    handleToggle(false)
                }}>
                &times;
						</button>
            <button
                onClick={handleInvoiceDownload}
                variant='contained'
                style={{
                    backgroundColor: 'green',
                    color: 'white',
                    marginBottom: '1em',
                }}>
                Download
						</button>
        </div>
    )

}

export default Invoice