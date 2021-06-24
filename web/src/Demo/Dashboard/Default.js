import React from 'react';
import {Row, Col, Card, Table, Tabs, Tab} from 'react-bootstrap';
import {connect} from 'react-redux';

import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import {Fetch_stats_etat, Fetch_stats_prov,Fetch_stats_formation} from "../../store/actions";

import avatar1 from '../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../assets/images/user/avatar-3.jpg';

class Dashboard extends React.Component {
    state = {
        somme:'',
    }
    componentDidMount(){
        this.props.Fetch_stats_etat();
        this.props.Fetch_stats_prov();
        this.props.Fetch_stats_formation();
       
        setTimeout(() => {
            const sumArray = (array) => {
                const newArray = [];
                array.forEach(sub => {newArray.push(sub[1])});
                return newArray;
             }
            const array1 = this.props.Stats_Prov.length != 0 && sumArray(this.props.Stats_Prov)
             const reducer = (accumulator, currentValue) => accumulator + currentValue;
             this.props.Stats_Prov.length != 0 && this.setState({
                 somme:array1.reduce(reducer)
             })

          }, 1000);
    }
    render() {
         let statSignale;
         let statTraitement;
         let statModifie;
        this.props.Stats.length != 0  && this.props.Stats.map(item=>{
           if(item[0] === 'en cours de traitement' ){statTraitement = item[1]}
           if(item[0] === 'modifié' ){statModifie = item[1]}
           if(item[0] === 'signalé' ){statSignale = item[1]}

        })

 
        
    return (
        <Aux>
             { this.props.Stats.length != 0  && this.props.Stats_Prov.length != 0 ? (   <Row>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>defibrillateurs recemment signalé</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                         {typeof statSignale !== "undefined"? (<h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-plus text-c-green f-30 m-r-5"/> {`${statSignale} defibrillateurs` } </h3>):
                        (<h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-plus text-c-green f-30 m-r-5"/> 0 defibrillateurs  </h3>)}
                                </div> 
                            </div>
                            <div className="progress m-t-30" style={{height: '7px'}}>
                                <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"/>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>defibrillateurs en cours de traitement</h6>
                            <div className="row d-flex align-items-center">
                            <div className="col-9">
                         {typeof statTraitement !== "undefined"? (<h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-plus text-c-green f-30 m-r-5"/> {`${statTraitement} defibrillateurs` } </h3>):
                        (<h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-plus text-c-green f-30 m-r-5"/> 0 defibrillateurs  </h3>)}
                                </div> 
                            </div>
                            <div className="progress m-t-30" style={{height: '7px'}}>
                                <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"/>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={4}>
                    <Card>
                        <Card.Body>
                            <h6 className='mb-4'>defibrillateurs modifiés</h6>
                            <div className="row d-flex align-items-center">
                            <div className="col-9">
                         {typeof statModifie !== "undefined"? (<h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-plus text-c-green f-30 m-r-5"/> {`${statModifie} defibrillateurs` } </h3>):
                        (<h3 className="f-w-300 d-flex align-items-center m-b-0"><i className="feather icon-plus text-c-green f-30 m-r-5"/> 0 defibrillateurs  </h3>)}
                                </div> 
                            </div>
                            <div className="progress m-t-30" style={{height: '7px'}}>
                                <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '100%'}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"/>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={8}>
                    <Card className='Recent-Users'>
                        <Card.Header>
                            <Card.Title as='h5'>Utilisateurs recemment inscrit</Card.Title>
                        </Card.Header>
                        <Card.Body className='px-0 py-2'>
                            <Table responsive hover>
                                <tbody>
                                <tr className="unread">
                                    <td><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></td>
                                    <td>
                                        <h6 className="mb-1">Soualy ali</h6>
                                        <p className="m-0">Casablablanca</p>
                                    </td>
                                    <td>
                                        <h6 className="text-muted"><i className="fa fa-circle text-c-red f-10 m-r-15"/>30 MAR 2021</h6>
                                    </td>
                                   
                                </tr>
                                <tr className="unread">
                                    <td><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></td>
                                    <td>
                                        <h6 className="mb-1">Rami Rachid</h6>
                                        <p className="m-0">CasaBlanca</p>
                                    </td>
                                    <td>
                                        <h6 className="text-muted"><i className="fa fa-circle text-c-green f-10 m-r-15"/>31 MAR 2021</h6>
                                    </td>
                                    
                                </tr>
                                
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={4}>
                    <Card className='card-event'>
                        <Card.Body>
                            <div className="row align-items-center justify-content-center">
                                <div className="col">
                                    <h5 className="m-0">formations à venir</h5>
                                </div>
                                <div className="col-auto">
                                    <label className="label theme-bg2 text-white f-14 f-w-400 float-right">34%</label>
                                </div>
                            </div>
                            <h2 className="mt-2 f-w-300">{this.props.nbr_inscrit}<sub className="text-muted f-14"> inscrits</sub></h2>
                            <h6 className="text-muted mt-3 mb-0">Voir</h6>
                            <i className="fa fa-angellist text-c-purple f-50"/>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Body className='border-bottom'>
                            <div className="row d-flex align-items-center">
                                <div className="col-auto">
                                    <i className="feather icon-zap f-30 text-c-green"/>
                                </div>
                                <div className="col">
                                    <h3 className="f-w-300">{this.state.somme}</h3>
                                    <span className="d-block text-uppercase">nombre de defib </span>
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Body>
                            <div className="row d-flex align-items-center">
                                <div className="col-auto">
                                    <i className="feather icon-map-pin f-30 text-c-blue"/>
                                </div>
                                <div className="col">
                                    <h3 className="f-w-300">{this.props.Stats_Prov.length} </h3>
                                    <span className="d-block text-uppercase">nombre de villes </span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
             
             
            </Row>) : null}
         
            </Aux>
        );
    }
}


const mapStateToProps = (state) => {
    const { stat_etat_defib, stat_prov_defib,nbr_inscrit_formation } = state
    return { Stats: stat_etat_defib , Stats_Prov:stat_prov_defib , nbr_inscrit : nbr_inscrit_formation  }
  }

const mapDispatchToProps = dispatch => {
    return {
        Fetch_stats_etat: () => dispatch(Fetch_stats_etat()),
        Fetch_stats_prov: () => dispatch(Fetch_stats_prov()),
        Fetch_stats_formation: () => dispatch(Fetch_stats_formation()),
    }
};

export default   connect(mapStateToProps, mapDispatchToProps)(Dashboard);