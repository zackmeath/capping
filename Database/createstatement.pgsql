-- Dropping Tables if They Exist --
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS CoursesTaken;
DROP TABLE IF EXISTS School;
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS Major;
DROP TABLE IF EXISTS Requirements;
DROP TABLE IF EXISTS Equivalent;

---- CREATING TABLES ----

CREATE TABLE School(
	ScID 			serial primary key,
	SchName			text not null
);