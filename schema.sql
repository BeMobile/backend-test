create database bemobile;

create table if not exists usuarios (
	id_usuario int not null auto_increment,
  	email varchar(255) not null,
  	senha varchar(255) not null,
  	primary key (id_usuario)
);

create table if not exists clientes (
	id_cliente int not null auto_increment,
  	nome varchar(255) not null,
  	cpf varchar(55) not null,
  	endereco varchar(255) not null,
  	telefone varchar(55) not null, 
  	primary key (id_cliente)
);

create table if not exists categorias (
	id_categoria int not null auto_increment,
  	nome varchar(255) not null,
  	primary key (id_categoria)
);

create table if not exists produtos (
	id_produto int not null auto_increment,
  	id_categoria int not null,
  	nome_produto varchar(255) not null,
  	preco int not null,
    ativo boolean default true,
  	primary key (id_produto),
  	foreign key (id_categoria) references categorias(id_categoria)
);

create table if not exists vendas (
	id_venda int not null auto_increment,
  	id_cliente int not null,
  	id_produto int not null,
  	quantidade int not null,
  	preco int not null,
  	preco_total int not null,
  	data_e_hora timestamp not null, 
  	primary key (id_venda),
  	foreign key (id_cliente) references clientes(id_cliente),
  	foreign key (id_produto) references produtos(id_produto)
);

insert into categorias (nome) values ('Carros');
insert into categorias (nome) values ('Livros');
insert into categorias (nome) values ('Jogos');
insert into categorias (nome) values ('Comidas');