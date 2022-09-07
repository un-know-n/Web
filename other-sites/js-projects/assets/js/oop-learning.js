'use strict';
/*
===================Theory part===============

We started to use it, because progs. become harder every day, so we've found the way to make them faster, but OOP is just a tool, and you need to use a right one

!What is important: 
!- abstractions(instances): parameters(props, methods)
!- decomposition on modules(instances splitting)

*So OOP, at first, is abstraction

?----------OOP Kits: incapsulation, iheritance, polymorphism

---Inheritance
*It gives you an ability to extend your instances

class Note {
  title,
  decription,
  image,
  category
  comments
}

class Article extends Note {
  author,
  rating,
}

class News extends Note {
  publisher
}

---Polymorphism
*You can rewrite your methods to work with different data types

class Note {
  category: {
    if(Article) do something...
    else if(News) do something else...
  }
  comments {...the same...}
}

class Article extends Note {
  rewrite the getCourses method...
}

---Incapsulation
*It provides data hiding(cant reach them directly)

course {
  title,
  desc,
  price: 20.0, //private, protected
  getPrice() {...}
}

course.price --> it wont allow you to rewrite that prop

---------------Objects, prototype, inheritance

const a = {
  someField: 1,
  color: 'green',
  showSmth() {
    console.log(this.oneMoreField);
  },
};

const b = {
  oneMoreField: 3,
  __proto__: a,
};

b.color = 'red';
b.showSmth();
a.showSmth();
// console.log(b);

---------------CLasses, properties, methods

class User {
  constructor(name, password) {
    this.name = name;
    this.password = password.toString();
  }
  validatePassword() {
    if (this.password.length > 6) return true;
    else return false;
  }
}

class Student extends User {
  constructor(username, password, nickname) {
    super(username, password);
    this.nickname = nickname || 'student';
  }

  getStudentNick() {
    return this.nickname;
  }
}

const user1 = new User('Someone', 23);
const user2 = new User('Another', 23);
const student1 = new Student('Student1', 23, 'someStud');

console.log(user1);
console.log(user1.validatePassword());
console.log(student1);
console.log(student1.getStudentNick());

---------------Inheritance, classes, super, constructor
!Super works only with methods of the parent class, not the properties, but you must call Super() in constructor every time when you inherit one class from another

class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log('Hello, ' + this.name);
    return this.name;
  }
}

class Person extends User {
  constructor(name, email) {
    super(name);
    this.email = email;
  }
  sayHi2() {
    //console.log(super.name); //---> undefined
    super.sayHi(); //---> works
  }
}

const person1 = new Person('Someone', 'test@mail');
console.log(person1);
// console.log(person1.sayHi());
console.log(person1.sayHi2());

*This also works, actually:

class User {
  sayHello() {
    console.log('Hello, ' + this.name);
  }
}

class Person extends User {
  constructor(name) {
    super();
    this.name = name;
  }
}

const person1 = new Person('someone');
console.log(person1);
console.log(person1.sayHello());

---------------Get, Set, private and protected fields(#field)

class User {
  #test = 'Hohoho';
  constructor(name) {
    this._name = name;
  }
  set setName(name) {
    this._name = name.trim().toLowerCase();
  }
  get getName() {
    return this._name;
  }
}

const user = new User('someone');
console.log(user.getName);
console.log((user.setName = 'anyone'));
console.log(user.#test); //---> error

---------------Static methods & properties
!Static methods like other methods are written in class, but they can be called without creating an instance of this class(they are available only to class to call them)
*It is very useful when you don't need to create an instance of the existing class, but need to take info about that instance(person, user, etc...)

class User {
  constructor(name) {
    this.name = name;
  }
  static getRole(email) {
    return 'admin';
  }
}

class Student extends User {
  constructor(name) {
    super(name);
  }
}

const user1 = new User('Someone');
console.log(user1);
console.log(User.getRole('test@mail'));
console.log(Student.getRole('stud@mail'));

==================END==============
*/

