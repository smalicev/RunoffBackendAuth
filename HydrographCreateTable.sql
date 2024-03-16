USE [HydrographDbContext]
GO

/****** Object: Table [dbo].[Hydrographs] Script Date: 2024-03-16 11:24:49 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Hydrographs] (
    [Id]     INT            IDENTITY (1, 1) NOT NULL,
    [Time]   NVARCHAR (MAX) NULL,
    [Value]  NVARCHAR (MAX) NULL,
    [UserID] NVARCHAR (128) NOT NULL,
    CONSTRAINT [FK_Hydrographs_AspNetUsers_userID] FOREIGN KEY ([UserID]) REFERENCES [dbo].[AspNetUsers]([Id])
);


