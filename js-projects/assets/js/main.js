//Challenges from codewars

// function descendingOrder(n) {
//     let arr = String(n).split("").map((n) => {
//         return Number(n);
//     });
//     arr.sort();
//     arr.reverse();
//     let str = arr.join("");
//     let number = parseInt(str);
//     return number;
// }

// let result = descendingOrder(15);
// console.log(result);


// function duplicateCount(text){
//     let counter = 0;
//     let secondArr = [""];
//     let arr = text.toLowerCase().split("");
//     for(let i = 0; i < arr.length; i++) {
//         secondFor: for (let j = i+1; j < arr.length; j++) {
//             if(arr[i] == arr[j]) {
//                 for (let k = 0; k < secondArr.length; k++) {
//                     if(secondArr[k] == arr[j]) break secondFor;
//                     else {
//                         secondArr.push(arr[j]);
//                         counter++;
//                     }    
//                 }
//             }
//         }
//     }
//     return counter;
// }

// let resultTwo = duplicateCount("ABBA");
// console.log(resultTwo);
