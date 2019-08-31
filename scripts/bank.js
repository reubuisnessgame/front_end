$(document).ready(() => {
    if (!sessionStorage.getItem('token')) {
        location.replace('auth_required.html');
        return;
    }

    let role = sessionStorage.getItem('role');
    if (role !== 'MODERATOR' && role !== 'EXCHANGE_WORKER') {
        location.replace('permission_required.html');
        return;
    }

    $('#takeCreditForm .success-hint').hide();
    $('#takeCreditForm').submit(function (event) {
        event.preventDefault();

        var creditAmount = $('#takeCreditForm .amount-input').val();
        var url = '/team/take/credit?sum=' + creditAmount;
        $.ajax({
            url: config.teamService + url,
            type: 'POST',
            crossDomain: true,
            contentType: "application/json",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (data) {
                $('#takeCreditForm .success-hint').show();
            }
        });
    });

    $('#makeDepositForm .success-hint').hide();
    $('#makeDepositForm').submit(function (event) {
        event.preventDefault();

        var depositAmount = $('#makeDepositForm .amount-input').val();
        var url = '/team/take/deposit?sum=' + depositAmount;
        $.ajax({
            url: config.teamService + url,
            type: 'POST',
            crossDomain: true,
            contentType: "application/json",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (data) {
                $('#makeDepositForm .success-hint').show();
            }
        });
    });

    $('#repayLoanForm .success-hint').hide();
    $('#repayLoanForm').submit(function (event) {
        event.preventDefault();

        var creditAmount = $('#repayLoanForm .amount-input').val();
        var url = '/team/rtn/credit?sum=' + creditAmount;
        $.ajax({
            url: config.teamService + url,
            type: 'POST',
            crossDomain: true,
            contentType: "application/json",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (data) {
                $('#repayLoanForm .success-hint').show();
            }
        });
    });

    $('#withdrawalForm .success-hint').hide();
    $('#withdrawalForm').submit(function (event) {
        event.preventDefault();

        var creditAmount = $('#withdrawalForm .amount-input').val();
        var url = '/team/rtn/deposit?sum={sum}' + creditAmount;
        $.ajax({
            url: config.teamService + url,
            type: 'POST',
            crossDomain: true,
            contentType: "application/json",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (data) {
                $('#withdrawalForm .success-hint').show();
            }
        });
    });
});