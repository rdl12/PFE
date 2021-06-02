import './../../../assets/scss/style.scss';
import React ,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { modifier_Password } from '../../../store/actions';

function ModifyPassword({navigation}){


    const [ancpassword, setancpassword] = useState('');
    const [nouvpassword, setnouvpassword] = useState('');
    const [success, setsucess] = useState(false) 
    const dispatch = useDispatch()
    let userEmail = localStorage.getItem('username');

    

   

    const submit = () => {
        dispatch(modifier_Password(nouvpassword,ancpassword,userEmail,navigation))
        
        //this.props.history.push("/auth/signin-1");
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
                                <h3 className="mb-4">Changer mot de passe</h3>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" placeholder="Ancien mot de passe" value = {ancpassword} onChange={e => setancpassword(e.target.value)}/>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="password" className="form-control" placeholder="nouveau mot de passe" value = {nouvpassword} onChange={e => setnouvpassword(e.target.value)}/>
                                </div>
                                <button className="btn btn-primary shadow-2 mb-4" onClick={submit}>Changer</button>
                                <p className="mb-0 text-muted">Vous avez déjà un compte? <NavLink to="/auth/signin-1">Login</NavLink></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }

export default ModifyPassword
