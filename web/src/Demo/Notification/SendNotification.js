import React ,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Row, Col, Card, Form, Button, Alert , FormControl, InputGroup, Dropdown,Tab,Tabs,Toast,Modal} from 'react-bootstrap';


import Aux from "../../hoc/_Aux";
import {send_Notification} from '../../store/actions'
import firebase from '../../firebase';



function Notification() {
    const [NotifBody, setNotifBody] = useState('')
    const [tokens , setTokens] = useState([])
    const [show,setShow] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        const ref = firebase.firestore().collection("tokens")
        ref.onSnapshot((querySnapShot) => {
            querySnapShot.forEach((doc) =>{
                tokens.push(doc.data().token)
            })
         
        })
    
     

    }, [])
     
    const submit = () =>{
       let notif = {
           tokens_arr:tokens,
           body:NotifBody
       }
       dispatch(send_Notification(notif))
       setShow(!show)
       setNotifBody("")

    }
    return (
        <Aux>
             { show ? (    <Alert  variant='info' onClose={() => setShow(false)} dismissible>
                Notification envoyé avec succès à tous les appareils
            </Alert>):null}
            <Row>
            <Col>
         <Card>
                    <Card.Header>
                        <Card.Title as="h5">Envoyer une Notification</Card.Title>
                        <span className="d-block m-t-8"></span>
                    </Card.Header>
                    <Card.Body>
                    <Form>
                        <Form.Group controlId="formBasicTelephone">
                        <Form.Label>Message de Notification</Form.Label>
                        <Form.Control as="textarea" placeholder="Message" value={NotifBody} onChange={e => setNotifBody(e.target.value)}/>
                        </Form.Group>
                        </Form>
                    
                      <Button variant="primary" onClick = {submit} style={{float : "right"}}>
                         Envoyer
                     </Button>
                    </Card.Body>
            </Card>
            </Col>
            </Row>
            
       
        </Aux>
    )
}

export default Notification
