CREATE DATABASE db_bemobile_backend;
USE db_bemobile_backend;


CREATE TABLE IF NOT EXISTS tbl_users(
  id SERIAL PRIMARY KEY,

  username VARCHAR(100) NOT NULL UNIQUE,
  email    VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,

  first_name VARCHAR(100) NOT NULL,
  last_name  VARCHAR(100),
  cpf_cnpj   VARCHAR(20) NOT NULL UNIQUE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tbl_contacts(
  id SERIAL PRIMARY KEY,

  ddd    INT,
  number INT,

  fk_user INT NOT NULL,
  FOREIGN KEY(fk_user)
    REFERENCES tbl_users(id)
);

CREATE TYPE enum_address_state AS ENUM(
  'AC', 'AL', 'AP', 'AM', 'BA', 
  'CE', 'ES', 'GO', 'MA', 'MT', 
  'MS', 'MG', 'PA', 'PB', 'PR', 
  'PE', 'PI', 'RJ', 'RN', 'RS', 
  'RO', 'RR', 'SC', 'SP', 'SE', 
  'TO', 'DF'
);

CREATE TABLE IF NOT EXISTS tbl_address(
  id SERIAL PRIMARY KEY,

  street       VARCHAR(100) NOT NULL,
  number       INT          NOT NULL,
  neighborhood VARCHAR(100) NOT NULL,
  zipcode      VARCHAR(20)  NOT NULL,

  state enum_address_state NOT NULL,

  observation VARCHAR(255),

  fk_user INT NOT NULL,
  FOREIGN KEY(fk_user)
    REFERENCES tbl_users(id)
);


CREATE TYPE enum_book_format AS ENUM(
  'paperback', 'ebook'
);

CREATE TABLE IF NOT EXISTS tbl_authors(
  id SERIAL PRIMARY KEY,

  first_name VARCHAR(100) NOT NULL,
  last_name  VARCHAR(100),
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tbl_release_dates(
  id SERIAL PRIMARY KEY,

  day   INT NOT NULL,
  month INT NOT NULL,
  year  INT NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_publishers(
  id SERIAL PRIMARY KEY,

  publisher VARCHAR(100) NOT NULL,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tbl_books(
  id SERIAL PRIMARY KEY,

  title VARCHAR(255)      NOT NULL,
  format enum_book_format NOT NULL,

  price FLOAT NOT NULL,

  number_pages INT NOT NULL,

  fk_publisher INT NOT NULL,
  FOREIGN KEY(fk_publisher)
    REFERENCES tbl_publishers(id),

  fk_release_date INT NOT NULL,
  FOREIGN KEY(fk_release_date)
    REFERENCES tbl_release_dates(id),

  fk_author INT NOT NULL,
  FOREIGN KEY(fk_author)
    REFERENCES tbl_authors(id),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS tbl_sell(
  id SERIAL PRIMARY KEY,

  quantity INT NOT NULL,

  unit_price  FLOAT NOT NULL,
  total_price FLOAT NOT NULL,

  bought_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  fk_user INT NOT NULL,
  FOREIGN KEY(fk_user)
    REFERENCES tbl_users(id),
  fk_book INT NOT NULL,
  FOREIGN KEY(fk_book)
    REFERENCES tbl_books(id)
);
