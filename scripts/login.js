$('#authForm').submit(function (event) {
    event.preventDefault();
    var requestData = JSON.stringify({
        username: $('#exampleInputEmail').val(),
        password: $('#exampleInputPass').val()
    });
    $.ajax({
        url: config.authService + '/login/admin/',
        type: 'POST',
        data: requestData,
        dataType: 'json',
        success: function (data) {
            console.log(data);
        }
    });
});