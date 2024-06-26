SET FOREIGN_KEY_CHECKS = 0;

BEGIN TRANSACTION;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (id, email, password) VALUES (1, 'sophie.bluel@test.tld', '$2b$10$OyUbvsLMHp/gu0kPRpkJ/.757z.DBecw/wd1CE09Y3q4nDjoC7L1e');

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO categories (id, name) VALUES (1, 'Objets');
INSERT INTO categories (id, name) VALUES(2,'Appartements');
INSERT INTO categories (id, name) VALUES(3,'Hotels & restaurants');

CREATE TABLE works (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    categoryId INT,
    userId INT,
    FOREIGN KEY (categoryId) REFERENCES categories (id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (userId) REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO works VALUES(1,'Abajour Tahina','http://localhost:5678/images/abajour-tahina1651286843956.png',1,1);
INSERT INTO works VALUES(2,'Appartement Paris V','http://localhost:5678/images/appartement-paris-v1651287270508.png',2,1);
INSERT INTO works VALUES(3,'Restaurant Sushisen - Londres','http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png',3,1);
INSERT INTO works VALUES(4,'Villa ÔÇ£La BalisiereÔÇØ - Port Louis','http://localhost:5678/images/la-balisiere1651287350102.png',2,1);
INSERT INTO works VALUES(5,'Structures Thermopolis','http://localhost:5678/images/structures-thermopolis1651287380258.png',1,1);
INSERT INTO works VALUES(6,'Appartement Paris X','http://localhost:5678/images/appartement-paris-x1651287435459.png',2,1);
INSERT INTO works VALUES(8,'Villa Ferneze - Isola dÔÇÖElba','http://localhost:5678/images/villa-ferneze1651287511604.png',2,1);
INSERT INTO works VALUES(9,'Appartement Paris XVIII','http://localhost:5678/images/appartement-paris-xviii1651287541053.png',2,1);
INSERT INTO works VALUES(10,'Bar ÔÇ£LullabyÔÇØ - Paris','http://localhost:5678/images/bar-lullaby-paris1651287567130.png',3,1);
INSERT INTO works VALUES(11,'Hotel First Arte - New Delhi','http://localhost:5678/images/hotel-first-arte-new-delhi1651287605585.png',3,1);
INSERT INTO works VALUES(19,'chien','http://localhost:5678/images/400981018_730895519082839_8050891597139264723_n1700402651960.jpg',1,1);
INSERT INTO works VALUES(24,'Severus Rogue','http://localhost:5678/images/402861421_320606117399764_2050720384066069919_n1700497959464.jpg',1,1);
INSERT INTO works VALUES(25,'Harry & Dobby','http://localhost:5678/images/402881596_320606317399744_5166894225226450196_n1700497969760.jpg',1,1);
INSERT INTO works VALUES(26,'Harry & Hermione','http://localhost:5678/images/402944318_320605974066445_3474366430012171422_n1700497995549.jpg',1,1);
INSERT INTO works VALUES(27,'DJ Voldemort','http://localhost:5678/images/402920996_320606187399757_7472733217750408573_n1700573430690.jpg',1,1);
INSERT INTO works VALUES(28,'Peter','http://localhost:5678/images/382745644_699251848906443_3560937006741407251_n1715349832344.jpg',1,1);

COMMIT;
