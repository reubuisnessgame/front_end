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

    $('[data-target="#start-game-btn"]').click(function () {
        $.ajax({
            url: config.adminService + '/admin/game?start=true',
            type: 'POST',
            crossDomain: true,
            contentType: "application/json",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function () {

            }
        });
    });

    $('#createTaskForTeam').submit(function () {
        $.ajax({
            url: config.adminService + '/admin/game?start=true',
            type: 'POST',
            crossDomain: true,
            contentType: "application/json",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function () {

            }
        });
    });

    $('#leadPageButton').click(function () {
        location.replace('lead_page.html');
    });

    $('#exchangeWorkerPage').click(function () {
        location.replace('exchange_worker_page.html');
    });

    $('#teamRegistrationForm').submit(function (event) {
        event.preventDefault();

        var teamNumber = $('#teamRegistrationForm input:first').val();
        $.ajax({
            url: config.adminService + '/admin/create_team/' + teamNumber,
            type: 'POST',
            crossDomain: true,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (teamInfo) {

            }
        });
    });

    $('#teamListForm').submit(function (event) {
        event.preventDefault();

        $.ajax({
            url: config.adminService + '/admin/teams/',
            type: 'GET',
            crossDomain: true,
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (teamsInfo) {
                var teams = teamsInfo.teams;
                
                teams.forEach(function (team) {
                    $('#teamList').append(function () {
                        return `
                        <div class="card col-12">
                            <div class="card-body">
                                <p class="col-12 font-weight-bold">
                                    ${team.username}
                                </p>
                                <span class="col-12">
                                    Общее кол-во очков: ${team.fullScore}
                                </span>
                                <span class="col-12">
                                    Кредит: ${team.credit}
                                </span>
                                <span class="col-12">
                                    Депозит: ${team.deposit}
                                </span>
                            </div>
                        </div>
                        `;
                    });
                });
            }
        });
    });
    
    $('[data-target="#sendNewsButton"]').click(function (event) {
        event.preventDefault();
        var requestData = JSON.stringify({
            companyName: $('#CompanyName').val(),
            changingPrice: $('#NewsChangingCourse').val(),
            heading: $('#NewsHeader').val(),
            article: $('#NewsText').val()

        });
        $.ajax({
            url: config.stockExchangeService + '/stock/change',
            type: 'POST',
            data: requestData,
            contentType: "application/json; charset=utf-8",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (response) {
                console.log("Success");
                location.replace('index.html');
            }
        });
    });
});

