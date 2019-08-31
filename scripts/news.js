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
                newsList
                    .sort(function (a, b) {
                        return new Date(b.timeMillis) - new Date(a.timeMillis);
                    })
                    .forEach(function (news) {
                        $('#newsList').append(function () {
                            return `
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <h4 class="col-auto">
                                            ${news.heading}
                                        </h4>
                                        <div class="col"></div>
                                        <div class="col-auto">
                                            ${
                                                new Date(news.timeMillis)
                                                    .toLocaleDateString('ru')
                                            }
                                            ${ news.createDate }
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            ${news.article}                                        
                                        </div>
                                    </div>
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