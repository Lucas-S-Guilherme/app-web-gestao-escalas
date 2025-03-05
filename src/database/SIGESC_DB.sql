CREATE DATABASE SIGESC_Web;

#DROP DATABASE SIGESC_Web;

use SIGESC_Web;

CREATE TABLE usuario (
id_usuario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
tipo_usuario VARCHAR(50) NOT NULL,
nome_usuario VARCHAR(255) NOT NULL,
cpf_usuario VARCHAR (11) NOT NULL UNIQUE,
data_nascimento_usuario DATE NOT NULL,
telefone_usuario VARCHAR (11),
email_usuario VARCHAR (255),
matricula VARCHAR(9) NOT NULL
);

#SELECT * FROM usuario;

INSERT INTO usuario (tipo_usuario, nome_usuario, cpf_usuario, data_nascimento_usuario, telefone_usuario, email_usuario, matricula)
VALUES 
('Administrador', 'João Silva', '12345678901', '1985-05-15', '11987654321', 'joao.silva@example.com', '20230001'),

('Gerente', 'Maria Oliveira', '23456789012', '1990-08-25', '21987654322', 'maria.oliveira@example.com', '20230002'),

('Operador', 'Carlos Souza', '34567890123', '1988-03-10', '31987654323', 'carlos.souza@example.com', '20230003');

CREATE TABLE especializacao (
id_especializacao INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome_especializacao VARCHAR(255) NOT NULL,
descricao_especializacao VARCHAR(255) NOT NULL,
sigla_especializacao VARCHAR (4) NOT NULL
);

INSERT INTO especializacao (nome_especializacao, descricao_especializacao, sigla_especializacao)
VALUES 
('Bombeiro Civil', 'Especialização em combate a incêndios urbanos.', 'BCIV'),
('Salvamento Aquático', 'Especialização em resgate e salvamento em ambientes aquáticos.', 'SAQA'),
('Primeiros Socorros', 'Especialização em atendimento pré-hospitalar.', 'PSOC');

CREATE TABLE funcao (
id_funcao INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome_funcao VARCHAR(255) NOT NULL,
sigla_funcao VARCHAR (4) NOT NULL
);

INSERT INTO funcao (nome_funcao, sigla_funcao)
VALUES 
('Comandante', 'CMD'),
('Operador de Máquinas', 'OPM'),
('Técnico em Emergências', 'TEM');

CREATE TABLE restricao (
id_restricao INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome_restricao VARCHAR(100) NOT NULL,
grupo_restricao VARCHAR(2),
descricao_restricao VARCHAR (1000)
);

INSERT INTO restricao (nome_restricao, grupo_restricao, descricao_restricao)
VALUES 
('Restrição Médica', 'RM', 'Restrição devido a condições médicas.'),
('Restrição de Horário', 'RH', 'Restrição de trabalho em determinados horários.'),
('Restrição de Local', 'RL', 'Restrição de trabalho em determinados locais.');

CREATE TABLE combatente (
id_combatente INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
nome_combatente VARCHAR (255) NOT NULL,
cpf_combatente VARCHAR (11) NOT NULL UNIQUE,
data_nascimento_combatente DATE NOT NULL,
telefone_combatente VARCHAR (11),
email_combatente VARCHAR (255),
matricula_combatente VARCHAR (9) NOT NULL UNIQUE,
ultimo_turno_trabalhado DATETIME
);

INSERT INTO combatente (nome_combatente, cpf_combatente, data_nascimento_combatente, telefone_combatente, email_combatente, matricula_combatente)
VALUES 
('Pedro Alves', '45678901234', '1992-07-20', '11987654324', 'pedro.alves@example.com', '20230004'),
('Ana Costa', '56789012345', '1989-11-05', '21987654325', 'ana.costa@example.com', '20230005'),
('Lucas Mendes', '67890123456', '1995-03-15', '31987654326', 'lucas.mendes@example.com', '20230006');

CREATE TABLE regra_trabalho (
id_regra_trabalho INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
descricao_regra_trabalho VARCHAR(255),
horas_descanso_minimas 	INT NOT NULL
);

INSERT INTO regra_trabalho (descricao_regra_trabalho, horas_descanso_minimas)
VALUES 
('Turno de 12 horas com 24 horas de descanso.', 24),
('Turno de 8 horas com 12 horas de descanso.', 12),
('Turno de 6 horas com 8 horas de descanso.', 8);

#tabela associativa (tabela de junção) (n,n)
CREATE TABLE combatente_especializacao (
id_combatente INT NOT NULL,
id_especializacao INT NOT NULL,
PRIMARY KEY (id_combatente, id_especializacao),
FOREIGN KEY (id_combatente) REFERENCES combatente(id_combatente) ON DELETE CASCADE,
FOREIGN KEY (id_especializacao) REFERENCES especializacao(id_especializacao) ON DELETE CASCADE
);

INSERT INTO combatente_especializacao (id_combatente, id_especializacao)
VALUES 
(1, 1), -- Pedro Alves é Bombeiro Civil
(2, 2), -- Ana Costa é especializada em Salvamento Aquático
(3, 3); -- Lucas Mendes é especializado em Primeiros Socorros

CREATE TABLE combatente_funcao (
id_combatente INT NOT NULL,
id_funcao INT NOT NULL,
PRIMARY KEY (id_combatente, id_funcao),
FOREIGN KEY (id_combatente) REFERENCES combatente(id_combatente) ON DELETE CASCADE,
FOREIGN KEY (id_funcao) REFERENCES funcao(id_funcao) ON DELETE CASCADE
);

