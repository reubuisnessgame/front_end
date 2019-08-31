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

    $.ajax({
        url: config.adminService + '/admin/me',
        type: 'GET',
        crossDomain: true,
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },
        success: function (accountInfo) {
            $('.sp_admin_info').append(accountInfo.username);
            $('.sp_admin_role').append(accountInfo.role);
            $('.sp_admin_max_score').append(accountInfo.maxScore);
            $('.sp_admin_coefficient').append(accountInfo.coefficient);
        }
    });


    $('#buyStockForm').submit(function (event) {
        event.preventDefault();

        const companyName = $('#buyStockForm #number1Input').val();
        const amount = $('#buyStockForm #number2Input').val();
        const team = $('#buyStockForm #teamInputBuy').val();
        var url = team +
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

        const companyName = $('#sellStockForm #number1Input').val();
        const amount = $('#sellStockForm #number2Input').val();
        const team = $('#sellStockForm #teamInputSell').val();
        var url = team +
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