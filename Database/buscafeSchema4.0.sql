create database bpjubx2z4oc4ch7gkr0r;
use bpjubx2z4oc4ch7gkr0r;

-- tbl_user, tbl_doc, tbl_corp, 

CREATE TABLE tbl_user(
    id_user       int auto_increment primary key,
    user	      varchar(50) not null,
    name          varchar(255)not null,
    email         varchar(50) not null unique,
    password      varchar(50) not null,
    religion      varchar(50) not null,
    localization  varchar(60) not null,
    ip      	  varchar(20) not null,
    type          varchar(15) not null,
    estatus       integer(1) not null,
    dtCreate      datetime default now()
);

select * from tbl_user;

INSERT INTO tbl_user(user, name, religion, email, password, localization, ip, type, estatus) VALUES
	("Marlom" , "Marlom Raul dos Santos Romero"  , "Católico"  , "marlinho.123@gmail.com", md5('123456'), "SP/Cotia" 		       , '192.168.0.2'    , 1 , 1 ),
    ("Igor"   , "Igor Costa Braz"    			 , "Evangélico", "igor.123@gmail.com"    , md5('123456'), "SP/Embu das artes"      , '45.174.181.149'   , 1 , 1 ),
    ("Luis"   , "Luis Fernando Pedro Bom Pereira", "Budista"   , "luis.123@gmail.com"    , md5('123456'), "SP/Embu das artes"      , '192.168.0.245'  , 1 , 1 ),
    ("Gabriel", "Gabriel Vitor Araujo De Lima" 	 , "Judeu"     , "gabriel.123@gmail.com" , md5('123456'), "SP/Itapecerica da serra", '192.168.0.21'   , 2 , 1 ),
    ("Kaike"  , "Kaike Santos Rocha"			 , "Espírita"  , "kaike.123@gmail.com"   , md5('123456'), "SP/Embu das artes" 	   , '192.168.0.22'   , 2 , 1 ),
    ("Jhonata", "Jhonata Pereira Rodrigues"		 , "Católico"  , "jhonata.123@gmail.com" , md5('123456'), "SP/Embu das artes" 	   , '192.168.0.32'   , 2 , 1 ),
    ("Pedro"  , "Pedro Lemes Da Cruz"			 , "Evangélico", "pedro.123@gmail.com"   , md5('123456'), "SP/Embu das artes"	   , '192.168.0.14'   , 2 , 1 );

select * from tbl_user;


create table tbl_doc(
	id_doc int auto_increment primary key,
    cpf    varchar(14) not null,
	cnpj   varchar(18) not null
);

INSERT INTO tbl_doc(cpf, cnpj) VALUES('453.945.408-02', '00.000.000/0000-00');
INSERT INTO tbl_doc(cpf, cnpj) VALUES('000.000.000-00', '11.111.111/1111-11');

CREATE TABLE tbl_corp(
	id_corp    int auto_increment primary key,
    FK_id_user int,
    FK_id_doc  int,
    corpName   varchar(50) not null,
    coordinate varchar(150) not null,
    
    CONSTRAINT FK_id_user FOREIGN KEY(FK_id_user) REFERENCES tbl_user(id_user),
	CONSTRAINT FK_id_doc FOREIGN KEY(FK_id_doc) REFERENCES tbl_doc(id_doc)
);
INSERT INTO tbl_corp(FK_id_user, FK_id_doc, corpName, coordinate) VALUES(1, 1 ,'Igreja Deus e amor', '000000, 00000, -000000');