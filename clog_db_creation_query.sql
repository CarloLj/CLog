create database if not exists clog;

use clog;

CREATE TABLE User (
  user_id int auto_increment NOT NULL,
  email varchar(100) NOT NULL,
  username varchar(50) NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY (user_id) NOT NULL
);

CREATE TABLE Project (
  project_id int auto_increment NOT NULL,
  creator_id int NOT NULL,
  status enum('active','completed','cancelled','on_hold','planned') NOT NULL,
  created_at date NOT NULL,
  name varchar(255) NOT NULL,
  description varchar(512),
  PRIMARY KEY (project_id)
);

CREATE TABLE ProjectUpdate (
  update_id int auto_increment NOT NULL,
  project_id int NOT NULL,
  type enum('bugfix','update','performance'),
  created_at date,
  name varchar(255) NOT NULL,
  description varchar(512),
  PRIMARY KEY (update_id)
);

CREATE TABLE RelevantPoint (
  relevant_point_id int auto_increment NOT NULL,
  update_id int NOT NULL,
  description varchar(255) NOT NULL,
  PRIMARY KEY (relevant_point_id)
);

ALTER TABLE Project
ADD FOREIGN KEY (creator_id) REFERENCES User(user_id) ON DELETE CASCADE;

ALTER TABLE ProjectUpdate
ADD FOREIGN KEY (project_id) REFERENCES Project(project_id) ON DELETE CASCADE;

ALTER TABLE RelevantPoint
ADD FOREIGN KEY (update_id) REFERENCES ProjectUpdate(update_id) ON DELETE CASCADE;
