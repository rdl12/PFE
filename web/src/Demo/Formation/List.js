import React  from 'react';
import { Link } from 'react-router-dom';



function List({ items, title, to, width, height }) {

    return (
       <div style = {{display:'flex',flexDirection:'column',overflowY: 'auto',width:'100%'}}>
          <h4  className="font-weight-bold" style = {{margin:10,marginLeft:20}}>{title} : </h4>
          <div style = {{display:'flex',flexDirection:'row',margin:10}}>
          {items.map((item,index) =>
              <Link key = {index} to={`${to}${item.id}`} width={width} style={{ textDecoration: 'none',margin:10 }} >
                    <img src={item.image}  width={width} height={height} style = {{borderRadius:20}} />
                    <div   style={{color:'black'}}>{item.nom}</div>
                </Link>
                
          )}
          </div>
         
   </div>
    )
}

export default List
