# `Documentação`

# Instalação

1. Clone ou baixe este repositório.
2. Execute o comando 'npm install'
3. E depois o comando 'npm start'

# Variáveis de ambiente (.env)

Deve conter as seguintes variaveis de ambiente:

| Variavel             | Descrição                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `PORT=`              | Porta em que a aplicação será inicializada. ex: 3000                                                 |
| `HOST=`              | Local em que a aplicação será inicializada. ex: localhost                                            |
| `DATABASE_NAME=`     | Nome do banco de dados mysql.                                                                        |
| `USER_NAME=`         | Nome de usuario do banco de dados mysql.                                                             |
| `PASSWORD=`          | Senha do banco de dados mysql.                                                                       |
| `TOKEN_SIGN_SECRET=` | Assinatura jwt necessaria para gerar Token. obs: Uma senha aleatória em alfa númerica                |
| `APP_URL=`           | Endereço URL em que a aplicação será inicializada. ex: http://localhost:3000 (Exclusivo para o cors) |

# Respostas

| Código | Descrição                                                          |
| ------ | ------------------------------------------------------------------ |
| `200`  | Requisição executada com sucesso (success).                        |
| `201`  | Novo recurso foi criado com sucesso (success).                     |
| `401`  | Dados de acesso inválidos.                                         |
| `400`  | Erros de validação ou os campos informados não existem no sistema. |
| `404`  | Registro pesquisado não encontrado (Not found).                    |
| `500`  | Erro interno.                                                      |

# Métodos

### Requisições para a API devem seguir os padrões:

# `Rotas de cliente`

| Método             | Descrição                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------- |
| `GET /api/clients` | Retorna lista de todos os clientes cadastrados (index) - Dados principais - Ordenado pelo id. |

- Exemplo:

    <details>
             <summary><b>Resposta [200]</b></summary><p>

  ```json
  [
    {
      "id": 1,
      "name": "Nilton Fernandes",
      "cpf": "333.555.555-59"
    },
    {
      "id": 2,
      "name": "Vinicius Santos",
      "cpf": "555.555.555-59"
    },
    {
      "id": 3,
      "name": "Marco Oliveira",
      "cpf": "555.555.555-59"
    },
    {
      "id": 4,
      "name": "Jane Brito",
      "cpf": "555.555.655-59"
    },
    {
      "id": 5,
      "name": "Kaique da silva",
      "cpf": "555.585.645-59"
    },
    {
      "id": 6,
      "name": "Kaio Matheus",
      "cpf": "555.985.645-59"
    },
    {
      "id": 7,
      "name": "Ariana Escame",
      "cpf": "555.685.645-59"
    }
  ]
  ```

    </p>
    </details></br>

