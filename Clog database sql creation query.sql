create database if not exists clog;

use clog;

CREATE TABLE User (
  user_id int auto_increment,
  email varchar(100),
  username varchar(50),
  password varchar(50),
  PRIMARY KEY (user_id)
);

CREATE TABLE Project (
  project_id int auto_increment,
  creator_id int,
  status enum('active','completed','cancelled','on_hold','planned'),
  created_at date,
  name varchar(255),
  description varchar(512),
  PRIMARY KEY (project_id)
);

CREATE TABLE ProjectUpdate (
  update_id int auto_increment,
  project_id int,
  type enum('bugfix','update','performance'),
  created_at date,
  name varchar(255),
  description varchar(512),
  PRIMARY KEY (update_id)
);

CREATE TABLE RelevantPoint (
  relevant_point_id int auto_increment,
  update_id int,
  description varchar(255),
  PRIMARY KEY (relevant_point_id)
);

ALTER TABLE Project
ADD FOREIGN KEY (creator_id) REFERENCES User(user_id);

ALTER TABLE ProjectUpdate
ADD FOREIGN KEY (project_id) REFERENCES Project(project_id);

ALTER TABLE RelevantPoint
ADD FOREIGN KEY (update_id) REFERENCES ProjectUpdate(update_id);
