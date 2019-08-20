$(document).ready(function () {
    $.ajax({
        url: config.stockExchangeService + '/news',
        type: 'GET',
        success: function (data) {
            console.log(data);
        }
    });
});
// $('#newsList')