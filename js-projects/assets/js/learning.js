"use strict"

/*
=====================Session #1=======================

literals - fixed values, constants and variables
("A-Z|a-z") - regular expression

-------Very Start-------

const smth = {
    name: 'Nine',
    age: 123,
    msg: 'something...'
}

smth.age = 18;
console.log(smth);

types: undefined, null, boolean, number, BigInt, string, 
symbol, object, function;

const bigInt = 34712534752136451287345n;
console.log(typeof bigInt);

infinity(56 / 0), -infinity(-56 / 0), NaN('somehting' / 10);

let userAge = 36;
let userAgeInfo = `Age: ${userAge}`;
console.log(userAgeInfo);

let id = Symbol("id");
console.log(typeof id);

let funcVar = function name(params) {
    //code
}
console.log(typeof funcVar);

const userAge = 18;
console.log(userAge);
userAge = String(userAge);
console.log(typeof userAge);

--------Operators----------

let userAge = '72' / '2';
console.log(typeof userAge); ----> number - 36

let userAge = 30 - 6; - binary operator
let userAge = -6; - unary operator

x = 11 % 3; - rest of division
x = 5 ** 3; - power something

let result = '2' + 2;
console.log(result); ---> 22

operator + can differ values

let result = +'25';
console.log(result); ---> number - 25

let number = 22;
let result = number + '';
console.log(typeof result); ---> string

let result = '25' - 5;
console.log(result); ---> number - 20

let result = 10 * '80';
console.log(result); ---> number - 800

let result = 10 * 'something';
console.log(result); ---> NaN

Special attention to the priority of the operators

let counter = 3;
counter += 2;
counter *= 5;
console.log(counter); ---> number - 25

let usersCounter = (8 + 2, 19 + 1);
console.log(usersCounter); ---> last expression - 20

Byte operators:
AND (&)
OR (|)
XOR (^)
NOT (!)
LEFT SHIFT (<<)
RIGHT SHIFT (>>)
ZERO-FILL RIGHT SHIFT (>>>)

console.log('B' > 'A'); - true
console.log('some' < 'someth'); - true

console.log(null === undefined); - false
console.log(null == undefined); - true

null - 0, undefined - NaN

console.log(null > 0); - false
console.log(null == 0); - false
console.log(null >= 0); - true

Operator (||) - return first "true" or last value
Operator (&&) - return first "false" or last value
priority of && is higher than ||
operator ! has the highest priority

----------------------------------------------------------------

operator ?? compares first value with undefined / null, and returns
first if false, second - if true

console.log(name ?? "No name"); ---> No name

----------------------------------------------------------------

console.log(!false && 11 || 18 && !''); ---> 11

====================Session #2====================

let msg = "Hello";
let msgEnd;

if(5 > 0) msgEnd = " World!";
else msgEnd = " Someone!";

let msgEnd = (5 > 1) ? " World!" : " Someone!";

msg += msgEnd;
console.log(msg);

for(let num = 0; num < 5; num++) {
    if(num == 2) continue;
    console.log(`Counter is ${num}`);
    //if(num == 2) break;

    We can't use break/continue with operator '?'
    (num != 2) ? console.log(num) : continue; ---x

}
console.log(`Counter is ${num}`);

---------Marks------

firstFor: for(let num = 0; num < 4; num++) {
    for(let res = 1; res < 5; res++) {
        if(res == 2) break firstFor;
        console.log(res);
    }
}

-----Functions-----

---------------Function Declaration
showMsg('Message!');
function showMsg (msg) {
    console.log(msg);
}
showMsg('Message!');

function defaultParams(numOne = 1, numTwo = 3) {
    ------Old JS-------
    numOne = numOne || 1;
    numTwo = numTwo || 3;
    -------------------

    let result = numOne + numTwo;
    console.log(`Result: ${result}`);
}
defaultParams(); ---> Result = 4
defaultParams(5, 9); ---> Result = 14

-------------Callback functions

function calcSum(numOne, numTwo, more, less) {
    let res = numOne + numTwo;

    if(res > 3) more();
    else less();
}
function showMore() {console.log("More");}
function showLess() {console.log("Less");}

calcSum(1, 2, showMore, showLess);

----------------Return in functions

function example() {
    some code....
    more code...

    return someValue;

    no more code executes here!!!!!!
}

---------------------Recursion

function calcSum(numOne, numTwo) {
    if (numOne === 1) return numOne;
    else return numOne * calcSumm(numOne, numTwo - 1);
}
console.log(calcSum(1, 2));

-----------------Function Expression

let showMsg = function() {
    console.log('Message!');
}
showMsg();
let otherFunc = showMsg;
otherFunc();

Difference between func declaration and expression is that with
declaration you can call your func wherever you want to, but with
expression - you can call it only after func

--------------Arrow functions
Syntax:
let funcName = (params) => code

const multiply = (a, b) => {console.log(a * b)};
multiply(2, 2);

let getMsg = (text, name) => text + ' ' + name + '!';
console.log(getMsg('Hello', 'World'));

Arrow function returns value every time, though it's not written

--------------Planing of setTimeout & setInterval
setTimeout(func or code, timeout(ms), params);
setInterval(func or code, timeout(ms), params);

let showMsg = (text, name) => console.log(`${text} ${name}!`);
showMsg('Hello', 'World');

setTimeout(showMsg(), 3000, 'Hello', 'World');

Clears Timeout/Interval:
let timeId = setTimeout(showMsg(), 3000, 'Hello', 'World');
clearTimeout/Interval(timeId);

Difference is setTimeout acts only once, but setInterval executes
every time the timer pases

-------------Objects-------------------
Syntax:
let userInfo = new Object(); --->"object constructor"
let userInfo = {}; --->"literal of object"

let firstPart = 'trully';
let userInfo = {
    name: "Someone",
    age: 43,
    "likes js": true,
    [firstPart + ' friendly']: true,
    [firstPart]: false
};
console.log(userInfo.age);
console.log(userInfo['age']);
console.log(userInfo["likes js"]); ---> true
console.log(userInfo["trully friendly"]);
console.log(userInfo[firstPart]);

With these brackets ( [] ) you can differ globar vars and object vars,
also this expands our possibilities. For example:

let key = "name";
console.log(userInfo[key]); ---> Someone

We can use reserved names inside our objects(let, for, while),
but that isn't preferable

let id = Symbol("id"); - creation of symbol id with name(description) "id"
let userInfo = {
    name: ...
    age: ....
    [id]: "Some value"
    address: {
        city: ....
        street: ...
    }
};
console.log(userInfo);
console.log(userInfo.address);

function makeUserInfo(name, age) {
    return {
        name: name,
        age: age
    };
};

let userInfo = makeUserInfo('Someone', 30);
console.log(userInfo);

userInfo.address = {
    city: ...
    street: ...
};

console.log(userInfo);

delete userInfo.address;

console.log(userInfo);

Also we can change values of constant objects

But duplicating objects is complicated, as example of 
NOT DUPLICATION:

let userInfo = {
    name: "Someone",
    age: 30
}
let user = userInfo;
user.age = 18;
console.log(userInfo); ---> age = 18

DUPLICATION:
Syntax: Object.assign(object, properties)

let user = Object.assign({}, userInfo);
user.age = 18;
Now they have different age values

-----------Check if object has values we need
if(userInfo.age) do smth...

Optional chains

console.log(userInfo?.address?.street);

Operator "in", we need to use it when we have field in object, but
it has undefined value

let userInfo = {
    name: undefined
};

if("name" in userInfo) do smth...

-------------Cycle For In
We use it to sort out our object for all the fields

for (let key in userInfo) {
    keys:
    console.log(key);
    values of the keys:
    console.log(userInfo[key]):
}

---------------Functions as values

We can also have functions as our values
(this - pointer to current object/class)
There're a lot of benefits to use "this", for example if we have
copied a link to our object in other variable, we wont miss
our data if we have nulled first variable;

let user = userInfo;
userInfo = null;
user.showInfo(); ---> it will work if use "this", instead of object name,
because we tie our output to the object name


let userInfo = {
    name: "someone",
    age: 30,
    address: {
        city: "City",
        street: "Street"
    },
    showInfo: function() {
        console.log(`${this.name} ${this.age} ${this.address.city}`);
    },
    showOtherInfo() {
        Usage of function expressions

        We use arrow function to use "this", because default func
        will point us to "showOtherInfo"!
        let show = () => console.log(`${this.name} ${this.age} ${this.address.city}`);
        show();
    }

};

userInfo.showInfo();

-------------Functions-constructors

function UserInfo(name) {

    //--- this = {}; We create empty object (unseen)

    this.name = name;
    this.age = 30;

    //---- return this; Return object (unseen)
}

let userInfo = new UserInfo('Someone');

console.log(userInfo.age);


====================Session #3================

------------Numbers-----------

let number = 1000000;
let anotherNumber = 1e6; //1 * 1000000

let minNumber = 0.000001;
let anotherMinNumber = 1e-6; //1 / 1000000

Math round to lower value
let numOne = Math.floor(5.8); ---> 5
let numTwo = Math.floor(2.2); ---> 2
let numThree = Math.floor(-2.2); ---> -3

Math round to higher value
let numOne = Math.ceil(5.8); ---> 6
......

Math round to closer value
let numOne = Math.round(5.4); ---> 5

Round to 'n' amount of signs after comma

let numOne = 5.845;
console.log(Number(numOne.toFixed(1))); ----> 5.8

------------Problem with calculations(roundings)

console.log(0.1 + 0.2); ---> 0.300...0004

Half-Answer: console.log(0.1+0.2+Number.EPSILON);

------------Check if number isFinite & isNaN

console.log(isFinite(56 / 0)); ---> false
console.log(isNan(56 / 'asda')); --->true

The reason why we can't use default check with NaN is that
every NaN is unique value

------------Usage of parseInt & parseFloat

If we need to get value with symbols in it(like "150px" or "1.5rem")
then, to our help, we can use parseInt/parseFloat. For example:

let value = parseInt('150.58px'); ---> 150
let value = parseFloat('150.58px'); ---> 150.58

parseInt/parseFloat('a123asd'); - IT WON'T WORK

----------Math

.random(); ---> random value from 0.0...01 to 1(not included)
.min(param1, param2, param3, param4); - understandable
.max(param1, param2, param3, param4); - understandable
.abs(-58); ---> 58
.pow(n, power); ---> 5^3 = 125

--------------Strings----------------

function someSum(a, b) {
    return a + b;
}
console.log(`Summ: ${someSum(4, 7)}`);

-------------Multiline text
let text = `lorem
ipsum
dolor`;

------------Usage of icons & symbols in text

let text = 'lorem ipsum dolor sit amet \u00A9 \u{1F60D}';
console.log(text);

-------------Length

let text....
console.log(text.length);
console.log(text[0]);
console.log(text[text.length - 1]);

Output of every symbol in word

for(const char of text) {
    console.log(char);
}

-------------Cases

text.toUpperCase();
text.toLowerCase();

-------------Substring search
Syntax: str.indexOf(substr, pos); --- returns position where match was found or -1, if not
Syntax: str.includes(substr, pos);
.....


let text = "Something!";
console.log(text.indexOf('ome')); ---> 1

Register has value!

let text = 'some';
let search = 'OMe';

console.log(text.toLowerCase().includes(search.toLowerCase()));

If u need to have a part of substring - use method slice(start pos, end pos)

===============================Session #4==============================

----------------Arrays-----------------

let arr = new Array();
let arr = [val1, val2...];

Arrays can include values of different types:

let arrTwo = [
    "Someone",
    {
        type: "js",
        age: 100000000
    },
    true,
    function() {
        console.log("Hello");
    }
];

console.log(arrTwo);
console.log(arrTwo.length);
console.log(arrTwo[1].type); ---> js
arrTwo[3]();

Array acts like object, so it has the same options, like
copying as link

let someArr =....;
let anotherArr = someArr;

someArr[0] = 1;
console.log(anotherArr[0]); ---> 1

-----------Methods of arrays

push - add element(s) to the end of the array
let arr = [1, 2, 3, 4, 5, 6];
console.log(arr.push(7, 8, 9));

shift - delete first element in the array
console.log(arr.shift());

pop - delete last element in the array
console.log(arr.pop());

unshift - add element(s) into the start of an array
console.log(arr.unshift(0, 1));

-----------Changing of the specific elements

let arr = [1, 2, 3, 4, 5, 6];
delete arr[1];
console.log(arr); ---> [1, empty, 3, 4...]

----Method splice
Syntax: arr.splice(index, deleteCount, elem1, ...., elemN);

Delete element
arr.splice(1, 1);

Add element 
arr.splice(1, 0, '23', '43');

Delete from the end
arr.splice(-1, 1);

Change elements
arr.splice(0, 1, 'Changed');

-----Copying the array!!
Syntax: slice(start, end); end - not included, if copying partly

let anotherArr = arr.slice(); ---> full copy
let anotherArr = arr.slice(1, 2); --->certain elems

-----Copying the array with adding the value into the end!!
Syntax: concat(arg1, arg2, arg3);

let anotherArr = arr.concat('Added value');
console.log(anotherArr); ---> [....., Added value]

----Show the index
Syntax: indexOf(item, from), lastIndexOf(right to left), includes(item, from) - true if right, 
false if not;

-----Search the array with specific queries(find & findIndex)
Syntax: let result = arr.find(function(item, index, array) {
    1)returns current elem - if found
    2)returns undefined if not
});

let arr = [
    { name: 'Some', age: 18 },
    { name: 'Sfgh', age: 35 },
    { name: 'Adesfs', age: 65 }
]

let resultOne = arr.find(function(item, index, array) {
    return item.age === 18;
});
console.log(resultOne); ---> object

let resultTwo = arr.findIndex(item => item.age === 18);
console.log(resultTwo); ---> 1

------Search the array with filter
Syntax: let result = arr.filter(function(item, index, array) {
    1)returns current elements - if found
    2)returns empty array if nothing is found
});

The difference between filter and find is that "find" can 
only return one options, but with "filter" you get all of them

let resultOne = arr.find(function(item, index, array) {
    return item.age >= 18;
});
console.log(resultOne); ---> 2 arrays

----------------Sorting in the array
Syntax: arr.sort(fn);

let arr = [8, 22, 1];
console.log(arr.sort()); ---> [1, 22, 8]
Because it sorts out the array as string

To set things right we have to code our own function:

function compareNumeric(a, b) {
    console.log(`Compare ${a} and ${b}`);
    // if(a > b) return 1;
    // if(a == b) return 0;
    // if(a < b) return -1;

    OR WE CAN WRITE:

    return a - b;
}
console.log(arr.sort(compareNumeric)); ---> [1, 8, 22]
||
console.log(arr.sort((a, b) => a - b)); ---> [1, 8, 22]

Also there is a metod .reverse - understandable in which cases to use

-----------Usage of map
It calls a function to apply to every element of an array. Example:

let arr = ['Hello', 'World!'];
let result = arr.map(function(item, index, array) {
    return item[0];
});
console.log(result); ---> ["H", "W"];

---------------Usage of split & join
"Split" can translate string into array with specific separator, 
also we can stricly define number of elements in array;

let str = 'Lorem,ipsum,dolor';
let arr = str.split(',');
let arr = str.split(',', 2);

"Join" can translate array into string with specific separator

let arr = ["Lorem","ipsum","dolor"];
let str = arr.join(',');
||
let str = String(arr);

----------------Check if that is array
Arrays are based on objects, so to define what is what,
we need to use Array.isArray();

if(Array.isArray(arr)){
    .....do smth
}

-----------------Usage of loops with array

Use default for | while | do while....

----Use FOR....OF
let arr = ['Hello', 'World!'];

for(let arrItem of arr) {
    console.log(arrItem);
}

----Use ForEach
arr.forEach(function(item, index, array) {
    console.log(`Element ${item} is under ${index} index`);
})

Arrow func
arr.forEach((item, index, array) => {
    console.log(`Element ${item} is under ${index} index`);
});

--------------------Usage of reduce metod
Reduce is more complicated than map, or loops, but similar to them
We use it to calculate some value from the entire array. Example:

let arrOne = [1, 2, 3, 4];
let result = arrOne.reduce(function(previousValue, item, index, array) {
    return item + previousValue;
}, 0 - '[initial]');
console.log(result); ---> 10

reduceRight works similarly, but from the right to the left

!!!!!!!The most important - don't work with arrays like with objects

Practice part:

let users = ["Vanya", "Ishtvan"];
users.push("Olya");
let result = users.findIndex(function(item, index, array) {
    if(item === "Ishtvan") return index;
});
users[result] = "Petya";
let delElem = users.shift();
users.unshift("Masha", "Pasha");

console.log(users);
console.log(delElem);


*/

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