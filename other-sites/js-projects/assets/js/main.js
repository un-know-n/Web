// Challenges from codewars---------------------------------

// -----------Descending Order----------

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

// -----------Duplicate Count----------

// function duplicateCount(text) {
//   let arr = text.toLowerCase().split('').sort();
//   let temp = [];

//   for (let i = 0; i < arr.length; i++)
//     if (arr[i] === arr[i + 1]) if (!temp.includes(arr[i])) temp.push(arr[i]);
//   return temp.length;
// }

// function duplicateCount(text) {
//   return text
//     .toLowerCase()
//     .split('')
//     .filter((char, i, array) => {
//       return array.indexOf(char) !== i && array.lastIndexOf(char) === i;
//     }).length;
// }

// function duplicateCount(text) {
//   return (
//     text
//       .toLowerCase()
//       .split('')
//       .sort()
//       .join('')
//       .match(/([^])\1+/g) || []
//   ).length;
// }

// function duplicateCount(text) {
//   return new Set(text.toLowerCase().match(/(.)(?=.*\1)/gi)).size;
// }

// function duplicateCount(text) {
//   text = text.toLowerCase();
//   return [...new Set(text.split(''))].filter(
//     (c, i) => text.lastIndexOf(c) > text.indexOf(c)
//   ).length;
// }

// function duplicateCount(text){
//   return (
//     text.toLowerCase().split('').sort().join('').match(/(.)\1+/g)||[]
//   ).length;
// }

// let resultTwo = duplicateCount('Indivisibilities');
// console.log(resultTwo);

// ---------------Array.diff-----------------

// function arrayDiff(a, b) {
//   let result = [];
//   for (let i = 0; i < b.length; i++) {
//     let element = b[i];
//     for (let j = 0; j < a.length; j++) {
//       if (element === a[j]) {
//         a.splice(j, 1);
//         --j;
//       }
//     }
//   }

//   result = a.slice();
//   return result;
// }

// function arrayDiff(a, b) {
//   return [...a.filter((element) => !b.includes(element))];
// }

// function arrayDiff(a, b) {
//   return a.filter((e) => !b.includes(e));
// }

// function arrayDiff(a, b) {
//   return a.filter(function (x) {
//     return b.indexOf(x) == -1;
//   });
// }

// console.log(arrayDiff([1, 2, 2], [2]));

//-----------------------------------------

// ------------String ends with-------------

// function solution(str, ending) {
//   let counter = 0;
//   if (str.includes(ending)) {
//     let strArr = str.split('').reverse();
//     let endingArr = ending.split('').reverse();
//     for (let i = 0; i < endingArr.length; i++) {
//       if (strArr[i] == endingArr[i]) counter++;
//     }
//     if (counter === endingArr.length) return true;
//     else return false;
//   } else return false;
// }

// function solution(str, ending) {
//   //console.log(str.substr(-2));
//   return str.substr(-ending.length) == ending;
// }

// const solution = (str, ending) => str.endsWith(ending);

// console.log(solution('abcabc', 'bc'));

//-----------------------------------------

// List Filtering---------------------------

// function filter_list(array) {
//   return array.filter((item) => typeof item === 'number');
// }

// function filter_list(l) {
//   return l.filter(Number.isInteger);
// }

// console.log(filter_list([1, 2, 'aasf', '1', '123', 123]));

//-----------------------------------------

// Split Strings----------------------------

// function solution(str) {
//   if (str) {
//     let arr = str.match(/.{1,2}/g);
//     if (str.length % 2 !== 0) arr[arr.length - 1] += '_';
//     return arr;
//   } else return [];
// }

// function solution(s) {
//   return (s + '_').match(/.{2}/g) || [];
// }

// const solution = (str) => (str + '_').match(/../g) || [];

// function solution(str) {
//   let res = [];
//   for (var i = 0; i < str.length; i += 2)
//     res.push(`${str[i] + (str[i + 1] || '_')}`);
//   return res;
// }

// console.log(solution('dfsdfasdf'));

//-----------------------------------------

// Human Readable Time----------------------

// function humanReadable(seconds) {
//   let hours = 0,
//     mins = 0;

//   while (seconds > 59) {
//     if (mins >= 59) {
//       if (hours >= 99) return console.log('99:59:59');
//       mins -= 60;
//       hours++;
//     }
//     seconds -= 60;
//     mins++;
//   }

//   hours <= 9 ? (hours = '0' + hours) : '';
//   mins <= 9 ? (mins = '0' + mins) : '';
//   seconds <= 9 ? (seconds = '0' + seconds) : '';

//   return console.log(`${hours}:${mins}:${seconds}`);
// }

// function humanReadable(seconds) {
//   var pad = function (x) {
//     return x < 10 ? '0' + x : x;
//   };
//   return (
//     pad(parseInt(seconds / (60 * 60))) +
//     ':' +
//     pad(parseInt((seconds / 60) % 60)) +
//     ':' +
//     pad(seconds % 60)
//   );
// }

// console.log(humanReadable(359999));
// console.log(humanReadable(59));

// let date = new Date();
// let mins = date.getMinutes();
// console.log(mins);

// console.log(humanReadable(1));

//-----------------------------------------

// Stop Spinning My Words!------------------

// function spinWords(string) {
//   return string
//     .split(' ')
//     .map((item) => {
//       item.length > 5 ? (item = Array.from(item).reverse().join('')) : '';
//       return item;
//     })
//     .join(' ');
// }

// function spinWords(string) {
//   return string.replace(/\w{5,}/g, function (w) {
//     return w.split('').reverse().join('');
//   });
// }

// function spinWords(str) {
//   return str
//     .split(' ')
//     .map((w) => (w.length < 5 ? w : w.split('').reverse().join('')))
//     .join(' ');
// }

// console.log(spinWords('Just kidding there is still one more'));

//-----------------------------------------

// Sum of Digits/Digital Root---------------

// function digitalRoot(n) {
//   let temp = n.toString();
//   while (temp.toString().length > 1)
//     temp = temp
//       .toString()
//       .split('')
//       .reduce((acc, item) => {
//         return (acc += +item);
//       }, 0);
//   return Number(temp);
// }

// function digitalRoot(n) {
//   return (--n % 9) + 1;
// }

// function digitalRoot(n) {
//   return ((n - 1) % 9) + 1;
// }

// function digitalRoot(n) {
//   if (n < 10) return n;
//   return digitalRoot(
//     n
//       .toString()
//       .split('')
//       .reduce(function (acc, d) {
//         return acc + +d;
//       }, 0)
//   );
// }

// function digitalRoot(n) {
//   const answer = [...(n + '')].reduce((a, b) => +a + +b);
//   if (answer > 9) return digitalRoot(answer);
//   return +answer;
// }

// console.log(digitalRoot(4165416));

//-----------------------------------------

//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
//-----------------------------------------
// Server-try--------------------------------------------

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

/*
let array = [1, 2, 3, 4, 5];

Array.prototype.myMap = function (callback) {
  let result = [];
  let thisArr = this;
  for (let i = 0; i < thisArr.length; i++) {
    result.push(callback(thisArr[i], i, thisArr));
  }
  return result;
};

array.myMap((item, index, array) => {
  console.log((item * item).toString());
});
*/
