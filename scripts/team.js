$(document).ready(function () {
    let role = sessionStorage.getItem('role');
    if (role !== 'MODERATOR' &&
        role !== 'EXCHANGE_WORKER' &&
        role !== 'LEADING'
    ) {
        location.replace('permission_required.html');
        return;
    }

    $.ajax({
        url: config.teamService + '/team/me',
        type: 'GET',
        crossDomain: true,
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        },
        success: function (accountInfo) {

        }
    });
});
