import './../../../assets/scss/style.scss';
import React ,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { Reset_Password } from '../../../store/actions';

function ResetPassword(){

    const [username, setUsername] = useState('');
    const [success, setsucess] = useState(false) 
    const dispatch = useDispatch()

    const submit = () => {
         dispatch(Reset_Password(username))
        
      }

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
                                    <i className="feather icon-user-plus auth-icon"/>
                                </div>
                                <h3 className="mb-4">Reset Password</h3>
                                <div className="input-group mb-3">
                                    <input type="email" className="form-control" placeholder="Email" value = {username} onChange={e => setUsername(e.target.value)}/>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={submit}>Réinitialiser</button>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }

export default ResetPassword
