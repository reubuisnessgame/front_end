$(document).ready(() => {
    if (!sessionStorage.getItem('token')) {
        location.replace('auth_required.html');
        return;
    }

    let role = sessionStorage.getItem('role');
    if (role !== 'MODERATOR' &&
        role !== 'EXCHANGE_WORKER' &&
        role !== 'LEADING' &&
        role !== 'TEAM'
    ) {
        location.replace('permission_required.html');
        return;
    }
    switch (role) {
        case 'MODERATOR':
            location.replace('moderator_page.html');
            return;

        case 'LEADING':
            location.replace('lead_page.html');
            return;

        case 'EXCHANGE_WORKER':
            location.replace('exchange_worker_page.html');
            return;

        case 'TEAM':
            location.replace('page_team.html');
            return;
    }
});