DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

INSERT INTO department (name) 
VALUES ('C-Suite'),
('Marketing'),
('Sales'),
('Engineering'),
('Product'),
('Support'),
('Administration'),
('Human Resources'),
('Information Technology'),
('Operations'); 



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Miles', 'Stroman', 1, NULL);
('Tom', 'Moore', 2, NULL)
('Titus', 'Wunsch', 3, NULL);
('Rodrigo', 'Reichert', 4, NULL);
('Janick', 'Cummerata', 5, NULL);
('Lionel', 'Hettinger', 1, NULL);
('Yasmine', 'Predovic', 2, NULL);
('Richard', 'Gottlieb', 3, NULL);
('Ken', 'Grant', 4, NULL);
( 'Armani', 'Bednar', 5, NULL);
( 'Bradley', 'Gusikowski', 1, NULL);
( 'Iliana', 'Sawayn', 2, NULL);
( 'Rogelio', 'Pfannerstill', 3, NULL);
( 'Keagan', 'Ondricka', 4, NULL);
( 'Guy', 'Hintz', 5, NULL);
( 'Lane', 'Pouros', 1, NULL);
( 'Eliseo', 'Weimann', 2, NULL);
( 'Ryleigh', 'Kessler', 3, NULL);
( 'Rowan', 'Lind', 4, NULL);
( 'Nickolas', 'Schiller', 5, NULL);
( 'Ocie', 'Wilderman', 1, NULL);
( 'Maverick', 'Schneider', 2, NULL);
( 'Conor', 'Jacobs', 3, NULL);
( 'Lazaro', 'Botsford', 4, NULL);
( 'Margie', 'McLaughlin', 5, NULL);
( 'Julian', 'Sauer', 1, NULL);
( 'Graham', 'Herzog', 2, NULL);
( 'Loyal', 'Stroman', 3, NULL);
( 'Chesley', 'Schamberger', 4, NULL);
( 'Virgil', 'McKenzie', 5, NULL);

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', '97000.00', 1);
('C-Level', '500000.00', 1);
('Assistant', '55000.00', 3);
('Vice President', '150000.00', 4);
('Individual Contributor', '75000.00', 5);