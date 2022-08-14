//Challenges from codewars---------------------------------

// function descendingOrder(n) {
//     let arr = String(n)
//         .split("")
//         .map((n) => {
//             return Number(n);
//         });
//     arr.sort();
//     arr.reverse();
//     let str = arr.join("");
//     let number = parseInt(str);
//     return number;
// }

// let result = descendingOrder(15);
// console.log(result);

// function duplicateCount(text) {
//   let counter = 0;
//   let secondArr = [""];
//   let arr = text.toLowerCase().split("");
//   for (let i = 0; i < arr.length; i++) {
//     secondFor: for (let j = i + 1; j < arr.length; j++) {
//       if (arr[i] == arr[j]) {
//         for (let k = 0; k < secondArr.length; k++) {
//           if (secondArr[k] == arr[j]) break secondFor;
//           else {
//             secondArr.push(arr[j]);
//             counter++;
//           }
//         }
//       }
//     }
//   }
//   return counter;
// }

// let resultTwo = duplicateCount("ABBA");
// console.log(resultTwo);

//Server-try--------------------------------------------

// let http = require('http');

// let ourApp = http.createServer(function (req, res) {
//   res.end('Welcome');
//   if (req.url == '/something') {
//     res.end('Here is something on the page!');
//   }
// });
// ourApp.listen(3000);

// let express = require('express');
// let app = express();

// app.use(express.urlencoded({ extended: false }));

// app.get('/', function (req, res) {
//   res.send(`
//   <form action='/answer' method='POST'>
//     <p>Answer:</p>
//     <input name="someColor" autocomplete="off">
//     <button>Submit</button>
//   </form>
//   `);
// }); //(url, func)

// app.post('/answer', function (req, res) {
//   if (req.body.someColor == 'blue') {
//     res.send('Thx for sending form!');
//   } else {
//     res.send('Nope!');
//   }
// });

// app.listen(3000);
