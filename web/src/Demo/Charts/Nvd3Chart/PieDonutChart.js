import React from 'react';
import NVD3Chart from 'react-nvd3';

const datum = [
   
];

class PieDonutChart extends React.Component {

    
    state = {
        arr:[]
    }

   componentDidMount(){
   
    setTimeout(() => {
        console.log(this.props.data)
        for (let pas = 0; pas < this.props.data.lenght; pas++) {
            datum.push( {key: this.props.data[pas][0] , y: this.props.data[pas][1], color: "#ff8a65"},)
          }
         this.setState({
             arr:datum
         })
      }, 1000);
    

     
   }
  
     
    render() {
       

        return (
            <NVD3Chart id="chart" height={300} type="pieChart" datum={this.state.arr} x="key" y="y" donut labelType='percent' />
        )
       
    }
}

export default PieDonutChart;