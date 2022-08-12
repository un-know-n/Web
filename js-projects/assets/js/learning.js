"use strict";

/*
____________Freelancer-life-style course____________


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

!If you transfer the function, than you dont need to execute it
!(just "function", not "function()")!

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

setTimeout(showMsg, 3000, 'Hello', 'World');

Clears Timeout/Interval:
let timeId = setTimeout(showMsg, 3000, "Hello", "World");
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

Arrays can include values of different types, but it's not preferable

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

?----Show the index
Syntax: indexOf(item, from), lastIndexOf(right to left), includes(item, from) - true if right, 
false if not;

?-----Search the array with specific queries(find & findIndex)
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

?------Search the array with filter
Syntax: let result = arr.filter(function(item, index, array) {
    1)returns current elements - if found
    2)returns empty array if nothing is found
});

.find() will look and stop after the first match, whereas, .filter() 
will continue searching through the entire array

The main difference between them is that "find" returns an object,
but "filter" returns an array of objects.
And if search fails, find will return undefined while filter will 
return an empty array []

let resultOne = arr.find(function(item, index, array) {
    return item.age >= 18;
});
console.log(resultOne); ---> 2 objects

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

=========================Session #5==========================
JavaScript: Array, Object, Function...
BOM(Browser Object Model): navigator, location, history...
DOM(Document Object Model): document...

--------------------BOM-----------------------

console.log(navigator.userAgent);
console.log(navigator.platform);
if(navigator.userAgent.includes("Chrome")) console.log("Browser Chrome");
console.log(location.href);
history.back();
history.forward();

alert("Hello");
const confirmRes = confirm("Cookies?");
const promptRes = prompt("Who r u?")

----------------------DOM---------------------------

Everything that html has is part of DOM tree

const htmlElement = document.documentElement;
const headElement = document.head;
const bodyElement = document.body;

const firstBodyNode = bodyElement.firstChild;
const lastBodyNode = bodyElement.lastChild;

------Take collection of every child node
const childNodes = bodyElement.childNodes;
console.log(bodyElement.hasChildNodes());

!!Attention: childNodes is similar to array, but it's not,
!it's a collection, pseudo-array. The difference is that methods 
!of an array won't work with that(understandable), and we can use 
!for...of with collection

const parentNode = bodyElement.parentNode;(also previousSibling, nextSibling)

-----Take collection of every child tag
const bodyChildren = bodyElement.children;

!To every method there's a way to see element, not node(firstElementChild,
!lastElementChild...)

-----------Search for random element
Syntax: document.querySelectorAll(CSS);

const specElem = document.querySelectorAll('li.selected-item');
const specElem = document.querySelectorAll('.session-list>li');
const specElem = document.querySelectorAll('[data-item="85"]');

console.log(specElem[2]);

for(const item of specElem){
    console.log(item);
}

We can look for elems not only in "document"
const subList = document.querySelectorAll('.session__list');
const subItems = subList[0].querySelectorAll('li');

Difference between querySelectorAll & querySelector is that
the second one can return only one element

!!!So, there's a few methods that we can use too(use everything with 
!!!"document. "!!!): 
*They return a "live" collection
-getElementById(id);
-getElementsByClassName(className);
-getElementsByTagName(tag); ELEMENTS!!!
-getElementsByName(name);

!!!Attention "querySelectorAll" doesn't return a "live" collection

We can find closest block of the element:
(difference between parentElement & closest is that
the first one returns only immediate parent, meanwhile
closest finds specific block up to ierarchy)

---------Check the CSS-Selector
const elems = document.querySelectorAll('.session-list');
for(elem of elems) {
    (elem.matches('[class$="item-red"]')) ? console.log("Red") : console.log("Other color");
}

---------------------Changing the HTML---------------------

------------Inner HTML
const textElement = document.querySelector('.lesson_text');
const textElementContent = textElement.innerHTML;

textElement.innerHTML = "Something new...";
||
textElement.innerHTML = `<p>${textElementContent}</p>
<p>Also something new....</p>`;

--------------Outer HTML
!!Difference between inner & outer is that "outer" takes whole 
!element, but "inner" takes only inner part

textElement.outerHTML = "Something new...";

-----------Text changing
It grants us the abbility to change text "safely"

const textElement = document.querySelector(...);
const textElementContent = textElement.textContent;
console.log(..); --> only text

The "data" property gives us abillity to take text from the 
comments in HTML

const getComment = textElement.nextSibling;
console.log(getComment.data);

--------------Tags/elements creation and insertion

const newElement = document.createElement('div');
console.log(newElement);

const newText = document.createTextNode('Hello!');

---------Insertion part

const textElement = document.querySelector(...);

textElement.before(newElement);
textElement.after(newElement);
textElement.prepend(newElement); - inside & start
textElement.append(newElement); - inside & end

*More effective tool is insertAdjacentHTMl/Text/Element

textElement.insertAdjacentHTML(
    'afterend',
    `some HTML...`
);

textElement.insertAdjacentText(
    'afterend',
    `some "safe" text(maybe with tags)`
);

textElement.insertAdjacentElement(
    'afterend',
    newElement
);

Options to insert:
-"beforebegin"
-"afterbegin"
-"beforeend"
-"afterend"

--------------Transportation of the existing elements

!!All methods of transportation automatically delete nodes
!from the old places

const title = document.querySelector('h3');
someElement.append(title);

*Also we can use .cloneNode() to clone some element and paste it
*wherever we need to. (Attention: to make full copy we need
*to type .cloneNode(true));

To remove element we need to write elem.remove();

------------------Styles and Classes(className & classList)------

const title = document.querySelector('h3');
title.className = 'red';

!Difference between className & classList is that with "classList"
!you can add new classes to the existing ones

title.classList.add('red');
title.classList.remove('red');
title.classList.toggle('red'); - disable/enable class
title.classList.contains('red'); - check if exists

*ClassList is enumerable, so we can use for...of

for(let className of title.classList) {
    console.log(className);
}

---------Style property

!It uses inline styles

title.style.color = 'red';
title.style.marginBottom = '10px';

A lot of styles:

title.style.cssText = `
margin-bottom: 30px;
color: red;`;

----------Get styles

!We can only read those values

const elementStyle = getComputedStyle(title);
const elementAfterStyle = getComputedStyle(title, "::after");
console.log(elementStyle.fontSize);

------------------------Attributes & properties

const link = document.querySelector('.session__link');
console.log(link.href);
console.dir(link); - to look through all the values

---------Properties part

link.hasAttribute('name');
link.getAttribute('name');
link.setAttribute('name', 'value');
link.removeAttribute('name');

link.setAttribute('id', '123');
console.log(input.id); ---> 123

input.id = '312';
console.log(input.getAttribute('id')); ---> 312

!To get data-attr we need to use .dataset....

------------Usefull properties

.tagName - shows the name of the tag
.hidden - allows you to hid elem

============================Session #6========================

---------------------Size, scroll, coordinates-------------------

*Usable sizes of the window(only that we can see):
const mainElement = document.documentElement;
console.log(mainElement.clientWidth);
console.log(mainElement.clientHeight);

*To have sizes of the window with scrollbars, we need to use:
console.log(window.innerWidth);
console.log(window.innerHeight);

!To take all usable size of client window, we need to code
!a func, that returns us the maximum value of it

-----------Amount of scrolled pixels
!Only for reading

const windowScrollTop = window.pageYOffset;
const windowScrollLeft = window.pageXOffset;

-----------Control of the scroll on the page

function setScrollBy() {
    window.scrollBy(0, 50); - we can use it many times to move lower
    *it can be stacked
}

function setScrollTo() {
    window.scrollTo({
        top: 100,
        left: 0,
        behavior: "smooth"
    });
    window.scrollTo(0, 150);
}

----Scroll to the specific element

!If scrollIntoView(true) - it scrolls elem to the search border,
!scrollIntoView(false) - to the bottom of the page

function setScrollIntoView(top) {
    const selectedElem = document.querySelector(...);
    selectedElem.scrollIntoView(top);
    selectedElem.scrollIntoView({
        block: "center", - vertical pos
        inline: "nearest", - horizontal pos
        behavior: "smooth"
    });
}

----To disable the scroll

function disableScroll() {
    document.body.style.overflow = "hidden";
}

-----------------Metrics of the elements on the page

----Usage of offsetParent, offsetLeft & offsetTop

const block = document.query....;
const elementOffsetParent = block.offsetParent; (parent with positioning: absolute, fixed... || body || table, td, th)
*That is outer offset of the element (mar-left, mar-top), due to parent
console.log(block.offsetLeft);
console.log(block.offsetTop);

----General(with borders/margins) sizes of element

console.log(block.offsetWidth);
console.log(block.offsetHeight);

----Offsets(border size) of inner part of an element

console.log(block.clientTop);
console.log(block.clientLeft);

----Client(only inner block, without borders/margins) sizes of element

console.log(block.clientWidth);
console.log(block.clientHeight);

----Full sizes of scroll area

console.log(block.scrollWidth);
console.log(block.scrollHeight);

----Sizes of hidden scrolled area
!Can be changed(not only for reading)
console.log(block.scrollLeft);
console.log(block.scrollTop);

*You should use all of these properties to take sizes of an object,
*instead of "getComputedStyles"

---------------------Coords

?Systems of coordinates:
-From the browser window(clientX/clientY): position: fixed
left top corner of inner window
-From the document(pageX/pageY): position: absolute
left top corner of document

----Coordinates, depending on clients window

const item = document.query...;
const getItemCoords = item.getBoundingClientRect(); - .left/.right
console.log(getItemCoords);

!If u want to get coordinates depending on document:

const getItemCoords = item.getBoundingClientRect() + window.pageYOffset;

----Show element on coords(depending on window position)

const elem = document.elementFromPoint(100, 100);
console.log(elem);


========================Session #7=============================

------------------------Events-------------------------------

const button = document.querySelector('.introduction__button');
const frame = document.querySelector('.introduction__frame');

button.onclick = function() {
    console.log('Click happened');
}

function showConsole() {
    console.log('Click happened');
}

button.onclick = showConsole;

----addEventListener & removeEventListener

button.addEventListener('click', function(e) {
    console.log('click');
});

button.addEventListener('click', showConsole);
button.removeEventListener('click', showConsole);

----Parameters

const options = {
    "capture": false, //specific phase(connected with ascend & descent)
    "once": true, //automatically delete the listener
    "passive": false //if true - never use preventDefault()
};

button.addEventListener('click', showConsole, options);

----Object event

function showConsole(event) {
    //Type of event
    console.log(event.type);
    //Object which called an event
    console.log(event.target);
    //Object to whict was tied specific listener
    console.log(event.currentTarget);
    //Cursor x position
    console.log(event.clientX);
    //Cursor y position
    console.log(event.clientY);

    //All the details
    console.log(event);

    console.log("Yay");
}

button.addEventListener('click', showConsole);

----Ascent and Descent

!If there are many listeners(element inside other element), then
!we can see how every listener reacts if we tap on the latest children(element)

*If we want to stop ascent, then we need to write(in the very child elem):
*event.stopPropagation()

!The descent gives us ability to override the order of acting in eventListeners
!if we type {"capture": true}, then this listener will take off first and then the next

----Event delegation

That thing is usable when we want to make many elements react on 
the same event similarly

!Wrong way:

button.forEach(buttonItem => {
    buttonItem.addEventListener("click", showConsole);
});

*Right way:

frame.addEventListener('click', function (event){
    if(event.target.closest('.introduction__button')) {
        showConsole();
    }
});

----USEFULL PART

const menuBody = document.querySelector('.menu');

document.addEventListener('click', menu);

function menu(event) {
    if (event.target.closest('.menu__button')) {
        menuBody.classList.toggle('_active');
    } 
    if (!event.target.closest('.menu')) {
        menuBody.classList.remove('_active');
    }
}

----Default browser actions

! event.preventDefault(); - gives us abillity to discard default 
! browser actions (or "return false;" if .onclick)
? Also we can use it to forbid user do something(send form, etc...)

-----------Types of events

----Mouse events
We can divide events on "simple" & "complex"
"Simple" are:

mousedown / mouseup - pressed/released on element
mouseover / mouseout - shows over elem/get off it
* for mouseover: .target - moved to element, .relatedTarget - from which passed(relatedTarget -> target)
* for mouseout: .target - from which passed, .relatedTarget - moved to element(target -> relatedTarget)
mouseenter / mouseleave - shows over elem/get off it
!The difference is that they(mouseenter / mouseleave) don't ascend(dont count entering on other elems);
mousemove - every move of mouse over elem
contextmenu - if u want to open context menu

"Complex" are(they are done from the simple ones):

click - if mousedown & mouseup over the same elem
dblclick - understandable

const blockForMouse = document.querySelector('.block-for-mouse');

blockForMouse.addEventListener('mousemove', function(event) {
    blockForMouse.innerHTML = 
    `clientX: ${event.clientX} <br> clientY: ${event.clientY}`;
})

!But mouseover / mouseout have advantage in delegation:

blockForMouse.addEventListener('mouseover', function(event) {
    let target = event.target.closest('span');
    if(!target) return;
    target.style.cssText = `background-color: #77608d; `;
});

blockForMouse.addEventListener('mouseout', function(event) {
    let target = event.target.closest('span');
    if(!target) return;
    target.style.cssText = ``;
});

----Keyboard events(keydown & keyup)
Also usable: event.code(depends on pressed key) 
& event.key(depends on sys language)
event.repeat - if key is pressed many times

const txtItem = document.querySelector('.textarea__item');
const txtItemLimit = txtItem.getAttribute('maxlength');
const txtCounter = document.querySelector('.textarea__counter span');

txtCounter.innerHTML = txtItemLimit;

txtItem.addEventListener("keyup", txtSetCounter);

txtItem.addEventListener("keydown", function(event) {
    if(event.repeat) txtSetCounter();
})

function txtSetCounter() {
    const txtCounterResult = txtItemLimit - txtItem.value.length;
    txtCounter.innerHTML = txtCounterResult;
}

----------------Scroll event

window.addEventListener('scroll', function(event) {
    console.log(window.scrollY);
})

--------------Page-loading events

DOMContentLoaded(document) - fully created page with DOM, but resources may be unloaded yet
load(window) - browser downloaded html and external files(styles, images...)
beforeunload / unload - user is leaving the page

document.readyState - loading condition(we have 3 diff. options):
"loading" - understandable
"interactive" - document is fully read
"complete" - document is fully read + all the resources are downloaded

----Practice part

document.addEventListener('DOMContentLoaded', readyDOM);
window.addEventListener('load', readyLoad);

function readyDOM() {
    console.log(document.readyState);
    console.log('DOM is loaded!');
}

function readyLoad() {
    console.log(document.readyState);
    console.log('Page is loaded!');
}

window.addEventListener('beforeunload', beforeUnload);

Highlight the text on the page & try to reload it

function beforeUnload(event) {
    event.preventDefault();
    event.returnValue = '';
}

*If user has already left the page -> we can make browser do something

window.addEventListener('unload', function(event) {
    navigator.sendBeacon(url, data);
});


--------------------------Forms--------------------------

----Taking all the forms on the page(collection):

console.log(document.forms);

const mainForm = document.forms[0];
console.log(mainForm);

const mainForm = document.forms.main;
console.log(mainForm.elements);
console.log(mainForm.nameInput);

----Taking the parent of an element

const mainFormInput = mainForm.nameInput;
console.log(mainFormInput.form);

----Taking the value of input/textarea

const mainFormTextarea = mainForm.nameTextarea;
!Can be changed(not only for read)

console.log(mainFormInput.value);
console.log(mainFormTextarea.value);
console.log(mainFormFile.value);


----Taking options of the checkbox/radiobuttons

console.log(mainFormCheckbox.value);
console.log(mainFormCheckbox.checked);

----"<select>" options
-select.options - collection of <option>'s
-select.value - value of selected <option>
-select.selectedIndex - number of selected <option>

*To take text of selected option

console.log(mainFormSelect.options[mainFormSelect.selectedIndex].text);

----Select specific option

mainFormSelect.options.selected = true;
mainFormSelect.selectedIndex = 1;
mainFormSelect.value = 2;

----Add an option(new Option)
Syntax: option = new Option(text, value, defaultSelected, selected);

-defaultSelected - puts an HTML attr. "selected"
-selected - if true, that elem is selected

let newOption = new Option(...);
mainFormSelect.append(newOption);

----Case of "multiple"

Take collections of select with "multiple"

let selectedOptions = Array.from(mainFormSelect.options)
    .filter(option => option.selected)
    .map(option => option.value);

--------------Events of form(focus & blur)

const mainFormInput = mainForm.nameInput;

mainFormInput.focus();
mainFormInput.blur();

mainFormInput.addEventListener('focus', function(e) {
    mainFormInput.placeholder = '';
});

mainFormInput.addEventListener('blur', function(e) {
    mainFormInput.placeholder = 'Input smth...';
});

*If u want to take current focused element

console.log(document.activeElement);

----Ascending events(focusin & focusout)

Works similar to focus/blur, but gives the abillity to ascend

----"Change" event

It works out immediately after changing the element

----"Input" event

Works every time, when we change\type symbol in the field

----"Cut, copy, paste" events

Works every time, when something is copied, pasted...
!Or you can stop user actions with event.preventDefault();

----"Submit" (if u want to send the form)

*If we want to send form every time user "blurs" it:

mainFormInput.addEventListener("blur", function(e) {
    mainForm.submit();
});


???======================Filling in the gaps===============????

--------------------Dates--------------

let now = new Date();
console.log(now);
console.log(now.getMonth()); //counts from zero
console.log(now.getFullYear());
console.log(now.setDate(now.getDate() + 2));

-----------------Sorting the array--------------
-----------High-order functions(every, some, find, filter, map, reduce...)
All of the take the callback function:
"function(elem, index, array)", but none of them changes
the real array.

let arr = [1, 2, 3, 4, 5, 6, 7];
let flattened = [[0, 1], [2, 3], [4, 5]];
let newArr = [];

--------forEach
arr.forEach(element => {
    newArr.push(element * element);
});

newArr = arr.forEach(element => {
    return element * element;
}); //-----> undefiened

-------map
!It is different from forEach, it can return a value
newArr = arr.map(elem => {
    return elem * elem;
});

Real-word task, take response from JSON
array = response.map(function(elem) {
    return {
        name: elem.name;
        email: elem.email;
    }
});

-------filter
it must have function-predicat(return true or false)
newArr = arr.filter(elem => {
    return (elem > 5);
});

Real-word task, take response from JSON
newArr = response.filter(elem => {
    if(elem.isActive){
        return {
            name: elem.name;
            email: elem.email;
        }
    }
});

---------every & some
Every looks through all array and compare every value, if even 
one of them doesnt apply, then it returns false to all array
Some works in reverse way
newArr = arr.some(elem => {
    return elem > 6;
});

newArr = arr.every(elem => {
    return elem > 0;
}); 

-----------reduce & reduceRight(the same)
It calculates a value from entire array
newArr = arr.reduce((sum, elem) => {
    return sum += elem;
}, 3); // initial for SUM!!!(we can also put ['text'] if sort an object with arrays)

newArr = flattened.reduce((sum, elem) => {
    return sum.concat(elem);
});

newArr = friend.reduce((sum, elem) => {
    return sum.concat(elem.books);
    //return [...sum, ...elem.books];
}, ["1984"]);


console.log(newArr);

-----------------------Functions--------------------
-----------------------Pseudo-array arguments

function setAlphabet() {
    its just an abject with keys and length
    console.log(arguments);
    console.log(arguments.length);
    console.log(arguments.concat(['f', 'g'])); ----> error

    let arr = [];

    for (let i = 0; i < arguments.length; i++) {
        arr[i] = arguments[i];
    }

    Another variants
    let arr = [...arguments];
    let arr = Array.prototype.slice.call(arguments);

    console.log(arr.concat(['f', 'g']));
}

setAlphabet('a', 'b', 'c', 'd', 'e');

-------------------------Named expression functions

let f = function factorial(n) {
    return n ? n * factorial(n - 1) : 1;
}

let g = f;
f = null;

console.log(g(5));

-------------------------------'this' and call context
function func(){
    'use strict';
    console.log(this);
}

func();

---------------Object copy + plus internal objects - JSON.parse(JSON.stringify(object));

-------------------------Closuring
Closure is a func and all the variables that it can get

All variables inside func are properties 
of inner object "lexical environmnet",
when starting function types every var., argument, func in here

Every func has "lexical environmnet", it is created every 
time the function called, also it has "scope", which looks through
own "lexical environmnet" and if it doesnt find need variable
it looks in parent "lexical environmnet";


function sayHi(name) {
    //LexicalEnvironment = {name: 'Jack', phrase: 'undefined'};
    let phrase= 'Hello ' + name;
    //LexicalEnvironment = {name: 'Jack', phrase: 'Hello Jack'};
    console.log(phrase);
}

sayHi('Jack');

----------------------------
sum(1)(2);

function sum(a){
    return function(b){
        return console.log(a + b);
    }
}
----------------------------

function makeCounter() {
    let currentCount = 1;

    return function(){
        return currentCount++;
    }
}

let counter = makeCounter();

console.log(counter());
console.log(counter());
console.log(counter());
console.log('--------------------------');

let secondCounter = makeCounter();

console.log(secondCounter());
console.log(secondCounter());

------------------------------------

const button = document.querySelectorAll('button');

for(var i = 0; i < button.length; i++) {
    button[i].innerHTML = i;
    button[i].onclick = function(x){
        return function(){
            console.log(x);
        }        
    }(i);
}

-----------------------------------Module through Closuring
Module is used to hide inner logic(like variables, functions, objects...),
that's usable when we want to import our file without making a conflict
of the already existing names
(Anonymous self-executing function)

Module with closuring - is a wrapping a pack of functional in one 
momentally executing function

(function (){
    let msg = "hi";

    function sayHi() {
        console.log(msg);
    }

    sayHi();
})();

?Or type like that:

+(/!)function() {
    console.log('hi');

    *We also can return value like this:
    return {
        defaults: function() {//...}
    }
}();

----------------------------------Context binding
"this" - current object by calling through '.' || new object with 
constructing by new

There are 3 methods to point outthe context: call, apply, bind
!bind doesnt execute the function, just takes context and 
!returns the wrapper, which can be executed furtherly, 
!but 'call & apply' take context and executes when created

!call & apply almost same, but have different args. transfer,
!also apply supports array of arguments, instead of pack of named params

*With call you can write method once and then inherit it whereever u want to

Syntax: func.call(object, arg1, arg2, ...); -> first argument - "this"

----------CALL Part

function showFullName(){
    console.log(this.firstName + ' ' + this.lastName);
}

function showFullName(firstPart, lastPart){
    console.log(this[firstPart] + ' ' + this[lastPart]);
}

let user = {
    firstName: "Someone",
    lastName: "Else",
    patronym: "..."
}

user.showFullName(); --> wont work due to missing that func

showFullName.call(user); //-> magic
showFullName.call(user, 'firstName', 'lastName');
showFullName.call(user, 'firstName', 'patronym');

-----

function doSomething() {
    let args = Array.prototype.slice.call(arguments);
    *We took method "slice" from Arrray obj. and executed
    *that method with "call" in 'arguments' context
    !It doesn't matter to which object function is applied
    console.log(args);
}

doSomething('water', 'sand', 'sugar', 'salt');

---------APPLY Part

Syntax: func.apply(object, [arg1, arg2,  ...]);

function sumValues() {
    let arr = [...arguments];
    let final = 0;
    for (let i = 0; i < arr.length; i++) {
        final += arr[i];
    }
    return final;

    //OR:
    //for (var i = 0, res = 0; i < arguments.length; res += arguments[i++]);
}

let numbers = [12, 24, 34, 345, 2134, 33, 23];

let result = sumValues.apply(this, numbers);

console.log(result);

As it's already been said, we can use every method we want to:
Math.max(1, 4, 5, 7);

console.log(Math.max.apply(null, numbers));

---------BIND Part

Syntax: let wrapper = func.bind(context(thisArg), arg1, ..., argN); 
'context' - context which applies to func; 'arg1, arg2' - addition args. 
will be added to those, which are typed when func executed;

!func.bind(context) == bind(func, context);

----Losing context
let user = {
    userName: 'Someone', 
    sayHi: function(){
        console.log(this.userName);
    }
}

setTimeout(user.sayHi, 1000);

If we want to transfer method of an object to somewhere, 
where it can be further executed(bind his context to him), 
we need to use .bind()

function someFunc(a, b){
    console.log(this);
    console.log(a + b);
}

let g = someFunc.bind('Context');
g(1, 2);

-----Modified(without losing context):

let user = {
    userName: 'Someone', 
    sayHi: function(){
        console.log(this.userName);
    }
}

let wrapper = user.sayHi.bind(user);

setTimeout(wrapper, 1000);

----Another example:

let user = {
    data: [
        {name: 'John'},
        {name: 'Max'}
    ], 
    showFirst: function(){
        console.log(this.data[0].name);
    }
}

let button = document.querySelector('#button');
button.addEventListener('click', user.showFirst.bind(user));

----------------------------------Arguments binding(Currying)

function multiply(a, b) {
    return a * b;
}

let double = multiply.bind(multiply, 2);

console.log(double(2));
console.log(double(3));
console.log(double(4));
double - partial function from multiply





*/