| Método                 | Descrição                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /api/clients/:id` | Retorna detalhes de um(a) cliente e vendas a ele(a) (show) - Traz as vendas mais recentes primeiro; - Filtra as vendas por mês + ano. |

- Exemplo:

  <details>
      <summary><b>Body</b></summary><p>

  ```json
  {
    "month": "01",
    "year": "2022"
  }
  ```

  </p>

  </details></br>

  <details>
      <summary><b>Resposta [200]</b></summary><p>

  ```json
  {
    "client": {
      "id": 1,
      "name": "Nilton Fernandes",
      "birthday": "2000-12-01",
      "cpf": "585.615.645-59",
      "address": {
        "id": 2,
        "street": "AV: Paulista",
        "number": 5000,
        "complement": "ap 33",
        "zipCode": "03335-040",
        "city": "SP",
        "state": "Sao paulo"
      },
      "phones": [
        {
          "phone": "(11) 99999-9999"
        }
      ],
      "sales": [
        {
          "id": 7,
          "totalPrice": "61.00",
          "dateOfSale": "2022-02-19T23:40:21.000Z"
        },
        {
          "id": 6,
          "totalPrice": "75.54",
          "dateOfSale": "2022-01-19T03:14:10.000Z"
        }
      ]
    },
    "salesFilter": [
      {
        "id": 6,
        "productName": "The Diary of a Young Girl",
        "quantity": 2,
        "totalPrice": "75.54",
        "dateOfSale": "2022-01-19T03:14:10.000Z"
      }
    ]
  }
  ```

    </p>

    </details></br>

| Método              | Descrição                         |
| ------------------- | --------------------------------- |
| `POST /api/clients` | Cria um novo registro de cliente. |

- Exemplo:

  <details>
        <summary><b>Body</b></summary><p>

  ```json
  {
    "name": "laura",
    "cpf": "186.585.647-58",
    "birthday": "01-05-1990",
    "phone": "(11) 92222-2222",
    "street": "nova brasilia",
    "number": 187,
    "complement": "ap 104",
    "zipCode": "03924-040",
    "city": "SP",
    "state": "Sao paulo"
  }
  ```

  </p>

  </details></br>

    <details>
           <summary><b>Resposta [201]</b></summary><p>

  ```json
  {
    "msg": "Client registered successfully!",
    "client": {
      "id": 20,
      "name": "laura",
      "cpf": "186.585.647-58",
      "birthday": "1990-01-05",
      "updatedAt": "2022-01-19T23:28:46.089Z",
      "createdAt": "2022-01-19T23:28:46.089Z"
    }
  }
  ```

    </p>
    </details></br>

| Método                 | Descrição                                                        |
| ---------------------- | ---------------------------------------------------------------- |
| `PUT /api/clients/:id` | Atualiza os dados de um registro de cliente selecionado pelo ID. |

- Exemplo:
  <details>
           <summary><b>Body</b></summary><p>

  ```json
  {
    "name": "laura silva santos",
    "cpf": "180.585.657-54",
    "birthday": "01-05-1990"
  }
  ```

     </p>
     </details></br>
   <details>
            <summary><b>Resposta [200]</b></summary><p>

  ```json
  {
    "msg": "Client update successfully!"
  }
  ```

    </p>
    </details></br>

| Método                   | Descrição                                                     |
| ------------------------ | ------------------------------------------------------------- |
| `DELETE api/clients/:id` | Remove do sistema um registro de cliente selecionado pelo ID. |

- Exemplo:

  <details>
          <summary><b>Resposta [200]</b></summary><p>

  ```json
  {
    "msg": "Client successfully deleted!"
  }
  ```

    </p>
    </details></br>

# `Rotas de produtos`

| Método              | Descrição                                                                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| `GET /api/products` | Retorna lista de todos os produtos cadastrados , com apenas dados proncipais ordenados em ordem alfabetica. |

- Exemplo:

  <details>
               <summary><b>Resposta [200]</b></summary><p>

  ```json
  [
    {
      "id": 3,
      "price": "31.50",
      "title": "A volta ao mundo em 80 dias"
    },
    {
      "id": 1,
      "price": "37.77",
      "title": "The Diary of a Young Girl"
    },
    {
      "id": 2,
      "price": "49.50",
      "title": "Viagem ao centro da Terra"
    }
  ]
  ```

  </p>
  </details></br>

| Método                  | Descrição                               |
| ----------------------- | --------------------------------------- |
| `GET /api/products/:id` | Retorna detalhes de um produto pelo ID. |

- Exemplo:

  <details>
           <summary><b>Resposta [200]</b></summary><p>

  ```json
  {
    "id": 1,
    "title": "The Diary of a Young Girl",
    "price": "37.77",
    "author": "Anne Frank",
    "description": "In 1942, with Nazis occupying Holland, a thirteen-year-old Jewish girl and her family fled their home in Amsterdam and went into hiding. ",
    "deletedAt": null
  }
  ```

  </p>
  </details></br>

| Método               | Descrição                         |
| -------------------- | --------------------------------- |
| `POST /api/products` | Cria um novo registro de produto. |

- Exemplo:

  <details>
        <summary><b>Body</b></summary><p>

  ```json
  {
    "title": "The Diary of a Young Girl",
    "price": 37.77,
    "description": "In 1942, with Nazis occupying Holland, a thirteen-year-old Jewish girl and her family fled their home in Amsterdam and went into hiding.",
    "author": "Anne Frank"
  }
  ```

    </p>

  </details></br>

    <details>
           <summary><b>Resposta [201]</b></summary><p>

  ```json
  {
    "msg": "Product registered successfully!",
    "product": {
      "id": 1,
      "title": "The Diary of a Young Girl",
      "price": 37.77,
      "description": "In 1942, with Nazis occupying Holland, a thirteen-year-old Jewish girl and her family fled their home in Amsterdam and went into hiding.",
      "author": "Anne Frank",
      "updatedAt": "2022-01-19T18:53:58.582Z",
      "createdAt": "2022-01-19T18:53:58.582Z"
    }
  }
  ```

    </p>
  </details></br>

| Método                  | Descrição                                                        |
| ----------------------- | ---------------------------------------------------------------- |
| `PUT /api/products/:id` | Atualiza os dados de um registro de produto selecionado pelo ID. |

- Exemplo:
  <details>
           <summary><b>Body</b></summary><p>

  ```json
  {
    "title": "The Diary of a Young Girl",
    "price": 49.9,
    "description": "In 1942, with Nazis occupying Holland, a thirteen-year-old Jewish girl and her family fled their home in Amsterdam and went into hiding.",
    "author": "Anne Frank"
  }
  ```

     </p>
     </details></br>
   <details>
            <summary><b>Resposta [200]</b></summary><p>

  ```json
  {
    "msg": "Update successfully !"
  }
  ```

    </p>
    </details></br>

| Método                    | Descrição                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `DELETE api/products/:id` | Marca um registro de produto selecionado pelo ID como excluido, mas não apaga do Banco de Dados.(Soft delete) |

- Exemplo:

  <details>
          <summary><b>Resposta [200]</b></summary><p>

  ```json
  {
    "msg": "Deleted successfully !"
  }
  ```

    </p>
    </details></br>

# `Rotas de usuário`

| Método               | Descrição                                                  |
| -------------------- | ---------------------------------------------------------- |
| `GET /api/users/:id` | Retorna dados do usuário logado pelo ID (loggedInUser.id). |

- Exemplo:

  <details>
               <summary><b>Resposta [200]</b></summary><p>

  ```json
  {
    "id": 1,
    "name": "nilton",
    "email": "nfescame@gmail.com"
  }
  ```

  </p>
  </details></br>

| Método             | Descrição                                                                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST /api/signup` | Cadastra um novo usuário e senha (A senha é obrigatória e deve ter no mínimo 8 caracteres, letras maiúsculas e minúsculas, números e caracteres especiais.) |

