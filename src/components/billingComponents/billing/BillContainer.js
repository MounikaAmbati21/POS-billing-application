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
        <div>
            <h1>Billing</h1>
            <BillForm />
            <BillProduct />
            {
                cart.length > 0 && (
                    <div>
                        <Cart />
                        <BillMerge handleInvoice={handleInvoice}/>
                    </div>
                )
            }
            <hr />
            <div>
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
                                    <Invoice handleToggle={handleToggle} className="container" />
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