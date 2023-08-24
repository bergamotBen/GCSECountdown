countdown = (stamp) => {
  const currentTime = Date.now();
  const duration = stamp - currentTime;
  const msArray = [604800000, 86400000, 3600000, 60000, 1000];
  const durations = [];
  const intervals = ["weeks", "days", "hours", "minutes", "seconds"];
  const intervalsToDisplay = [];
  let remainder = duration;

  for (let i = 0; i < 5; i++) {
    if (Math.floor(remainder / msArray[i]) === 1) {
      intervalsToDisplay.push(intervals[i].slice(0, -1));
      durations.push(Math.floor(remainder / msArray[i]));
    } else {
      intervalsToDisplay.push(intervals[i]);
      durations.push(Math.floor(remainder / msArray[i]));
    }
    let next = remainder % msArray[i];
    remainder = next;
  }
  return `${durations[0]} ${intervalsToDisplay[0]}, ${durations[1]} ${intervalsToDisplay[1]}, ${durations[2]} ${intervalsToDisplay[2]}, ${durations[3]} ${intervalsToDisplay[3]}, ${durations[4]} ${intervalsToDisplay[4]}`;
};

countdown(1718006400000);
