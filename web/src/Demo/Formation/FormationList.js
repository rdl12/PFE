import React ,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {Row, Col, Card, Form, Button, Image , FormControl, DropdownButton, Dropdown,Tab,Tabs} from 'react-bootstrap';



import Aux from "../../hoc/_Aux";
import {Fetch_Formations} from '../../store/actions'
import { Link } from 'react-router-dom';

function FormationList() {
 const [Formation, setFormation] = useState([])
 const dispatch = useDispatch()
 const formation = useSelector(state => state.formations)

    useEffect(() => {
       dispatch(Fetch_Formations())
       setFormation(formation)
    }, [formation])
    return (
        <div class="row" >
            {Formation.map((item) =>
             <Link to={`/Formation/Detail/${item.id}`} >
                <div style={{margin:10}} class="col-sm">
                    <img src={item.image} width="200" height="200" />
                    <p class="font-weight-bold" style={{margin:3, width:200}}>{item.nom}</p>
                </div>
             </Link>
            )
            }
        </div>
    )
}

export default FormationList