INSERT INTO combatente_funcao (id_combatente, id_funcao)
VALUES 
(1, 1), -- Pedro Alves é Comandante
(2, 2), -- Ana Costa é Operadora de Máquinas
(3, 3); -- Lucas Mendes é Técnico em Emergências

#FAZER ESSA 3ª TABELA
CREATE TABLE combatente_restricao (
id_combatente INT NOT NULL,
id_restricao INT NOT NULL,
PRIMARY KEY (id_combatente, id_restricao),
FOREIGN KEY (id_combatente) REFERENCES combatente (id_combatente) ON DELETE CASCADE,
FOREIGN KEY (id_restricao) REFERENCES restricao (id_restricao) ON DELETE CASCADE
);

INSERT INTO combatente_restricao (id_combatente, id_restricao)
VALUES 
(1, 1), -- Pedro Alves tem Restrição Médica
(2, 2), -- Ana Costa tem Restrição de Horário
(3, 3); -- Lucas Mendes tem Restrição de Local

CREATE TABLE escala (
id_escala INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome_escala VARCHAR (255),
local_trabalho VARCHAR (255),
data_inicio DATETIME NOT NULL,
data_fim DATETIME NOT NULL,
data_confeccao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
id_usuario INT NOT NULL,
FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
);

INSERT INTO escala (nome_escala, local_trabalho, data_inicio, data_fim, id_usuario)
VALUES 
('Escala Janeiro', 'Base Central', '2025-01-01 08:00:00', '2025-01-31 20:00:00', 1),
('Escala Fevereiro', 'Base Norte', '2025-02-01 08:00:00', '2025-02-28 20:00:00', 2),
('Escala Março', 'Base Sul', '2025-03-01 08:00:00', '2025-03-31 20:00:00', 3);

# usado para o período geral de trabalho
CREATE TABLE turno_trabalho (
id_turno_trabalho INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
data_inicio DATETIME NOT NULL,
data_fim DATETIME NOT NULL,
id_escala INT NOT NULL,
FOREIGN KEY (id_escala) REFERENCES escala (id_escala)
);

INSERT INTO turno_trabalho (data_inicio, data_fim, id_escala)
VALUES 
('2025-01-01 08:00:00', '2025-01-01 20:00:00', 1),
('2025-01-02 08:00:00', '2025-01-02 20:00:00', 1),
('2025-01-03 08:00:00', '2025-01-03 20:00:00', 1);

#usado para o turno específico de trabalho dentro do geral (de cada combatente)
CREATE TABLE turno_combatente ( 
id_turno_combatente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_combatente INT NOT NULL,
id_turno INT NOT NULL,
hora_inicio DATETIME NOT NULL,
hora_fim DATETIME NOT NULL,
status_descanso ENUM('OK', 'VIOLADO') NOT NULL DEFAULT 'OK',
FOREIGN KEY (id_combatente) REFERENCES combatente (id_combatente) ON DELETE CASCADE,
FOREIGN KEY (id_turno) REFERENCES turno_trabalho (id_turno_trabalho) ON DELETE CASCADE
);

INSERT INTO turno_combatente (id_combatente, id_turno, hora_inicio, hora_fim, status_descanso)
VALUES 
(1, 1, '2025-01-01 08:00:00', '2025-01-01 20:00:00', 'OK'),
(2, 2, '2025-01-02 08:00:00', '2025-01-02 20:00:00', 'OK'),
(3, 3, '2025-01-03 08:00:00', '2025-01-03 20:00:00', 'OK');

CREATE VIEW combatente_ultimos_turnos AS
SELECT 
    c.id_combatente,
    c.nome_combatente,
    tt.id_turno_trabalho,
    tt.data_inicio,
    tt.data_fim,
    ttc.hora_inicio,
    ttc.hora_fim,
    TIMESTAMPDIFF(HOUR, IFNULL(LAG(ttc.hora_fim) OVER (PARTITION BY c.id_combatente ORDER BY ttc.hora_inicio), NOW()), ttc.hora_inicio) AS horas_descanso
FROM turno_combatente ttc
JOIN combatente c ON ttc.id_combatente = c.id_combatente
JOIN turno_trabalho tt ON ttc.id_turno = tt.id_turno_trabalho;

DELIMITER $$

CREATE TRIGGER verificar_descanso_antes_insert
BEFORE INSERT ON turno_combatente
FOR EACH ROW
BEGIN
    DECLARE ultimo_fim DATETIME;
    DECLARE horas_descanso INT;

    -- Verifica se os horários de início e fim são válidos
    IF NEW.hora_inicio IS NULL OR NEW.hora_fim IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Os horários de início e fim do turno são obrigatórios.';
    END IF;

    -- Obtém o fim do último turno trabalhado pelo combatente
    SELECT MAX(hora_fim) INTO ultimo_fim
    FROM turno_combatente
    WHERE id_combatente = NEW.id_combatente;

    -- Se houver um turno anterior, calcula o descanso
    IF ultimo_fim IS NOT NULL THEN
        SET horas_descanso = TIMESTAMPDIFF(HOUR, ultimo_fim, NEW.hora_inicio);

        -- Se o descanso for menor que 24h, marca como VIOLADO
        IF horas_descanso < 24 THEN
            SET NEW.status_descanso = 'VIOLADO';
        ELSE
            SET NEW.status_descanso = 'OK';
        END IF;
    END IF;
END$$

DELIMITER ;