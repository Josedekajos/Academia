DROP DATABASE IF EXISTS studyconnect;

CREATE DATABASE studyconnect;

USE studyconnect;

CREATE TABLE studyconnect.users (
    id  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE studyconnect.groups (
    id  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    members INT DEFAULT 0,
    topic VARCHAR(255) DEFAULT 'undefined',
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

INSERT INTO studyconnect.groups (name, members, topic) VALUES
('Git And Github', 2, 'version control'),
('Software Development Tools', 2, 'engineering'),
('Information System Analysis and Design', 2, 'systems design'),
('Engineering Basics', 2, 'general engineering');

INSERT INTO studyconnect.users (username, email, password_hash) VALUES
('user1', 'user1@example.com', 'hashed_password1'),
('user2', 'user2@example.com', 'hashed_password2'),
('user3', 'user3@example.com', 'hashed_password3'),
('user4', 'user4@example.com', 'hashed_password4'),
('user5', 'user5@example.com', 'hashed_password5'),
('user6', 'user6@example.com', 'hashed_password6'),
('user7', 'user7@example.com', 'hashed_password7'),
('user8', 'user8@example.com', 'hashed_password8'),
('user9', 'user9@example.com', 'hashed_password9'),
('user10', 'user10@example.com', 'hashed_password10');

INSERT INTO studyconnect.notes (user_id, group_id, title, content) VALUES
(1, 1, 'Git Basics', 'This note covers the basics of Git.'),
(2, 2, 'Development Tools', 'Overview of software development tools.'),
(3, 3, 'System Analysis', 'Notes on system analysis and design.'),
(4, NULL, 'Engineering Concepts', 'General engineering concepts.');

INSERT INTO studyconnect.group_members (group_id, user_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(1, 4);

INSERT INTO studyconnect.messages (group_id, user_id, content) VALUES
(1, 1, 'Let\'s discuss Git commands.'),
(2, 2, 'What tools do you use for development?'),
(3, 3, 'I have a question about system design.');

INSERT INTO studyconnect.study_sessions (group_id, topic, scheduled_at) VALUES
(1, 'Git Workflow', '2024-12-01 10:00:00'),
(2, 'Development Tools Overview', '2024-12-02 11:00:00'),
(3, 'System Analysis Techniques', '2024-12-03 12:00:00');
