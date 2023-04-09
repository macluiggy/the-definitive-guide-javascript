import fetch from "node-fetch";

function getUserData(userId) {
  return new Promise((resolve, reject) => {
    // Make an API call to get the user's data
    // (replace this with your own API call)
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Resolve the promise with the user's data
        resolve(data);
      })
      .catch((error) => {
        // Reject the promise if there's an error
        reject(error);
      });
  });
}

// getUserData(1)
//   .then((data) => {
//     console.log(`User name: ${data.name}`);
//     console.log(`User age: ${data.email}`);
//   })
//   .catch((error) => {
//     console.error(`Error: ${error.message}`);
//   });

const [user1, user2] = await Promise.all([getUserData(1), getUserData(2)]);
console.log(`User 1 name: ${user1.name}`);
console.log(`User 2 name: ${user2.name}`);
