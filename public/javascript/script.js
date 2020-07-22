//delete recipe
$(document).ready(function() {
    $('.delete-recipe').on('click', function(e) {
        e.stopImmediatePropagation();

        let dialogTitle = 'Delete recipe?'


        $('<div></div>').appendTo('body')
            .html('<div><h6>Are you sure about this?</h6></div>').dialog({
                resizable: false,
                modal: true,
                title: dialogTitle || 'Confirm',
                buttons: {
                    "Confirm": function() {
                        // Perform actions here based on
                        // receiving confirmation



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

                        // Then close the dialog:
                        $(this).dialog("close");
                    },
                    "Cancel": function() {
                        $(this).dialog("close");
                    }
                } //end buttons option
            });

        // if (confirm('Are you sure you want to delete the recipe?')) {
        //     $target = $(e.target);

        //     const id = $target.attr('data-id');
        //     $.ajax({
        //         type: 'DELETE',
        //         url: '/recipe/' + id,
        //         success: function(response) {
        //             alert('The recipe was deleted');
        //             window.location.href = '/recipes';
        //         },
        //         error: function(err) {
        //             console.log(err);
        //         }
        //     });
        // } else {
        //     return false;
        // }
    });
});