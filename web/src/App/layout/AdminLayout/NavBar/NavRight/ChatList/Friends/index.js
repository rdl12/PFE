import React, {Component} from 'react';
import { connect } from 'react-redux';

//import friend from './friends';
import Friend from './Friend';
import Chat from './Chat';
import Aux from "../../../../../../../hoc/_Aux";
import {Fetch_user_chat} from "../../../../../../../store/actions"

class Friends extends Component {
    state = {
        chatOpen: false,
        user: [],
    };
    componentDidMount(){
        this.props.Fetch_user_chat()
        setTimeout(() => {
            console.log(this.props.freind)
        }, 100);

    }
    componentWillReceiveProps = (nextProps) => {
        if (!nextProps.listOpen) {
            this.setState({chatOpen: false, user: []});
        }
    };

    render() {
      
        return (
     <Aux>
            {typeof this.props.freind !== "undefined" &&  this.props.freind.map(f => {
            return <Friend key={f._id} data={f} activeId={this.state.user.id} clicked={() => this.setState({chatOpen: true, user: f})} />;
        })}

        {this.props.freind.length !=0 && this.state.user.length != 0 ? 
        ( <Chat 
            chatMsg = {this.props.freind}
            user={this.state.user} 
            chatOpen={this.state.chatOpen} 
            listOpen={this.props.listOpen} 
            closed={() => this.setState({chatOpen: false, user: []})}/>)
        :null}
     </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    const { user_chat } = state
    return { freind: user_chat  }
  }

 const mapDispatchToProps = (dispatch) => {

    return {
        Fetch_user_chat: () => dispatch(Fetch_user_chat()),
        
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(Friends);
