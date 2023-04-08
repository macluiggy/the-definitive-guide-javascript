import http from "http";

function getJSON(url: string) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(response.statusMessage));
          response.resume();
          return;
        }
        console.log(response.headers["content-type"]);

        if (!response.headers["content-type"]?.includes("application/json")) {
          reject(new Error("Invalid content-type"));
          response.resume();
          return;
        }
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.comddd/comments/2",
  "https://jsonplaceholder.typicode.com/todos/3",
];

const promises = urls.map(
  (url) => getJSON(url) //.then((response) => response.json())
);

// with Promise.all
// if one of the promises is rejected, the whole Promise.all is rejected
// const p = Promise.all(promises)
//   .then((results) => {
//     results.forEach((result) => {
//       console.log(result);
//     });
//   })
//   .catch((error) => console.log(error));
// console.log(p);

// with Promise.allSettled
// even if one of the promises is rejected, the whole Promise.allSettled is resolved
const p2 = Promise.allSettled(promises)
  .then((results) => {
    results.forEach((result) => {
      console.log(result);
    });
  })
  .catch((error) => console.log(error));
