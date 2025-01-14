import initCamera from "./initCamera";
import gestureHandleMain from "./gesture/gestureRecognizer";
import getData from './getData';
import chartDisplay from './chart/chartDisplay';
import debugMain from './debug/debug';
import handleGesture from './handleGesture'
import handleVoice from './handleVoice'
import singalCenterHandleUnit from './signalProcessor'
import createLegend from './chart/renderLegend'
import setOption from './chart/chartSetOption'

const video = document.querySelector("#video")
const debug = new Stats();

const cameraConfig = {
    width: 1280,
    height: 720,
    fps: 60,
};

const pageState = {
  pageIndex: 0,
}

let pageOriginData = null;

async function renderChart(uid, slide) {
  try {
      
      console.log("render", data);
      chartDisplay(JSON.parse(data.pages[0].data));

  } catch (error) {
      console.error("Error fetching chart data:", error);
  }
}

function gestureCallback(myChart) {
  return (leftHandInfo, rightHandInfo) => {
    // if (est === null) {
    //   return;
    // }
    const action = handleGesture(myChart, leftHandInfo, rightHandInfo);
    // if (action) {
      singalCenterHandleUnit('gesture', action, {leftHandInfo, rightHandInfo}, {myChart, chartdata: JSON.parse(pageOriginData.pages[pageState.pageIndex].data)});  
    // }
  }
}




async function main() {
    
  
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has('model')) {
    alert('Cannot find aany slides in the query string.');
    return;
  }


  // get data from firebase, and render chart
  pageOriginData = await getData(urlParams.get('userId'), urlParams.get('slide'));
  const myChart = chartDisplay();
  // myChart.setOption(JSON.parse(pageOriginData.pages[0].data));
  setOption(myChart, JSON.parse(pageOriginData.pages[0].data));
  // myChart.setOption(JSON.parse(pageOriginData.pages[pageOriginData.pages.length-1].data));
  createLegend(myChart);


  // init camera and start gesture recognition

  initCamera(video, cameraConfig.width, cameraConfig.height, cameraConfig.fps).then((video) =>{
    video.play();
    video.addEventListener('loadeddata', () => {
      gestureHandleMain(gestureCallback(myChart), true);
    })
    // video.addEventListener('play', () => {
    //   processVideo();
    // })
  });

  window.addEventListener('DOMContentLoaded', () => {
    
  });

// speech recognition
if ('webkitSpeechRecognition' in window) {
  console.log('Speech recognition supported');
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = true; 
  recognition.lang = 'cmn-Hans-CN'; 
  recognition.interimResults = true; 

  recognition.start(); 

  let lastTimestamp = new Date().getTime(); 
  let lastTranscripts = [];

  recognition.onresult = function(event) {
      let transcript = '';
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      transcript = transcript.trim(); 
      // if (transcript.length > 0) {
      //   for (let i = 0; i < lastTranscripts.length; i++) {
      //     if (transcript.startsWith(lastTranscripts[i])) {
      //       transcript = transcript.slice(lastTranscripts[i].length);
      //       break;
      //     }
      //   }
      // }
      
      console.log('Recognized text(now):', transcript);
      console.log('Recognized text(int):', interimTranscript.trim());


      // console.log('Recognized text:', transcript.trim());
      document.getElementById('speech').innerHTML = interimTranscript.trim();

      if (transcript.toLowerCase().includes("展示图表".toLowerCase())) {
        singalCenterHandleUnit('voice', 'show-chart', {},  {myChart, chartdata: JSON.parse(pageOriginData.pages[pageState.pageIndex].data)});

        if (pageState.pageIndex < pageOriginData.pages.length - 1) {
          pageState.pageIndex += 1;
        }

      }

      if (transcript.toLowerCase().includes("展示图标".toLowerCase())) {

        singalCenterHandleUnit('voice', 'show-chart', {},  {myChart, chartdata: JSON.parse(pageOriginData.pages[pageState.pageIndex].data)});

        if (pageState.pageIndex < pageOriginData.pages.length - 1) {
          pageState.pageIndex += 1;
        }

      }

      // if (transcript == '展示图表') {
      //   // singalCenterHandleUnit('voice', transcript, {});
      //   showChart.showChart(myChart, JSON.parse(pageOriginData.pages[pageState.pageIndex].data));
      // }
      if (transcript == '开始展示图表') {
        pageState.pageIndex = 0;
        myChart.setOption(JSON.parse(pageOriginData.pages[pageState.pageIndex].data));
      }

      if (transcript == '隐藏图表') {
        myChart.clear();
      }

      if (transcript == '打开调试') {
        document.getElementById('debug-info').style.display = 'block';
      }

      if (transcript == '关闭调试') {
        document.getElementById('debug-info').style.display = 'none';
      }

      if (transcript == '上一页') {
        const currentTime = new Date().getTime();
        if (currentTime - lastTimestamp < 1000) {
          return;
        }
        lastTimestamp = currentTime;
        if (pageState.pageIndex > 0) {
          pageState.pageIndex -= 1;
          myChart.clear();
          myChart.setOption(JSON.parse(pageOriginData.pages[pageState.pageIndex].data));
        }
      }

      if (transcript == '下一页') {
        const currentTime = new Date().getTime();
        if (currentTime - lastTimestamp < 1000) {
          return;
        }
        lastTimestamp = currentTime;
        if (pageState.pageIndex < pageOriginData.pages.length - 1) {
          pageState.pageIndex += 1;
          myChart.clear();
          myChart.setOption(JSON.parse(pageOriginData.pages[pageState.pageIndex].data));
        }
      }

  };

  recognition.onend = function() {
      console.log('Speech recognition service disconnected');
      recognition.start(); 
  };

  
} else {
  console.log('Speech recognition not supported');
}


}

main();
