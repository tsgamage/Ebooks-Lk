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

INSERT INTO book (title, price, qty, d_Cost, description, category_id, author_id, publisher_id) VALUES ('මැයි මාර ප්‍රසංගය – May Mara Prasangaya',700,22,200,'එයා ආපු කෙනා පමණයි. ඉතින් ආපු කෙනා නෙමෙයිද යන්න ඕනි කෙනා? ආපු කෙනා නේන්නම් යන්න ඕනි කෙනා. ඒ හින්දම එයා ඇවිත් ගිය කෙනා. මම හිටපු කෙනා. හිටපු කෙනා තමයි ඉන්න කෙනා වෙන්නෙත්.ඒ හින්ද මං තාමත් ඉන්න කෙනා. ඒත් බැරිවෙලාවත් මං ආපු කෙනා උනානම්,කොහොමටවත් මං ගිය කෙනා වෙන්නෙනම් නෑ. එදාටත් මං ඉන්න කෙනා විතරම යි…',4,1,5)

INSERT INTO book (title, price, qty, d_Cost, description, category_id, author_id, publisher_id) VALUES ('ගුරු ගීතය – Guru Geethaya',400,22,150,'ගුරු ගීතය – Guru Geethaya | චිංගීස් අයිත්මාතව් – Chingiz Aitmatov',4,5,9)