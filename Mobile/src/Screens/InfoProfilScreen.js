import React,{useState,useEffect,} from 'react'
import { View, Text,SafeAreaView, StyleSheet, } from 'react-native'
import { Avatar, Button, Card, Title, Paragraph, ActivityIndicator,IconButton,List} from 'react-native-paper';
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux';
import {Fetch_User} from '../redux/actions'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {images,COLORS} from '../Constantes'
import { windowHeight, windowWidth } from '../utils/Dimentions';


const InfoProfilScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.Fetch_User)
    const LoginInfo = useSelector(state => state.loginReducer);

    useEffect(() => {
        dispatch(Fetch_User(LoginInfo.userId))
        console.log(user)
        
        }, [LoginInfo.userId])

    return (
        <SafeAreaView style = {{backgroundColor:Colors.white,flex : 1}}>
          {user === undefined ? (
             <ActivityIndicator size="large" animating = {true}  style = {{flex : 1,justifyContent:'center' ,alignItems:'center'}} />
          ):(
            <Card style={styles.card}>
              <Card.Cover source={{ uri: 'https://newevolutiondesigns.com/images/freebies/blue-facebook-cover-24.jpg' }} style={styles.cover} />
              <Card.Title Title title={user.user.firstName + " " + user.user.lastName} titleStyle={styles.title} style={styles.cardTitle} />
              <Card.Content>
                  <List.Item
                     title="Nom"
                     description={user.user.firstName}
                     left={props => <List.Icon {...props} icon={images.login_avatar} />}
                     style={styles.list}
                  />
                  <List.Item
                     title="Prenom"
                     description={user.user.lastName}
                     left={props => <List.Icon {...props} icon={images.user_icon} />}
                     style={styles.list}
                  />
                  <List.Item
                     title="Email"
                     description={user.user.email}
                     left={props => <List.Icon {...props} icon={images.list_icon} />}
                     style={styles.list}
                  />
                  <List.Item
                     title="Telephone"
                     description={user.user.email}
                     left={props => <List.Icon {...props} icon={images.phone_icon} />}
                     style={styles.list}
                  />
                     <List.Item
                     title="Modifier mot de passe"
                     left={props => <List.Icon {...props} icon={images.edit_icon} />}
                     style={styles.list}
                     onPress = {() => navigation.navigate('ModifierPassword') }
                  />
             </Card.Content>
           </Card>

          )}
         </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    card :{
       width : windowWidth,
       height : windowHeight,
         shadowColor: "#000",
         shadowOffset: {
           width: 0,
           height: 7,
         },
         shadowOpacity: 0.43,
         shadowRadius: 9.51,
         
         elevation: 3,
       // margin:25,
        
       // marginTop:50
      },
    
    title : {color:COLORS.white, fontSize:30, fontFamily: "Cochin", },
    
    cardTitle  :{position:"absolute", margin:120},
    
    para : {marginTop:10},

    list : {shadowOpacity: 0.43, shadowRadius: 9.51, borderBottomWidth:0.5},

    cover : {height:windowHeight/2.74, justifyContent:'center'}
    
    
    })

export default InfoProfilScreen