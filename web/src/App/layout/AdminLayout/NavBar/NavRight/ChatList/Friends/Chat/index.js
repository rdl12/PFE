import React,{useState} from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar'

//import chatMsg from './chat';
import Messages from './Messages';
import Aux from "../../../../../../../../hoc/_Aux";
import DEMO from "../../../../../../../../store/constant";
import firebase from '../../../../../../../../firebase'

const Chat = (props) => {
    const [Message, setMessage] = useState('')
    const [test, settest] = useState(0)
    const [arr, setarr] = useState([])
    let chatClass = ['header-chat'];
    if (props.chatOpen && props.listOpen) {
        chatClass = [...chatClass, 'open'];
    }

   
const setmessage = (value) =>  
 { setMessage(value) }


const sendMessage = () => {
    
        var object = 
            {"user": {"name": "admin", "_id": 2, "avatar": ""}, 
            "createdAt": new Date(),
            "_id": "lkanfewnfao233",
            "text": "test ad"
            }
            settest(1)
            arr.push(object)
            return (
                arr.map((msg) =>{
                return <Messages key={msg._id } message={msg} name={props.user.user.name} photo={msg.avatar} />
                
            })
            );
                
    //     firebase.firestore()
    //     .collection('userChat')
    //     .add(object)
    //    .then(() => {
    //      console.log('added'); 
    //      });
    }
    let message = (
        <div className="media chat-messages text-center">
            <div className="media-body chat-menu-content">
                <div className="">
                    <p className="chat-cont">CHAT NOT FOUND</p>
                </div>
            </div>
        </div>
    );
   

    props.chatMsg.filter(chats => {
      
        if (chats.user.name === props.user.user.name) {
            arr.length = 0
            arr.push(chats)
            message = arr.map((msg) =>{
                return <Messages key={msg._id } message={msg} name={props.user.user.name} photo={msg.avatar} />
                
            })
              
     
         }

    
        return false;
    });

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
                        
                        {test === 1 ? (<div className="main-friend-chat">
                            {sendMessage()}
                        </div>):
                        (<div className="main-friend-chat">
                        {message}
                    </div>)}
                        
                    </PerfectScrollbar>
                </div>
            </div>
            <div className="h-list-footer">
                <div className="input-group">
                    <input type="file" className="chat-attach" style={{display: 'none'}} />
                    <a href={DEMO.BLANK_LINK} className="input-group-prepend btn btn-success btn-attach">
                        <i className="feather icon-paperclip" />
                    </a>
                    <input type="text" name="h-chat-text" className="form-control h-send-chat" placeholder="Write hear . . "  onChangeCapture={e =>  setmessage(e.target.value)}  />
                    <button type="submit" className="input-group-append btn-send btn btn-primary">
                        <i className="feather icon-message-circle" onClick = {() => sendMessage()}/>
                    </button>
                </div>
            </div>
        </div>
        </Aux>
    );
};

export default Chat;