import React from 'react';

import Aux from "../../../../../../../../hoc/_Aux";
import DEMO from "../../../../../../../../store/constant";
const images = require.context('../../../../../../../../assets/images/user', true);

const friend = (props) => {
    console.log(props.data)
    
    let timeClass = ['d-block'];
    if (props.data.status) {
        timeClass = [...timeClass, 'text-c-green'];
    } else {
        timeClass = [...timeClass, 'text-muted'];
    }

    let time = '';
    if (props.data.createdAt.seconds) {
       let minutes =  props.data.createdAt.seconds/(3600*24)
        time = <small className={timeClass.join(' ')}>{minutes} ago</small>;
    }

    let newFriend = '';
    if (props.data.new) {
        newFriend = <div className="live-status">{props.data.new}</div>;
    }

    return (
        <Aux>
            <div className={props.activeId === props.data._id ? 'media userlist-box ripple active' : 'media userlist-box ripple'} onClick={props.clicked}>
                <a className="media-left" href={DEMO.BLANK_LINK}> <img className="media-object img-radius" src={props.data.avatar} /></a>
                <div className="media-body">
                    <h6 className="chat-header">{props.data.user.name}{time}</h6>
                </div>
            </div>
        </Aux>
    );
};

export default friend;