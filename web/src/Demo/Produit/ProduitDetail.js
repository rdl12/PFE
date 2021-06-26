import React ,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Row, Col, Card, Form, Button, Image , FormControl, DropdownButton, Dropdown,Table,Tab,Tabs} from 'react-bootstrap';
import {
    useParams
  } from "react-router-dom";

import Aux from "../../hoc/_Aux";
import {Fetch_Produit_ById,Delete_Product} from '../../store/actions'
import { Link } from 'react-router-dom';

function ProduitDetail({navigation}) {

    const {id} = useParams();
    const dispatch = useDispatch()
    const product_detail = useSelector(state => state.product_detail)
 

    useEffect(() => {
       dispatch(Fetch_Produit_ById(id))
      
 
      }, [])
  
    return (
        <div>
          {product_detail ? 
          (<div className="row">
               <img className="col-sm4" src={product_detail.image} width ="200" height = "250"/>
               <div className="col-sm" style ={{margin:20, marginTop : 0}} >
                    <h3 className="font-weight-bold" > {product_detail.nom}</h3>
                    <Card style={{padding:10}}>
                        <p className="font-italic" >{product_detail.desription}</p>
                    </Card>
                </div>
                <div className="col-sm4">
                        <Card>
                            
                            <Card.Body>
                                <div className="row d-flex align-items-center">
                                    <div className="col">
                                  
                                        <Button variant="primary"  onClick = {() => {
                                            console.log('ggggg')
                                        Delete_Product(id)
                                        //setTimeout(window.location.href = "/Produit/list",300)
                                        
                                    }}>
                                            supprimer
                                    </Button>
                                  
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                </div>
                
          </div>
          ) 
          : null}

        </div>
    )
}

export default ProduitDetail
