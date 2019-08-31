$(document).ready(function () {
    if (!sessionStorage.getItem('token')) {
        location.replace('auth_required.html');
        return;
    }

    let role = sessionStorage.getItem('role');
    if (role !== 'LEADING') {
        location.replace('permission_required.html');
        return;
    }

    $('#blockTeamForm').submit(function (event) {
        event.preventDefault();

        var teamNumber = $('#NewsHeader').val();
        var rate = $('#NewsText').val();
        var scoreData = {
            rate: rate,
            teamNumber: teamNumber,
            isWin: false
        };
        $.ajax({
            url: config.adminService + '/admin/block_scr',
            type: 'POST',
            crossDomain: true,
            data: scoreData,
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function () {
                sessionStorage.setItem('teamNumber', teamNumber);
                sessionStorage.setItem('rate', rate);
            }
        });
    });

    $('#win').click(function () {
        var scoreData = {
            rate: sessionStorage.getItem('rate'),
            teamNumber: sessionStorage.getItem('teamNumber'),
            isWin: true
        };
        $.ajax({
            url: config.adminService + '/admin/add_scr',
            type: 'POST',
            crossDomain: true,
            data: scoreData,
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function () {

            }
        });
    });

    $('#lose').click(function () {
        var scoreData = {
            rate: sessionStorage.getItem('rate'),
            teamNumber: sessionStorage.getItem('teamNumber'),
            isWin: false
        };
        $.ajax({
            url: config.adminService + '/admin/add_scr',
            type: 'POST',
            crossDomain: true,
            data: scoreData,
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function () {

            }
        });
    });
});