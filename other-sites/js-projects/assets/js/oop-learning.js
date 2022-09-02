/*
===================Theory part===============

We started to use it, because progs. become harder every day, so we've found the way to make them faster, but OOP is just a tool, and you need to use a right one

!What is important: 
!- abstractions(instances): parameters(props, methods)
!- decomposition on modules(instances splitting)

*So OOP, at first, is abstraction

?---OOP Kits: incapsulation, iheritance, polymorphism

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






*/

//Practice with OOP
