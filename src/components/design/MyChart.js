
import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';
// import ReactEcharts from "echarts-for-react"

// export default function MyChart ({ data /* see data tab */ }) {
//   return <ReactEcharts option={data} />;
// }
const sizeFunction = function (x) {
  var y = Math.sqrt(x / 5e8) + 0.1;
  return y * 80;
};


class MyChart2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      container: props.container || 'main-chart',
    };

  }

  componentDidMount() {
    const { data, container } = this.state;
    let chartDom = document.getElementById(container);
    let myChart = echarts.init(chartDom);
    if (data && data.options) {
      for (let i = 0; i < data.options.length; i++) {
        for (let j = 0; j < data.options[i].series.length; j++) {
          if (data.options[i].series[j].symbolSize) {
            data.options[i].series[j].symbolSize = function (val) {
              return sizeFunction(val[2]);
            }
          }
        }
      }
    }

    if (data && data.baseOption) {
      for (let j = 0; j < data.baseOption.series.length; j++) {
        if (data.baseOption.series[j].symbolSize) {
          data.baseOption.series[j].symbolSize = function (val) {
            return sizeFunction(val[2]);
          }
        }
      }
    }
    myChart.setOption(data);
  }

  render() {
    return (
      <div id={this.state.container} style={{width: '100%', height: '70vh'}}>

      </div>
    );
  }
}


    
export default MyChart2;