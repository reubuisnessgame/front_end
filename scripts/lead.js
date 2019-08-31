$(document).ready(function () {
    if (!sessionStorage.getItem('token')) {
        location.replace('auth_required.html');
        return;
    }

    let role = sessionStorage.getItem('role');
    if (role !== 'LEADING' && role !== 'MODERATOR') {
        location.replace('permission_required.html');
        return;
    }

    $('#blockTeamForm .text-success').hide();
    $('#blockTeamForm .text-warning').hide();
    $('#blockTeamForm').submit(function (event) {
        event.preventDefault();

        var teamNumber = $('#NewsHeader').val();
        var rate = $('#NewsText').val();
        var scoreData = JSON.stringify({
            rate: rate,
            teamNumber: teamNumber,
            isWin: false
        });
        $.ajax({
            url: config.adminService + '/admin/block_scr',
            type: 'POST',
            crossDomain: true,
            data: scoreData,
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function () {
                $('#blockTeamForm .text-success').show();
                $('#blockTeamForm .text-warning').hide();

                sessionStorage.setItem('teamNumber', teamNumber);
                sessionStorage.setItem('rate', rate);
            },
            error: function () {
                $('#blockTeamForm .text-success').hide();
                $('#blockTeamForm .text-warning').show();
            }
        });
    });

    $('#win').click(function () {
        var scoreData = JSON.stringify({
            rate: sessionStorage.getItem('rate'),
            teamNumber: sessionStorage.getItem('teamNumber'),
            isWin: true
        });
        $.ajax({
            url: config.adminService + '/admin/add_scr',
            type: 'POST',
            crossDomain: true,
            data: scoreData,
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function () {

            }
        });
    });

    $('#lose').click(function () {
        var scoreData = JSON.stringify({
            rate: sessionStorage.getItem('rate'),
            teamNumber: sessionStorage.getItem('teamNumber'),
            isWin: false
        });
        $.ajax({
            url: config.adminService + '/admin/add_scr',
            type: 'POST',
            crossDomain: true,
            data: scoreData,
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function () {

            }
        });
    });
});