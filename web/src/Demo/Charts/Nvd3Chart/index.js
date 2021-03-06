import React from 'react';
import {Row, Col, Card,Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';


import Aux from "../../../hoc/_Aux/index";
import LineChart from "./LineChart";
import BarDiscreteChart from "./BarDiscreteChart";
import MultiBarChart from "./MultiBarChart";
import PieBasicChart from "./PieBasicChart";
import PieDonutChart from "./PieDonutChart";
import {Fetch_stats_etat, Fetch_stats_prov} from "../../../store/actions";


class Nvd3Chart extends React.Component {
    state = {
        data:[]
    }

    componentDidMount(){
      this.props.Fetch_stats_etat();
      this.props.Fetch_stats_prov();
     
 
    }

   

    render() {
        return (
            <Aux>
                <Row>
                    <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Nombre de defibrillateur par ville</Card.Title>
                            </Card.Header >
                            <Card.Body className="text-center">
                                <BarDiscreteChart data = {this.props.Stats_Prov}/>
                            </Card.Body>
                        </Card>
                    </Col>
                   
                    <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Nombre de defibrillateurs par statut</Card.Title>
                            </Card.Header>
                         
                                <Card.Body className="text-center">
                                    <PieDonutChart data = {this.props.Stats} />
                                    
                                 
                                </Card.Body>
                          
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}


const mapStateToProps = (state) => {
    const { stat_etat_defib, stat_prov_defib } = state
    
    return { Stats: stat_etat_defib , Stats_Prov:stat_prov_defib  }
  }

const mapDispatchToProps = dispatch => {
    return {
        Fetch_stats_etat: () => dispatch(Fetch_stats_etat()),
        Fetch_stats_prov: () => dispatch(Fetch_stats_prov()),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Nvd3Chart);