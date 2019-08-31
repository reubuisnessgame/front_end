$(document).ready(function () {
    if (sessionStorage.getItem('token')) {
        $.ajax({
            url: config.stockExchangeService + '/stock/news',
            type: 'GET',
            crossDomain: true,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (newsList) {
                newsList.forEach(function (news) {
                    $('#newsList').append(function () {
                        return `
                            <div class="card">
                                <div class="card-body">

                                </div>
                            </div>
                        `;
                    });
                });
            }
        });
    } else {
        location.replace('auth_required.html');
    }
});


$('#newsModal').submit($('#authForm').submit(function (event) {
    event.preventDefault();
    var requestData = JSON.stringify({
        companyName: $('#CompanyName').val(),
        changingPrice: $('#NewsChangingCourse').val(),
        heading: $('#NewsHeader').val(),
        article: $('#NewsText').val()

    });
    $.ajax({
        url: config.stockExchangeService + '/change',
        type: 'POST',
        data: requestData,
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            console.log("Success");
            location.replace('index.html');
        }
    });
}))