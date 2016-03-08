function callBackTimeOut(consoleTimer){
     console.timeEnd(consoleTimer);
}
console.time("twoSecond");
setTimeout(callBackTimeOut, 2000, "twoSecond");
console.time("oneSecond");
setTimeout(callBackTimeOut, 1000, "oneSecond");
console.time("fiveSecond");
setTimeout(callBackTimeOut, 5000, "fiveSecond");
console.time("50MilliSecond");
setTimeout(callBackTimeOut, 50, "50MilliSecond");
