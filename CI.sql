USE master
GO

DROP DATABASE IF EXISTS UserManager
GO

CREATE DATABASE UserManager
GO

USE UserManager
GO

CREATE TABLE [User]
(
  [ID] INT PRIMARY KEY IDENTITY(1, 1),
  [Username] VARCHAR(255) NOT NULL,
  [Password] VARCHAR(255) NOT NULL,
  [Email] VARCHAR(255) NOT NULL,
  [IsDeleted] BIT NOT NULL DEFAULT 0
)
GO

CREATE TABLE [Role]
(
  [ID] INT PRIMARY KEY IDENTITY(1, 1),
  [Name] VARCHAR(255) NOT NULL,
  [IsDeleted] BIT NOT NULL DEFAULT 0
)
GO

CREATE TABLE [UserRole]
(
  [UserID] INT FOREIGN KEY REFERENCES [User]([ID]),
  [RoleID] INT FOREIGN KEY REFERENCES [Role]([ID]),
  [IsDeleted] BIT NOT NULL DEFAULT 0,
  CONSTRAINT UserRole_PK PRIMARY KEY([UserID], [RoleID])
)
GO

-- Pass helloWORLD semua ya wkwkwkwk
INSERT INTO [User]
  ([Username], [Email], [Password])
VALUES
  ('Jokowo', 'jokowo@mail.com', '$2a$12$Oi9MiEqEx37Oo9TfuPgJzedeH1iqGhFYDE6Leuhq/PK9.0fNJOg8C'),
  ('Andi', 'andi@mail.com', '$2a$12$Oi9MiEqEx37Oo9TfuPgJzedeH1iqGhFYDE6Leuhq/PK9.0fNJOg8C'),
  ('Sakinah', 'sakinah@mail.com', '$2a$12$Oi9MiEqEx37Oo9TfuPgJzedeH1iqGhFYDE6Leuhq/PK9.0fNJOg8C'),
  ('Mawadah', 'mawadah@mail.com', '$2a$12$Oi9MiEqEx37Oo9TfuPgJzedeH1iqGhFYDE6Leuhq/PK9.0fNJOg8C'),
  ('Warahmah', 'warahmah@mail.com', '$2a$12$Oi9MiEqEx37Oo9TfuPgJzedeH1iqGhFYDE6Leuhq/PK9.0fNJOg8C')
GO

INSERT INTO [Role]
  ([Name])
VALUES
  ('Administrator'),
  ('Manager'),
  ('Supervisor'),
  ('Coordinator'),
  ('Employee')
GO

INSERT INTO [UserRole]
  ([UserID], [RoleID])
VALUES
  (1, 1),
  (1, 2),
  (2, 2),
  (3, 3),
  (3, 4),
  (3, 5),
  (4, 3),
  (4, 4),
  (4, 5),
  (5, 3),
  (5, 4),
  (5, 5)
GO