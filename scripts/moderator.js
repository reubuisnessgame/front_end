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

    var isGameStarted = Boolean(localStorage.getItem('isGameStarted'));
    if (isGameStarted) {
        $('[data-target="#start-game-btn"]').text('Остановить игру');
    } else {
        localStorage.setItem('isGameStarted', true);
        $('[data-target="#start-game-btn"]').text('Начать игру');
    }

    $('[data-target="#start-game-btn"]').click(function () {
        var gameStartOrStopUrl = '/admin/game?start=' + isGameStarted.toString();

        $.ajax({
            url: config.adminService + gameStartOrStopUrl,
            type: 'POST',
            crossDomain: true,
            contentType: "application/json",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function () {
                localStorage.setItem('isGameStarted', gameStatus);
            }
        });
    });

    // $('#createTaskForTeam .text-success').hide();
    // $('#createTaskForTeam').submit(function (event) {
    //     event.preventDefault();

    //     $.ajax({
    //         url: config.adminService + '/admin/game?start=true',
    //         type: 'POST',
    //         crossDomain: true,
    //         contentType: "application/json",
    //         headers: {
    //             'Authorization': 'Bearer ' + sessionStorage.getItem('token')
    //         },
    //         success: function () {
    //             // $('#createTaskForTeam .text-success').show();
    //         }
    //     });
    // });

    $('#leadPageButton').click(function () {
        location.replace('lead_page.html');
    });

    $('#exchangeWorkerPage').click(function () {
        location.replace('exchange_worker_page.html');
    });

    $('#teamRegistrationForm .text-success').hide();
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
                $('#teamRegistrationForm .text-success').show();
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

                $('#teamList').empty();
                teams.forEach(function (team) {
                    $('#teamList').append(function () {
                        return `
                        <div class="card col-12">
                            <div class="card-body row">
                                <p class="col-12 font-weight-bold">
                                    ${team.username}
                                </p>
                                <div class="col-12">
                                    Текущее количество очков: ${team.score}
                                </div>
                                <div class="col-12">
                                    Общее количество очков: ${team.fullScore}
                                </div>
                                <div class="col-12">
                                    Кредит: ${team.credit}
                                </div>
                                <div class="col-12">
                                    Депозит: ${team.deposit}
                                </div>
                            </div>
                        </div>
                        `;
                    });
                });
            }
        });
    });

    $('#newsCreationForm .text-success').hide();
    $('#newsCreationForm').submit(function (event) {
        event.preventDefault();

        var requestData = JSON.stringify({
            companyName: $('#CompanyName').val(),
            changingPrice: parseInt($('#NewsChangingCourse').val()),
            heading: $('#NewsHeader').val(),
            article: $('#NewsText').val()
        });
        $.ajax({
            url: config.stockExchangeService + '/stock/change',
            type: 'POST',
            data: requestData,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (response) {
                $('#newsCreationForm .text-success').show();
            }
        });
    });

    $('#teamInfoForm').submit(function (event) {
        event.preventDefault();

        var teamNumber = $('#teamInfoForm input:first').val();
        var teamInfoEndpoint = '/admin/team/' + teamNumber;
        $.ajax({
            url: config.adminService + teamInfoEndpoint,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function (teamInfo) {
                $('#teamInfoContainer').empty();
                $('#teamInfoContainer').append(function () {
                    return `
                        <div class="card col-12">
                            <div class="card-body row">
                                <div class="col-12 font-weight-bold">
                                    Номер команды: ${teamInfo.teamNumber}
                                </div>
                                <div class="col-12">
                                    Количество очков: ${teamInfo.score}
                                </div>
                                <div class="col-12">
                                    Общее количество очков: ${teamInfo.fullScore}
                                </div>
                                <div class="col-12">
                                    Кредит: ${teamInfo.credit}
                                </div>
                                <div class="col-12">
                                    Депозит: ${teamInfo.deposit}
                                </div>
                            </div>
                        </div>
                    `;
                });
            }
        });
    });

    $('#userRegistrationForm .text-success').hide();
    $('#userRegistrationForm .text-danger').hide();

    $('#userRegistrationForm').submit(function (event) {
        event.preventDefault();

        var newUser = JSON.stringify({
            username: $('#userRegistrationForm [name="login"]').val(),
            password: $('#userRegistrationForm [name="password"]').val(),
            role: $('#userRegistrationForm [name="roleSelect"]').val(),
            maxScore: parseFloat(
                $('#userRegistrationForm [name="scoreAmount"]').val()
            ),
            coefficient: parseFloat(
                $('#userRegistrationForm [name="coefficient"]').val()
            )
        });

        $.ajax({
            url: config.adminService + '/admin/create_adm',
            type: 'POST',
            data: newUser,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            success: function () {
                $('#userRegistrationForm .text-success').show();
                $('#userRegistrationForm .text-danger').hide();
            },
            error: function () {
                $('#userRegistrationForm .text-success').hide();
                $('#userRegistrationForm .text-danger').show();
            }
        });
    });
});