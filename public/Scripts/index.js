let body = document.querySelector('body');
let navBar = document.getElementById('nav-bar');
let mainBody = document.getElementById('main-body');


let navHeight = navBar.getBoundingClientRect().height;
console.log(navHeight);
mainBody.style.height = `calc(100vh - ${navHeight}px)`