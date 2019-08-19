$('#authForm').submit(function (event) {
    event.preventDefault();
    var requestData = JSON.stringify({
        login: $('#exampleInputEmail').val(),
        password: $('#exampleInputPass').val()
    });
    $.post(config.authService + '/login/admin/',
        requestData,
        function (data) {
            console.log(data);
        }
    );
});