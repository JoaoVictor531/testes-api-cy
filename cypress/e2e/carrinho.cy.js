/// <reference types="cypress"/>

describe('Teste da funcionalidade Carrinho', () => {
    let token

    before(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn => { token = tkn })
    });

    it('Deve listar carrinhos cadastrados ', () => {
        cy.request('carrinhos')
    });

    it('Deve listar carrinhos cadastrados', () => {
        cy.request({
            method: 'GET',
            url: 'carrinhos'
        })
    });

    it('Deve cadastrar carrinho', () => {
        cy.request({
            method: 'POST',
            url: 'carrinhos',
            body: {
                "produtos": [
                    {
                        "idProduto": "K6leHdftCeOJj8BJ",
                        "quantidade": 4
                    },
                    {
                        "idProduto": "nGSDeyDWhxR8ICnJ",
                        "quantidade": 4
                    }
                ]
            },
            headers: { authorization: token }

        })
    });

    it('Deve listar carrinho', () => {
        cy.request('carrinhos').then(response => {
            let id = response.body.carrinhos[0]._id
            cy.request(`carrinhos/${id}`)
        })
    });
})

    
