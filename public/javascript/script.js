//delete recipe
$(document).ready(function() {
    $('.delete-recipe').on('click', function(e) {
        e.stopImmediatePropagation();
        if (confirm('Are you sure you want to delete the recipe?')) {
            $target = $(e.target);

            const id = $target.attr('data-id');
            $.ajax({
                type: 'DELETE',
                url: '/recipe/' + id,
                success: function(response) {
                    alert('The recipe was deleted');
                    window.location.href = '/recipes';
                },
                error: function(err) {
                    console.log(err);
                }
            });
        } else {
            return false;
        }
    });
});