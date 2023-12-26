import * as echarts from 'echarts';
import ecStat from 'echarts-stat';
import defaultTimelineBubbleData from './defaultTimelineBubbleData';


const defaultLineData = {
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    itemWidth: 80,
    itemHeight:40,
    icon: 'pin',
    lineStyle: {
       width: 30
    },
    textStyle: {
      color: '#',
      fontSize: 20
    }
  },
  
  xAxis: {
    splitLine: {
      show:false
    },
    axisLabel: {
      show: false
    },
    axisLine: {
      show: false
    },
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    splitLine: {
      show:false
    },
     axisLabel: {
      show: false
    },
    axisLine: {
      show: false
    },
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      lineStyle: {
        width: 10
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      lineStyle: {
        width: 10
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      lineStyle: {
        width: 10
      },
      data: [150, 232, 201, 154, 190, 330, 410]
    }
  ]
};

function convertData2Table(data) {
    const columns = []
    columns.push({ key: 'x-axis', name: 'x-axis' });
    const rows = []
    data.forEach((item) => {
        const id = item.id;
        columns.push({ key: id, name: id });
        const data = item.data;
        data.forEach((dataItem) => {
          let row = {};
          const rowIdx = rows.findIndex((row) => row['x-axis'] === dataItem.x);
          if (rowIdx > -1) {
            row = rows[rowIdx];
            row[id] = dataItem.y;
          } else {
            row['x-axis'] = dataItem.x;
            row[id] = dataItem.y;
          }
          rows.push(row);
        });
    });
    return {
        columns,
        rows,
    };
}

const defaultBarData = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
};

const defaultPieData = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};


function scatter() {
  // See https://github.com/ecomfe/echarts-stat
  console.log(echarts);
  echarts.registerTransform(ecStat.transform.clustering);
  const data = [
    [3.275154, 2.957587],
    [-3.344465, 2.603513],
    [0.355083, -3.376585],
    [1.852435, 3.547351],
    [-2.078973, 2.552013],
    [-0.993756, -0.884433],
    [2.682252, 4.007573],
    [-3.087776, 2.878713],
    [-1.565978, -1.256985],
    [2.441611, 0.444826],
    [-0.659487, 3.111284],
    [-0.459601, -2.618005],
    [2.17768, 2.387793],
    [-2.920969, 2.917485],
    [-0.028814, -4.168078],
    [3.625746, 2.119041],
    [-3.912363, 1.325108],
    [-0.551694, -2.814223],
    [2.855808, 3.483301],
    [-3.594448, 2.856651],
    [0.421993, -2.372646],
    [1.650821, 3.407572],
    [-2.082902, 3.384412],
    [-0.718809, -2.492514],
    [4.513623, 3.841029],
    [-4.822011, 4.607049],
    [-0.656297, -1.449872],
    [1.919901, 4.439368],
    [-3.287749, 3.918836],
    [-1.576936, -2.977622],
    [3.598143, 1.97597],
    [-3.977329, 4.900932],
    [-1.79108, -2.184517],
    [3.914654, 3.559303],
    [-1.910108, 4.166946],
    [-1.226597, -3.317889],
    [1.148946, 3.345138],
    [-2.113864, 3.548172],
    [0.845762, -3.589788],
    [2.629062, 3.535831],
    [-1.640717, 2.990517],
    [-1.881012, -2.485405],
    [4.606999, 3.510312],
    [-4.366462, 4.023316],
    [0.765015, -3.00127],
    [3.121904, 2.173988],
    [-4.025139, 4.65231],
    [-0.559558, -3.840539],
    [4.376754, 4.863579],
    [-1.874308, 4.032237],
    [-0.089337, -3.026809],
    [3.997787, 2.518662],
    [-3.082978, 2.884822],
    [0.845235, -3.454465],
    [1.327224, 3.358778],
    [-2.889949, 3.596178],
    [-0.966018, -2.839827],
    [2.960769, 3.079555],
    [-3.275518, 1.577068],
    [0.639276, -3.41284]
  ];
  var CLUSTER_COUNT = 6;
  var DIENSIION_CLUSTER_INDEX = 2;
  var COLOR_ALL = [
    '#37A2DA',
    '#e06343',
    '#37a354',
    '#b55dba',
    '#b5bd48',
    '#8378EA',
    '#96BFFF'
  ];
  var pieces = [];
  for (var i = 0; i < CLUSTER_COUNT; i++) {
    pieces.push({
      value: i,
      label: 'cluster ' + i,
      color: COLOR_ALL[i]
    });
  }
  return {
    dataset: [
      {
        source: data
      },
      {
        transform: {
          type: 'ecStat:clustering',
          // print: true,
          config: {
            clusterCount: CLUSTER_COUNT,
            outputType: 'single',
            outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX
          }
        }
      }
    ],
    tooltip: {
      position: 'top'
    },
    visualMap: {
      type: 'piecewise',
      top: 'middle',
      min: 0,
      max: CLUSTER_COUNT,
      left: 10,
      splitNumber: CLUSTER_COUNT,
      dimension: DIENSIION_CLUSTER_INDEX,
      pieces: pieces
    },
    grid: {
      left: 120
    },
    xAxis: {},
    yAxis: {},
    series: {
      type: 'scatter',
      encode: { tooltip: [0, 1] },
      symbolSize: 15,
      itemStyle: {
        borderColor: '#555'
      },
      datasetIndex: 1
    }
  };
}


