import React from 'react';
import {Row, Col, Card, Table,Badge,Dropdown,DropdownButton,Form,Pagination,Spinner} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import { connect } from 'react-redux';
import {Fetch_Defib,Fetch_Defib_Valide,Fetch_Defib_ByVille} from '../../store/actions'



class BootstrapTable extends React.Component {
     
    state = {
       etat:null,
       id:null,
       showBulle : false,
       ville:null,
       page:1,
       index:0,
       number_per_page:5

    };

    componentDidMount(){
        this.props.Fetch_Defib()
        console.log(this.props)
       
    }

    remove_filter = () =>{
        if(this.state.ville){
            this.props.Fetch_Defib_ByVille(this.state.ville)
            
        }
        else{
            this.props.Fetch_Defib()
        }
        this.setState({etat:null})

    }
    remove_filter_ville = () =>{
        if(this.state.etat){
            this.props.Fetch_Defib_Valide(this.state.id)
            
        }
        else{
            this.props.Fetch_Defib()
        }
        this.setState({ville:null})
      
    }

    PaginationHandler = (page) =>{
        console.log(page)
        this.setState({page:page,index:page*this.state.number_per_page-this.state.number_per_page})
    }
      
   
    render() {
        const { 
             Defib,
          } = this.props;
        
          let page_arr = Defib.filter(
            (defib) => defib.etat.etat === 'signalé' || defib.etat.etat === 'modifié' || defib.etat.etat === 'en cours de traitement' 
          );
          let defib_filtred  = page_arr.slice(this.state.index,this.state.index+this.state.number_per_page)
          let ville = [...new Set(page_arr.map(
            item => item.ville
        ))];
        let active = this.state.page;
        let activeItems = [];
        for (let number = 1; number <= Math.ceil(page_arr.length/this.state.number_per_page); number++) {
            activeItems.push(
                <Pagination.Item key={number} active={number === active} onClick = {() => this.PaginationHandler(number)}>
                    {number}
                </Pagination.Item>
            );
        }
        
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Defibrillateurs ajoutés</Card.Title>
                                
                                <DropdownButton
                                title='filtrer par etat'
                                variant='primary'
                                drop='left'
                                id={`dropdown-variants-primary`}
                                style = {{float:'right'}}
                            >

                                <Dropdown.Item  eventKey="1" onSelect = {(e) => {
                                    this.props.Fetch_Defib_Valide(e)
                                    this.setState({etat:'signalé',id:e})
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
                                    this.setState({etat:'en cours de traitement',id:e})
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
                                    this.setState({etat:'modifié',id:e})
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
                            <DropdownButton
                                title='filtrer par ville'
                                variant='primary'
                                drop='left'
                                id={`dropdown-variants-primary`}
                                style = {{float:'right'}}
                            >
                  {typeof ville !== "undefined" &&  ville.map((item,index) => 
                   <Dropdown.Item key= {index} eventKey={index}  onSelect = {(e) => {
                   this.props.Fetch_Defib_ByVille(ville[e])
                   this.setState({ville:ville[e]})
                }} > 
                            <Form.Check
                                     custom
                                     type="radio"
                                     label={item}
                                     value = {item}
                                     name="supportedRadios"
                                     id="supportedRadio3"
                                     checked = {this.state.ville === ville[index]}
                                    
                                 /></Dropdown.Item>)
                             }
                        <Dropdown.Divider />
                            </DropdownButton>
                            <span className="d-block mt-0">appuyer sur detail pour pouvoir valider ou rejetter un defibrillateur</span>

                            </Card.Header>
                       {defib_filtred.length === 0 ?(<Spinner animation="border" variant="primary" style={{margin:20, alignSelf:'center'}}/>):
                            (<Card.Body>
                                {this.state.etat !== null ? (<Badge variant="light" className="mb-1 f-20 p-3" style={{borderRadius:20}}>{this.state.etat}<i className="feather icon-x text-c-black f-20 ml-3" onClick={this.remove_filter}/></Badge>): null }
                                {this.state.ville !== null ? (<Badge variant="light" className="mb-1 f-20 p-3" style={{borderRadius:20}}>{this.state.ville}<i className="feather icon-x text-c-black f-20 ml-3" onClick={this.remove_filter_ville}/></Badge>): null }
                            
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
                             {defib_filtred.map(item => 
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
                                    <hr/>
                                <Row>
                                     <Col  sm={10}>
                                        <Pagination  >
                                            <Pagination.First />
                                                <Pagination.Prev />
                                                    {activeItems}
                                                <Pagination.Next />
                                            <Pagination.Last />
                                        </Pagination>
                                        </Col>
                                    <Col  sm={2} >
                                        <Form.Control as="select"  onChange = {(e) =>{this.setState({number_per_page:e.target.value})}} >
                                        <option  key={'choisir'} value='choisissez le nombre d element par page'> {this.state.number_per_page}  </option>
                                        <option  key={1} value={5}> 5 </option>
                                        <option  key={2} value={10}> 10 </option>
                                        <option  key={3} value={20}> 20 </option>
                                        <option  key={4} value={30}> 30 </option>
                                    </Form.Control>
                                    </Col>
                               </Row>
            
                            </Card.Body>)}
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
        Fetch_Defib_ByVille : (state) => dispatch(Fetch_Defib_ByVille(state)),
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(BootstrapTable)