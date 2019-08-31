var companies = null;

$(document).ready(function () {
    if (sessionStorage.getItem('token')) {
        $.ajax({
            url: config.stockExchangeService + '/stock/companies',
            type: 'GET',
            crossDomain: true,
            contentType: "application/json",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (companiesList) {
                companies = companiesList;
                companiesList.forEach(function (company) {
                    $('#companiesList .col-12').append(function () {
                        return `
                            <div class="card">
                                <div class="card-body row">
                                    <div class="col">
                                        <h5>
                                            ${company.companyName}
                                        </h5>
                                    </div>
                                    <div class="col">
                                        <span>
                                            Осталось акций: ${company.freeCount}
                                        </span>
                                    </div>
                                    <div class="col text-right">
                                        <span>
                                            Стоимость акции: ${company.sharePrice}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                });
            }
        });
    } else {
        // location.replace('auth_required.html');
        return;
    }

    var role = sessionStorage.getItem('role');
    if (role !== 'MODERATOR' && role !== 'EXCHANGE_WORKER') {
        //location.replace('permission_required.html');
        return;
    }
});