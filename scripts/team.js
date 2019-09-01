$(document).ready(function () {
    let role = sessionStorage.getItem('role');
    if (role !== 'MODERATOR' &&
        role !== 'EXCHANGE_WORKER' &&
        role !== 'LEADING' &&
        role !== 'TEAM'
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
        success: function (teamInfo) {
            $('.sp_admin_info').append(teamInfo.team.username);
            $('.sp_admin_credit').append(teamInfo.team.credit);
            $('.sp_admin_deposit').append(teamInfo.team.deposit);
            $('.sp_admin_score').append(teamInfo.team.score);
            $('.sp_admin_full_score').append(teamInfo.team.fullScore);

            var shares = teamInfo.shares;
            console.log(shares);
            shares.forEach(function (share) {
                $('#sharesList').append(function(){
                    return `
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col">
                                        ${share.companyModel.companyName}
                                    </div>
                                    <div class="col">
                                        Количество акций: ${share.sharesNumbers}
                                    </div>
                                    <div class="col text-right">
                                        Стоимость акции: ${share.companyModel.sharePrice}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });
            });
        }
    });
});
