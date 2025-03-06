CREATE DATABASE ebookslk;

CREATE TABLE category(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50)
)

CREATE TABLE author(
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) UNIQUE
);

ALTER TABLE category
ADD CONSTRAINT unique_name UNIQUE (name)

CREATE TABLE book(
	id SERIAL PRIMARY KEY,
	title VARCHAR(50),
	price numeric(4,2),
	qty INTEGER,
	d_Cost numeric(4,2),
	description TEXT,
	category_id INTEGER REFERENCES category(id),
	author_id INTEGER REFERENCES author(id),
	publisher_id INTEGER REFERENCES publisher(id)
);