- Exemplo:
  <details>
         <summary><b>Body</b></summary><p>

  ```json
  {
    "name": "nilton",
    "email": "nfescame@gmail.com",
    "password": "Senha@senha1234"
  }
  ```

     </p>

   </details></br>

   <details>
            <summary><b>Resposta [201]</b></summary><p>

  ```json
  {
    "msg": "User registered successfully!"
  }
  ```

   </p>
   </details></br>

| Método            | Descrição                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| `POST /api/login` | Efetua login do usuário e retorna um Token de autorização(Apenas usuários logados podem acessar as demais rotas). |

- Exemplo:

  <details>
        <summary><b>Body</b></summary><p>

  ```json
  {
    "email": "nfescame@gmail.com",
    "password": "Senha@senha1234"
  }
  ```

    </p>

  </details></br>

    <details>
           <summary><b>Resposta [201]</b></summary><p>

  ```json
  {
    "user": {
      "name": "nilton",
      "email": "nfescame@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibmlsdG9uIiwiZW1haWwiOiJuZmUyc0BnbWFpbC5jb20iLCJpYXQiOjE2NDI2MzQ5MTEsImV4cCI6MTY0MjY1NjUxMX0.5ZVm5OCouib8ifqoxES1aQJJfNNmIx9MIZe3Y6fPsAw"
  }
  ```

    </p>
  </details></br>

# `Rotas de vendas`

| Método            | Descrição                                 |
| ----------------- | ----------------------------------------- |
| `Post /api/sales` | registrar venda de 1 produto a 1 cliente. |

- Exemplo:

  <details>
          <summary><b>Body</b></summary><p>

  ```json
  {
    "quantity": 2,
    "clientId": "9",
    "productId": "2"
  }
  ```

    </p>

  </details></br>

    <details>
                 <summary><b>Resposta [201]</b></summary><p>

  ```json
  {
    "sale": {
      "dateOfSale": "2022-01-19T23:40:21.740Z",
      "id": 7,
      "quatity": 2,
      "clientId": "9",
      "productId": "2",
      "unitPrice": 30.5,
      "totalPrice": 61.0,
      "updatedAt": "2022-01-19T23:40:21.742Z",
      "createdAt": "2022-01-19T23:40:21.742Z"
    }
  }
  ```

    </p>
    </details></br>

