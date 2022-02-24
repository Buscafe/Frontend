create database buscafe;
use buscafe;

create table tbl_tipoUsuario(
	id int auto_increment primary key,
    tipo varchar(15) not null,
    descricao text
);

insert into tbl_tipoUsuario(tipo, descricao) VALUES 
	("Comum", "Usuario padrao"),
    ("Corporativo", "Usuario com fim corporativo");

create table tbl_descricaoEstatus(
	id int auto_increment primary key,
	descricao text
);

insert into tbl_descricaoEstatus(descricao) VALUES 
	("Desativada"),
    ("Ativa"),
    ("Suspensa");

create table tbl_usuario(
	id            int auto_increment primary key,
    nome          varchar(50) not null,
    email         varchar(50) not null unique,
    senha         varchar(50) not null,
	location      varchar(15) not null,
    dtCria        datetime not null,
    FK_id_uTipo   int,
	FK_uStatus    int,
    CONSTRAINT FK_id_uTipo FOREIGN KEY(FK_id_uTipo) REFERENCES tbl_tipoUsuario(id),
    CONSTRAINT FK_uStatus FOREIGN KEY(FK_uStatus) REFERENCES tbl_descricaoEstatus(id)
);

INSERT INTO tbl_usuario(nome, email, senha, location, dtCria, FK_id_uTipo, FK_uStatus) VALUES
	("Marlom"  , "marlinho.123@gmail.com", md5('123456') , '192.168.100.47' , current_timestamp() , 1 , 2 ),
    ("Igor"    , "igor.123@gmail.com"    , md5('123456') , '45.174.181.242' , current_timestamp() , 1 , 2 ),
    ("Luis"    , "luis.123@gmail.com"    , md5('123456') , '192.168.100.2'  , current_timestamp() , 1 , 2 ),
    ("Gabriel" , "gabriel.123@gmail.com" , md5('123456') , '192.168.100.45' , current_timestamp() , 2 , 2 ),
    ("Kaike"   , "kaike.123@gmail.com"   , md5('123456') , '192.168.100.12' , current_timestamp() , 2 , 2 ),
    ("Jhonata" , "jhonata.123@gmail.com" , md5('123456') , '192.168.100.52' , current_timestamp() , 2 , 2 ),
    ("Pedro"   , "pedro.123@gmail.com"   , md5('123456') , '192.168.100.13' , current_timestamp() , 2 , 2 );
    
    
/*
create table tbl_apontamento(
	id int auto_increment primary key,
	idUsuario int,
	nomeUsuario varchar(50) not null,
	dtAlter datetime,
	alterDescri varchar(100),
	CONSTRAINT idUsuario FOREIGN KEY (idUsuario) REFERENCES tbl_usuario(id)
); */

create table tbl_doc(
	id int auto_increment primary key,
    cpf varchar(14) not null,
	cnpj varchar(18) not null
);
INSERT INTO tbl_doc(cpf, cnpj) VALUES('453.945.408-02', '00.000.000/0000-00');
INSERT INTO tbl_doc(cpf, cnpj) VALUES('000.000.000-00', '11.111.111/1111-11');

create table tbl_corp(
	id int auto_increment primary key,
    FK_id_usuario int,
    FK_id_doc int,
    rSocial varchar(50) not null,
    cordenada varchar(150) not null,
    CONSTRAINT FK_id_usuario FOREIGN KEY(FK_id_usuario) REFERENCES tbl_usuario(id),
	CONSTRAINT FK_id_doc FOREIGN KEY(FK_id_doc) REFERENCES tbl_doc(id)
);

INSERT INTO tbl_corp(FK_id_usuario, FK_id_doc, rSocial, cordenada) VALUES(1, 1 ,'Igreja Deus e amor', '000000, 00000, -000000');
select * from tbl_corp;