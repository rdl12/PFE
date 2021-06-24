import React from 'react';
import NVD3Chart from 'react-nvd3';
import {Spinner } from 'react-bootstrap';


const datum = [
    {
        key: "Cumulative Return",
        values: []
    }
];

class BarDiscreteChart extends React.Component {
    state = {
        arr:[]
    }

   componentDidMount(){
    setTimeout(() => {
      
        for (let pas = 0; pas < Array.from(this.props.data).length; pas++) {
            datum[0].values.push( {label: this.props.data[pas][0] , value: this.props.data[pas][1]})
          }
         this.setState({
             arr:datum
         })
      }, 1000);
    

     
   }

    render() {
        return (
            <div>
            { this.state.arr.length === 0 ? (<Spinner animation="border" variant="primary" />): (  <NVD3Chart tooltip={{enabled: true}} type="discreteBarChart" datum={this.state.arr} x="label" y="value" height={300} showValues />)}
             </div>
        )
      
      
    }

  
}

export default BarDiscreteChart;