Create database bamazon;
use bamazon;
create table products(
	id int not null auto_increment,
    product_name varchar(70) null,
    department_name varchar(50) null,
    price decimal(10,2) not null,
    stock_quantity int,
    primary key(id)
);


-- INSERT INTO products (product_name, department_name, price, stock_quantity)
-- VALUES ("thermos", "camping",  30.00, 10);
