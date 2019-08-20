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
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
        }
    });
});