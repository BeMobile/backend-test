## Table of Contents

- [Installation](#installation)
- [Authenticate](#authenticate)
- [User](#user)
  - [**Find all users**](#find-all-users)
  - [**Find one user**](#find-one-user)
  - [**Find user purchases**](#find-user-purchases)
  - [**Create user**](#create-user)
  - [**Update user**](#update-user)
  - [**Delete user**](#delete-user)
- [Publisher](#publisher)
  - [**Find all publishers**](#find-all-publishers)
  - [**Find one publisher**](#find-one-publisher)
  - [**Create publisher**](#create-publisher)
  - [**Update publisher**](#update-publisher)
  - [**Delete publisher**](#delete-publisher)
- [Author](#author)
  - [**Find all authors**](#find-all-authors)
  - [**Find one author**](#find-one-author)
  - [**Create author**](#create-author)
  - [**Update author**](#update-author)
  - [**Delete author**](#delete-author)
- [Book](#book)
  - [**Find all books**](#find-all-books)
  - [**Find one book**](#find-one-book)
  - [**Create book**](#create-book)
  - [**Update book**](#update-book)
  - [**Delete book**](#delete-book)
- [Sell](#sell)
  - [**Find all sells**](#find-all-sells)
  - [**Create sell**](#create-sell)

# Installation

1. Clone the repo
   ```sh
   git clone https://github.com/rochaeduardo997/backend-test-bemobile.git
   ```
2. Install NPM packages
   ```sh
   yarn install
   ```
3. Rename `.env_example` to `.env`
   ```js
   mv .env_example .env
   ```
4. Enter your database, redis, server port, secret for JWT and number of salts to encrypt user password settings in `.env`
   ```sh
   ENV_SERVER_PORT
   ENV_DATABASE_PORT
   ENV_DATABASE_PASSWORD
   ENV_DATABASE_USERNAME
   ENV_DATABASE_HOST
   ENV_DATABASE_NAME
   ENV_REDIS_HOST
   ENV_REDIS_PORT
   ENV_JWT_SECRET
   ENV_PASSWORD_ENCRYPT_SALTS
   ```
5. Run project
   ```js
   yarn start
   ```

# Authenticate
* **URL**

  /api/auth

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**

    None

* **Data Params**

  login, password

* **Success Response:**
  * **Code:** 200
    **Content:** 
	`
	{
    "status": true,
    "token": "Your token here"
  }
 `
 
* **Error Response:**
  * **Code:** 500 INTERNAL SERVER ERROR
    **Content:** 
	`
	{
    "status": false,
    "message": "User not found or doesn't exists"
  }
	`

# User
**Find all users**
----
* **URL**

  /api/users

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
    Authentication token

* **Data Params**
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
	{
    "status": true,
    "total": 1,
    "result": [
      {
        "id": 9,
        "username": "test",
        "email": "test",
        "first_name": "test",
        "last_name": "test",
        "cpf_cnpj": "123.123.123-00",
        "createdAt": "2022-04-21T13:47:13.916Z",
        "updatedAt": "2022-04-21T13:47:13.916Z"
      }
    ]
  }
	`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`

**Find one user**
----
* **URL**

  /api/user/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
    Authentication token, user id

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
	{
    "status": true,
    "result": {
      "user": {
        "id": 9,
        "username": "test",
        "email": "test",
        "first_name": "test",
        "last_name": "test",
        "cpf_cnpj": "123.123.123-00",
        "createdAt": "2022-04-21T13:47:13.916Z",
        "updatedAt": "2022-04-21T13:47:13.916Z"
      },
      "contact": [
        {
          "id": 6,
          "ddd": 85,
          "number": 00000000,
          "fk_user": 9
        }
      ],
      "address": [
        {
          "id": 6,
          "street": "test",
          "number": 111,
          "neighborhood": "test",
          "zipcode": "00000-000",
          "state": "CE",
          "observation": null,
          "fk_user": 9
        }
      ]
    }
  }
	`
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`

**Find user purchases**
----
* **URL**

  /api/user/:id/purchase?month&year

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
    Authentication token, user id

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
	{
		"status": true,
		"result": {
			"user": {
				"id": 9,
				"username": "test",
				"email": "test",
				"first_name": "test",
				"last_name": "test",
				"cpf_cnpj": "123.123.123-00",
				"createdAt": "2022-04-21T13:47:13.916Z",
				"updatedAt": "2022-04-21T13:47:13.916Z"
			},
			"purchases": [
				{
					"id": 5,
					"quantity": 5,
					"unit_price": 10,
					"total_price": 50,
					"bought_at": "2022-04-21T22:00:08.189Z",
					"fk_user": 9,
					"fk_book": 1,
					"createdAt": "2022-04-21T22:00:21.664Z",
					"updatedAt": "2022-04-21T22:00:21.664Z"
				},
				{
					"id": 4,
					"quantity": 5,
					"unit_price": 10,
					"total_price": 50,
					"bought_at": "2022-04-21T22:00:08.189Z",
					"fk_user": 9,
					"fk_book": 1,
					"createdAt": "2022-04-21T22:00:20.911Z",
					"updatedAt": "2022-04-21T22:00:20.911Z"
				}
			]
		}
	}
	`
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`
    **Content:** 
	`
	{
		"status": false,
		"message": "User doesn\t exists"
	}
	`

**Create user**
----
* **URL**

 /api/user

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
    Authentication token

* **Data Params**

  username, email, password, first_name, last_name, cpf_cnpj, ddd, phoneNumber, street, addressNumber, neighborhood, zipcode, state, observation

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
		`
	{
    "status": true,
    "result": {
      "user": {
        "id": 9,
        "username": "test",
        "email": "test",
        "first_name": "test",
        "last_name": "test",
        "cpf_cnpj": "123.123.123-00",
        "createdAt": "2022-04-21T13:47:13.916Z",
        "updatedAt": "2022-04-21T13:47:13.916Z"
      },
      "contact": [
        {
          "id": 6,
          "ddd": 85,
          "number": 00000000,
          "fk_user": 9
        }
      ],
      "address": [
        {
          "id": 6,
          "street": "test",
          "number": 111,
          "neighborhood": "test",
          "zipcode": "00000-000",
          "state": "CE",
          "observation": null,
          "fk_user": 9
        }
      ]
    }
  }
	`
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`
    **Content:** 
	`
  {
    "status": false,
    "message": "Validation error"
  }
	`

**Update user**
----
* **URL**

  /api/user/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
    Authentication token, user id

* **Data Params**
  username, email, password, first_name, last_name, cpf_cnpj, ddd, phoneNumber, street, addressNumber, neighborhood, zipcode, state, observation

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
	{
		"status": true
	}
	`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`
    **Content:** 
	`
	{
		"status": false,
		"message": "User doesn\t exists"
	}
	`

**Delete user**
----
* **URL**

 	/api/user/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
  	Authentication token, user id

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
	{
		"status": true
	}
	`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`
    **Content:** 
	`
	{
		"status": false,
		"message": "User doesn\t exists"
	}
	`


# Publisher
**Find all publishers**
----
* **URL**

  /api/publishers

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
    Authentication token

* **Data Params**
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
	{
    "status": true,
    "total": 1,
    "result": [
      {
        "id": 1,
        "publisher": "publisher",
        "createdAt": "2022-04-23T22:22:31.000Z",
        "updatedAt": "2022-04-23T22:22:31.000Z"
      }
    ]
  }
	`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`

**Find one publisher**
----
* **URL**

  /api/publisher/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
    Authentication token, publisher id

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
	{
    "status": true,
    "result": {
      "id": 1,
      "publisher": "publisher",
      "createdAt": "2022-04-23T22:22:31.000Z",
      "updatedAt": "2022-04-23T22:22:31.000Z"
    }
  }
	`
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`

**Create publisher**
----
* **URL**

 /api/publisher

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
    Authentication token

* **Data Params**

  publisher

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
		`
	{
    "status": true,
    "result": {
      "id": 2,
      "publisher": "new_publisher",
      "updatedAt": "2022-04-23T22:22:31.156Z",
      "createdAt": "2022-04-23T22:22:31.156Z"
    }
  }
	`
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`

**Update publisher**
----
* **URL**

  /api/publisher/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
    Authentication token, user id

* **Data Params**
  publisher

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
	{
		"status": true
	}
	`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`
    **Content:** 
	`
	{
		"status": false,
		"message": "Publisher doesn\t exists"
	}
	`

**Delete publisher**
----
* **URL**

 	/api/publisher/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
  	Authentication token, publisher id

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
	{
		"status": true
	}
	`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`
    **Content:** 
	`
	{
		"status": false,
		"message": "Publisher doesn\t exists"
	}
	`


# Author
**Find all authors**
----
* **URL**

  /api/authors

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
    Authentication token

* **Data Params**
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
	{
    "status": true,
    "total": 1,
    "result": [
      {
        "id": 1,
        "first_name": "author_first_name",
        "last_name": "author_last_name",
        "createdAt": "2022-04-23T22:22:42.000Z",
        "updatedAt": "2022-04-23T22:22:42.000Z"
      }
    ]
  }
	`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`

**Find one author**
----
* **URL**

  /api/author/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
    Authentication token, author id

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
  {
    "status": true,
    "result": {
      "id": 1,
      "first_name": "author_first_name",
      "last_name": "author_last_name",
      "createdAt": "2022-04-23T22:22:42.000Z",
      "updatedAt": "2022-04-23T22:22:42.000Z"
    }
  }
	`
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`
  * **Code:** 404 NOT FOUND <br />
    **Content:** 
	`
  {
    "status": false,
    "message": "Author doesn\t exists"
  }
	`

**Create author**
----
* **URL**

 /api/author

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
    Authentication token

* **Data Params**

  first_name, last_name

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
		`
  {
    "status": true,
    "result": {
      "id": 2,
      "first_name": "new_author_first_name",
      "last_name": "new_author_last_name",
      "updatedAt": "2022-04-23T22:22:42.508Z",
      "createdAt": "2022-04-23T22:22:42.508Z"
    }
  }
	`
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`

**Update author**
----
* **URL**

  /api/author/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
    Authentication token, user id

* **Data Params**
  first_name, last_name

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
	{
		"status": true
	}
	`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`
    **Content:** 
	`
	{
		"status": false,
		"message": "Author doesn\t exists"
	}
	`

**Delete author**
----
* **URL**

 	/api/author/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
  	Authentication token, author id

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
	{
		"status": true
	}
	`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`
    **Content:** 
	`
	{
		"status": false,
		"message": "Author doesn\t exists"
	}
	`


# Book
**Find all books**
----
* **URL**

  /api/products

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
    Authentication token

* **Data Params**
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
  {
    "status": true,
    "total": 1,
    "result": [
      {
        "id": 1,
        "title": "book_title",
        "format": "paperback",
        "price": 10,
        "number_pages": 10,
        "fk_publisher": 1,
        "fk_release_date": 1,
        "fk_author": 1,
        "createdAt": "2022-04-23T22:30:16.000Z",
        "updatedAt": "2022-04-23T22:30:16.000Z"
      }
    ]
  }
	`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`

**Find one book**
----
* **URL**

  /api/product/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
    Authentication token, book id

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
  {
    "status": true,
    "result": [
      {
        "id": 1,
        "title": "book_title",
        "format": "paperback",
        "price": 10,
        "number_pages": 10,
        "fk_publisher": 1,
        "fk_release_date": 1,
        "fk_author": 1,
        "createdAt": "2022-04-23T22:30:16.000Z",
        "updatedAt": "2022-04-23T22:30:16.000Z"
      }
    ]
  }
	`
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`
  * **Code:** 404 NOT FOUND <br />
    **Content:** 
	`
  {
    "status": false,
    "message": "Book doesn\t exists"
  }
	`

**Create book**
----
* **URL**

 /api/product

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
    Authentication token

* **Data Params**

  authorID, day, month, year, publisherID, title, format, price, number_pages

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
		`
  {
    "status": true,
    "result": {
      "author": {
        "id": 1,
        "first_name": "author_first_name",
        "last_name": "author_last_name",
        "createdAt": "2022-04-23T22:22:42.000Z",
        "updatedAt": "2022-04-23T22:22:42.000Z"
      },
      "release_date": {
        "id": 1,
        "day": 1,
        "month": 1,
        "year": 1990
      },
      "publisher": {
        "id": 1,
        "publisher": "publisher",
        "createdAt": "2022-04-23T22:22:31.000Z",
        "updatedAt": "2022-04-23T22:22:31.000Z"
      },
      "book": {
        "id": 3,
        "title": "titulo",
        "format": "paperback",
        "price": 10,
        "number_pages": 10,
        "updatedAt": "2022-04-23T22:30:16.316Z",
        "createdAt": "2022-04-23T22:30:16.316Z"
      }
    }
  }
	`
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`

**Update book**
----
* **URL**

  /api/product/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
    Authentication token, book id

* **Data Params**
  authorID, day, month, year, publisherID, title, format, price, number_pages

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
	{
		"status": true
	}
	`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`
    **Content:** 
	`
	{
		"status": false,
		"message": "Book doesn\t exists"
	}
	`

**Delete book**
----
* **URL**

 	/api/product/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
  	Authentication token, book id

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
	{
		"status": true
	}
	`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`
    **Content:** 
	`
	{
		"status": false,
		"message": "Book doesn\t exists"
	}
	`


# Sell
**Find all sells**
----
* **URL**

  /api/sells

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
    Authentication token

* **Data Params**
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
	`
  {
    "status": true,
    "total": 1,
    "result": [
      {
        "id": 1,
        "quantity": 5,
        "unit_price": 10,
        "total_price": 50,
        "bought_at": "2022-04-23T22:31:31.000Z",
        "fk_user": 1,
        "fk_book": 1,
        "createdAt": "2022-04-23T22:31:36.000Z",
        "updatedAt": "2022-04-23T22:31:36.000Z"
      }
    ]
  }
	`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`

**Create sell**
----
* **URL**

 /api/sell

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
    Authentication token

* **Data Params**

  userID, bookID, quantity

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
		`
  {
    "status": true,
    "result": {
      "sell": {
        "bought_at": "2022-04-23T22:31:31.787Z",
        "id": 1,
        "quantity": 5,
        "unit_price": 10,
        "total_price": 50,
        "updatedAt": "2022-04-23T22:31:36.942Z",
        "createdAt": "2022-04-23T22:31:36.942Z"
      },
      "product": {
        "id": 1,
        "title": "book_title",
        "format": "paperback",
        "price": 10,
        "number_pages": 10,
        "fk_publisher": 1,
        "fk_release_date": 1,
        "fk_author": 1,
        "createdAt": "2022-04-23T22:30:16.000Z",
        "updatedAt": "2022-04-23T22:30:16.000Z"
      },
      "user": {
        "id": 9,
        "username": "test",
        "email": "test",
        "first_name": "test",
        "last_name": "test",
        "cpf_cnpj": "123.123.123-00",
        "createdAt": "2022-04-21T13:47:13.916Z",
        "updatedAt": "2022-04-21T13:47:13.916Z"
      }
    }
  }
	`
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
	`
  {
    "status": false,
    "error": {
      "msg": "Failed on authentication",
      "error": "Authentication token is necessary"
    }
  }
	`
  * **Code:** 404 NOT FOUND <br />
    **Content:** 
	`
  {
    "status": false,
    "message": "Book doesn\t exists"
  }
	`
  * **Code:** 404 NOT FOUND <br />
    **Content:** 
	`
  {
    "status": false,
    "message": "User doesn\t exists"
  }
	`