//Practice Part





//Gradient generator------------------------------

// let mainFrame = document.querySelector('.introduction__frame');
// let button = document.querySelector('.project-one__button');
// let firstProperty = document.querySelector('.first-prop');
// let secondProperty = document.querySelector('.second-prop');
// let property = document.querySelector('.property');
// let propertyValue = property.textContent;

// button.addEventListener('click', function(event) {
//     firstProperty.innerHTML = createHex();
//     secondProperty.innerHTML = createHex();

//     propertyValue = property.textContent;

//     mainFrame.style.cssText = `${propertyValue}`;

//     console.log(propertyValue);
// });

// function createHex(){
//     let hexArr = ['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

//     let hexChoice = '';

//     for (let i = 0; i < 6; i++) {
//         let random = Math.floor(Math.random() * hexArr.length);
//         hexChoice += (hexArr[random]);
        
//     }
    
//     return hexChoice;
// }

//-----------------------------------------------------------


//Calculator-------------------------------------------------

// let mainInput = document.querySelector('.main-input');
// let expression = '';

// function print(number){
//     if(mainInput.value == '0') {
//         clearTheInput();
//         expression += number;
//     } else expression += number;

//     mainInput.value = expression;
// }

// function clearTheInput() {
//     expression = '';
//     mainInput.value = expression;
// }

