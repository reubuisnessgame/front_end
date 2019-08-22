$(document).ready(function () {
    if (sessionStorage.getItem('token')) {
        $.ajax({
            url: config.stockExchangeService + '/news',
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                // $('#newsList')
                console.log(data);
            }
        });
    } else {
        location.replace('auth_required.html');
    }
});