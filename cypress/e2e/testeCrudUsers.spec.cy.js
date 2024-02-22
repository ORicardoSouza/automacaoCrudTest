describe('Testes_CRUD', () => {

    context(`Deverá validar cenário de sucesso`, () => {
        it('Deverá realizar teste de POST ', () => {
            cy.postUsers();
        });
        it('Deverá realizar teste de GET ', () => {
            cy.getUsers();
        });
        it('Deverá realizar teste de PUT ', () => {
            cy.putUsers();
        });
        it('Deverá realizar teste de DELETE ', () => {
            cy.deleteUsers();
        });
    });
    context(`Deverá validar cenário de falha`, () => {
        it('Deverá realizar teste de POST ', () => {
            cy.postUsersError();
        });
        it('Deverá realizar teste de GET ', () => {
            cy.getUsersError();
        });
        it('Deverá realizar teste de PUT ', () => {
            cy.putUsersError();
        });
        it('Deverá realizar teste de DELETE ', () => {
            cy.deleteUsersError();
        });
    })


});