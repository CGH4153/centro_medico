DROP TABLE IF EXISTS Pacientes;
DROP TABLE if EXISTS Trabajadores;
DROP TABLE if EXISTS Turnos;
DROP TABLE if EXISTS Salas;
DROP TABLE if EXISTS Citas;

-- Base de datos para una aplicación llevada dentro del centro médico para almacenar a los pacientes y que puedan utilizarlo los trabajadores del centro,
-- además de los medicamentos que dispone la farmacia incluída en el centro médico

CREATE TABLE Pacientes (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255) NOT NULL,
	apellido1 VARCHAR(255) NOT NULL,
	apellido2 VARCHAR(255) NOT NULL,
	fecha_nacimiento DATE NOT NULL,
	dni VARCHAR(255) NOT NULL UNIQUE,
	telefono INT NOT NULL,
	correo VARCHAR(255),
	contrasena VARCHAR(255) NOT NULL UNIQUE,
	tipo_trabajador ENUM('Médico', 'Doctor', 'Enfermero', 'Administrativo', 'Mantenimiento') DEFAULT NULL,
	tipo_especialidad ENUM('Pediatría', 'Ginecología', 'Obstetricia', 'Medicina interna', 'Geriatría', 'Dermatología', 'Cardiología', 'Traumatología', 'Ortopedia', 'Alergología', 'Endocrinología', 'Neumología', 'Otorrinolaringología', 'Oftalmología', 'Urología', 'Reumatología', 'Neurología', 'Psiquiatría', 'Psicología', 'Psicopedagogía', 'Terapia', 'Coaching', 'Fisioterapia', 'Osteopatía') DEFAULT NULL
	-- La edad del usuario se calcula aparte
	-- Los trabajadores se obtienen en una vista diferente, pero tienen que registrarse como pacientes en esta tabla
);

CREATE TABLE Turnos ( -- Cada trabajador tiene su propio turno
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	fecha_comienzo DATE NOT NULL,
	hora_inicio TIME NOT NULL,
	hora_fin TIME NOT NULL,
	fecha_fin DATE NOT NULL,
	-- 7 días laborales por trimestre (22 de vacaciones y 6 de asuntos propios al año)
	dias_ap INT NOT NULL, -- Días de asuntos propios que puede coger cada trabajador, tiene que disminuir cada vez que un trabajador coja un día
	vacaciones INT NOT NULL,
	-- Ir alternando entre 5 y 6 días de vacaciones entre cada trimestre y 1 o 2 días de asuntos propios
	-- Estos días se pueden acumular para cogerlos en otro trimestre (no se almacenan si se cambia el año)
	id_paciente INT,

	FOREIGN KEY (id_paciente) REFERENCES Pacientes(id)
);	

CREATE TABLE Salas (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	edificio VARCHAR(255) NOT NULL, -- p.e: "Edificio de oftalmología"
	planta INT NOT NULL, -- p.e: "planta 2"
	puerta VARCHAR(255) NOT NULL, -- p.e: "puerta 31B"
	ocupacion BOOLEAN NOT NULL
);

CREATE TABLE Citas (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	fecha_inicio DATETIME NOT NULL,
	fecha_fin DATETIME NOT NULL,
	triage INT NOT NULL,
	motivo VARCHAR(255) NOT NULL,
	id_paciente INT NOT NULL, -- Paciente que va a la cita
	id_medico INT NOT NULL, -- Médico que atiende la cita
	id_sala INT NOT NULL, -- Sala en la que tiene lugar
	
	FOREIGN KEY (id_paciente) REFERENCES Pacientes(id),
	FOREIGN KEY (id_medico) REFERENCES Pacientes(id),
	FOREIGN KEY (id_sala) REFERENCES Salas(id)
);