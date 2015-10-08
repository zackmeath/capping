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

CREATE TABLE Student(
	StID			serial primary key,
	firstName		text not null,
	lastName		text not null,
	email			text unique not null,
	currentCollege	int not null references School(ScID)
);

CREATE TABLE Course(
	CID				serial primary key,
	school			int not null references School(ScID),
	subject			text unique not null,
	courseNum		text unique not null,
	isAccepted		boolean not null
);

CREATE TABLE CoursesTaken(
	studentID		int not null references Student(StID),
	courseID		int not null references Course(CID),
	
	primary key(studentID, courseID)
);

CREATE TABLE Majors(
	MID				serial primary key,
	title			text unique not null
);

CREATE TABLE Requirements(
	RID				serial primary key,
	major			int not null unique references Majors(MID),
	subject 		text unique not null,
	creditValue		int not null
);

CREATE TABLE Equivalent(
	courseID		int not null references Course(CID),
	requireID		int not null references Requirements(RID),
	
	primary key(courseID, requireID)
);