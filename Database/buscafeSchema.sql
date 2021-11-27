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
	location      varchar(12) not null,
    dtCria        datetime not null,
    FK_id_uTipo   int,
	FK_uStatus    int,
    
    CONSTRAINT FK_id_uTipo FOREIGN KEY(FK_id_uTipo) REFERENCES tbl_tipoUsuario(id),
    CONSTRAINT FK_uStatus FOREIGN KEY(FK_uStatus) REFERENCES tbl_descricaoEstatus(id)
);

INSERT INTO tbl_usuario(nome, email, senha, dtCria, FK_id_uTipo, FK_uStatus) VALUES
	("Marlom"  , "marlinho.123@gmail.com", md5('123456') , current_timestamp() , 1 , 2 ),
    ("Igor"    , "igor.123@gmail.com"    , md5('123456') , current_timestamp() , 1 , 2 ),
    ("Luis"    , "luis.123@gmail.com"    , md5('123456') , current_timestamp() , 1 , 2 ),
    ("Gabriel" , "gabriel.123@gmail.com" , md5('123456') , current_timestamp() , 2 , 2 ),
    ("Kaike"   , "kaike.123@gmail.com"   , md5('123456') , current_timestamp() , 2 , 2 ),
    ("Jhonata" , "jhonata.123@gmail.com" , md5('123456') , current_timestamp() , 2 , 2 ),
    ("Pedro"   , "pedro.123@gmail.com"   , md5('123456') , current_timestamp() , 2 , 2 );
    select * from tbl_usuario;
    
ALTER TABLE tbl_usuario ADD COLUMN location varchar(15) not null after senha,
						ADD COLUMN location varchar(15) not null after senha;
UPDATE tbl_usuario SET location = '45.174.181.242' WHERE id = 2;
UPDATE tbl_usuario SET location = '192.168.100.2' WHERE id = 4;

create table tbl_apontamento(
	id int auto_increment primary key,
    idUsuario int,
    nomeUsuario varchar(50) not null,
    dtAlter datetime,
    alterDescri varchar(100),
    CONSTRAINT idUsuario FOREIGN KEY (idUsuario) REFERENCES tbl_usuario(id)
);


