CREATE TABLE Employee (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email text NOT null unique,
    phone text NOT NULL unique,
    zipcode VARCHAR(10) NOT NULL,
    address text NOT NULL,
    dept_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_dept
        FOREIGN KEY (dept_id)
        REFERENCES Department(id)
);

create table Department (
	id SERIAL PRIMARY KEY,
    name TEXT NOT null
);

create table Designation (
	id SERIAL PRIMARY key,
	role text not null,
	description text
);

create table EmployeeDesignation (
	user_id INTEGER,
	des_id INTEGER,
	start_date date not null,
	end_date date,
	primary KEY(user_id,des_id)
);

create table salary (
	id SERIAL PRIMARY key,
	amount INTEGER not null
);

create table EmployeeSalary (
	user_id INTEGER,
	salary_id INTEGER,
	start_date date not null,
	end_date date,
	primary KEY(user_id,salary_id)
);


INSERT INTO Employee (username, email, phone, zipcode, address, dept_id)
VALUES
('joyal', 'joyal@keyvalue.com', '+91234567890', '683574', '123, Main Street, Kochi', '1'),
('jojo', 'jojo@keyvalue.com', '+910987654321', '683574', '321, Main Street, Kochi', '2'),
('aadarsh', 'aadarsh@keyvalue.com', '+9198756423985', '683574', '987, Main Street, Kochi', '3');


INSERT INTO Department (name)
values ('Frontend'), ('Backend'), ('AI');

INSERT INTO Designation (role, description)
values ('Associate','0-1 yr experience'), ('Senior','1-3 yr experience'), ('Staff','3-5 yr experience');

INSERT INTO salary (amount)
values (720000), (900000), (1200000);

INSERT INTO EmployeeDesignation (user_id, des_id,start_date,end_date)
values (1,3,'2024-07-01',null),(1,1,'2023-05-01','2024-07-01'),(2,1,'2024-01-01',null),(3,2,'2023-12-01',null);

INSERT INTO EmployeeSalary (user_id, salary_id,start_date,end_date)
values (1,1,'2024-07-01',null),(1,2,'2023-05-01','2024-07-01'),(2,2,'2024-01-01',null),(3,2,'2023-12-01',null);

update employeedesignation
set end_date = start_date + interval '1 year';

update employeesalary
set end_date = start_date + interval '6 month';