// function equals(){
//     mainInput.value = eval(expression);
//     expression = mainInput.value;
// }

//-----------------------------------------------------------

// let newArr = [];
// let flattened = [1, [1, 2], [[1, 3], [4, 5]], [[[1, 3], [4, 5]], [[1, 3], [4, 5]]]];

// newArr = flattened.flat(Infinity);

// console.log(newArr);

//FlashCards-------------------------------------------------

let saveButton = document.querySelector('#save_card');
let closeButton = document.querySelector('#close_card_box');
let headContainer = document.querySelector('.head-container');
let flashcardsContainer = document.querySelector('#flashcards');

console.log(headContainer);

closeButton.addEventListener('click', function() {
    headContainer.classList.remove('show');
    headContainer.classList.add('hide');
})

function showFlashBox(){
    headContainer.classList.remove('hide');
    headContainer.classList.add('show');
}

function deleteCards(){
    flashcardsContainer.innerHTML ='';
}

function createCard(){
    let flashcardDiv = document.createElement('div');
    let answer = document.createElement('h2');
    let question = document.createElement('h2');
    let flashcardDelete = document.createElement('i');

    let answerText = document.querySelector('#question').textContent;
    let questionText = document.querySelector('#answer').textContent;

    flashcardDiv.className = 'flashcard';
    flashcardDelete.className = 'fa-solid fa-minus';

    question.setAttribute("style", "border-top:1px solid red; padding: 15px; margin-top:30px");
    question.textContent = questionText;
  
    answer.setAttribute("style", "text-align:center; display:none; color:red");
    answer.textContent = answerText;

    flashcardDelete.addEventListener('click', function() {
        flashcardDiv.remove;
    });
    
    flashcardDiv.append(answer);
    flashcardDiv.append(question);
    flashcardDiv.append(flashcardDelete);

    flashcardsContainer.append(flashcardDiv);


}

//-----------------------------------------------------------



//Check the following:

// console.log(3 ** 2);
// let myPromise = new Promise();
// myPromise.then();
// myPromise.catch();
// myPromise.finally();

// let { a, b, ...c } = { a: 1, b: 2, c: "Hello World", d: 4 };
// console.log(a); // 1
// console.log(b); // 2
// console.log(c); // { c: “Hello World”, d: 4 }

//List of changes(ES6 - ES12):

//Array.prototype.includes()
//Async Functions
//Asynchronous Iteration
//Promise.prototype.finally
//Object Rest Properties
//Array.flat()
//Array.flatmap()
//String.trimStart/trimEnd
//import()
//globalThis
//Nullish Coalescing Operator (??)
//Optional Chaining Operator (?.)
//replaceAll
//Numeric separator
//Private Methods
//Promise.any()
//
//
//
//
//












