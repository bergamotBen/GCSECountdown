const countdown = (stamp) => {
  const currentTime = Date.now();
  const duration = stamp - currentTime;
  const msArray = [604800000, 86400000, 3600000, 60000];
  //   const durations = [];
  const intervals = ["weeks", "days", "hours", "minutes"];
  //   const intervalsToDisplay = [];
  const finalArr = [];
  //   let str = "";
  let remainder = duration;

  for (let i = 0; i < 4; i++) {
    if (Math.floor(remainder / msArray[i]) === 0) {
      finalArr.push("");
    }
    if (Math.floor(remainder / msArray[i]) === 1) {
      //   intervalsToDisplay.push(intervals[i].slice(0, -1));
      //   durations.push(Math.floor(remainder / msArray[i]));
      finalArr.push(
        ` ${Math.floor(remainder / msArray[i])} ${intervals[i].slice(0, -1)}`
      );
    } else {
      //   intervalsToDisplay.push(intervals[i]);
      //   durations.push(Math.floor(remainder / msArray[i]));
      finalArr.push(` ${Math.floor(remainder / msArray[i])} ${intervals[i]},`);
    }
    let next = remainder % msArray[i];
    remainder = next;
  }
  //   for (let i = 0; i < durations.length - 1; i++) {
  //     str += ` ${durations[i]} ${intervalsToDisplay[i]},`;
  //   }
  //   return `${durations[0]} ${intervalsToDisplay[0]}, ${durations[1]} ${intervalsToDisplay[1]}, ${durations[2]} ${intervalsToDisplay[2]}, ${durations[3]} ${intervalsToDisplay[3]}`;
  //   return str;
  return finalArr.join("").slice(0, -1);
};

const countdownText = document.querySelector(".countdown");
countdownText.innerText = countdown(1718006400000);
setInterval(() => {
  countdownText.innerText = countdown(1718006400000);
}, 60000);
