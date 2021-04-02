import React from 'react';
import NVD3Chart from 'react-nvd3';


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
        console.log(Array.from(this.props.data).length )
        for (let pas = 0; pas < Array.from(this.props.data).length; pas++) {
            datum[0].values.push( {label: this.props.data[pas][0] , value: this.props.data[pas][1]})
          }
         this.setState({
             arr:datum
         })
      }, 1000);
    

     
   }

    render() {
        return <NVD3Chart tooltip={{enabled: true}} type="discreteBarChart" datum={this.state.arr} x="label" y="value" height={300} showValues />
    }
}

export default BarDiscreteChart;