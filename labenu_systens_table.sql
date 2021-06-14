CREATE TABLE student (
    id varchar(36) primary key,
    name varchar(50) not null,
    email VARCHAR(50) NOT NULL UNIQUE,
    birth_date date not null
);

CREATE TABLE class (
    id varchar(36) primary key,
    name varchar(50) not null,
    start_date date default (curdate()),
    end_date date not null,
    current_module enum('0', '1', '2', '3', '4', '5', '6', '7') default '0'
);

CREATE TABLE student_class (
    fk_student_id varchar(36),
    fk_class_id varchar(36),
    foreign key (fk_student_id) references student(id),
    foreign key (fk_class_id) references class(id),
    constraint pk_student_class primary key (fk_student_id, fk_class_id)
);

CREATE TABLE teacher (
    id varchar(36) primary key,
    name varchar(50) not null,
    email VARCHAR(50) NOT NULL UNIQUE,
    birth_date date not null
);

CREATE TABLE teacher_class (
    fk_teacher_id varchar(36),
    fk_class_id varchar(36),
    foreign key (fk_teacher_id) references teacher(id),
    foreign key (fk_class_id) references class(id),
    constraint pk_teacher_class primary key (fk_teacher_id, fk_class_id)
);

CREATE TABLE specialty (
    id varchar(36) primary key,
    name enum(
        "React",
        "Redux",
        "CSS",
        "Testes",
        "Typescript",
        "Programação Orientada a Objetos",
        "Backend") unique
);

CREATE TABLE teacher_specialty (
    fk_teacher_id varchar(36),
    fk_specialty_id varchar(36),
    foreign key (fk_teacher_id) references teacher(id),
    foreign key (fk_specialty_id) references specialty(id),
    constraint pk_teacher_specialty primary key (fk_teacher_id, fk_specialty_id)
);

CREATE TABLE hobbies (
    id varchar(36) primary key,
    name varchar(50) not null unique
);

CREATE TABLE student_hobbies (
    fk_student_id varchar(36),
    fk_hobbies_id varchar(36),
    foreign key (fk_student_id) references student(id),
    foreign key (fk_hobbies_id) references hobbies(id),
    constraint pk_student_hobbies primary key (fk_student_id, fk_hobbies_id)
);


