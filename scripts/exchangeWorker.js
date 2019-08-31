$(document).ready(function () {
    if (!sessionStorage.getItem('token')) {
        location.replace('auth_required.html');
        return;
    }

    let role = sessionStorage.getItem('role');
    if (role !== 'MODERATOR' &&
        role !== 'EXCHANGE_WORKER' &&
        role !== 'LEADING'
    ) {
        location.replace('permission_required.html');
        return;
    }

    
$('#buyStockForm').submit(function (event) {
    event.preventDefault();

    const companyIndex = $('#buyStockForm #number1Input').val();
    const amount = $('#buyStockForm #number2Input').val();
    var companyName = companies.find(function (company) {
        return company.id == companyIndex;
    }).companyName;
    var url = companyIndex +
        '?count=' + amount +
        '&companyName=' + companyName;
    $.ajax({
        url: config.stockExchangeService + '/stock/buy/' + url,
        type: 'POST',
        contentType: "application/json",
        crossDomain: true,
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },
        success: function (data) {
            console.log(data);
        }
    });
});

$('#sellStockForm').submit(function (event) {
    event.preventDefault();

    const companyIndex = $('#sellStockForm #number1Input').val();
    const amount = $('#sellStockForm #number2Input').val();
    var companyName = companies.find(function (company) {
        return company.id == companyIndex;
    }).companyName;
    var url = companyIndex +
        '?count=' + amount +
        '&companyName=' + companyName;
    $.ajax({
        url: config.stockExchangeService + '/stock/sell/' + url,
        type: 'POST',
        contentType: "application/json",
        crossDomain: true,
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },
        success: function (data) {
            console.log(data);
        }
    });
});
});