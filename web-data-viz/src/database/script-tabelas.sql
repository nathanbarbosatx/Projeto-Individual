create database HEART;
use HEART; 


create table TipoDoador(
idTipo int primary key,
tipo varchar(45),
descricao varchar(1000)
);


create table Usuario(
idUsuario int primary key,
fktipo int null,
constraint fkusuariotipo foreign key (fktipo)
references TipoDoador(idTipo),
Nome Varchar(45),
Email varchar(45),
Senha varchar(45)
);

create table Pergunta(
idPergunta int primary key,
descricao varchar(1000)
);


create table Resultado(
idResult int ,
fkusuario int,
constraint fkresultadousuario foreign key (fkusuario)
references Usuario(idUsuario),
fkpergunta int,
constraint fkresultadopergunta foreign key (fkpergunta)
references Pergunta(idPergunta),
primary key(idResult,fkusuario,fkpergunta),
Pontos int
);

create table Ongs(
idOng int primary key,
fkTipoDoador int,
constraint fkOngsTipo foreign key (fkTipoDoador)
references TipoDoador(idTipo),
Nome Varchar(45),
Descricao varchar(1000),
link varchar(150)
);