const defaultScatterData = scatter();


const defaultRadarData = {
  title: {
    text: 'Basic Radar Chart'
  },
  legend: {
    data: ['Allocated Budget', 'Actual Spending']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
        }
      ]
    }
  ]
};

function heatMap() {
  // prettier-ignore
  const hours = [
    '12a', '1a', '2a', '3a', '4a', '5a', '6a',
    '7a', '8a', '9a', '10a', '11a',
    '12p', '1p', '2p', '3p', '4p', '5p',
    '6p', '7p', '8p', '9p', '10p', '11p'
  ];
  // prettier-ignore
  const days = [
    'Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday', 'Sunday'
  ];
  // prettier-ignore
  const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]
    .map(function (item) {
    return [item[1], item[0], item[2] || '-'];
  });
  return {
  tooltip: {
    position: 'top'
  },
  grid: {
    height: '50%',
    top: '10%'
  },
  xAxis: {
    type: 'category',
    data: hours,
    splitArea: {
      show: true
    }
  },
  yAxis: {
    type: 'category',
    data: days,
    splitArea: {
      show: true
    }
  },
  visualMap: {
    min: 0,
    max: 10,
    calculable: true,
    orient: 'horizontal',
    left: 'center',
    bottom: '15%'
  },
  series: [
    {
      name: 'Punch Card',
      type: 'heatmap',
      data: data,
      label: {
        show: true
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
  };
}

const defaultHeatMapData = heatMap();


function sunburst() {
  var data = [
    {
      name: 'Grandpa',
      children: [
        {
          name: 'Uncle Leo',
          value: 15,
          children: [
            {
              name: 'Cousin Jack',
              value: 2
            },
            {
              name: 'Cousin Mary',
              value: 5,
              children: [
                {
                  name: 'Jackson',
                  value: 2
                }
              ]
            },
            {
              name: 'Cousin Ben',
              value: 4
            }
          ]
        },
        {
          name: 'Father',
          value: 10,
          children: [
            {
              name: 'Me',
              value: 5
            },
            {
              name: 'Brother Peter',
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: 'Nancy',
      children: [
        {
          name: 'Uncle Nike',
          children: [
            {
              name: 'Cousin Betty',
              value: 1
            },
            {
              name: 'Cousin Jenny',
              value: 2
            }
          ]
        }
      ]
    }
  ];
  return {
    series: {
      type: 'sunburst',
      // emphasis: {
      //     focus: 'ancestor'
      // },
      data: data,
      radius: [0, '90%'],
      label: {
        rotate: 'radial'
      }
    }
  };
}

const defaultSunburstData = sunburst();

const defaultTreemapData = {
  series: [
    {
      type: 'treemap',
      data: [
        {
          name: 'nodeA',
          value: 10,
          children: [
            {
              name: 'nodeAa',
              value: 4
            },
            {
              name: 'nodeAb',
              value: 6
            }
          ]
        },
        {
          name: 'nodeB',
          value: 20,
          children: [
            {
              name: 'nodeBa',
              value: 20,
              children: [
                {
                  name: 'nodeBa1',
                  value: 20
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};


const defaultFunnelData = {
  title: {
    text: 'Funnel',
    left: 'left',
    top: 'bottom'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  toolbox: {
    orient: 'vertical',
    top: 'center',
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['Show', 'Click', 'Visit', 'Inquiry', 'Order']
  },
  series: [
    {
      name: 'Funnel',
      type: 'funnel',
      width: '40%',
      height: '45%',
      left: '5%',
      top: '50%',
      data: [
        { value: 60, name: 'Visit' },
        { value: 30, name: 'Inquiry' },
        { value: 10, name: 'Order' },
        { value: 80, name: 'Click' },
        { value: 100, name: 'Show' }
      ]
    },
    {
      name: 'Pyramid',
      type: 'funnel',
      width: '40%',
      height: '45%',
      left: '5%',
      top: '5%',
      sort: 'ascending',
      data: [
        { value: 60, name: 'Visit' },
        { value: 30, name: 'Inquiry' },
        { value: 10, name: 'Order' },
        { value: 80, name: 'Click' },
        { value: 100, name: 'Show' }
      ]
    },
    {
      name: 'Funnel',
      type: 'funnel',
      width: '40%',
      height: '45%',
      left: '55%',
      top: '5%',
      label: {
        position: 'left'
      },
      data: [
        { value: 60, name: 'Visit' },
        { value: 30, name: 'Inquiry' },
        { value: 10, name: 'Order' },
        { value: 80, name: 'Click' },
        { value: 100, name: 'Show' }
      ]
    },
    {
      name: 'Pyramid',
      type: 'funnel',
      width: '40%',
      height: '45%',
      left: '55%',
      top: '50%',
      sort: 'ascending',
      label: {
        position: 'left'
      },
      data: [
        { value: 60, name: 'Visit' },
        { value: 30, name: 'Inquiry' },
        { value: 10, name: 'Order' },
        { value: 80, name: 'Click' },
        { value: 100, name: 'Show' }
      ]
    }
  ]
};

const default3DSurfaceData = {
  tooltip: {},
  backgroundColor: '#fff',
  visualMap: {
    show: false,
    dimension: 2,
    min: -1,
    max: 1,
    inRange: {
      color: [
        '#313695',
        '#4575b4',
        '#74add1',
        '#abd9e9',
        '#e0f3f8',
        '#ffffbf',
        '#fee090',
        '#fdae61',
        '#f46d43',
        '#d73027',
        '#a50026'
      ]
    }
  },
  xAxis3D: {
    type: 'value'
  },
  yAxis3D: {
    type: 'value'
  },
  zAxis3D: {
    type: 'value'
  },
  grid3D: {
    viewControl: {
      // projection: 'orthographic'
    }
  },
  series: [
    {
      type: 'surface',
      wireframe: {
        // show: false
      },
      equation: {
        x: {
          step: 0.05
        },
        y: {
          step: 0.05
        },
        z: function (x, y) {
          if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
            return '-';
          }
          return Math.sin(x * Math.PI) * Math.sin(y * Math.PI);
        }
      }
    }
  ]
};

const default3DGlobeData = {
  backgroundColor: '#000',
  globe: {
    baseTexture: 'https://echarts.apache.org/examples' + '/data-gl/asset/world.topo.bathy.200401.jpg',
    heightTexture: 'https://echarts.apache.org/examples' + '/data-gl/asset/world.topo.bathy.200401.jpg',
    displacementScale: 0.04,
    shading: 'realistic',
    environment: 'https://echarts.apache.org/examples' + '/data-gl/asset/starfield.jpg',
    realisticMaterial: {
      roughness: 0.9
    },
    postEffect: {
      enable: true
    },
    light: {
      main: {
        intensity: 5,
        shadow: true
      },
      ambientCubemap: {
        texture: 'https://echarts.apache.org/examples' + '/data-gl/asset/pisa.hdr',
        diffuseIntensity: 0.2
      }
    }
  }
};

let defaultTimelineBubbleDataCounties = defaultTimelineBubbleData.counties.map((item) => item.country);
let defaultTimelineBubbleDataLocates = []

for (let i=0; i<defaultTimelineBubbleData.counties.length; i++) {
  if (!defaultTimelineBubbleDataLocates.includes(defaultTimelineBubbleData.counties[i].locate)) {
    defaultTimelineBubbleDataLocates.push(defaultTimelineBubbleData.counties[i].locate);
  }
}

// Schema:
var schema = [
  { name: 'Income', index: 0, text: '人均收入', unit: '美元' },
  { name: 'LifeExpectancy', index: 1, text: '人均寿命', unit: '岁' },
  { name: 'Population', index: 2, text: '总人口', unit: '' },
  { name: 'Country', index: 3, text: '国家', unit: '' }
];

let defaultTimelineBubbleOption = {
  baseOption: {
    timeline: {
      axisType: 'category',
      orient: 'vertical',
      autoPlay: false,
      inverse: true,
      playInterval: 1000,
      left: null,
      right: 0,
      top: 20,
      bottom: 20,
      width: 55,
      height: null,
      symbol: 'none',
      checkpointStyle: {
        borderWidth: 2
      },
      controlStyle: {
        showNextBtn: false,
        showPrevBtn: false
      },
      data: []
    },
    title: [
      {
        text: defaultTimelineBubbleData.timeline[0],
        textAlign: 'center',
        left: '63%',
        top: '55%',
        textStyle: {
          fontSize: 100
        }
      },
      {
        text: '各国人均寿命与GDP关系演变',
        left: 'center',
        top: 10,
        textStyle: {
          fontWeight: 'normal',
          fontSize: 20
        }
      }
    ],
    tooltip: {
      padding: 5,
      borderWidth: 1,
      formatter: '{a} : {b0}: {c0}<br />{b1}: {c1}'
      // function (obj) {
      //   var value = obj.value;
      //   // prettier-ignore
      //   // return schema[3].text + '：' + value[3] + '<br>'
      //   //               + schema[1].text + '：' + value[1] + schema[1].unit + '<br>'
      //   //               + schema[0].text + '：' + value[0] + schema[0].unit + '<br>'
      //   //               + schema[2].text + '：' + value[2] + '<br>';
      // }
    },
    grid: {
      top: 100,
      containLabel: true,
      left: 30,
      right: '110'
    },
    xAxis: {
      type: 'log',
      name: '人均收入',
      max: 100000,
      min: 300,
      nameGap: 25,
      nameLocation: 'middle',
      nameTextStyle: {
        fontSize: 18
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        formatter: '{value} $'
      }
    },
    yAxis: {
      type: 'value',
      name: '平均寿命',
      max: 100,
      nameTextStyle: {
        fontSize: 18
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        formatter: '{value} 岁'
      }
    },
    // visualMap: [
    //   {
    //     show: false,
    //     dimension: 3,
    //     categories: defaultTimelineBubbleDataLocates,
    //     // defaultTimelineBubbleDataCounties,
    //     inRange: {
    //       color: (function () {
    //         // prettier-ignore
    //         var colors = ['#51689b', '#ce5c5c', '#fbc357', '#8fbf8f']
    //         // ['#51689b', '#ce5c5c', '#fbc357', '#8fbf8f', '#659d84', '#fb8e6a', '#c77288', '#786090', '#91c4c5', '#6890ba'];
    //         return colors.concat(colors);
    //       })()
    //     }
    //   }
    // ],
    series: [
      {
        type: 'scatter',
        itemStyle: {
          opacity: 0.8
        },
        data: _getSeriesDataByLocate(defaultTimelineBubbleData.series[0], defaultTimelineBubbleData.timeline[0]),
        symbolSize: 'sizeFunction'
      },
      {
        type: 'scatter',
        itemStyle: {
          opacity: 0.8
        },
        data: _getSeriesDataByLocate(defaultTimelineBubbleData.series[1], defaultTimelineBubbleData.timeline[1]),
        symbolSize: 'sizeFunction'
      },
      {
        type: 'scatter',
        itemStyle: {
          opacity: 0.8
        },
        data: _getSeriesDataByLocate(defaultTimelineBubbleData.series[2], defaultTimelineBubbleData.timeline[2]),
        symbolSize: 'sizeFunction'
      },
      {
        type: 'scatter',
        itemStyle: {
          opacity: 0.8
        },
        data: _getSeriesDataByLocate(defaultTimelineBubbleData.series[3], defaultTimelineBubbleData.timeline[3]),
        symbolSize: 'sizeFunction'
      }
    ],
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'quinticInOut'
  },
  options: []
};

function _getSeriesDataByLocate(data, time) {
  var seriesData = [];
  let newContries = {};
  for (let i=0; i<defaultTimelineBubbleData.counties.length; i++) {
    let locate = defaultTimelineBubbleData.counties[i].locate;
    let country = defaultTimelineBubbleData.counties[i].country;
    if (!newContries[locate]) {
      newContries[locate] = [country];
    } else {
      newContries[locate].push(country);
    }
  }

  for (let key in newContries) {
    let tempCountris = [];
    let tempObj = {
      name: key,
      type: 'scatter',
      itemStyle: {
        opacity: 0.8
      },
      data: [],
      symbolSize: 'sizeFunction'
    };
    newContries[key].forEach((item) => {
      for (let i=0; i<data.length; i++) {
        if (data[i][3] === item) {
          tempCountris.push(data[i]);
        }
      }
    })
    tempObj.data = tempCountris;
    seriesData.push(tempObj);
  }
  console.log('seriesData', seriesData);
  return seriesData;
}

for (var n = 0; n < defaultTimelineBubbleData.timeline.length; n++) {
  defaultTimelineBubbleOption.baseOption.timeline.data.push(defaultTimelineBubbleData.timeline[n]);
  defaultTimelineBubbleOption.options.push({
    title: {
      show: true,
      text: defaultTimelineBubbleData.timeline[n] + ''
    },
    series: _getSeriesDataByLocate(defaultTimelineBubbleData.series[n], defaultTimelineBubbleData.timeline[n])
    // {
    //   name: defaultTimelineBubbleData.timeline[n],
    //   type: 'scatter',
    //   itemStyle: {
    //     opacity: 0.8
    //   },
    //   data: defaultTimelineBubbleData.series[n],
    //   symbolSize: 'sizeFunction'
    // }
  });
}


export {
  defaultLineData,
  defaultBarData,
  defaultPieData,
  defaultScatterData,
  defaultRadarData,
  defaultHeatMapData,
  defaultSunburstData,
  defaultTreemapData,
  defaultFunnelData,
  default3DSurfaceData,
  default3DGlobeData,
  defaultTimelineBubbleOption,
}