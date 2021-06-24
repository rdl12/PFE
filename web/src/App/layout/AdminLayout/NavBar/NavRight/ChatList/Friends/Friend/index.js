import React from 'react';

import Aux from "../../../../../../../../hoc/_Aux";
import DEMO from "../../../../../../../../store/constant";
import avatar2 from '../../../../../../../../assets/images/user/avatar-2.jpg';
const images = require.context('../../../../../../../../assets/images/user', true);

const friend = (props) => {
    
    
    let timeClass = ['d-block'];
    if (props.data.status) {
        timeClass = [...timeClass, 'text-c-green'];
    } else {
        timeClass = [...timeClass, 'text-muted'];
    }
    
    function secondsToDhms(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600*24));
        var h = Math.floor(seconds % (3600*24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);
        
        var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
        }

    let time = '';
    if (props.data.createdAt.seconds) {
       let minutes =  props.data.createdAt.seconds/(3600*24)
        //time = <small className={timeClass.join(' ')}>{minutes} ago</small>;
        time = props.data.createdAt.toDate()
        const date = new Date(time);
        console.log(date)
        const currentDate = new Date();
        console.log("-------------------")
        console.log(currentDate)
        const diffTime = Math.abs(date - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        const diffMinutes = Math.ceil(diffTime / (1000 * 60 )); 
        const diffHoures = Math.ceil(diffTime / (1000 * 60 * 60 )); 
        const diffSeconds = Math.ceil(diffTime / 1000); 
        time = (diffDays - 1).toString() + " jours"
       if(diffDays - 1  === 0){
           time = (diffHoures).toString() + " Heures"
           if(diffHoures - 1 === 0){
               time = (diffMinutes).toString() + " Minutes"
               if(diffMinutes - 1 === 0){
                time = diffSeconds.toString() + "Secondes"
                
               }
           }
       }
       

    }

    let newFriend = '';
    if (props.data.new) {
        newFriend = <div className="live-status">{props.data.new}</div>;
    }

    return (
        <Aux>
            <div className={props.activeId === props.data._id ? 'media userlist-box ripple active' : 'media userlist-box ripple'} onClick={props.clicked}>
                <a className="media-left" href={DEMO.BLANK_LINK}>
                    {props.photo? (<img className="media-object img-radius" src={props.data.avatar} />)
                    :
                    (<img className="media-object img-radius" src={avatar2}  />)}     
                </a>
                <div className="media-body">
                    <h6 className="chat-header">{props.data.user.name}</h6>
                    <h6 style={{fontStyle:'italic',marginTop:'7px'}}> il y a {time}</h6>
                </div>
            </div>
        </Aux>
    );
};

export default friend;