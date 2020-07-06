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