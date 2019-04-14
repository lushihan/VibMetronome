import document from "document";
import * as messaging from "messaging";
import clock from "clock";

let background = document.getElementById("background");
let mybutton_1 = document.getElementById("mybutton");
let mybutton_2 = document.getElementById("mybutton2");
let mybutton_3 = document.getElementById("mybutton3");
let mybutton_4 = document.getElementById("mybutton4");

// let btnoff = document.getElementById("btn-off");
// let btnon = document.getElementById("btn-on");

let i;
let interval = 1000;
let tempo = 60/(interval/1000); //global variables

clock.granularity = "seconds";


mybutton_1.onactivate = function(evt) {
  console.log("Start!");
  demo();
}

mybutton_2.onactivate = function(evt) {
  console.log("Stop!");
  i = 50000000;
}

mybutton_3.onactivate = function(evt) {
  console.log("Speed up!");
  if (interval >= 100)
  {
    interval = interval - 100;
  }
}

mybutton_4.onactivate = function(evt) {
  console.log("Speed down!");
  interval = interval + 100;
}

const bpsLabel = document.getElementById("bps-label");
const bpsData = document.getElementById("bps-data");
// const bpsData2 = document.getElementById("bps-data2");

// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === "color" && evt.data.newValue) {
    let color = JSON.parse(evt.data.newValue);
    console.log(`Setting background color: ${color}`);
    background.style.fill = color;
  }
};

import { vibration } from "haptics";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() 
{     
    for (i = 0; i < 10000000; i++) 
    {
      // update text
      clock.ontick = (evt) =>{
        bpsData.text = `${Math.round( (60/(interval/1000) * 10 )) / 10}`; 
      }
      await sleep(interval);
      vibration.start("bump");
      // vibration.stop("confirmation");
    }
}

function myFunction() {
  vibration.start("confirmation");
}


// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("App Socket Closed");
};
