CREATE TABLE food (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    image_path VARCHAR(2048),
    quantidade_estoque INT NOT NULL
    );
