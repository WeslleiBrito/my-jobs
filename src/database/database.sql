-- Active: 1690649608499@@127.0.0.1@3306

CREATE TABLE
    IF NOT EXISTS accounts (
        id TEXT PRIMARY KEY UNIQUE,
        user_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME()) NOT NULL
    );

DROP TABLE IF EXISTS applications;

CREATE TABLE
    IF NOT EXISTS applications (
        id TEXT PRIMARY KEY UNIQUE,
        job_name TEXT NOT NULL,
        job_company TEXT NOT NULL,
        application_status INTEGER DEFAULT(0),
        url_application TEXT NOT NULL,
        email_company TEXT,
        created_at TEXT DEFAULT(DATETIME()) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS requirements (
        id TEXT PRIMARY KEY UNIQUE,
        application_id TEXT NOT NULL,
        requirement TEXT NOT NULL,
        FOREIGN KEY(application_id) REFERENCES applications(id) ON UPDATE CASCADE ON DELETE CASCADE
    );