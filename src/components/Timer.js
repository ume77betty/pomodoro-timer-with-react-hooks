import { useState, useEffect } from 'react';

const Timer = () => {
  const [secondsLeft, setSecondsLeft] = useState(20 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [tempTime, setTempTime] = useState(20 * 60);

  useEffect(() => {
    let countDown = null;
    if (timerRunning && secondsLeft > 0) {
      countDown = setInterval(() => {
        displayTime(secondsLeft);
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
    } else if (timerRunning && secondsLeft === 0) {
      clearInterval(countDown);
    }
    return () => clearInterval(countDown);
  }, [timerRunning, secondsLeft]);

  //增加一分鐘
  const addMinutes = () => {
    if (secondsLeft >= 0) {
      setSecondsLeft((prevSeconds) => prevSeconds + 60);
      setTempTime((prevTempTime) => prevTempTime + 60);
    }
  };

  //減少一分鐘
  const minusMinutes = () => {
    if (secondsLeft >= 60) {
      setSecondsLeft((prevSeconds) => prevSeconds - 60);
      setTempTime((prevTempTime) => prevTempTime - 60);
    }
  };

  //增加十秒鐘
  const addSeconds = () => {
    if (secondsLeft >= 0) {
      setSecondsLeft((prevSeconds) => prevSeconds + 10);
      setTempTime((prevTempTime) => prevTempTime + 10);
    }
  };

  //減少十秒鐘
  const minusSeconds = () => {
    if (secondsLeft >= 10) {
      setSecondsLeft((prevSeconds) => prevSeconds - 10);
      setTempTime((prevTempTime) => prevTempTime - 10);
    }
  };

  //設定為工作模式
  const workTime = () => {
    setSecondsLeft(25 * 60);
    setTempTime(25 * 60);
  };

  //設定為休息模式
  const breakTime = () => {
    setSecondsLeft(5 * 60);
    setTempTime(5 * 60);
  };

  //計時器開始
  const startTimer = () => {
    setTimerRunning(true);
  };

  //計時器暫停
  const pauseTimer = () => {
    setTimerRunning(false);
  };

  //計時器reset
  const resetTimer = () => {
    setTimerRunning(false);
    setSecondsLeft(tempTime);
  };

  //將計時器時間顯示為分秒
  const displayTime = (secondsLeft) => {
    let minutes = Math.floor(secondsLeft / 60);
    let remainSeconds = secondsLeft % 60;
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (remainSeconds < 10) {
      remainSeconds = '0' + remainSeconds;
    }
    const display = minutes + ' : ' + remainSeconds;
    return display;
  };

  return (
    <div className="timer">
      <div className="main-part">
        <span className="main-timer">{displayTime(secondsLeft)}</span>
        <div className="adjust-part">
          <div className="adjust-minutes">
            <button className="icon add-timer-icon" onClick={addMinutes}></button>
            <button className="icon minus-timer-icon" onClick={minusMinutes}></button>
          </div>
          <div className="adjust-seconds">
            <button className="icon add-timer-icon" onClick={addSeconds}></button>
            <button className="icon minus-timer-icon" onClick={minusSeconds}></button>
          </div>
        </div>
      </div>
      <div className="timer-bar">
        <button className="bar-icon timer-start-icon" onClick={startTimer}></button>
        <button className="bar-icon timer-pause-icon" onClick={pauseTimer}></button>
        <button className="bar-icon timer-reset-icon" onClick={resetTimer}></button>
      </div>
      <div className="work-time" onClick={workTime}>
        <button className="icon work-icon" ></button>
        <span>Let's Work! (25mins)</span>
      </div>
      <div className="break-time" onClick={breakTime}>
        <button className="icon breaktime-icon" ></button>
        <span>Take a break. (5mins)</span>
      </div>
    </div>
  )
};

export default Timer;