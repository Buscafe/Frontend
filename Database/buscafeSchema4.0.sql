drop database buscafe;
create database buscafe;
use buscafe;

create table tbl_Estatus(
	id_estatus 	integer not null auto_increment primary key,
	descricao 	text
);

select * from tbl_Estatus;

insert into tbl_Estatus(descricao) VALUES 
	("Desativada"),
    ("Ativa"),
    ("Suspensa");

update tbl_Estatus set id_estatus = 0 where id_estatus = 1; 
update tbl_Estatus set id_estatus = 1 where id_estatus = 2; 
update tbl_Estatus set id_estatus = 2 where id_estatus = 3; 


create table tbl_usuario(
	id_usuario    int not null auto_increment primary key,
    usuario		  varchar(50) not null,
    nome          varchar(50) not null,
    email         varchar(50) not null unique,
    senha         varchar(50) not null,
    religiao      varchar(50) not null,
    localizacao   varchar(60) not null,
	ip      	  varchar(20) not null,
    tipo 		  varchar(15) not null,
    FK_id_estatus integer not null,
    dtCria        datetime default now(),
    
    CONSTRAINT FK_id_estatus FOREIGN KEY(FK_id_estatus) REFERENCES tbl_Estatus(id_estatus)
);

select * from tbl_usuario;
drop table tbl_usuario;

INSERT INTO tbl_usuario(usuario, nome, email, senha, religiao, localizacao, ip, tipo, FK_id_estatus) VALUES
	("Marlom" , "Marlom Raul dos Santos Romero"  , "Messiânica"  , "marlinho.123@gmail.com", md5('123456'), "SP/Cotia" 		         , '192.168.0.2'    , 1 , 1 ),
    ("Igor"   , "Igor" 							 , "Católicismo" , "igor.123@gmail.com"    , md5('123456'), "SP/Embu das artes"      , '192.168.0.23'   , 1 , 1 ),
    ("Luis"   , "Luis"  						 , "Cristianismo", "luis.123@gmail.com"    , md5('123456'), "SP/Embu das artes"      , '192.168.0.245'  , 1 , 1 ),
    ("Gabriel", "Gabriel" 						 , "Evangélismo" , "gabriel.123@gmail.com" , md5('123456'), "SP/Itapecerica da serra", '192.168.0.21'   , 2 , 1 ),
    ("Kaike"  , "Kaike"   						 , "Budismo"     , "kaike.123@gmail.com"   , md5('123456'), "SP/Embu das artes" 	 , '192.168.0.22'   , 2 , 1 ),
    ("Jhonata", "Jhonata" 						 , "Judaismo"    , "jhonata.123@gmail.com" , md5('123456'), "SP/Embu das artes" 	 , '192.168.0.32'   , 2 , 1 ),
    ("Pedro"  , "Pedro"   						 , "Islãmismo"   , "pedro.123@gmail.com"   , md5('123456'), "SP/Embu das artes"		 , '192.168.0.14'   , 2 , 1 );
select * from tbl_usuario;

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
	id_doc int auto_increment primary key,
    cpf varchar(14) not null,
	cnpj varchar(18) not null
);

INSERT INTO tbl_doc(cpf, cnpj) VALUES('453.945.408-02', '00.000.000/0000-00');
INSERT INTO tbl_doc(cpf, cnpj) VALUES('000.000.000-00', '11.111.111/1111-11');

create table tbl_corp(
	id_corp int auto_increment primary key,
    FK_id_usuario int,
    FK_id_doc int,
    raSocial varchar(50) not null,
    coordenada varchar(150) not null,
    
    CONSTRAINT FK_id_usuario FOREIGN KEY(FK_id_usuario) REFERENCES tbl_usuario(id_usuario),
	CONSTRAINT FK_id_doc FOREIGN KEY(FK_id_doc) REFERENCES tbl_doc(id_doc)
);

INSERT INTO tbl_corp(FK_id_usuario, FK_id_doc, rSocial, cordenada) VALUES(1, 1 ,'Igreja Deus e amor', '000000, 00000, -000000');
select * from tbl_corp;
