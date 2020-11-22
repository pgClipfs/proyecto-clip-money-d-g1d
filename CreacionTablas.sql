USE [billeteraclip]
GO

CREATE TABLE Cliente(
	idCliente bigint IDENTITY (1,1) NOT NULL PRIMARY KEY,
	usuario varchar(50) NOT NULL,
	passEncriptada varchar(50) NOT NULL,
	nombre varchar(50) NOT NULL,
	apellido varchar(50) NOT NULL,
	nroDocumento varchar(20) NOT NULL,
	fNacimiento date NOT NULL,
	email varchar(50) NOT NULL,
	telefono varchar(15) NULL,
	fotoFrenteDocumento image NOT NULL,
	fotoDorsoDocumento image NOT NULL,
	idNacionalidad tinyint NULL,
	idTipoDocumento tinyint NULL,
	idDomicilio bigint NULL,
	idNivel tinyint NOT NULL,
)

CREATE TABLE Cuenta(
	cvu char(22) NOT NULL PRIMARY KEY,
	alias varchar(50) NOT NULL,
	saldo money NULL,
	observacion varchar(500) NULL,
	idTipoCuenta tinyint NOT NULL,
	idEstadoCuenta tinyint NOT NULL,
	idCliente bigint NOT NULL
	)

CREATE TABLE DomicilioOk(
	idDomicilio bigint IDENTITY (1,1) NOT NULL PRIMARY KEY,
	idLocalidad bigint NOT NULL,
	calle varchar(50) NULL,
	barrio varchar(50) NULL,
	codigoPostal nchar(10) NULL
	)

CREATE TABLE EstadoCuenta(
	idEstadoCuenta tinyint IDENTITY (1,1) NOT NULL PRIMARY KEY,
	nombreEstadoCuenta varchar(50) NOT NULL,
	descripcion varchar(50) NULL
	)

CREATE TABLE EstadoOperacion(
	idEstadoOperacion tinyint IDENTITY (1,1) NOT NULL PRIMARY KEY,
	nombreEstadoOperacion varchar(50) NOT NULL
	)

CREATE TABLE Localidad(
	idLocalidad bigint IDENTITY (1,1) NOT NULL PRIMARY KEY,
	nombreLocalidad varchar(50) NOT NULL,
	codigoPostal varchar(50) NULL,
	idProvincia bigint NOT NULL
	)

CREATE TABLE Provincia(
	idProvincia bigint IDENTITY (1,1) PRIMARY KEY NOT NULL,
	nombreProvincia varchar(50) NOT NULL,
	idPais bigint NOT NULL
	)

CREATE TABLE Pais(
	idPais tinyint IDENTITY (1,1) NOT NULL PRIMARY KEY,
	nombrePais varchar(50) NOT NULL
	)

CREATE TABLE Nacionalidad(
	idNacionalidad tinyint IDENTITY (1,1) NOT NULL PRIMARY KEY,
	descripcionNacionalidad varchar(50) NOT NULL
	)

CREATE TABLE Operacion(
	idOperacion bigint IDENTITY (1,1) NOT NULL PRIMARY KEY,
	fechaOperacion datetime NOT NULL,
	monto money NULL,
	idTipoOperacion tinyint NOT NULL,
	idEstadoOperacion tinyint NOT NULL,
	cvuCuentaDesde char(22) NOT NULL,
	cvuCuentaHasta char(22) NULL
	)

CREATE TABLE SituacionCrediticia(
	idNivel tinyint IDENTITY (1,1) NOT NULL PRIMARY KEY,
	descripcionNivel varchar(500) NOT NULL
	)

CREATE TABLE TipoCuenta(
	idTipoCuenta tinyint IDENTITY (1,1) NOT NULL PRIMARY KEY,
	nombreTipoCuenta varchar(50) NOT NULL
	)

CREATE TABLE TipoDocumento(
	idTipoDocumento tinyint IDENTITY (1,1) NOT NULL PRIMARY KEY,
	nombreTipoDocumento varchar(50) NOT NULL
	)

CREATE TABLE TipoOperacion(
	idTipoOperacion tinyint IDENTITY (1,1) NOT NULL PRIMARY KEY,
	nombreTipoOperacion varchar(50) NOT NULL
	)
GO