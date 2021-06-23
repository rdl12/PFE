import React  from 'react';
import { Link } from 'react-router-dom';



function List({ formations, title }) {

    return (
       <div style = {{display:'flex',flexDirection:'column',overflowY: 'auto',width:'100%'}}>
          <h4  className="font-weight-bold" style = {{margin:10}}>{title}</h4>
          <div style = {{display:'flex',flexDirection:'row',margin:10}}>
          {formations.map((item,index) =>
              <Link key = {index} to={`/Formation/Detail/${item.id}`} style={{ textDecoration: 'none',margin:10 }} >
                    <img src={item.image} width="200" height="200" style = {{borderRadius:20}} />
                    <div>{item.nom}</div>
                </Link>
                
          )}
          </div>
         
   </div>
    )
}

export default List
