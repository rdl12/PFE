import React, { Component, Suspense } from 'react';
import {connect} from 'react-redux'
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";
import route from "../route"
import firebase from '../firebase'
import { Fetch_Subscribed_people,Send_Notif,Fetch_Produits,Fetch_Product_Categories } from '../store/actions';
import 'firebase/messaging';


const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});
const Signin1 = React.lazy(() => import('../Demo/Authentication/SignIn/SignIn1'));
class App extends Component {
    componentDidMount(){
    // const messaging = firebase.messaging()
    // messaging.getToken({vapidKey: "BA9z8X5UkHmlGtvL7aA9idguQhwn3XNXPWeSUm3Bfb-Gtm3IQ0tmhsFVreoDTgP4sYJEp6kT84CP0mhyC25TLro"})
    // .then((currentToken) => {
   //  if (currentToken) {
      const ref = firebase.firestore().collection("NotifLauncher")
    
      ref.onSnapshot((querySnapShot) => {
          querySnapShot.forEach((doc) =>{
            this.props.Fetch_Subscribed_people()
            this.props.Fetch_Produits()
            this.props.Fetch_Product_Categories()
            setTimeout(() => {
              let sub_filtered =  this.props.subs.filter(
                (sub) => sub.etat === 'non traiter' 
              );
              this.props.Send_Notif(sub_filtered)
            }, 1000);
           
           
          })
      })
     } 

    render() {
     
      let menu;
      if(localStorage.getItem('username') !== null){
         menu = routes.map((route, index) => {
             return (route.component) ? (
                 <Route
                     key={index}
                     path={route.path}
                     exact={route.exact}
                     name={route.name}
                     render={props => (
                         <route.component {...props} />
                     )} />
             ) : (null);
         });
      }else{
        menu = route.map((route, index) => {
          return (route.component) ? (
              <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                      <route.component {...props} />
                  )} />
          ) : (null);
      });
      }
  

        return (
            <Aux>
                <ScrollToTop>
                    <Suspense fallback={<Loader/>}>
                        <Switch>
                          {menu}
                         <Route path="/" component={AdminLayout} />
                        </Switch>
                    </Suspense>
                </ScrollToTop>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
  const { personnes_inscrites} = state
  
  return { subs :personnes_inscrites   }
}

const mapDispatchToProps = (dispatch) => {

  return {
    Fetch_Subscribed_people: () => dispatch(Fetch_Subscribed_people()),
    Fetch_Produits: () => dispatch(Fetch_Produits()),
    Fetch_Product_Categories: () => dispatch(Fetch_Product_Categories()),
    Send_Notif: (sub) => dispatch(Send_Notif(sub))
   
  }
};


export default  connect(mapStateToProps,mapDispatchToProps)(App);
