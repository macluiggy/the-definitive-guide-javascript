import fetch from "node-fetch";
const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.comddd/comments/2",
  "https://jsonplaceholder.typicode.com/todos/3",
];

const promises = urls.map((url) =>
  fetch(url).then((response) => response.json())
);

// with Promise.all
// if one of the promises is rejected, the whole Promise.all is rejected
const p = Promise.all(promises)
  .then((results) => {
    results.forEach((result) => {
      console.log(result);
    });
  })
  .catch((error) => console.log(error));
console.log(p);

// with Promise.allSettled
// even if one of the promises is rejected, the whole Promise.allSettled is resolved
const p2 = Promise.allSettled(promises)
  .then((results) => {
    results.forEach((result) => {
      console.log(result);
    });
  })
  .catch((error) => console.log(error));
