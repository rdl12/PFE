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
            setMessages(data =>{return [doc.data(), ...data];})
            
      });
       
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
      messages[0].user.name = 'user'
      firestore()
      .collection('userChat')
      .add(messages[0])
      .then(() => {
        console.log(messages); 
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
