const countdown = (stamp) => {
  const currentTime = Date.now();
  const duration = stamp - currentTime;
  const msArray = [604800000, 86400000, 3600000, 60000];
  const intervals = ["weeks", "days", "hours", "minutes"];
  const finalArr = [];
  let remainder = duration;

  for (let i = 0; i < 4; i++) {
    if (Math.floor(remainder / msArray[i]) === 0) {
      finalArr.push("");
    }
    if (Math.floor(remainder / msArray[i]) === 1) {
      finalArr.push(
        ` ${Math.floor(remainder / msArray[i])} ${intervals[i].slice(0, -1)}`
      );
    } else {
      finalArr.push(` ${Math.floor(remainder / msArray[i])} ${intervals[i]},`);
    }
    let next = remainder % msArray[i];
    remainder = next;
  }
  return finalArr.join("").slice(0, -1);
};

const countdownText = document.querySelector(".countdown");
countdownText.innerText = countdown(1718006400000);
setInterval(() => {
  countdownText.innerText = countdown(1718006400000);
}, 60000);
