show databases;

create schema `roadbook` default character set utf8;
use roadbook;
show databases;

create table roadbook.customers (
	id int not null auto_increment,
    name varchar(20) not null,
    age int unsigned not null,
    sex varchar(10) not null,
    joined_date datetime not null default now(),
    primary key(id)
)
default charset = utf8mb4
engine = InnoDB;


create table roadbook.purchase (
	id int not null auto_increment,
    customer_id int not null,
    book_name varchar(20) not null,
    purchase_date datetime not null default now(),
    primary key(id),
    foreign key(customer_id) references roadbook.customers(id) on delete cascade on update cascade
)
default charset = utf8mb4
engine = InnoDB;

show tables;
describe customers;
desc purchase;

insert into roadbook.customers(name, age, sex) values('홍길동', 30, '남');
insert into roadbook.customers(name, age, sex) values('이수진', 23, '여');
insert into roadbook.customers(name, age, sex) values('박민철', 31, '남');
insert into roadbook.customers(name, age, sex) values('이세라', 35, '여');
insert into roadbook.customers(name, age, sex) values('김유미', 46, '여');
select * from customers;

insert into roadbook.purchase(customer_id, book_name) values(1, '엔지니어를 위한 문장의 기술');
insert into roadbook.purchase(customer_id, book_name) values(2, '개발자를 위한 글쓰기 가이드');
insert into roadbook.purchase(customer_id, book_name) values(3, '엔지니어를 위한 문장의 기술');
insert into roadbook.purchase(customer_id, book_name) values(4, '백문불여일타 딥러닝 입문');
insert into roadbook.purchase(customer_id, book_name) values(4, '엔지니어를 위한 문장의 기술');
select * from purchase;

select name, age from customers;
select name from customers where age>99;
update roadbook.customers set age = 100 where id=1;
select * from customers;
delete from customers where id=1;
select * from customers;