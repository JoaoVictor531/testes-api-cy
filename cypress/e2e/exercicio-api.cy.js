/// <reference types="cypress" />
import contarato from '../contracts/produtos.contract'
import { faker } from '@faker-js/faker'
let token

describe('Testes da Funcionalidade Usuários', () => {
     let nomeFaker = faker.name.fullName()
     let emailFaker = faker.internet.email()
     let senhaFaker = faker.internet.password()

    it('Deve validar contrato de usuários', () => {
     cy.request('usuarios').then(response => {
          return contarato.validateAsync(response.body)
     })
    });

    it('Deve listar usuários cadastrados', () => {
         cy.request('usuarios').then(response => {
          expect(response.status).to.equal(200)
         })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
         cy.request({
          method: 'POST',
          url: 'usuarios',
          body:{
               "nome": nomeFaker,
               "email": emailFaker,
               "password": "teste",
               "administrador": "false"
             }
         }).then(response => {
          expect(response.status).to.equal(201)
          expect(response.body.message).to.equal('Cadastro realizado com sucesso')
         })
    });

    it('Deve validar um usuário com email inválido', () => {
     cy.cadastrarUsuario('Lucas Silva', 'lucas@qa.com.br', 'teste', 'false')
          .then(response => {
          expect(response.status).to.equal(400)
          expect(response.body.message).to.equal('Este email já está sendo usado')
         })
         
    });

    it('Deve editar um usuário previamente cadastrado', () => {
     let nomeFaker2 = faker.name.fullName()
     let emailFaker2 = faker.internet.email()
     let senhaFaker2 = faker.internet.password()
     cy.cadastrarUsuario(nomeFaker, emailFaker, senhaFaker, 'false')  
          .then(response =>{
          let id = response.body._id
          cy.request({
           method:'PUT',
           url:`usuarios/${id}`,
           body:{
                "nome": nomeFaker2,
                "email": emailFaker2,
                "password": senhaFaker2,
                "administrador": "true"
              }
          })
     })
      
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
     cy.cadastrarUsuario('Andres Padberg', 'Naomi_Bartell@gmail.com', '0KJcDh5j7gtUZjf', 'true')
     .then(response =>{
          let id = response.body._id
          cy.request({
               method:'DELETE',
               url:`usuarios/${id}`
              }).then(response => {
               expect(response.status).to.equal(200)
               expect(response.body.message).to.equal('Registro excluído com sucesso')
              })

     })

        
    });


});
