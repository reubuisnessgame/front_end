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

    // $('#leadPageButton').click(function () {
    //     location.replace('lead_page.html');
    // });

    // $('#exchangeWorkerPage').click(function () {
    //     location.replace('exchange_worker_page.html');
    // });
});
