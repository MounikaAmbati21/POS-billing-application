import React from 'react'
import billing from './billing.png'
import './home.css'

const Home = () => {
    return (
        <div>
            <div className="carousel-fluid">
                <img src={billing} alt="billing img" width={"90%"} />
                <div class="top-left">
                    <h1>Welcome to POS Billing Application</h1>
                    <h6> Professional billing and invoicing software</h6>
                </div>
                <div class="top-right">
                        <div className="card-body">
                            <h5 className="card-title">Dummy credentials for testing</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Email : mouni@gmail.com</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Password : secret123</h6>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Home