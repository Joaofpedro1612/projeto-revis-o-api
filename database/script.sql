-- Criação do banco de dados
CREATE DATABASE LionBook;
USE LionBook;

-- Tabela de livros
CREATE TABLE tbl_livro (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    data_publicacao DATE,
    quantidade INT,
    isbn VARCHAR(45)
);

-- Tabela de usuários
CREATE TABLE tbl_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL
);

-- Tabela de tipos de movimentação (ex: empréstimo, devolução)
CREATE TABLE tipo_movimentacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(45) NOT NULL
);

-- Tabela de movimentações (ligação entre usuário, livro e tipo de movimentação)
CREATE TABLE tbl_movimentacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_movimentacao INT,
    id_usuario INT,
    quantidade INT,
    data_movimentacao DATE,
    id_livro INT,
    FOREIGN KEY (id_usuario) REFERENCES tbl_usuario(id),
    FOREIGN KEY (id_livro) REFERENCES tbl_livro(id),
    FOREIGN KEY (id_movimentacao) REFERENCES tipo_movimentacao(id)
);

-- Dados iniciais
INSERT INTO tipo_movimentacao (tipo) VALUES 
('Empréstimo'),
('Devolução');

INSERT INTO tbl_livro (titulo, data_publicacao, quantidade, isbn) VALUES 
('Dom Casmurro', '1899-01-01', 5, '978-85-359-0277-5'),
('O Cortiço', '1890-01-01', 3, '978-85-08-12348-4');

INSERT INTO tbl_usuario (login, senha) VALUES 
('admin', '123456'),
('user1', 'senha123');