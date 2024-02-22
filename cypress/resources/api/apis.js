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
        method: 'PUT', url: `/posts/1`,
        headers: { 'Content-type': 'application/json; charset=UTF-8', },
        body: { id: 1, title: 'foo', body: 'bar', userId: 1, },
        failOnStatusCode: false,
    });
}

function deleteUsers() {
    return cy.api({
        method: 'DELETE', url: '/users/1',
        headers: { "content-type": "application/json; charset=utf-8" },
        failOnStatusCode: false,
    });
}
function getUsersError() {
    return cy.api({
        method: 'GET',
        url: '/users/999', // Simula um recurso que não existe
        headers: { "content-type": "application/json; charset=utf-8" },
        failOnStatusCode: false,
    });
}

function postUsersError() {
    return cy.api({
        method: 'POST',
        url: '/users´',
        headers: { "content-type": "application/json; charset=utf-8" },
        body: { id: -2, title: 'foo', body: 4444, userId: 1 }, // Simula um erro interno do servidor
        failOnStatusCode: false,
    });
}

function putUsersError() {
    return cy.api({
        method: 'PUT',
        url: `/posts/999`, // Simula um recurso que não existe
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: { id: 999, title: 'foo', body: 'bar', userId: 1 },
        failOnStatusCode: false,
    });
}

function deleteUsersError() {
    return cy.api({
        method: 'DELETE',
        url: '/users//', // Simula um recurso que não existe
        headers: { "content-type": "application/json; charset=utf-8" },
        failOnStatusCode: false,
    });
}
export { getUsersError, postUsersError, putUsersError, deleteUsersError };
export { deleteUsers, getUsers, postUsers, putUsers };