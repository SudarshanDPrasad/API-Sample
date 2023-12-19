CREATE DATABASE users;
USE users;

CREATE TABLE user( id integer PRIMARY KEY AUTO_INCREMENT, username TEXT NOT NULL, password TEXT NOT_NULL);

INSERT INTO users.user(id,username , password)
VALUES
(2,'TVS','password');