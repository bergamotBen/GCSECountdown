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
    } else if (Math.floor(remainder / msArray[i]) === 1) {
      finalArr.push(
        ` ${Math.floor(remainder / msArray[i])} ${intervals[i].slice(0, -1)},`
      );
    } else {
      finalArr.push(` ${Math.floor(remainder / msArray[i])} ${intervals[i]},`);
    }
    let next = remainder % msArray[i];
    remainder = next;
  }
  return finalArr.join("").slice(0, -1);
};

const countdownText = document.querySelector("#stamp1");
countdownText.innerText = countdown(1716451200000);
setInterval(() => {
  countdownText.innerText = countdown(1716451200000);
}, 60000);

const countdownText2 = document.querySelector("#stamp2");
countdownText2.innerText = countdown(1717660800000);
setInterval(() => {
  countdownText.innerText = countdown(1717660800000);
}, 60000);

const purple = [199, 123, 219];
const pink = [237, 82, 121];
let currentColour = [199, 123, 219];

const background = document.querySelector(".bg");
background.style.backgroundColor = `rgb(${currentColour[0]}, ${currentColour[1]}, ${currentColour[2]})`;

const scroll = document.getElementById("wrapper");
scroll.addEventListener("scroll", () => {
  const scrollHeight = 2973;
  const percentage = scroll.scrollTop / scrollHeight;
  const rRange = pink[0] - purple[0];
  const gRange = purple[1] - pink[1];
  const bRange = purple[2] - pink[2];

  currentColour[0] = Math.round(percentage * rRange + purple[0]);
  currentColour[1] = Math.round(1 - percentage * gRange + purple[1]);
  currentColour[2] = Math.round(1 - percentage * bRange + purple[2]);
  background.style.backgroundColor = `rgb(${currentColour[0]}, ${currentColour[1]}, ${currentColour[2]})`;
});
