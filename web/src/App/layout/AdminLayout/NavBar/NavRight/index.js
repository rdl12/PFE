import React, { Component } from 'react';
import {Dropdown,Badge} from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import {Link} from 'react-router-dom';
import ChatList from './ChatList';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";


import Avatar1 from '../../../../../assets/images/user/avatar-2.jpg';
import Avatar3 from '../../../../../assets/images/user/avatar-3.jpg';

class NavRight extends Component {
    state = {
        listOpen: false,
        user:''
    };

    componentDidMount() {

        setTimeout(() => {
            let username = localStorage.getItem('username');
            if (username !== null){
                this.setState({ user:username.substring(0,10) });
            }
        }, 50);
       
     
     
      }

    logout = () => {
      
       localStorage.clear()
       this.props.history.push("/auth/signin-1");
       
    }

    check = () => {

    }

    list = this.props.Notifs.filter((item) => item.etat === "non traiter")

    render() {
      
        return (
           
            <Aux>
                <ul className="navbar-nav ml-auto">
                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout}>
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                            <Badge variant="danger" className="ml-5">{this.props.Notifs.filter((item) => item.etat === "non traiter").length}</Badge>
                            <i className="icon feather icon-bell"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="notification overflow-auto" style={{height: 300}}>
                                <div className="noti-head">
                                    <h6 className="d-inline-block m-b-0">Notifications</h6>
                                    <div className="float-right">
                                        <a href={DEMO.BLANK_LINK} >clear all</a>
                                    </div>
                                </div>
                                
                                <ul className="noti-body">
                                <li className="n-title">
                                        <p className="m-b-0">NEW</p>
                                    </li>
                                {typeof this.props.Notifs !== "undefined" &&
                                 this.props.Notifs.filter((item) => item.etat === "non traiter").map((item,index) => 
                                 
                                    <li className="notification" key = {index} style={{cursor:'pointer'}}>
                                        <Link to={`/Formation/Detail/${item.formation.id}`}>
                                        <div className="media">
                                            <img className="img-radius" src={Avatar1} alt="Generic placeholder"/>
                                            <div className="media-body">
                                                <p><strong>{item.user.firstName} {item.user.lastName}</strong><span className="n-time text-muted"><i
                                                    className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                                <p>Inscrit dans la {item.formation.nom}</p>
                                            </div>
                                        </div>
                                        </Link>
                                    </li>
                                 )}
                                   
                                    <li className="n-title">
                                        <p className="m-b-0">EARLIER</p>
                                    </li>
                                    {/* <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src={Avatar2} alt="Generic placeholder"/>
                                            <div className="media-body">
                                                <p><strong>Joseph William</strong><span className="n-time text-muted"><i
                                                    className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                                <p>Prchace New Theme and make payment</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="notification">
                                        <div className="media">
                                            <img className="img-radius" src={Avatar3} alt="Generic placeholder"/>
                                            <div className="media-body">
                                                <p><strong>Sara Soudein</strong><span className="n-time text-muted"><i
                                                    className="icon feather icon-clock m-r-10"/>30 min</span></p>
                                                <p>currently login</p>
                                            </div>
                                        </div>
                                    </li> */}
                                </ul>
                                <div className="noti-footer">
                                    <a href={DEMO.BLANK_LINK}>show all</a>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                    <li className={this.props.rtlLayout ? 'm-r-15' : 'm-l-15'}>
                        <a href={DEMO.BLANK_LINK} className="displayChatbox" onClick={() => {this.setState({listOpen: true});}}><i className="icon feather icon-mail"/></a>
                    </li>
                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-settings"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head">
                                    <img src={Avatar1} className="img-radius" alt="User Profile"/>
                                    <span>{this.state.user}</span>
                                    <a href={DEMO.BLANK_LINK} className="dud-logout" title="Logout" onClick = {() => this.logout()}>
                                        <i className="feather icon-log-out"/>
                                    </a>
                                </div>
                                <ul className="pro-body">
                                    <li><Link to={`/Profil/ModifyPassword`} className="dropdown-item"><i className="feather icon-user"/> modifier mot de passe</Link></li>
                                    <li><a href={DEMO.BLANK_LINK} className="dropdown-item" onClick={() => {this.setState({listOpen: true});}}><i className="feather icon-mail"/> My Messages</a></li>
                                    <li><Link to={`/Notification`} className="dropdown-item"><i className="feather icon-bell"/> Envoyer une Notification</Link></li>
                                    <li ><a href={DEMO.BLANK_LINK} className="dropdown-item"  onClick = {() => this.logout()}><i className="feather icon-unlock" /> Deconnexion</a></li>
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
                <ChatList listOpen={this.state.listOpen} closed={() => {this.setState({listOpen: false});}} />
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    const { userId,filtered } = state
    
    return { username: userId,  Notifs:filtered }
  }



export default  connect(mapStateToProps)(withRouter(NavRight));
