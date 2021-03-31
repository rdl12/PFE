import React from 'react';
import {Row, Col, Card, Table,Button,} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import { connect } from 'react-redux';
import {Fetch_Defib} from '../../store/actions'



class BootstrapTable extends React.Component {
     
     
    componentDidMount(){
        this.props.Fetch_Defib()
        console.log(this.props)
       
    }
  
    render() {
        const { 
             Defib,
          } = this.props;
         
        return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Defibrillateurs ajoutés</Card.Title>
                                <span className="d-block m-t-5">appuyer sur detail pour pouvoir valider ou rejetter un defibrillateur</span>
                            </Card.Header>
                            <Card.Body>
                                <Table striped responsive>
                                    <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Nom</th>
                                        <th>Date</th>
                                        <th>Ville</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                             {typeof Defib !== "undefined" &&  Defib.map(item => 
                              <tr key = {item.id}>
                              <th scope="row">{item.id}</th>
                              <td>{item.marque_defib}</td>
                              <td>{item.date}</td>
                              <td>{item.latitude}</td>
                              <td><a href={DEMO.BLANK_LINK} className="label theme-bg text-white f-12" ><NavLink to={`/sample-page/${item.id}`}>Details</NavLink></a></td>
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
        Fetch_Defib: () => dispatch(Fetch_Defib())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(BootstrapTable)