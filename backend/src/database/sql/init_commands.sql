Create database react_todos;

Create table users (
  _id SERIAL PRIMARY KEY,
  username VARCHAR(30),
  email VARCHAR(320),
  password VARCHAR(1500)
);

Create table todos (
  _id SERIAL PRIMARY KEY,
  text VARCHAR(500),
  completed BOOLEAN DEFAULT FALSE,
  user_id INT REFERENCES users(_id)
);

INSERT INTO users (username, email, password) VALUES ('ruslanonly', 'rzaevruslanonly@gmail.com', pswd);
INSERT INTO todos (text, user_id) VALUES ('text', 1);

SELECT * FROM todos WHERE user_id = 'number';

UPDATE todos SET completed = true WHERE _id = 1