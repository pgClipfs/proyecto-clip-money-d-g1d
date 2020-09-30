CREATE DATABASE [billeteraclip]
GO
ALTER DATABASE [billeteraclip] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [billeteraclip] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [billeteraclip] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [billeteraclip] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [billeteraclip] SET ARITHABORT OFF 
GO
ALTER DATABASE [billeteraclip] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [billeteraclip] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [billeteraclip] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [billeteraclip] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [billeteraclip] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [billeteraclip] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [billeteraclip] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [billeteraclip] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [billeteraclip] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [billeteraclip] SET  DISABLE_BROKER 
GO
ALTER DATABASE [billeteraclip] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [billeteraclip] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [billeteraclip] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [billeteraclip] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [billeteraclip] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [billeteraclip] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [billeteraclip] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [billeteraclip] SET RECOVERY FULL 
GO
ALTER DATABASE [billeteraclip] SET  MULTI_USER 
GO
ALTER DATABASE [billeteraclip] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [billeteraclip] SET DB_CHAINING OFF 
GO
ALTER DATABASE [billeteraclip] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [billeteraclip] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [billeteraclip] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'billeteraclip', N'ON'
GO
ALTER DATABASE [billeteraclip] SET QUERY_STORE = OFF
GO
USE [billeteraclip]
GO
/****** Object:  Table [dbo].[cliente]    Script Date: 9/30/2020 6:10:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cliente](
	[idCliente] [bigint] NOT NULL,
	[usuario] [varchar](50) NULL,
	[passEncriptada] [varchar](50) NULL,
	[nombre] [varchar](50) NULL,
	[apellido] [varchar](50) NULL,
	[nroDocumento] [int] NOT NULL,
	[email] [varchar](50) NULL,
	[telefono] [int] NULL,
	[fotoFrenteDocumento] [image] NULL,
	[fotoDorsoDocumento] [image] NULL,
	[nacionalidad] [tinyint] NULL,
	[tipoDocumento] [tinyint] NULL,
	[domicilio] [int] NULL,
	[cuenta] [bigint] NULL,
	[nivel] [bigint] NULL,
 CONSTRAINT [PK_cliente] PRIMARY KEY CLUSTERED 
(
	[idCliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[cuenta]    Script Date: 9/30/2020 6:10:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cuenta](
	[cvu] [bigint] NULL,
	[alias] [varchar](50) NULL,
	[saldo] [money] NULL,
	[observacion] [varchar](50) NULL,
	[idCuenta] [bigint] NOT NULL,
	[tipoCuenta] [tinyint] NULL,
	[estadoCuenta] [tinyint] NULL,
	[operaciones] [bigint] NULL,
 CONSTRAINT [PK_cuenta] PRIMARY KEY CLUSTERED 
(
	[idCuenta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[domiciliook]    Script Date: 9/30/2020 6:10:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[domiciliook](
	[idDomicilio] [int] NOT NULL,
	[localidad] [bigint] NOT NULL,
	[provincia] [bigint] NOT NULL,
	[pais] [tinyint] NOT NULL,
	[calle] [varchar](50) NULL,
	[barrio] [varchar](50) NULL,
	[codigoPostal] [nchar](10) NULL,
 CONSTRAINT [PK_domiciliook] PRIMARY KEY CLUSTERED 
(
	[idDomicilio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[estadoCuenta]    Script Date: 9/30/2020 6:10:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[estadoCuenta](
	[idEstadoCuenta] [tinyint] NOT NULL,
	[nombreEstadoCuenta] [varchar](50) NULL,
	[descripcion] [varchar](50) NULL,
 CONSTRAINT [PK_estadoCuenta] PRIMARY KEY CLUSTERED 
(
	[idEstadoCuenta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[estadoOperacion]    Script Date: 9/30/2020 6:10:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[estadoOperacion](
	[idEstadoOperacion] [tinyint] NOT NULL,
	[nombreEstadoOperacion] [varchar](50) NULL,
 CONSTRAINT [PK_estadoOperacion] PRIMARY KEY CLUSTERED 
(
	[idEstadoOperacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[localidad]    Script Date: 9/30/2020 6:10:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[localidad](
	[idLocalidad] [int] NOT NULL,
	[nombreLocalidad] [varchar](50) NOT NULL,
	[codigoPostal] [varchar](50) NOT NULL,
 CONSTRAINT [PK_localidad] PRIMARY KEY CLUSTERED 
(
	[idLocalidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[nacionalidad]    Script Date: 9/30/2020 6:10:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[nacionalidad](
	[idNacionalidad] [tinyint] NOT NULL,
	[descripcionNacionalidad] [varchar](50) NULL,
 CONSTRAINT [PK_nacionalidad] PRIMARY KEY CLUSTERED 
(
	[idNacionalidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[operaciones]    Script Date: 9/30/2020 6:10:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[operaciones](
	[idOperacion] [bigint] NOT NULL,
	[fechaOperacion] [datetime] NULL,
	[monto] [money] NULL,
	[tipoOperacion] [tinyint] NULL,
	[estadoOperacion] [tinyint] NULL,
 CONSTRAINT [PK_operaciones] PRIMARY KEY CLUSTERED 
(
	[idOperacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[pais]    Script Date: 9/30/2020 6:10:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[pais](
	[idPais] [int] NOT NULL,
	[nombrePais] [varchar](50) NOT NULL,
 CONSTRAINT [PK_pais] PRIMARY KEY CLUSTERED 
(
	[idPais] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[provincia]    Script Date: 9/30/2020 6:10:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[provincia](
	[idProvincia] [int] NOT NULL,
	[nombreProvincia] [varchar](50) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[situacionCrediticia]    Script Date: 9/30/2020 6:10:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[situacionCrediticia](
	[idNivel] [bigint] NOT NULL,
	[descripcionNivel] [varchar](50) NULL,
 CONSTRAINT [PK_situacionCrediticia] PRIMARY KEY CLUSTERED 
(
	[idNivel] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipoCuenta]    Script Date: 9/30/2020 6:10:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipoCuenta](
	[idTipoCuenta] [tinyint] NOT NULL,
	[nombreTipoCuenta] [varchar](50) NULL,
 CONSTRAINT [PK_tipoCuenta] PRIMARY KEY CLUSTERED 
(
	[idTipoCuenta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoDocumento]    Script Date: 9/30/2020 6:10:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoDocumento](
	[idTipoDocumento] [tinyint] NOT NULL,
	[nombreTipoDocumento] [varchar](50) NULL,
 CONSTRAINT [PK_TipoDocumento] PRIMARY KEY CLUSTERED 
(
	[idTipoDocumento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipoOperacion]    Script Date: 9/30/2020 6:10:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipoOperacion](
	[idTipoOperacion] [tinyint] NOT NULL,
	[nombreOperacion] [varchar](50) NULL,
 CONSTRAINT [PK_tipoOperacion] PRIMARY KEY CLUSTERED 
(
	[idTipoOperacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (1, N'Buenos Aires')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (2, N'Buenos Aires-GBA')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (3, N'Capital Federal')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (4, N'Catamarca')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (5, N'Chaco')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (6, N'Chubut')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (7, N'Córdoba')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (8, N'Corrientes')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (9, N'Entre Ríos')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (10, N'Formosa')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (11, N'Jujuy')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (12, N'La Pampa')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (13, N'La Rioja')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (14, N'Mendoza')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (15, N'Misiones')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (16, N'Neuquén')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (17, N'Río Negro')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (18, N'Salta')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (19, N'San Juan')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (20, N'San Luis')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (21, N'Santa Cruz')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (22, N'Santa Fe')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (23, N'Santiago del Estero')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (24, N'Tierra del Fuego')
INSERT [dbo].[provincia] ([idProvincia], [nombreProvincia]) VALUES (25, N'Tucumán')
GO
ALTER TABLE [dbo].[operaciones]  WITH CHECK ADD  CONSTRAINT [FK_operaciones_tipoOperacion] FOREIGN KEY([estadoOperacion])
REFERENCES [dbo].[tipoOperacion] ([idTipoOperacion])
GO
ALTER TABLE [dbo].[operaciones] CHECK CONSTRAINT [FK_operaciones_tipoOperacion]
GO
USE [master]
GO
ALTER DATABASE [billeteraclip] SET  READ_WRITE 
GO
