-- Dropping Tables if They Exist --
DROP TABLE IF EXISTS CoursesTaken;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS Equivalent;
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS School;
DROP TABLE IF EXISTS MajorRequirement;
DROP TABLE IF EXISTS Requirement;
DROP TABLE IF EXISTS Major;
DROP TABLE IF EXISTS Users;

---- CREATING TABLES ----

CREATE TABLE Users(
	UID					serial primary key,
	firstName			text not null,
	lastName			text not null,
	email				text unique not null,
	pass				text not null,
	accessLevel			int not null
);

CREATE TABLE School(
	ScID 				serial primary key,
	ScName				text not null
);

CREATE TABLE Student(
	StID				serial primary key references Users(UID),
	currentCollege		int not null references School(ScID),
	intendedStartDate	date not null
);

CREATE TABLE Course(
	CID					serial primary key,
	ScID				int not null references School(ScID),
	subject				text not null,
	courseNum			text not null,
	courseTitle			text not null,
	isAccepted			boolean not null
);

CREATE TABLE CoursesTaken(
	StID				int not null references Student(StID),
	CID					int not null references Course(CID),
	
	primary key(StID, CID)
);

CREATE TABLE Major(
	MID					serial primary key,
	title				text unique not null
);

CREATE TABLE Requirement(
	RID					serial primary key,
	subject 			text not null,
	courseNum			text not null,
	creditValue			int not null,
	courseTitle			text not null
);

CREATE TABLE MajorRequirement(
	MID					int not null references Major(MID),
	RID					int not null references Requirement(RID),
	
	primary key(MID, RID)	
);

CREATE TABLE Equivalent(
	CID					int not null references Course(CID),
	RID					int not null references Requirement(RID),
		
	primary key(CID, RID)
);