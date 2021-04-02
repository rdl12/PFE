import React from 'react';
import {Row, Col, Card} from 'react-bootstrap';
import { connect } from 'react-redux';

import Aux from "../../../hoc/_Aux/index";
import LineChart from "./LineChart";
import BarDiscreteChart from "./BarDiscreteChart";
import MultiBarChart from "./MultiBarChart";
import PieBasicChart from "./PieBasicChart";
import PieDonutChart from "./PieDonutChart";
import {Fetch_stats_etat} from "../../../store/actions";


class Nvd3Chart extends React.Component {

    state = {
         data:[]
    }

    componentDidMount(){
      this.props.Fetch_stats_etat();
 
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.Stats !== this.props.Stats) {
            this.setState({                  //update the state after checking
                data: this.props.Stats
             }); 
        console.log(this.state.data)
        }
        

        // this.setState({
        //     data:this.props.data
        // })
    }

    render() {
        return (
            <Aux>
                <Row>
                 
                    <Col sm={12}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Stacked/Grouped Multi-Bar Chart</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <MultiBarChart/>
                            </Card.Body>
                        </Card>
                    </Col>
                   
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Donut Chart</Card.Title>
                            </Card.Header>
                            <Card.Body className="text-center">
                                <PieDonutChart data = {this.state.data} />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}


const mapStateToProps = (state) => {
    const { stat_etat_defib } = state
    
    return { Stats: stat_etat_defib  }
  }

const mapDispatchToProps = dispatch => {
    return {
        Fetch_stats_etat: () => dispatch(Fetch_stats_etat()),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Nvd3Chart);