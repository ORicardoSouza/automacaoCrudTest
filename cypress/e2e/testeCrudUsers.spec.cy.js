describe('Testes_CRUD', () => {
    it('Deverá realizar teste de POST com sucesso', () => {
        cy.postUsers();
    });
    it('Deverá realizar teste de GET com sucesso', () => {
        cy.getUsers();
    });
    it('Deverá realizar teste de PUT com sucesso', () => {
        cy.putUsers();
    });
    it('Deverá realizar teste de DELETE com sucesso', () => {
        cy.deleteUsers();
    });
});