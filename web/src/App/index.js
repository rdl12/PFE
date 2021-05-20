import React, { Component, Suspense } from 'react';
import {connect} from 'react-redux'
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";
import firebase from '../firebase'
import { Fetch_Subscribed_people,Send_Notif } from '../store/actions';
import 'firebase/messaging';


const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

class App extends Component {
    componentDidMount(){
    const messaging = firebase.messaging()
    messaging.getToken({vapidKey: "BA9z8X5UkHmlGtvL7aA9idguQhwn3XNXPWeSUm3Bfb-Gtm3IQ0tmhsFVreoDTgP4sYJEp6kT84CP0mhyC25TLro"})
    .then((currentToken) => {
     if (currentToken) {
      const ref = firebase.firestore().collection("NotifLauncher")
      ref.onSnapshot((querySnapShot) => {
          querySnapShot.forEach((doc) =>{
            this.props.Fetch_Subscribed_people()
            setTimeout(() => {
              let sub_filtered = typeof this.props.subs !== "undefined" && this.props.subs.filter(
                (sub) => sub.etat === 'non traiter' 
              );
              console.log(sub_filtered)
              this.props.Send_Notif(currentToken,sub_filtered)
            }, 1000);
           
           
          })
      })
     } else {
       console.log('No registration token available. Request permission to generate one.');
     }
   }).catch((err) => {
     console.log('An error occurred while retrieving token. ', err);
     // catch error while creating client token
   })
  
  
    }
    render() {
     
     
        const menu = routes.map((route, index) => {
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
    Send_Notif: (token,sub) => dispatch(Send_Notif(token,sub))
   
  }
};


export default  connect(mapStateToProps,mapDispatchToProps)(App);
