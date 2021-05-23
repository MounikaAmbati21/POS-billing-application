import React from 'react'
import {Link , Route, withRouter} from 'react-router-dom'
import Home from './Home'
import UserRegister from './UserRegister'
import Login from './Login'
import Dashboard from '../billingComponents/Dashboard'
import CustomersContainer from '../billingComponents/customers/CustomersContainer'
import ProductsContainer from '../billingComponents/products/ProductsContainer'
import BillContainer from '../billingComponents/billing/BillContainer'
import UserAccount from '../billingComponents/UserAccount'



const Navbar = (props)=>{
    const {userLoggedIn, userAuth} = props

    return (
        <div>
            {
                userLoggedIn ? (
                    <div>
                        <Link to="/dashboard">Dashboard</Link> |
                        <Link to="/customers">Customers</Link> |
                        <Link to="/products">Products</Link> |
                        <Link to="/bills">Billing</Link> |
                        <Link to="/profile">Profile</Link>
                        <Link onClick={()=>{
                            const confirm = window.confirm('are you sure?')
                            if(confirm){
                            localStorage.removeItem('token')
                            userAuth()
                            props.history.push('/')
                            }
                            }
                        }>Logout</Link>
                    </div>
                ) : (
                    <div>
                    <Link to="/">Home</Link> |
                    <Link to="/register">Register</Link> |
                    <Link to="/login">Login</Link>
                    </div>
                )
            }

            <Route path='/' component={Home} exact={true}/>
            <Route path='/register' component={UserRegister} exact={true}/>
            <Route path='/login' render={(props)=> <Login 
                                                        {...props}
                                                        userAuth={userAuth} />
                } exact={true}/>
            <Route path='/dashboard' component={Dashboard} exact={true}/>
            <Route path='/customers' component={CustomersContainer} exact={true}/>
            <Route path='/products' component={ProductsContainer} exact={true}/>
            <Route path='/bills' component={BillContainer} exact={true}/>
            <Route path="/profile" component={UserAccount} exact={true} />
        </div>
    )
}
export default withRouter(Navbar)