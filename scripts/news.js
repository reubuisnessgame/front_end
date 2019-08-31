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
                                    <h4 class="col-12">
                                        ${news.heading}
                                    </h4>
                                    <span class="col-12">
                                        ${news.article}
                                    </span>
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