# `Rotas de endereço`

| Método             | Descrição                                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| `GET /api/address` | Retorna lista de todos os endereços cadastrados, com apenas dados principais incluindo o cliente associado. |

- Exemplo:

    <details>
                 <summary><b>Resposta [200]</b></summary><p>

  ```json
  [
    {
      "street": "nova brasilia brasil",
      "number": 1876,
      "complement": "ap 1045",
      "zipCode": "03924-040",
      "city": "SP",
      "state": "Sao paulo",
      "client": {
        "id": 1,
        "name": "laura"
      }
    },
    {
      "street": "nova brasilia",
      "number": 187,
      "complement": "ap 104",
      "zipCode": "03924-040",
      "city": "SP",
      "state": "Sao paulo",
      "client": {
        "id": 2,
        "name": "Joana"
      }
    },
    {
      "street": "bareira grande",
      "number": 5000,
      "complement": "casa 04",
      "zipCode": "03624-040",
      "city": "SP",
      "state": "Sao paulo",
      "client": {
        "id": 3,
        "name": "adriana escame"
      }
    },
    {
      "street": "in confidencia",
      "number": 12,
      "complement": "casa 1",
      "zipCode": "03924-040",
      "city": "SP",
      "state": "Sao paulo",
      "client": {
        "id": 4,
        "name": "Cludio Lemos"
      }
    },
    {
      "street": "faustino ",
      "number": 45,
      "complement": "casa 03",
      "zipCode": "03924-040",
      "city": "SP",
      "state": "Sao paulo",
      "client": {
        "id": 5,
        "name": "João Marques"
      }
    }
  ]
  ```

    </p>
    </details></br>

| Método                       | Descrição                                                                    |
| ---------------------------- | ---------------------------------------------------------------------------- |
| `PUT /api/address/:idClient` | Atualiza os dados de um registro de endereço selecionado pelo ID do cliente. |

- Exemplo:

  <details>
          <summary><b>Body</b></summary><p>

  ```json
  {
    "street": "nova brasilia brasil",
    "number": 1876,
    "complement": "ap 1045",
    "zipCode": "03924-040",
    "city": "SP",
    "state": "Sao paulo"
  }
  ```

    </p>

  </details></br>

    <details>
                 <summary><b>Resposta [200]</b></summary><p>

  ```json
  {
    "msg": "Update successfully !"
  }
  ```

    </p>
    </details></br>

# `Rotas de telefone`

| Método            | Descrição                                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `GET /api/phones` | Retorna lista de todos os endereços cadastrados, com apenas dados principais incluindo o cliente associado. |

- Exemplo:

    <details>
                 <summary><b>Resposta [200]</b></summary><p>

  ```json
  [
    {
      "phone": "(11) 91111-1111",
      "client": {
        "id": 1,
        "name": "laura"
      }
    },
    {
      "phone": "(11) 92222-2222",
      "client": {
        "id": 2,
        "name": "Joana"
      }
    },
    {
      "phone": "(11) 93333-3333",
      "client": {
        "id": 3,
        "name": "adriana escame"
      }
    },
    {
      "phone": "(11) 94444-4444",
      "client": {
        "id": 4,
        "name": "Cludio Lemos"
      }
    },
    {
      "phone": "(11) 95555-5555",
      "client": {
        "id": 5,
        "name": "João Marques"
      }
    }
  ]
  ```

    </p>
    </details></br>

| Método                      | Descrição                                                                    |
| --------------------------- | ---------------------------------------------------------------------------- |
| `PUT /api/phones/:idClient` | Atualiza os dados de um registro de telefone selecionado pelo ID do cliente. |

- Exemplo:

  <details>
          <summary><b>Body</b></summary><p>

  ```json
  {
    "phone": "(11) 91919-1111"
  }
  ```

    </p>

  </details></br>

    <details>
                 <summary><b>Resposta [200]</b></summary><p>

  ```json
  {
    "msg": "Update successfully !"
  }
  ```

    </p>
    </details></br>

... para testar os endpoits pelo insomnia, deve-se adicionar o token retornado no login em todas as rotas,
exceto "/login", "/signup"

![alt text](https://raw.githubusercontent.com/Malm/insomnia-plugin-save-access-token/master/screen-1.png)
