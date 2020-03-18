//prevent default 
let form = document.getElementById('form');
let errorMessage = document.getElementsByClassName('error-message');





//delete recipe 
$(document).ready(function() {
  $('.delete-recipe').on('click', function(e) {
   $target = $(e.target);
   const id = $target.attr('data-id');
   $.ajax({
     type: 'DELETE',
     url: '/recipe/'+id,
     success: function(response) {
       alert('Deleting recipe');
       window.location.href='/';
     },
     error: function(err) {
       console.log(err);
     }
   });
 });

});
