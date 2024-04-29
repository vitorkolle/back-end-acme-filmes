create database dtb_acme_filmes;

use dtb_acme_filmes;

##FAVORITO 
create table tbl_favorito(
id integer primary key not null auto_increment,
favorito boolean not null
); 
insert into tbl_favorito(favorito) values
(true),
(false);

select * from tbl_favorito;

##CLASSIFICAÇÃO
create table tbl_classificacao(
id integer primary key not null auto_increment,
faixa_etaria varchar(5) not null,
classificacao varchar(7) not null,
caracteristicas text not null
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

##GÊNERO
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

##GÊNERO - FILME
create table tbl_genero_filme(
id integer not null primary key auto_increment,
id_genero integer not null,
constraint FK_GENERO_GENEROFILME
foreign key (id_genero) references tbl_genero(id),
id_filme integer not null,
constraint FK_FILME_GENEROFILME
foreign key (id_filme) references tbl_filme(id)
);


##FILME
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
insert into tbl_filme( 
        titulo,
        sinopse,
        duracao,
        data_lancamento,
        data_relancamento,
        foto_capa,
        valor_unitario,
        id_favorito,
        id_classificacao
)values(
        'Pantera Negra',
        'Em Pantera Negra, após a morte do rei T Chaka (John Kani), o príncipe T Challa (Chadwick Boseman) retorna a Wakanda para a cerimônia de coroação. Nela são reunidas as cinco tribos que compõem o reino, sendo que uma delas, os Jabari, não apoia o atual governo. T Challa logo recebe o apoio de Okoye (Danai Gurira), a chefe da guarda de Wakanda, da irmã Shuri (Letitia Wright), que coordena a área tecnológica do reino, e também de Nakia (Lupita Nyong o), a grande paixão do atual Pantera Negra, que não quer se tornar rainha. Juntos, eles estão à procura de Ulysses Klaue (Andy Serkis), que roubou de Wakanda um punhado de vibranium, alguns anos atrás.',
        '02:15',
        '2018-02-15',
         null,
        'https://br.web.img3.acsta.net/c_310_420/pictures/17/12/07/16/09/2291532.jpg',
        '34.99',
        1,
        1
);

##SEXO ATOR
create table tbl_sexoA(
id integer not null primary key auto_increment,
sexo varchar(15)
);
insert into tbl_sexoA(sexo) values ('homem'), ('mulher');

select * from tbl_sexoA;

##NACIONALIDADE(ATOR)
create table tbl_nacionalidadeA(
id integer not null primary key auto_increment,
pais varchar(60) not null
);
insert into tbl_nacionalidadeA(pais)values
('Estados Unidos'), ('Brasil'), ('Inglaterra'), ('França'), ('Irlanda'), ('Espanha'), ('Argentina');

##NACIONALIDADE - ATOR
create table tbl_nacionalidadeAator(
id integer not null primary key auto_increment,
id_nacionalidadeA integer not null,
constraint FK_NACIONALIDADEA_NACIONALIDADEAATOR
foreign key (id_nacionalidadeA) references tbl_nacionalidadeA(id),
id_ator integer not null,
constraint FK_ATOR_NACIONALIDADEAATOR
foreign key (id_ator) references tbl_ator(id)
);

##ATOR
create table tbl_ator(
id integer not null primary key auto_increment,
nome varchar(80) not null,
foto_ator varchar(80) not null,
biografia text not null,
id_sexoA integer not null,
constraint FK_SEXOA_ATOR
foreign key (id_sexoA) references tbl_sexoA(id)
);

insert into tbl_ator(nome, foto_ator, biografia, id_sexoA) values 
(
'Adam Sandlerr',
'https://br.web.img3.acsta.net/c_310_420/pictures/17/06/20/16/57/103535.jpg',
'Adam Sandler é um ator, comediante e dublador norte-americano, mais conhecido por ser o pai da comédia pastelão. Sandler iniciou a carreira de humorista bem cedo, pois, aos 17 anos, começou a fazer apresentações de stand-up no Boston Comedy Club. Após se formar no curso de Belas Artes na New York University, o jovem mudou-se para Los Angeles e deu sequência na área do humor, onde acabou sendo descoberto pelo comediante Dennis Miller, que o recomendou ao produtor de Saturday Night Live. Sendo assim, em 1990, Sandler foi contratado pelo programa da NBC como roteirista, passando a fazer parte do elenco regular, no ano seguinte.Quatro anos depois, Adam Sandler deixou o SNL para começar a carreira de ator. Seu primeiro papel de destaque foi em Billy Madison, um Herdeiro Bobalhão (1995), onde interpretou o protagonista.',
1
);
update tbl_ator
                      set
                      nome = 'testeP',
                      foto_ator = 'https://br.web.img3.acsta.net/c_310_420/pictures/17/06/20/16/57/103535.jpg',
                      biografia = 'Adam Sandler é um ator, comediante e dublador norte-americano, mais conhecido por ser o pai da comédia pastelão. Sandler iniciou a carreira de humorista bem cedo, pois, aos 17 anos, começou a fazer 
apresentações de stand-up no Boston Comedy Club. Após se formar no curso de Belas Artes na New York University, o jovem mudou-se para Los Angeles e deu sequência na área do humor, onde acabou sendo descoberto pelo comediante Dennis Miller, que o recomendou ao produtor d...',
                      id_sexoA = 2
                      
                      where id = 12;

##ATOR - FILME
create table tbl_ator_filme(
id integer not null primary key auto_increment,
id_ator integer not null,
constraint FK_ATOR_ATORFILME
foreign key (id_ator) references tbl_ator(id),
id_filme integer not null,
constraint FK_FILME_ATORFILME
foreign key (id_filme) references tbl_filme(id)
);

##SEXO(DIRETOR)
create table tbl_sexoD(
id integer not null primary key auto_increment,
sexo varchar(15) not null
);
insert into tbl_sexoD(sexo) values ('homem'), ('mulher');

##NACIONALIDADE(DIRETOR)
create table tbl_nacionalidadeD(
id integer not null primary key auto_increment,
pais varchar(60) not null
);
insert into tbl_nacionalidadeD(pais)values
('Estados Unidos'), ('Brasil'), ('Inglaterra'), ('França'), ('Irlanda'), ('Espanha'), ('Argentina');

##NACIONALIDADE - DIRETOR
create table tbl_nacionalidadeD_diretor(
id integer not null primary key auto_increment,
id_nacionalidadeD integer not null,
foreign key(id_nacionalidadeD) references tbl_nacionalidadeD(id),
id_diretor integer not null,
foreign key(id_diretor) references tbl_diretor(id)
);

##DIRETOR
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

##DIRETOR - ATOR
create table tbl_diretor_ator(
id integer not null primary key auto_increment,
id_diretor integer not null,
constraint FK_DIRETOR_DIRETORATOR
foreign key(id_diretor) references tbl_diretor(id),
id_ator integer not null,
constraint FK_ATOR_DIRETORATOR
foreign key(id_ator) references tbl_ator(id)
);

show tables;

select cast(last_insert_id() as decimal) as id from tbl_filme limit 1;
