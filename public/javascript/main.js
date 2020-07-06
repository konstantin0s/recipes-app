var navbar = document.getElementById('nav');
// let errorMessage = document.getElementsByClassName('error-message');


//add background to navigation on mobile
function mobileBackground() {
    let docWidth = document.body.clientWidth;
    let mobileWidth = 767;
    if (docWidth < mobileWidth) {
        navbar.classList.add('bg-dark');
    } else {
        navbar.classList.remove('bg-dark');
    }
}
//the magic of adding remove background color on navigation
window.addEventListener("resize", mobileBackground);
window.addEventListener("load", mobileBackground);

// mobileBackground();

//data help when focus on input
let help = document.querySelector('#help');
let fields = document.querySelectorAll('input');
for (let field of Array.from(fields)) {
    field.addEventListener('focus', event => {
        let text = event.target.getAttribute('data-help');
        help.textContent = text;
    });
    field.addEventListener('blur', event => {
        help.textContent = '';
    });
}