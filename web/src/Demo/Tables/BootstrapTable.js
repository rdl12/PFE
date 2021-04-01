import React from 'react';
import {Row, Col, Card, Table,Badge,Dropdown,DropdownButton,Form} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import { connect } from 'react-redux';
import {Fetch_Defib,Fetch_Defib_Valide} from '../../store/actions'



class BootstrapTable extends React.Component {
     
    state = {
       etat:null,
       showBulle : false

    };

    componentDidMount(){
        this.props.Fetch_Defib()
        console.log(this.props)
       
    }

    remove_filter = () =>{
        this.props.Fetch_Defib()
        this.setState({etat:null})
    }
      
   
    render() {
        const { 
             Defib,
          } = this.props;
        
          let defib_filtred = Defib.filter(
            (defib) => defib.etat.etat === 'signalé' || defib.etat.etat === 'modifié' || defib.etat.etat === 'en cours de traitement' 
          );
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Defibrillateurs ajoutés</Card.Title>
                                
                                <DropdownButton
                                title='filter'
                                variant='primary'
                                drop='left'
                                id={`dropdown-variants-primary`}
                                style = {{float:'right'}}
                            >

                                <Dropdown.Item  eventKey="1" onSelect = {(e) => {
                                    this.props.Fetch_Defib_Valide(e)
                                    this.setState({etat:'signalé'})
                                }} > 
                                <Form.Check
                                     custom
                                     type="radio"
                                     label="Signalé"
                                     value = 'Signalé'
                                     name="supportedRadios"
                                     id="supportedRadio3"
                                     checked = {this.state.etat === 'signalé'}
                                     onChange={e => this.setState({etat:e.target.value})}
                                 /></Dropdown.Item>
                                <Dropdown.Item eventKey="5" onSelect = {(e) => {
                                    this.props.Fetch_Defib_Valide(e)
                                    this.setState({etat:'en cours de traitement'})
                                }} >   <Form.Check
                                     custom
                                     type="radio"
                                     label="En cours de traitement"
                                     value = "En cours de traitement"
                                     name="supportedRadios"
                                     id="supportedRadio3"
                                     checked = {this.state.etat === 'en cours de traitement'}
                                    
                                 /></Dropdown.Item>
                                <Dropdown.Item eventKey="4" onSelect = {(e) => {
                                    this.props.Fetch_Defib_Valide(e)
                                    this.setState({etat:'modifié'})
                                }} > <Form.Check
                                     custom
                                     type="radio"
                                     label="Modifié"
                                     value = "Modifié"
                                     name="supportedRadios"
                                     checked = {this.state.etat === 'modifié'}
                                     id="supportedRadio3"
                                    
                                 /></Dropdown.Item>
                                <Dropdown.Divider />
                            </DropdownButton>
                            <span className="d-block mt-0">appuyer sur detail pour pouvoir valider ou rejetter un defibrillateur</span>

                            </Card.Header>
                            <Card.Body>
                                {this.state.etat !== null ? (<Badge variant="light" className="mb-1 f-20 p-3" style={{borderRadius:20}}>{this.state.etat}<i className="feather icon-x text-c-black f-20 ml-3" onClick={this.remove_filter}/></Badge>): null }
                                <Table striped responsive>
                                    <thead>
                                    <tr>
                                        
                                        <th>Nom</th>
                                        <th>Date</th>
                                        <th>etat</th>
                                        <th>Ville</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                             {typeof defib_filtred !== "undefined" &&  defib_filtred.map(item => 
                              <tr key = {item.id}>
                              <td>{item.nom}</td>
                              <td>{item.date}</td>
                              <td className="f-16">{item.etat.etat}</td>
                              <td>{item.ville}</td>
                              <td><NavLink to={`/sample-page/${item.id}`}>Details</NavLink></td>
                          </tr>)
                             }
                                  
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}



const mapStateToProps = (state) => {
    const { defib } = state
    return { Defib: defib  }
  }

 const mapDispatchToProps = (dispatch) => {

    return {
        Fetch_Defib: () => dispatch(Fetch_Defib()),
        Fetch_Defib_Valide: (state) => dispatch(Fetch_Defib_Valide(state)),
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(BootstrapTable)