//Practice with OOP (may be returned to the theory part)

//------------GridView vidget

// class GridView {
//   /**
//    * Properties
//    * @param [array] _tableClass - css classes, desing
//    * @param [array] data - external data
//    * @param [array] _attributes - manage what to output
//    * @param [array] _element - where to output table
//    * @param [array] _header - header of the table
//    * @param [array] _headerClass - css classes of the header
//    */

//   constructor() {
//     this._header = '';
//     this._headerClass = [];
//     this._tableClass = [];
//     this._element = 'section';
//     this.attribute = [];
//   }

//   /**
//    * Method to set header of the table
//    * ---input params
//    */

//   setHeader(header) {
//     if ((typeof header === 'string') & (header.trim() !== '')) {
//       this._header = header.trim();
//       return true;
//     }
//     return false;
//   }

//   /**
//    * Method to set the styles of the header
//    * ---input params
//    */

//   setHeaderClass(headerClass) {
//     if (typeof headerClass === 'object') {
//       this._headerClass = headerClass;
//       return true;
//     }
//     return false;
//   }

//   /**
//    * Method to set the element
//    * ---input params
//    */

//   setElement(element) {
//     if (document.querySelector(element)) {
//       this.element = document.querySelector(element);
//       return true;
//     }
//     return false;
//   }

//   /**
//    * Method to show GridViewTable
//    * ---input params
//    */

//   render(data) {
//     this.setElement(data.element);
//     this.setHeaderClass(data.headerClass);
//     this.setHeader(data.header);
//     this.data = data.data;
//     this.attribute = data.attribute;

//     //To show the main header
//     if (this._header) {
//       const header = document.createElement('h1');
//       header.textContent = this._header;
//       this._headerClass.forEach((cssClass) => {
//         header.classList.add(cssClass);
//       });
//       document.querySelector(this._element).append(header);
//     }

//     //To show the table
//     const table = document.createElement('table');
//     this._tableClass.forEach((cssClass) => {
//       table.classList.add(cssClass);
//     });

//     //To create the table header
//     let trHeader = document.createElement('tr');
//     for (let key in this.attribute) {
//       let th = document.createElement('th');
//       if (this.attribute[key].label) {
//         th.innerHTML = this.attribute[key].label;
//       } else th.innerHTML = key;
//       trHeader.append(th);
//     }
//     table.append(trHeader);

//     //To draw the table
//     for (let i = 0; i < this.data.length; i++) {
//       let dataArr = this.data[i];
//       let tr = document.createElement('tr');
//       for (let key in this.attribute) {
//         let td = document.createElement('td');
//         let value = dataArr[key];

//         if (this.attribute[key].value)
//           value = this.attribute[key].value(dataArr);

//         if (this.attribute[key].src) td.innerHTML = value;
//         else td.textContent = value;
//         tr.append(td);
//       }
//       table.append(tr);
//     }
//     document.querySelector(this._element).append(table);
//   }
// }

// const dataExample = [
//   {
//     company: 'Company <b>1</b>',
//     chef: 'Chef 1',
//     country: 'Germany',
//   },
//   {
//     company: 'Company 2',
//     chef: 'Chef 2',
//     country: 'Mexico',
//   },
//   {
//     company: 'Company 3',
//     chef: 'Chef 3',
//     country: 'Austria',
//   },
//   {
//     company: 'Company 4',
//     chef: 'Chef 4',
//     country: 'Canada',
//   },
// ];

// let gridView = new GridView();
// const data = {
//   element: 'section',
//   header: 'Hello',
//   headerClass: ['header', 'site-header'],
//   attribute: {
//     company: {
//       label: 'Company',
//       src: 'html',
//     },
//     chef: {
//       label: 'Director',
//     },
//     country: {
//       label: 'Country',
//       value: (data) => data['country'],
//     },
//   },
//   data: dataExample,
// };
// gridView.render(data);
