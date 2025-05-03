import { 
    getUsers, postUsers, putUsers, deleteUsers, 
    getUsersError, postUsersError, putUsersError, deleteUsersError 
} from '../resources/api/apis.js';

// Função auxiliar para logar mensagens de sucesso ou falha
const logOperationResult = (condition, successMessage, failureMessage) => {
    if (condition) {
        cy.log(successMessage);
    } else {
        cy.log(failureMessage);
    }
};

//### SUCESSO ###
Cypress.Commands.add('postUsers', () => {
    postUsers().then((response) => {
        const expectedUserData = { id: 11, title: "foo", body: "bar", userId: 1 };
        const successMessage = `Contrato validado e Operação realizada com sucesso`;

        expect(response.status).to.eq(201);
        expect(response.body).to.deep.equal(expectedUserData);

        logOperationResult(
            response.status === 201 && Cypress._.isEqual(response.body, expectedUserData),
            successMessage,
            `Falha na operação`
        );
    });
});

Cypress.Commands.add('getUsers', () => {
    getUsers().then((response) => {
        const expectedUserData = {
            id: 1,
            name: 'Leanne Graham',
            username: 'Bret',
            email: 'Sincere@april.biz',
            address: {
                street: 'Kulas Light',
                suite: 'Apt. 556',
                city: 'Gwenborough',
                zipcode: '92998-3874',
                geo: { lat: '-37.3159', lng: '81.1496' }
            },
            phone: '1-770-736-8031 x56442',
            website: 'hildegard.org',
            company: {
                name: 'Romaguera-Crona',
                catchPhrase: 'Multi-layered client-server neural-net',
                bs: 'harness real-time e-markets'
            }
        };
        const successMessage = `Contrato validado e Operação realizada com sucesso`;

        expect(response.status).to.eq(200);
        logOperationResult(
            response.status === 200 && Cypress._.isEqual(response.body, expectedUserData),
            successMessage,
            `Falha na operação`
        );
    });
});

Cypress.Commands.add('putUsers', () => {
    putUsers().then((response) => {
        const expectedUserData = { id: 1, title: "foo", body: "bar", userId: 1 };
        const successMessage = `Contrato validado e Operação realizada com sucesso`;

        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal(expectedUserData);

        logOperationResult(
            response.status === 200 && Cypress._.isEqual(response.body, expectedUserData),
            successMessage,
            `Falha na operação, verificar com a área responsável`
        );
    });
});

Cypress.Commands.add('deleteUsers', () => {
    deleteUsers().then((response) => {
        const expectedUserData = {};
        const successMessage = `Contrato validado e Operação realizada com sucesso`;

        expect(response.status).to.eq(200);
        logOperationResult(
            response.status === 200 && Cypress._.isEqual(response.body, expectedUserData),
            successMessage,
            `Falha na operação`
        );
    });
});

//### ERROR ###
const handleErrorScenario = (apiCall, expectedStatus, isBodyEmpty = true) => {
    apiCall().then((response) => {
        const successMessage = `Cenário de falha validado`;
        const failureMessage = `Falha na operação`;

        expect(expectedStatus).to.include(response.status);
        if (isBodyEmpty) {
            expect(response.body).to.be.empty;
        } else {
            expect(response.body).not.to.be.empty;
        }

        logOperationResult(
            expectedStatus.includes(response.status),
            successMessage,
            failureMessage
        );
    });
};

Cypress.Commands.add('postUsersError', () => handleErrorScenario(postUsersError, [404, 500]));
Cypress.Commands.add('getUsersError', () => handleErrorScenario(getUsersError, [404, 500]));
Cypress.Commands.add('putUsersError', () => handleErrorScenario(putUsersError, [404, 500], false));
Cypress.Commands.add('deleteUsersError', () => handleErrorScenario(deleteUsersError, [404]));
