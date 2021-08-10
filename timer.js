const startButton = document.getElementById('start-lap');
const stopButton = document.getElementById('stop-reset');
const timeArea = document.getElementById('update-timer');

/**
 * True - when the time is counting
 * Flase - when the time is stopped
 * @type {Boolean}
 */
let theTimeIsRunning = false;

let counting;

let startTime;
let currentTime = 0;

/**
 * @param {number} timeNum 
 * If the time number(seconds, minutes, hours) is less than 10, add the text 0 infront of it
 */
function zeroInfront(timeNum){
   if(timeNum < 10){
      return '0' + timeNum.toString();
   }
   else {
      return timeNum.toString();
   }
}

function showTheTime(){
   let now = Date.now();
   now -= startTime;
   seperateHMS(now);
   const hString = zeroInfront(hours);
   const mString = zeroInfront(minutes);
   const sString = zeroInfront(seconds);
   timeArea.innerText = `${hString} : ${mString} : ${sString}`;
}

function startCountingTime(){
   if(!theTimeIsRunning){
      startTime = Date.now();
      counting = setInterval(showTheTime, 30);
      theTimeIsRunning = true;
      startButton.innerText = 'lap';
      stopButton.innerText = 'stop';
   }
   else{
      lap();
   }
}

function stopTime(){
   if(theTimeIsRunning){
      currentTime = getTotalSeconds(hours, minutes, seconds);
      console.log(currentTime);
      clearInterval(counting);
      theTimeIsRunning = false;
      stopButton.innerText = 'reset';
      startButton.innerText = 'start';
   }
   else{
      resetTime();
   }
}

function resetTime(){
   currentTime = 0; hours = 0; minutes = 0; seconds = 0;
   countNumber = 1; currentLapTime = 0;

   startButton.innerText = 'start';
   stopButton.innerText = 'stop';
   timeArea.innerText = '00 : 00 : 00.00';
   lapTimeArea.innerText = '';

   console.clear();
}

/**
 * @param {Number} num Put the value in MILLI SECOND only.
 */
function seperateHMS(num){
   seconds = Number.parseFloat(((num / 1000) + currentTime).toString()).toFixed(2);

   minutes = Math.floor(seconds / 60);
   seconds = Number.parseFloat((seconds % 60).toString()).toFixed(2);

   hours = Math.floor(minutes / 60);
   minutes %= 60;

}

let seconds = 0;
let minutes = 0;
let hours = 0;

startButton.onclick = startCountingTime;
stopButton.onclick = stopTime;

function getTotalSeconds(hour, minute, second){
   return Number(hour * 60 * 60) + Number(minute * 60) + Number(second);
}



//////// LAP Part ////////

function lap(){
   const makeNewList = document.createElement('li');
   const timeNow = getTotalSeconds(hours, minutes, seconds);

   const timeDifference = timeNow - currentLapTime;
   const timeDifferenceToString = timeToString(timeDifference);

   const timeString = timeArea.innerText;

   let countNumberString;
      if(countNumber < 10){ 
         
         countNumberString = `0${countNumber}`;}

      else{ 
         
         countNumberString = countNumber.toString();}

   makeNewList.classList.add('list');
   if((countNumber % 2) === 0){
      makeNewList.classList.add('even');
   } else {
      makeNewList.classList.add('odd');
   }

   makeNewList.innerHTML = `

         <div class="list-number">${countNumberString}</div>
         <div class="time-list">${timeString}</div>
         <div class="difference-time-list">${timeDifferenceToString}</div>

   `;
   
   lapTimeArea.appendChild(makeNewList);
   countNumber++;
   currentLapTime = timeNow;
}

let countNumber = 1;
let currentLapTime = 0;

const lapTimeArea = document.getElementById('lap-time-area');
const newList = document.getElementById('new-list');

function timeToString(num){
   let s = num, m, h, theString;
   m = Math.floor(s / 60);
   s = Number.parseFloat(s % 60).toFixed(2);

   h = Math.floor(m / 60);
   m %= 60;

   let stringS = zeroInfront(s);
   let stringM = zeroInfront(m);
   let stringH = zeroInfront(h);

   theString = `${stringH} : ${stringM} : ${stringS}`;

   return theString;
}
