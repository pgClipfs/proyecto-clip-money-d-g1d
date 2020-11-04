USE [CLIP]
GO
/****** Object:  StoredProcedure [dbo].[crear_cliente_cuenta]    Script Date: 21/10/2020 18:23:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[crear_cliente_cuenta]	
	@usuario varchar(50), @pass varchar (50), @nombre varchar(50),
	@apellido varchar(50), @documento int, @mail varchar(50), @telefono bigint, 
	@fotoFrente image, @fotoDorso image, @idNacionalidad  tinyint, @idTipoDocumento tinyint, 
	@idDomicilio int,

	@cvu bigint, @alias varchar(50),@observacion varchar(50), @idTipoCuenta tinyint, @idEstadoCuenta tinyint
AS
BEGIN

	
	SET NOCOUNT ON;
	begin transaction crear_nuevo
	INSERT INTO [dbo].[cliente]
           ([usuario]
           ,[passEncriptada]
           ,[nombre]
           ,[apellido]
           ,[nroDocumento]
           ,[email]
           ,[telefono]
           ,[fotoFrenteDocumento]
           ,[fotoDorsoDocumento]
           ,[idNacionalidad]
           ,[idTipoDocumento]
           ,[idDomicilio]
           ,[idNivel])
     VALUES
           (@usuario, @pass, @nombre, @apellido, @documento, @mail, @telefono, @fotoFrente,@fotoDorso,@idNacionalidad,@idTipoDocumento,@idDomicilio,1)
		    
		   
INSERT INTO [dbo].[cuenta]
           ([cvu]
           ,[alias]
           ,[saldo]
           ,[observacion]
           ,[idTipoCuenta]
           ,[idEstadoCuenta]
           ,[idCliente])
     VALUES
           (@cvu, @alias, 0, @observacion, @idTipoCuenta,@idEstadoCuenta, @@IDENTITY) 
     commit;
END

GO
/****** Object:  StoredProcedure [dbo].[deposito]    Script Date: 21/10/2020 18:23:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[deposito] @monto money, @cvuDesde bigint
AS
BEGIN
	
	SET NOCOUNT ON;
	begin transaction TX
	INSERT INTO [dbo].[operacion]
           ([fechaOperacion]
           ,[monto]
           ,[idTipoOperacion]
           ,[idEstadoOperacion]
           ,[cvuDesde])
     VALUES
           (SYSDATETIME(),@monto,5,1,@cvuDesde)

	UPDATE [dbo].[cuenta]
	SET [saldo] = saldo + @monto
 WHERE cvu=@cvuDesde
 commit;
END

GO
/****** Object:  StoredProcedure [dbo].[extraccion]    Script Date: 21/10/2020 18:23:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[extraccion]
	@monto money, @cvuDesde bigint
AS
BEGIN
	
	SET NOCOUNT ON;
	begin transaction tx_extraccion
	INSERT INTO [dbo].[operacion]
           ([fechaOperacion]
           ,[monto]
           ,[idTipoOperacion]
           ,[idEstadoOperacion]
           ,[cvuDesde]
           )
     VALUES
           (SYSDATETIME()
           ,@monto
           ,4
           ,1
           ,@cvuDesde) 


   UPDATE [dbo].[cuenta]
   SET 
      [saldo] = saldo - @monto
      
 WHERE cvu=@cvuDesde   
 commit;
END

GO
/****** Object:  StoredProcedure [dbo].[ultimos_10_movimientos]    Script Date: 21/10/2020 18:23:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[ultimos_10_movimientos]

	@cvuDesde bigint
	AS
BEGIN
	
	SET NOCOUNT ON;
	select top 10 O.cvuDesde as cuenta ,fechaOperacion,O.monto, TP.nombreOperacion, EP.nombreEstadoOperacion
from operacion O, cuenta C, tipoOperacion TP, estadoOperacion EP
where O.cvuDesde=@cvuDesde AND 
O.cvuDesde=C.cvu AND TP.idTipoOperacion=O.idTipoOperacion AND EP.idEstadoOperacion=O.idEstadoOperacion;
   
END
GO
/****** Object:  Table [dbo].[cliente]    Script Date: 21/10/2020 18:23:32 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[cliente](
	[idCliente] [bigint] IDENTITY(1,1) NOT NULL,
	[usuario] [varchar](50) NOT NULL,
	[passEncriptada] [varchar](50) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[apellido] [varchar](50) NOT NULL,
	[nroDocumento] [int] NOT NULL,
	[email] [varchar](50) NOT NULL,
	[telefono] [bigint] NULL,
	[fotoFrenteDocumento] [image] NOT NULL,
	[fotoDorsoDocumento] [image] NOT NULL,
	[idNacionalidad] [tinyint] NOT NULL,
	[idTipoDocumento] [tinyint] NOT NULL,
	[idDomicilio] [int] NOT NULL,
	[idNivel] [bigint] NOT NULL,
 CONSTRAINT [PK_cliente] PRIMARY KEY CLUSTERED 
(
	[idCliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[cuenta]    Script Date: 21/10/2020 18:23:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[cuenta](
	[cvu] [bigint] NOT NULL,
	[alias] [varchar](50) NULL,
	[saldo] [money] NOT NULL,
	[observacion] [varchar](50) NULL,
	[idTipoCuenta] [tinyint] NOT NULL,
	[idEstadoCuenta] [tinyint] NOT NULL,
	[idCliente] [bigint] NOT NULL,
 CONSTRAINT [PK_cuenta] PRIMARY KEY CLUSTERED 
(
	[cvu] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[domiciliook]    Script Date: 21/10/2020 18:23:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[domiciliook](
	[idDomicilio] [int] IDENTITY(1,1) NOT NULL,
	[idLocalidad] [bigint] NOT NULL,
	[calle] [varchar](50) NOT NULL,
	[barrio] [varchar](50) NULL,
	[codigoPostal] [nchar](10) NULL,
	[numero] [varchar](50) NULL,
 CONSTRAINT [PK_domiciliook] PRIMARY KEY CLUSTERED 
(
	[idDomicilio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[estadoCuenta]    Script Date: 21/10/2020 18:23:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[estadoCuenta](
	[idEstadoCuenta] [tinyint] IDENTITY(1,1) NOT NULL,
	[nombreEstadoCuenta] [varchar](50) NOT NULL,
	[descripcion] [varchar](max) NULL,
 CONSTRAINT [PK_estadoCuenta] PRIMARY KEY CLUSTERED 
(
	[idEstadoCuenta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[estadoOperacion]    Script Date: 21/10/2020 18:23:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[estadoOperacion](
	[idEstadoOperacion] [tinyint] IDENTITY(1,1) NOT NULL,
	[nombreEstadoOperacion] [varchar](50) NOT NULL,
 CONSTRAINT [PK_estadoOperacion] PRIMARY KEY CLUSTERED 
(
	[idEstadoOperacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[localidad]    Script Date: 21/10/2020 18:23:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[localidad](
	[idLocalidad] [bigint] IDENTITY(1,1) NOT NULL,
	[nombreLocalidad] [varchar](50) NOT NULL,
	[codigoPostal] [varchar](50) NULL,
	[idProvincia] [int] NOT NULL,
 CONSTRAINT [PK_localidad] PRIMARY KEY CLUSTERED 
(
	[idLocalidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[nacionalidad]    Script Date: 21/10/2020 18:23:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[nacionalidad](
	[idNacionalidad] [tinyint] IDENTITY(1,1) NOT NULL,
	[descripcionNacionalidad] [varchar](50) NOT NULL,
 CONSTRAINT [PK_nacionalidad] PRIMARY KEY CLUSTERED 
(
	[idNacionalidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[operacion]    Script Date: 21/10/2020 18:23:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[operacion](
	[idOperacion] [bigint] IDENTITY(1,1) NOT NULL,
	[fechaOperacion] [datetime] NOT NULL,
	[monto] [money] NULL,
	[idTipoOperacion] [tinyint] NOT NULL,
	[idEstadoOperacion] [tinyint] NOT NULL,
	[cvuDesde] [bigint] NOT NULL,
	[cvuHasta] [bigint] NULL,
 CONSTRAINT [PK_operaciones] PRIMARY KEY CLUSTERED 
(
	[idOperacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[pais]    Script Date: 21/10/2020 18:23:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[pais](
	[idPais] [int] IDENTITY(1,1) NOT NULL,
	[nombrePais] [varchar](50) NOT NULL,
 CONSTRAINT [PK_pais] PRIMARY KEY CLUSTERED 
(
	[idPais] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[provincia]    Script Date: 21/10/2020 18:23:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[provincia](
	[idProvincia] [int] IDENTITY(1,1) NOT NULL,
	[nombreProvincia] [varchar](50) NOT NULL,
	[idPais] [int] NOT NULL,
 CONSTRAINT [PK_provincia] PRIMARY KEY CLUSTERED 
(
	[idProvincia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[situacionCrediticia]    Script Date: 21/10/2020 18:23:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[situacionCrediticia](
	[idNivel] [bigint] IDENTITY(1,1) NOT NULL,
	[descripcionNivel] [varchar](50) NOT NULL,
 CONSTRAINT [PK_situacionCrediticia] PRIMARY KEY CLUSTERED 
(
	[idNivel] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tipoCuenta]    Script Date: 21/10/2020 18:23:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tipoCuenta](
	[idTipoCuenta] [tinyint] IDENTITY(1,1) NOT NULL,
	[nombreTipoCuenta] [varchar](50) NULL,
 CONSTRAINT [PK_tipoCuenta] PRIMARY KEY CLUSTERED 
(
	[idTipoCuenta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tipoDocumento]    Script Date: 21/10/2020 18:23:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tipoDocumento](
	[idTipoDocumento] [tinyint] IDENTITY(1,1) NOT NULL,
	[nombreTipoDocumento] [varchar](50) NOT NULL,
 CONSTRAINT [PK_TipoDocumento] PRIMARY KEY CLUSTERED 
(
	[idTipoDocumento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[tipoOperacion]    Script Date: 21/10/2020 18:23:34 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[tipoOperacion](
	[idTipoOperacion] [tinyint] IDENTITY(1,1) NOT NULL,
	[nombreOperacion] [varchar](50) NOT NULL,
 CONSTRAINT [PK_tipoOperacion] PRIMARY KEY CLUSTERED 
(
	[idTipoOperacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[cliente]  WITH CHECK ADD  CONSTRAINT [FK_cliente_domiciliook] FOREIGN KEY([idDomicilio])
REFERENCES [dbo].[domiciliook] ([idDomicilio])
GO
ALTER TABLE [dbo].[cliente] CHECK CONSTRAINT [FK_cliente_domiciliook]
GO
ALTER TABLE [dbo].[cliente]  WITH CHECK ADD  CONSTRAINT [FK_cliente_nacionalidad] FOREIGN KEY([idNacionalidad])
REFERENCES [dbo].[nacionalidad] ([idNacionalidad])
GO
ALTER TABLE [dbo].[cliente] CHECK CONSTRAINT [FK_cliente_nacionalidad]
GO
ALTER TABLE [dbo].[cliente]  WITH CHECK ADD  CONSTRAINT [FK_cliente_situacionCrediticia] FOREIGN KEY([idNivel])
REFERENCES [dbo].[situacionCrediticia] ([idNivel])
GO
ALTER TABLE [dbo].[cliente] CHECK CONSTRAINT [FK_cliente_situacionCrediticia]
GO
ALTER TABLE [dbo].[cliente]  WITH CHECK ADD  CONSTRAINT [FK_cliente_TipoDocumento] FOREIGN KEY([idTipoDocumento])
REFERENCES [dbo].[tipoDocumento] ([idTipoDocumento])
GO
ALTER TABLE [dbo].[cliente] CHECK CONSTRAINT [FK_cliente_TipoDocumento]
GO
ALTER TABLE [dbo].[cuenta]  WITH CHECK ADD  CONSTRAINT [FK_cuenta_cliente] FOREIGN KEY([idCliente])
REFERENCES [dbo].[cliente] ([idCliente])
GO
ALTER TABLE [dbo].[cuenta] CHECK CONSTRAINT [FK_cuenta_cliente]
GO
ALTER TABLE [dbo].[cuenta]  WITH CHECK ADD  CONSTRAINT [FK_cuenta_estadoCuenta] FOREIGN KEY([idEstadoCuenta])
REFERENCES [dbo].[estadoCuenta] ([idEstadoCuenta])
GO
ALTER TABLE [dbo].[cuenta] CHECK CONSTRAINT [FK_cuenta_estadoCuenta]
GO
ALTER TABLE [dbo].[cuenta]  WITH CHECK ADD  CONSTRAINT [FK_cuenta_tipoCuenta] FOREIGN KEY([idTipoCuenta])
REFERENCES [dbo].[tipoCuenta] ([idTipoCuenta])
GO
ALTER TABLE [dbo].[cuenta] CHECK CONSTRAINT [FK_cuenta_tipoCuenta]
GO
ALTER TABLE [dbo].[domiciliook]  WITH CHECK ADD  CONSTRAINT [FK_domiciliook_localidad] FOREIGN KEY([idLocalidad])
REFERENCES [dbo].[localidad] ([idLocalidad])
GO
ALTER TABLE [dbo].[domiciliook] CHECK CONSTRAINT [FK_domiciliook_localidad]
GO
ALTER TABLE [dbo].[localidad]  WITH CHECK ADD  CONSTRAINT [FK_localidad_provincia] FOREIGN KEY([idProvincia])
REFERENCES [dbo].[provincia] ([idProvincia])
GO
ALTER TABLE [dbo].[localidad] CHECK CONSTRAINT [FK_localidad_provincia]
GO
ALTER TABLE [dbo].[operacion]  WITH CHECK ADD  CONSTRAINT [FK_operacion_cuenta] FOREIGN KEY([cvuDesde])
REFERENCES [dbo].[cuenta] ([cvu])
GO
ALTER TABLE [dbo].[operacion] CHECK CONSTRAINT [FK_operacion_cuenta]
GO
ALTER TABLE [dbo].[operacion]  WITH CHECK ADD  CONSTRAINT [FK_operaciones_estadoOperacion] FOREIGN KEY([idEstadoOperacion])
REFERENCES [dbo].[estadoOperacion] ([idEstadoOperacion])
GO
ALTER TABLE [dbo].[operacion] CHECK CONSTRAINT [FK_operaciones_estadoOperacion]
GO
ALTER TABLE [dbo].[operacion]  WITH CHECK ADD  CONSTRAINT [FK_operaciones_tipoOperacion1] FOREIGN KEY([idTipoOperacion])
REFERENCES [dbo].[tipoOperacion] ([idTipoOperacion])
GO
ALTER TABLE [dbo].[operacion] CHECK CONSTRAINT [FK_operaciones_tipoOperacion1]
GO
ALTER TABLE [dbo].[provincia]  WITH CHECK ADD  CONSTRAINT [FK_provincia_pais] FOREIGN KEY([idPais])
REFERENCES [dbo].[pais] ([idPais])
GO
ALTER TABLE [dbo].[provincia] CHECK CONSTRAINT [FK_provincia_pais]
GO