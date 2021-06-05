import React,{useState,useEffect} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useDispatch,useSelector } from 'react-redux';

//import chatMsg from './chat';
import Messages from './Messages';
import Aux from "../../../../../../../../hoc/_Aux";
import DEMO from "../../../../../../../../store/constant";
import firebase from '../../../../../../../../firebase'
import {Fetch_user_chat} from "../../../../../../../../store/actions"

const Chat = (props) => {
    const [Message, setMessage] = useState('')
    const dispatch = useDispatch()
    const [message, setmessage] = useState(  <div className="media chat-messages text-center">
                                                <div className="media-body chat-menu-content">
                                                <div className="">
                                                    <p className="chat-cont">CHAT NOT FOUND</p>
                                                </div>
                                            </div>
                                            </div>)
    const [arr, setarr] = useState([])
    const [done, setdone] = useState(false)

  
    let chatClass = ['header-chat'];
    if (props.chatOpen && props.listOpen) {
        chatClass = [...chatClass, 'open'];
    }

    function sendMessage (e){
        
        e.preventDefault();
        let object = 
            {"user": {"name": "admin", "_id": 2, "avatar": "https://www.himaya.ma/pub/media/logo/websites/1/Himaya_Logo.png"}, 
            "createdAt": new Date(),
            "_id": "lkanfewnfao233",
            "messages": [{"type":2,"message":Message,"date":new Date()}]
            }
          
             arr.push(object.messages[0])
             setmessage(arr.map((msg,index) =>{
                return <Messages key={index} message={msg} name={props.user.user.name} photo={props.user.avatar} />
            }))
        setdone(true)
       
        firebase.firestore()
        .collection('userChat')
        .doc(props.user.user.name)
        .update({
            messages: firebase.firestore.FieldValue.arrayUnion(object.messages[0])
          })
       .then(() => {
         console.log('added'); 
         });

         setMessage("")
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          sendMessage(event)
          setMessage("")
        }
      }
  
   useEffect(() => {
     filter()
    // dispatch(Fetch_user_chat())
   }, [])

   const filter = () =>{
    setdone(true)
    props.chatMsg.filter((chats,index) => {
        if (chats.user.name === props.user.user.name) {
           setmessage( chats.messages.map((msg,index) =>{
                arr.push(chats.messages[index])
                return <Messages key={index } message={msg} name={props.user.user.name} photo={props.user.avatar} />
            }))
        
         }
       
        return false;
    });
   }
   

    return (
        <Aux>
        <div className={chatClass.join(' ')}>
            <div className="h-list-header">
                <h6>{props.user.user.name}</h6>
                <a href={DEMO.BLANK_LINK} className="h-back-user-list" onClick={props.closed}><i className="feather icon-chevron-left" /></a>
            </div>
            <div className="h-list-body">
                <div className="main-chat-cont">
                    <PerfectScrollbar>
                        
                    <div className="main-friend-chat">
                        {done? message :null}
                    </div>
                        
                    </PerfectScrollbar>
                </div>
            </div>
            <div className="h-list-footer">
                <div className="input-group">
                    <input type="file" className="chat-attach" style={{display: 'none'}} />
                    <a href={DEMO.BLANK_LINK} className="input-group-prepend btn btn-success btn-attach">
                        <i className="feather icon-paperclip" />
                    </a>
                    <input type="text" name="h-chat-text" className="form-control h-send-chat" placeholder="Write hear . . " value={Message}  onChange ={e =>  setMessage(e.target.value)}  onKeyPress={handleKeyPress}/>
                    <button type="submit" className="input-group-append btn-send btn btn-primary">
                        <i className="feather icon-message-circle" onClick = {(e)=>sendMessage(e)}/>
                    </button>
                </div>
            </div>
        </div>
        </Aux>
    );
};

export default Chat;