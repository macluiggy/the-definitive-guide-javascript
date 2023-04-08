function wait(duration: number) {
  return new Promise((resolve, reject) => {
    if (duration < 0) {
      reject(new Error("Time travel is not yet supported"));
    }
    setTimeout(resolve, duration);
  });
}

wait(-1000)