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
        crossDomain: true,
        contentType: "application/json",
        success: function (response) {
            sessionStorage.setItem('role', response.role);
            sessionStorage.setItem('username', response.username);
            sessionStorage.setItem('token', response.token);
            location.replace('account.html');
        }
    });
});

// $('#teamAuthForm').submit(function (event) {
//     event.preventDefault();
//     var teamNumber = $('#teamAuthForm input:first').val();
//     sessionStorage.clear();
//     sessionStorage.setItem('loggedTeam', teamNumber);
//     sessionStorage.setItem('role', 'TEAM');
//     location.replace('account.html');
// });