"use strict"

/*
=====================Session #1=======================

literals - fixed values, constants and variables
(ab|ba) - regular expression

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
first if true, second - if false

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
        We use arrow function to use "this", because default func
        will point us to "showOtherInfo"!
        let show = () => console.log(`${this.name} ${this.age} ${this.address.city}`);
        show();
    }

};

userInfo.showInfo();

-------------Functions-constructors

function UserInfo(name) {

    --- this = {}; We create empty object (unseen)

    this.name = name;
    this.age = 30;

    ---- return this; Return object (unseen)
}

console.log(new UserInfo("Someone"));


*/



