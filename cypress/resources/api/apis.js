function getUsers() {
    return cy.api({
        method: 'GET', url: '/users', headers: { "content-type": "application/json; charset=utf-8" },
        failOnStatusCode: false,
    });
}

function postUsers() {
    return cy.api({
        method: 'POST',
        url: '/users',
        headers: { "content-type": "application/json; charset=utf-8" },
        body: { id: 1, title: 'foo', body: 'bar', userId: 1, },
        failOnStatusCode: false,
    });
}

function putUsers() {
    return cy.api({
        method: 'PUT', url: `/posts/1`, headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: { id: 1, title: 'foo', body: 'bar', userId: 1, },
        failOnStatusCode: false,
    });
}

function deleteUsers() {
    return cy.api({
        method: 'DELETE', url: '/users/1', headers: { "content-type": "application/json; charset=utf-8" },
        failOnStatusCode: false,
    });
}

export { deleteUsers, getUsers, postUsers, putUsers };