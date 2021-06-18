import React ,{useState,useEffect} from 'react';
import {NavLink,useHistory,Redirect} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { login,FectchDefb } from '../../../store/actions';

const Signin1 = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = () => {
        dispatch(login({'username': username, 'password': password },history))
    }

    useEffect(() => {
        setTimeout(() => {
            let username = localStorage.getItem('username');
            if (username !== null){
                history.push('/dashboard')
            }
        }, 50);
       
        
    }, [])
  
    
       return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">Login</h3>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email" value = {username} onChange={e => setUsername(e.target.value)}/>
                                </div>
                                <div className="input-group mb-4">
                                    <input type="password" className="form-control" placeholder="password" value = {password} onChange={ e => setPassword(e.target.value)}/>
                                </div>
                                <div className="form-group text-left">
                                    <div className="checkbox checkbox-fill d-inline">
                                        <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                            <label htmlFor="checkbox-fill-a1" className="cr"> Save credentials</label>
                                    </div>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick = {() => handleSubmit()} >Login</button>
                                <p className="mb-2 text-muted">Forgot password? <NavLink to="/auth/reset-password">Reset</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }


export default Signin1;