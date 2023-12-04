let navMain = document.querySelector('.nav');
let navToggle = document.querySelector('.nav__toggle');

navMain.classList.remove('nav--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('nav--closed')) {
    navMain.classList.remove('nav--closed');
    navMain.classList.add('nav--opened');
  } else {
    navMain.classList.add('nav--closed');
    navMain.classList.remove('nav--opened');
  }
});

let modalWindow = document.querySelector('.modal');
let modalToggle = document.querySelector('.featured__button');

function openModal(modal) {
  modal.classList.add('modal--opened');
}
function closeModal(modal) {
  modal.classList.remove('modal--opened');
}

modalToggle.addEventListener('click', function () {
  openModal(modalWindow)
});

modalWindow.addEventListener('click', function(e) {
  if(e.target.classList.contains('modal') || e.target.classList.contains('button') ){
    closeModal(modalWindow)
  }
})

