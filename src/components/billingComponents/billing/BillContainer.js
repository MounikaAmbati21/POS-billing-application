import React, { useEffect, useState } from 'react'
import BillForm from './BillForm'
import BillProduct from './BillProduct'
import Cart from './Cart'
import BillMerge from './BillMerge'
import BillList from './BillList'
import { startGetSingleBill, startGetAllBills } from '../../../actions/billingActions'
import { useDispatch, useSelector } from 'react-redux'
import Invoice from './Invoice'
import { Modal, Button } from 'react-bootstrap'
import ViewBillData from './ViewBillData'

const BillContainer = (props) => {
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()

    const bills = useSelector((state) => {
        return state.details.bills
    })

    const billData = useSelector((state) => {
        return state.details.singleBill
    })

    const cart = useSelector((state) => {
        return state.details.cart
    })
    useEffect(() => {
        dispatch(startGetAllBills())
    }, [])

    const handleToggle = (value) => {
        setToggle(value)
    }

    const handleInvoice = (id) => {
        setToggle(true)
        dispatch(startGetSingleBill(id))
    }
    const handleClose = () => {
        setToggle(false)
    }
    const handleShow = () => {
        setToggle(true)
    }

    return (
        <div className="col-md-12">
            <h1 className="col-md-1">Billing</h1>
            <BillForm className="col-md-12"/>
            <BillProduct className="col-md-12"/>
            {
                cart.length > 0 && (
                    <div className="col-md-12">
                        <Cart />
                        <BillMerge handleInvoice={handleInvoice}/>
                    </div>
                )
            }
            <hr />
            <div className="col-md-12">
                {
                    bills.length > 0 ? (
                        <BillList handleInvoice={handleInvoice} />
                    ) : (
                        <div>
                            No Bills Added
                        </div>
                    )
                }
                {
                    toggle && Object.keys(billData).length > 0 && (
                        <div>
                            <Modal show={toggle} onHide={handleClose} animation={false}>
                                {/* <Modal.Header closeButton>
                                <Modal.Title>Modal Heading</Modal.Title>
                            </Modal.Header> */}
                                <Modal.Body>
                                    {/* <Invoice handleToggle={handleToggle} className="container" /> */}
                                    <ViewBillData className="container" billData={billData}/>
                                </Modal.Body>
                             <Modal.Footer> 
                                    <Button className='btn btn-sm btn-primary'  onClick={handleClose}>Close</Button>
                                </Modal.Footer> 
                            </Modal>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default BillContainer