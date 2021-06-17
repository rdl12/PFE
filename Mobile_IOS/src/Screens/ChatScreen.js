import React, { useState, useCallback, useEffect } from 'react'
import {useSelector} from 'react-redux'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {FONTS, COLORS, SIZES, images} from '../Constantes'

import TabBarCustomButton from '../components/TabBar/TabBarCustomButton'

const ChatScreen = ({navigation}) => {
  let arr = []
  const LoginInfo = useSelector(state => state.loginReducer);
    const [Messages, setMessages] = useState([{
        _id: 1,
        text: 'Boujour nous sommes HIMAYA.ma, et nous somme la pour repondre a vos questions',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: images.himaya_logo,
        },
      },
    ]);

  
    useEffect(() => {
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: false,  
            tabBarButton: (props) => (
                       <TabBarCustomButton visible
                            {...props}
                        /> ),
      });
     const unsbscribe =  firestore()
     .collection('userChat')
     .where('user.name', '==', LoginInfo.userId)
     .onSnapshot(querySnapshot => {
       querySnapshot.forEach(doc => {
        arr.length = 0
         doc.data().messages.map((msg,index) =>{
           arr.push({
             _id: Math.random(),
             text: msg.message,
             createdAt: msg.date.toDate(),
             user: {
               _id:  msg.type,
               name: doc.data().user.name,
               avatar: images.himaya_logo,
             },
           })
           
         })
     });
     let send = arr.reverse() //reversed data from firebase
     setMessages([{
      _id: 1,
      text: 'Boujour nous sommes HIMAYA.ma, et nous somme la pour repondre a vos questions',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: images.himaya_logo,
      },
    },
  ])
     setMessages(data =>{return [...send, ...data];})
     });

      return () =>{
        unsbscribe
        parent.setOptions({
          tabBarVisible: true,
          tabBarButton: (props) => (
                   <TabBarCustomButton 
                       {...props}
                   />),
      });
      }
     
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      messages[0].user.name = LoginInfo.userId
       firestore()
      .collection('userChat')
      .doc(messages[0].user.name)
      .get()
      .then((docData) => {
        if (docData.exists) {
          firestore()
          .collection('userChat')
          .doc(messages[0].user.name)
          .update({
            messages: firestore.FieldValue.arrayUnion({"type":1,"message":messages[0].text, "date":new Date()}) 
          })
          .then(() => {
            console.log('added'); 
          });
        
        } else {
          firestore()
          .collection('userChat')
          .doc(messages[0].user.name)
          .set({
            _id: messages[0]._id,
            createdAt: new Date(),
            messages:[{
              date :new Date() ,
              message:messages[0].text,
              type:1
            }],
            user:{
              _id:1,
              avatar:'',
              name:messages[0].user.name
            }
          })
        }
      }).catch((fail) => {
        console.log(fail)
      });
    
    
    }, [])
  
    return (
      <GiftedChat
        messages={Messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
}

export default ChatScreen