import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { View, Text } from 'react-native'
import firestore from '@react-native-firebase/firestore';

import TabBarCustomButton from '../components/TabBar/TabBarCustomButton'

const ChatScreen = ({navigation}) => {
    const [messages, setMessages] = useState([{
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
     const [arr, setarr] = useState([])

  
    useEffect(() => {
        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
            tabBarVisible: false,  
            tabBarButton: (props) => (
                       <TabBarCustomButton visible
                            {...props}
                        /> ),
      });
      firestore()
      .collection('userChat')
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.data())
          doc.data().messages.map((msg,index) =>{
            arr.push({
              _id: Math.random(),
              text: msg.message,
              createdAt: doc.data().createdAt,
              user: {
                _id: doc.data().user._id,
                name: doc.data().user.name,
                avatar: doc.data().user.avatar,
              },
            })
            
          })
       
            
      });
       setMessages(data =>{return [...arr, ...data];})
       
      });
   
      return () =>
      parent.setOptions({
           tabBarVisible: true,
           tabBarButton: (props) => (
                    <TabBarCustomButton 
                        {...props}
                    />),
       });
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      messages[0].user.name = 'user12'
      firestore()
      .collection('userChat')
      .doc(messages[0].user.name)
      .update({
        messages: firestore.FieldValue.arrayUnion({"type":1,"message":messages[0].text})
      })
      .then(() => {
        console.log('added'); 
      });
    
    
    }, [])
  
    return (
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
}

export default ChatScreen
