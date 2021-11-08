CREATE TABLE info_tbl (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	last_name_furi VARCHAR(10),
	first_name_furi VARCHAR(10),
	last_name VARCHAR(10),
	first_name VARCHAR(10),
	postal_num VARCHAR(7) NOT NULL,
	prefecture_id VARCHAR(8) NOT NULL,
	city VARCHAR(8) NOT NULL,
	other_address VARCHAR(25) NOT NULL,
	tel VARCHAR(20) NOT NULL
);

CREATE TABLE result_tbl (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	info_id int,
	checkTime DATETIME DEFAULT NULL,
	result1 BOOLEAN,
	result2 BOOLEAN,
	result3 BOOLEAN,
	result4 BOOLEAN,
	result5 BOOLEAN,
	result6 BOOLEAN,
	result7 BOOLEAN,
	result8 BOOLEAN,
	result9 BOOLEAN,
	result10 BOOLEAN,
	foreign key (info_id) references info_tbl(id)
);

CREATE TABLE question_tbl (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	text VARCHAR(30) NOT NULL
);