import React from 'react';
import NVD3Chart from 'react-nvd3';

const datum = [];

class PieDonutChart extends React.Component {

    
    
    state = {
        arr:[]
    }

   componentDidMount(){
    setTimeout(() => {
        console.log(datum)
        if(datum.length == 0){
            for (let pas = 0; pas < Array.from(this.props.data).length; pas++) {
                datum.push( {key: this.props.data[pas][0] , y: this.props.data[pas][1]})
              }
             
        }
        this.setState({
            arr:datum
        })
        
        
      }, 1000);
    

     
   }
  
     
    render() {
       

        return (
            <NVD3Chart id="chart" height={400} type="pieChart" datum={this.state.arr} x="key" y="y" donut labelType='percent' />
        )
       
    }
}

export default PieDonutChart;