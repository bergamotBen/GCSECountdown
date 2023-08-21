countdown = (stamp, paper) => {
  const currentTime = Date.now();
  const duration = stamp - currentTime;
  const msArray = [604800000, 86400000, 3600000, 60000, 1000];
  const durationsArray = [];

  let remainder = duration;

  for (let i = 0; i < 5; i++) {
    durationsArray.push(Math.floor(remainder / msArray[i]));
    let next = remainder % msArray[i];
    remainder = next;
  }
  console.log(durationsArray, "to go until", paper);
};

countdown(1718006400000, "GCSE English paper one.");
