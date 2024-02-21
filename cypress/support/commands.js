import { getUsers, postUsers, putUsers, deleteUsers } from '../resources/api/apis.js';

Cypress.Commands.add('postUsers', () => {
    postUsers().then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id', 11); // Verifica se o id é 1
        expect(response.body).to.have.property('title', 'foo'); // Verifica se o título é 'foo'
        expect(response.body).to.have.property('body', 'bar'); // Verifica se o corpo é 'bar'
        expect(response.body).to.have.property('userId', 1); // Verifica se o userId é 1
        // Define os dados esperados
        const expectedUserData = { id: 11, title: "foo", body: "bar", userId: 1 };
        const successMessage = `Contrato validado e Operação realizada com sucesso`;
        if (response.status === 201 && Cypress._.isEqual(response.body, expectedUserData)) {
            cy.log(successMessage);
        } else {
            cy.log(`Falha na operação`);
        }
    });
});

Cypress.Commands.add('getUsers', () => {
    getUsers().then((response) => {
        // Verifica se o status da resposta é 200
        expect(response.status).to.eq(200);

        // Define os dados esperados
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
                geo: {
                    lat: '-37.3159',
                    lng: '81.1496'
                }
            },
            phone: '1-770-736-8031 x56442',
            website: 'hildegard.org',
            company: {
                name: 'Romaguera-Crona',
                catchPhrase: 'Multi-layered client-server neural-net',
                bs: 'harness real-time e-markets'
            }
        };
        const responseBodyString = JSON.stringify(response.body);
        const expectedUserDataString = JSON.stringify(expectedUserData);
        const successMessage = `Contrato validado e Operação realizada com sucesso`;
        if (response.status === 200 && responseBodyString.includes(expectedUserDataString)) {
            cy.log(response.body)
            console.log(expectedUserData)
            cy.log(`${successMessage}`);
        } else {
            cy.log(`Falha na operação`);
        }
    });
});

Cypress.Commands.add('putUsers', () => {
    putUsers().then((response) => {
        // Verifica se o status da resposta é 200
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', 1); // Verifica se o id é 1
        expect(response.body).to.have.property('title', 'foo'); // Verifica se o título é 'foo'
        expect(response.body).to.have.property('body', 'bar'); // Verifica se o corpo é 'bar'
        expect(response.body).to.have.property('userId', 1); // Verifica se o userId é 1

        // Define os dados esperados
        const expectedUserData = { "id": 1, "title": "foo", "body": "bar", "userId": 1 };
        const successMessage = `Contrato validado e Operação realizada com sucesso`;
        if (response.status === 200 && Cypress._.isEqual(response.body, expectedUserData)) {
            cy.log(`${successMessage}`);
        } else {
            cy.log('Falha na operação, verificar com a área responsável');
        }
    });
});

Cypress.Commands.add('deleteUsers', () => {
    deleteUsers().then((response) => {
        // Verifica se o status da resposta é 200
        expect(response.status).to.eq(200);

        // Define os dados esperados
        const expectedUserData = {};

        // Verifica se o corpo da resposta inclui os dados esperados
        const successMessage = `Contrato validado e Operação realizada com sucesso`;
        if (response.status === 200 && Cypress._.isEqual(response.body, expectedUserData)) {
            cy.log(successMessage);
        } else {
            cy.log(`Falha na operação`);
        }
    });
});