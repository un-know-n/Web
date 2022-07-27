wow = new WOW(
  {
  boxClass:     'wow',     
  animateClass: 'animate__animated',
  offset:       0,         
  mobile:       true,      
  live:         true       
}
)
wow.init();

$(document).ready(function(){
    $('.projects__carousel').slick({
        dots: false,
        infinite: true,
        fade: false,
        arrows: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
});

var li_elements = document.querySelectorAll(".skills-list__button");
var item_elements = document.querySelectorAll(".services__wrapper");
for (var i = 0; i < li_elements.length; i++) {
  li_elements[i].addEventListener("click", function() {
    li_elements.forEach(function(li) {
      li.removeAttribute('id');
      li.setAttribute('id', 'inactive-skill');
    });
    this.setAttribute('id', 'active-skill');
    var li_value = this.getAttribute("data-li");
    item_elements.forEach(function(item) {
      item.removeAttribute('id');
      item.setAttribute('id', 'hide');
    });
    if (li_value == "frontend") {
      document.querySelector("." + li_value).setAttribute('id', 'show');
    } else if (li_value == "backend") {
      document.querySelector("." + li_value).setAttribute('id', 'show');
    } else if (li_value == "design") {
      document.querySelector("." + li_value).setAttribute('id', 'show');
    } else if (li_value == "communication") {
      document.querySelector("." + li_value).setAttribute('id', 'show');
    } else {
      console.log("Error: invalid data type!");
    }
  });
}

//const tabsBtn = document.querySelectorAll(".skills-list__button");
//const tabsItems = document.querySelectorAll(".item-service");