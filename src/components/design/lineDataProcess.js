


const defaultLineData = [
    {
      "id": "japan",
      "color": "hsl(159, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 258
        },
        {
          "x": "helicopter",
          "y": 197
        },
        {
          "x": "boat",
          "y": 254
        },
        {
          "x": "train",
          "y": 18
        },
        {
          "x": "subway",
          "y": 149
        },
        {
          "x": "bus",
          "y": 212
        },
        {
          "x": "car",
          "y": 79
        },
        {
          "x": "moto",
          "y": 203
        },
        {
          "x": "bicycle",
          "y": 35
        },
        {
          "x": "horse",
          "y": 220
        },
        {
          "x": "skateboard",
          "y": 121
        },
        {
          "x": "others",
          "y": 12
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(143, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 238
        },
        {
          "x": "helicopter",
          "y": 94
        },
        {
          "x": "boat",
          "y": 189
        },
        {
          "x": "train",
          "y": 210
        },
        {
          "x": "subway",
          "y": 171
        },
        {
          "x": "bus",
          "y": 133
        },
        {
          "x": "car",
          "y": 149
        },
        {
          "x": "moto",
          "y": 254
        },
        {
          "x": "bicycle",
          "y": 150
        },
        {
          "x": "horse",
          "y": 246
        },
        {
          "x": "skateboard",
          "y": 90
        },
        {
          "x": "others",
          "y": 183
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(146, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 252
        },
        {
          "x": "helicopter",
          "y": 225
        },
        {
          "x": "boat",
          "y": 221
        },
        {
          "x": "train",
          "y": 177
        },
        {
          "x": "subway",
          "y": 118
        },
        {
          "x": "bus",
          "y": 107
        },
        {
          "x": "car",
          "y": 105
        },
        {
          "x": "moto",
          "y": 184
        },
        {
          "x": "bicycle",
          "y": 273
        },
        {
          "x": "horse",
          "y": 157
        },
        {
          "x": "skateboard",
          "y": 45
        },
        {
          "x": "others",
          "y": 159
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(78, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 45
        },
        {
          "x": "helicopter",
          "y": 266
        },
        {
          "x": "boat",
          "y": 51
        },
        {
          "x": "train",
          "y": 3
        },
        {
          "x": "subway",
          "y": 242
        },
        {
          "x": "bus",
          "y": 234
        },
        {
          "x": "car",
          "y": 64
        },
        {
          "x": "moto",
          "y": 78
        },
        {
          "x": "bicycle",
          "y": 133
        },
        {
          "x": "horse",
          "y": 10
        },
        {
          "x": "skateboard",
          "y": 1
        },
        {
          "x": "others",
          "y": 284
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(265, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 133
        },
        {
          "x": "helicopter",
          "y": 86
        },
        {
          "x": "boat",
          "y": 201
        },
        {
          "x": "train",
          "y": 206
        },
        {
          "x": "subway",
          "y": 84
        },
        {
          "x": "bus",
          "y": 104
        },
        {
          "x": "car",
          "y": 140
        },
        {
          "x": "moto",
          "y": 275
        },
        {
          "x": "bicycle",
          "y": 204
        },
        {
          "x": "horse",
          "y": 238
        },
        {
          "x": "skateboard",
          "y": 108
        },
        {
          "x": "others",
          "y": 23
        }
      ]
    }
  ]


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

export default {
  defaultLineData,
  convertData2Table,
}