
let nav = document.getElementById('nav');
let errorMessage = document.getElementsByClassName('error-message');


//add background to nav on mobile
function mobileBackground() {
  let docWidth = document.body.clientWidth;
  let mobileWidth = 767;
  if (docWidth < mobileWidth) {
    nav.classList.add('bg-dark');
  } else {
    nav.classList.remove('bg-dark');
  }
}
//the magic of adding remove background color on navigation
window.addEventListener("resize", mobileBackground);
window.addEventListener("load", mobileBackground);

// mobileBackground();


//delete recipe 
$(document).ready(function () {
  $('.delete-recipe').on('click', function (e) {
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/recipe/' + id,
      success: function (response) {
        alert('Deleting recipe');
        window.location.href = '/';
      },
      error: function (err) {
        console.log(err);
      }
    });
  });

});