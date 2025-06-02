create database heart;
use heart; 
show tables;

create table tipodoador(
idtipo int primary key auto_increment,
tipo varchar(45),
descricao varchar(1000)
);


create table usuario(
idusuario int primary key auto_increment,
fktipo int null,
constraint fkusuariotipo foreign key (fktipo)
references TipoDoador(idtipo),
nome Varchar(45),
email varchar(45),
senha varchar(45)
);



create table pergunta(
idpergunta int primary key auto_increment,
descricao varchar(1000)
);


create table resultado(
idresult int auto_increment,
fkusuario int,
constraint fkresultadousuario foreign key (fkusuario)
references usuario(idusuario),
fkpergunta int,
constraint fkresultadopergunta foreign key (fkpergunta)
references pergunta(idpergunta),
primary key(idresult,fkusuario,fkpergunta),
pontos int
);

create table ongs(
idong int primary key auto_increment,
fktipodoador int,
constraint fkongstipo foreign key (fktipodoador)
references tipodoador(idtipo),
nome Varchar(45),
descricao varchar(1000),
link varchar(150)
);