DROP DATABASE IF EXISTS studyconnect;

CREATE DATABASE studyconnect;

USE studyconnect;

CREATE TABLE studyconnect.users (
    id  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    level VARCHAR(255),
    goals VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE studyconnect.groups (
     id  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     members INT DEFAULT 0,
     description TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE studyconnect.notes (
    id  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    group_id INT UNSIGNED,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES studyconnect.users(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES studyconnect.groups(id) ON DELETE SET NULL
);

CREATE TABLE studyconnect.group_members (
    id  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    group_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES studyconnect.groups(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE studyconnect.messages (
   id  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
   group_id INT UNSIGNED NOT NULL,
   user_id INT UNSIGNED NOT NULL,
   content TEXT NOT NULL,
   sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   FOREIGN KEY (group_id) REFERENCES studyconnect.groups(id) ON DELETE CASCADE,
   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE studyconnect.study_sessions (
     id  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
     group_id INT UNSIGNED NOT NULL,
     topic VARCHAR(255) NOT NULL,
     scheduled_at TIMESTAMP NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (group_id) REFERENCES studyconnect.groups(id) ON DELETE CASCADE
);

INSERT INTO studyconnect.groups (name, members, description) VALUES
('Git And Github', 2, 'version control'),
('Software Development Tools', 2, 'engineering'),
('Information System Analysis and Design', 2, 'systems design'),
('Engineering Basics', 2, 'general engineering');

INSERT INTO studyconnect.users (first_name, last_name, email, phone,  password, level, goals) VALUES
('funwi1', 'kelsea1', 'user1@example.com', '653847697',  'hashed_password1', '200', 'build something');

INSERT INTO studyconnect.notes (user_id, group_id, title, content) VALUES
(1, 1, 'Git Basics', 'This note covers the basics of Git.'),
(2, 2, 'Development Tools', 'Overview of software development tools.'),
(3, 3, 'System Analysis', 'Notes on system analysis and design.'),
(4, 1, 'Engineering Concepts', 'General engineering concepts.');

INSERT INTO studyconnect.group_members (group_id, user_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(1, 1);

INSERT INTO studyconnect.messages (group_id, user_id, content) VALUES
(1, 1, "Let's discuss Git commands."),
(2, 2, "What tools do you use for development?"),
(3, 3, "I have a question about system design.");