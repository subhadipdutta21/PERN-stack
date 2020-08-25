CREATE DATABASE todo;

CREATE TABLE todo
(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE users
(
    user_id uuid DEFAULT uuid_generate_v4(),
    name VARCHAR(15),
    email VARCHAR(20),  
    contact VARCHAR,
    password VARCHAR,
    PRIMARY KEY(user_id)
);