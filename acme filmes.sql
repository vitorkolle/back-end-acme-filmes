create database dtb_acme_filmes;

use dtb_acme_filmes;

create table tbl_favorito(
id integer primary key not null auto_increment,
favorito boolean not null
); 

create table tbl_classificacao(
id integer primary key not null auto_increment,
faixa_etaria varchar(5) not null,
classificacao varchar(7) not null,
caracteristicas text not null
);
insert into tbl_classificacao(faixa_etaria, classificacao, caracteristicas)values
(
'0-10', 
'10 anos', 
'Violência: Angústia; Arma com violência; Ato criminoso sem violência; Linguagem depreciativa; Medo ou tensão; Ossada ou esqueleto com resquício de ato de violência
Sexo e Nudez: Conteúdo educativo sobre sexo.
Drogas: Descrição do consumo de droga lícita; Discussão sobre o tema tráfico de drogas; Uso medicinal de droga ilícita.' 
);
alter table tbl_classificacao
add column foto_classificacao varchar(300) not null;
insert into tbl_classificacao(
            faixa_etaria,
            classificacao,
            caracteristicas,
            foto_classificacao
        )values(
            '0-10',
            'test',
            'sheibfierhbgierbierb',
            'https://www.gov.br/mj/pt-br/assuntos/seus-direitos/classificacao-1/simbolos-de-autoclassificacao/nr14-auto.png/@@images/image'
        );
select * from tbl_classificacao;
delete from tbl_classificacao where id = '3';
select * from tbl_classificacao where id = 4;

create table tbl_genero(
id integer not null primary key auto_increment,
nome varchar(70) not null,
descricao_genero text not null
);
insert into tbl_genero(nome, descricao_genero)values
(
'Terror',
'Gênero que causa medo'
);
select * from tbl_genero;
select * from tbl_genero where id = 1;
update tbl_genero
			set
            nome = "testeP",
            descricao_genero = "sjkgbrjgb"
            where id = 1;

create table tbl_genero_filme(
id integer not null primary key auto_increment,
id_genero integer not null,
constraint FK_GENERO_GENEROFILME
foreign key (id_genero) references tbl_genero(id),
id_filme integer not null,
constraint FK_FILME_GENEROFILME
foreign key (id_filme) references tbl_filme(id)
);



create table tbl_filme(
id integer primary key not null auto_increment,
titulo varchar(80) not null,
sinopse text not null,
duracao time not null,
data_lancamento date not null,
data_relancamento date,
foto_capa varchar(100) not null,
valor_unitario float not null,
id_favorito integer not null,
constraint FK_FAVORITO_FILME
foreign key(id_favorito) references tbl_favorito(id),
id_classificacao integer not null,
constraint 	FK_CLASSIFICACAO_FILME
foreign key(id_classificacao) references tbl_classificacao(id)
);

create table tbl_sexoA(
id integer not null primary key auto_increment,
sexo varchar(15)
);

create table tbl_nacionalidadeA(
id integer not null primary key auto_increment,
pais varchar(60) not null
);

create table tbl_nacionalidadeAator(
id integer not null primary key auto_increment,
id_nacionalidadeA integer not null,
constraint FK_NACIONALIDADEA_NACIONALIDADEAATOR
foreign key (id_nacionalidadeA) references tbl_nacionalidadeA(id),
id_ator integer not null,
constraint FK_ATOR_NACIONALIDADEAATOR
foreign key (id_ator) references tbl_ator(id)
);

create table tbl_ator(
id integer not null primary key auto_increment,
nome varchar(80) not null,
foto_ator varchar(80) not null,
biografia text not null,
id_sexoA integer not null,
constraint FK_SEXOA_ATOR
foreign key (id_sexoA) references tbl_sexoA(id)
);

create table tbl_ator_filme(
id integer not null primary key auto_increment,
id_ator integer not null,
constraint FK_ATOR_ATORFILME
foreign key (id_ator) references tbl_ator(id),
id_filme integer not null,
constraint FK_FILME_ATORFILME
foreign key (id_filme) references tbl_filme(id)
);

create table tbl_sexoD(
id integer not null primary key auto_increment,
sexo varchar(15) not null
);

create table tbl_nacionalidadeD(
id integer not null primary key auto_increment,
pais varchar(60) not null
);

create table tbl_nacionalidadeD_diretor(
id integer not null primary key auto_increment,
id_nacionalidadeD integer not null,
foreign key(id_nacionalidadeD) references tbl_nacionalidadeD(id),
id_diretor integer not null,
foreign key(id_diretor) references tbl_diretor(id)
);
create table tbl_diretor(
id integer not null primary key auto_increment,
nome varchar(80) not null,
foto_diretor varchar(80) not null,
biografia text not null,
data_nascimento date not null,
id_sexoD integer not null,
constraint FK_SEXOD_DIRETOR
foreign key(id_sexoD) references tbl_sexoD(id)
);

alter table tbl_diretor
drop column id_nacionalidade;

create table tbl_diretor_ator(
id integer not null primary key auto_increment,
id_diretor integer not null,
constraint FK_DIRETOR_DIRETORATOR
foreign key(id_diretor) references tbl_diretor(id),
id_ator integer not null,
constraint FK_ATOR_DIRETORATOR
foreign key(id_ator) references tbl_ator(id)
);


INSERT INTO tbl_filme (nome, sinopse, duracao, data_lancamento, foto_capa, valor_unitario) VALUES 
(
'Vingadores: Ultimato', 
'Em Vingadores: Ultimato, após Thanos eliminar metade das criaturas vivas em Vingadores: Guerra Infinita, 
os heróis precisam lidar com a dor da perda de amigos e seus entes queridos. Com Tony Stark (Robert Downey Jr.) 
vagando perdido no espaço sem água nem comida, o Capitão América/Steve Rogers (Chris Evans) e a Viúva Negra/Natasha Romanov 
(Scarlett Johansson) precisam liderar a resistência contra o titã louco.',
'03:01',
'2019-04-25',
'https://br.web.img2.acsta.net/c_310_420/pictures/19/04/26/17/30/2428965.jpg',
29.99
),
(
'Interestelar',
'Após ver a Terra consumindo boa parte de suas reservas naturais, um grupo de astronautas recebe a missão de verificar
 possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie. Cooper (Matthew McConaughey) 
 é chamado para liderar o grupo e aceita a missão sabendo que pode nunca mais ver os filhos. Ao lado de Brand (Anne Hathaway), 
 Jenkins (Marlon Sanders) e Doyle (Wes Bentley), ele seguirá em busca de uma nova casa. Com o passar dos anos, sua filha Murph 
 (Mackenzie Foy e Jessica Chastain) investirá numa própria jornada para também tentar salvar a população do planeta.',
 '02:49',
 '2014-11-06',
 'https://br.web.img3.acsta.net/c_310_420/pictures/14/10/31/20/39/476171.jpg',
 29.99
);

show tables;

select * from tbl_filme;

select cast(last_insert_id() as decimal) as id from tbl_filme limit 1;

delete from tbl_filme where id = 20;

update tbl_filme
               set
               nome = "teste 05",
               sinopse = "Uma aventura sci-fi que leva os espectadores a uma jornada através das eras.",
               duracao = '02:00',
               data_lancamento = '2024-01-07',
               foto_capa = "https://exemplo.com/foto_tempo.jpg",
               valor_unitario = '34.99'

               where id = 25;