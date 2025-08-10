INSERT INTO Pacientes (id, nombre, apellido1, apellido2, fecha_nacimiento, dni, telefono, correo, contrasena, tipo_trabajador) VALUES
(1, 'Bella', 'Moreno', 'Eugenio', '2005-11-22', '49397872J', 644400810, 'bellamoreno05@icloud.com', 'pbkdf2:sha256:1000000$B07cnFFGcVFcwAkx$c94bf182f1b07f4b036de9fbed51f815010e752a1ec35c85aee8a19adb9e0e8a', 'Administrativo'),
(2, 'Carlos', 'Gómez', 'Martínez', '1980-07-15', '23456789B', 611234567, 'carlos.gomez@centromedico.com', 'pbkdf2:sha256:1000000$zbmfEIAltqkDWZdi$45d2589cd95f8560b5e9e184f7016deb4b9fab36bedec7cd27e8bb77bae3294e', 'Médico'), -- contraseña: contrasena123
(3, 'Lucía', 'Pérez', 'López', '1985-11-20', '34567890C', 622345678, 'lucia.perez@centromedico.com', 'pbkdf2:sha256:1000000$hxSh19nQs6N5GTHj$cf2910c683619f806c3c3e8c347bb56706ad2cdf0bffe92fb664125c8ac05650', 'Médico'), -- contraseña: luciaPass!
(4, 'Javier', 'Martínez', 'Ruiz', '1978-03-25', '45678901D', 633456789, 'javier.martinez@centromedico.com', '	pbkdf2:sha256:1000000$HjVjHTybdgVDzXjC$1fc802a7ecf849ecaa37928322a7c9f908cb30fb8818eac5d091af1cb690d19f', 'Doctor'), -- contraseña: docJavier!
(5, 'Sofía', 'Ruiz', 'García', '1982-09-30', '56789012E', 644567890, 'sofia.ruiz@centromedico.com', 'pbkdf2:sha256:1000000$JlWb9tNkKA8S8L9V$8c65745b94e1b5ff4426e603dbab67169c51877dbef7b57698a59a834c271322', 'Doctor'), -- contraseña: sofiaDoc2024
(6, 'María', 'López', 'Fernández', '1990-02-18', '67890123F', 655678901, 'maria.lopez@centromedico.com', 'pbkdf2:sha256:1000000$kP9uvl1i7HEho5jc$e78f68e1c163c6c54b56899fbe54cfbc38480535f6d8bf651e3ac6913179ab1f', 'Enfermero'), -- contraseña: maria1234
(7, 'David', 'Fernández', 'Martín', '1988-06-10', '78901234G', 666789012, 'david.fernandez@centromedico.com', 'pbkdf2:sha256:1000000$vWFDhI0jUlKLt0JO$9f9de6d26c5973dec8d32c2f02142481b25046ab48fa429650e7b4869a16ebef', 'Enfermero'), -- contraseña: davidEnf!
(8, 'Ana', 'Torres', 'Ramírez', '1992-12-01', '89012345H', 677890123, 'ana.torres@centromedico.com', 'pbkdf2:sha256:1000000$SHXstoTtIADMf6Jh$71e2d925eebd172d20b3e56e723adb74fb2363e09e41f53c0581fa1f68179df4', 'Administrativo'), -- contraseña: adminAna1
(9, 'Pablo', 'Ramírez', 'Hernández', '1987-08-22', '90123456J', 688901234, 'pablo.ramirez@centromedico.com', 'pbkdf2:sha256:1000000$JPs92gpjo3oeYiUL$6eb200e2b21c64ae4966f904eda2743011a0f9da9405ec00781d9012d633696a', 'Administrativo'), -- contraseña: ramirez--admin
(10, 'Tomás', 'Morales', 'Díaz', '1975-01-05', '01234567K', 699012345, 'tomas.morales@centromedico.com', 'pbkdf2:sha256:1000000$TQDWFIZt5likV7Bb$45e57353f2bd7c585324c7fd00e896d0c47155bb35a0c4bc5f13844699d77b3d', 'Mantenimiento'), -- contraseña: tomas123!
(11, 'Laura', 'Hernández', 'Moreno', '1983-04-14', '11223344L', 600123456, 'laura.hernandez@centromedico.com', 'pbkdf2:sha256:1000000$AONJjHVUSKkPt0TR$439bd02ffd5061bc06d196f1b1e5e882fe440c6e69130d20df1f39c609e18210', 'Mantenimiento'); -- contraseña: mantenimientoLh

INSERT INTO Turnos (fecha_comienzo, hora_inicio, hora_fin, fecha_fin, dias_ap, vacaciones, id_paciente) VALUES
-- Q1
('2025-01-01', '00:00:00', '12:00:00', '2025-03-31', 1, 6, 2),
('2025-01-01', '12:00:00', '00:00:00', '2025-03-31', 1, 6, 3),
('2025-01-01', '00:00:00', '12:00:00', '2025-03-31', 1, 6, 4),
('2025-01-01', '12:00:00', '00:00:00', '2025-03-31', 1, 6, 5),
('2025-01-01', '00:00:00', '12:00:00', '2025-03-31', 1, 6, 6),
('2025-01-01', '12:00:00', '00:00:00', '2025-03-31', 1, 6, 7),
('2025-01-01', '00:00:00', '12:00:00', '2025-03-31', 1, 6, 8),
('2025-01-01', '12:00:00', '00:00:00', '2025-03-31', 1, 6, 9),
('2025-01-01', '00:00:00', '12:00:00', '2025-03-31', 1, 6, 10),
('2025-01-01', '12:00:00', '00:00:00', '2025-03-31', 1, 6, 11),

-- Q2
('2025-04-01', '12:00:00', '00:00:00', '2025-06-30', 2, 5, 2),
('2025-04-01', '00:00:00', '12:00:00', '2025-06-30', 2, 5, 3),
('2025-04-01', '12:00:00', '00:00:00', '2025-06-30', 2, 5, 4),
('2025-04-01', '00:00:00', '12:00:00', '2025-06-30', 2, 5, 5),
('2025-04-01', '12:00:00', '00:00:00', '2025-06-30', 2, 5, 6),
('2025-04-01', '00:00:00', '12:00:00', '2025-06-30', 2, 5, 7),
('2025-04-01', '12:00:00', '00:00:00', '2025-06-30', 2, 5, 8),
('2025-04-01', '00:00:00', '12:00:00', '2025-06-30', 2, 5, 9),
('2025-04-01', '12:00:00', '00:00:00', '2025-06-30', 2, 5, 10),
('2025-04-01', '00:00:00', '12:00:00', '2025-06-30', 2, 5, 11),

-- Q3
('2025-07-01', '00:00:00', '12:00:00', '2025-09-30', 1, 6, 2),
('2025-07-01', '12:00:00', '00:00:00', '2025-09-30', 1, 6, 3),
('2025-07-01', '00:00:00', '12:00:00', '2025-09-30', 1, 6, 4),
('2025-07-01', '12:00:00', '00:00:00', '2025-09-30', 1, 6, 5),
('2025-07-01', '00:00:00', '12:00:00', '2025-09-30', 1, 6, 6),
('2025-07-01', '12:00:00', '00:00:00', '2025-09-30', 1, 6, 7),
('2025-07-01', '00:00:00', '12:00:00', '2025-09-30', 1, 6, 8),
('2025-07-01', '12:00:00', '00:00:00', '2025-09-30', 1, 6, 9),
('2025-07-01', '00:00:00', '12:00:00', '2025-09-30', 1, 6, 10),
('2025-07-01', '12:00:00', '00:00:00', '2025-09-30', 1, 6, 11),

-- Q4
('2025-10-01', '12:00:00', '00:00:00', '2025-12-31', 2, 5, 2),
('2025-10-01', '00:00:00', '12:00:00', '2025-12-31', 2, 5, 3),
('2025-10-01', '12:00:00', '00:00:00', '2025-12-31', 2, 5, 4),
('2025-10-01', '00:00:00', '12:00:00', '2025-12-31', 2, 5, 5),
('2025-10-01', '12:00:00', '00:00:00', '2025-12-31', 2, 5, 6),
('2025-10-01', '00:00:00', '12:00:00', '2025-12-31', 2, 5, 7),
('2025-10-01', '12:00:00', '00:00:00', '2025-12-31', 2, 5, 8),
('2025-10-01', '00:00:00', '12:00:00', '2025-12-31', 2, 5, 9),
('2025-10-01', '12:00:00', '00:00:00', '2025-12-31', 2, 5, 10),
('2025-10-01', '00:00:00', '12:00:00', '2025-12-31', 2, 5, 11);

INSERT INTO Salas (edificio, planta, puerta, ocupacion) VALUES
('Edificio de Oftalmología', 2, '31B', FALSE),
('Edificio de Cardiología', 1, '12A', FALSE),
('Edificio de Neurología', 3, '34C', FALSE),
('Edificio de Traumatología', 0, '5', FALSE),
('Edificio de Pediatría', 2, '21D', FALSE),
('Edificio de Urgencias', 1, '11U', FALSE),
('Edificio Principal', 4, '48A', FALSE),
('Edificio de Psicología', 2, '27B', FALSE),
('Edificio de Medicina Interna', 3, '36C', FALSE),
('Edificio de Cirugía', 2, '20A', FALSE),
('Edificio de Geriatría', 1, '13G', FALSE),
('Edificio de Dermatología', 0, '3C', FALSE),
('Edificio de Psiquiatría', 3, '38P', FALSE),
('Edificio de Radiología', 1, '17R', FALSE),
('Edificio de Rehabilitación', 2, '24F', FALSE),
('Edificio de Análisis Clínicos', 0, '9B', FALSE),
('Edificio de Reumatología', 1, '10H', FALSE),
('Edificio de Enfermería', 2, '22N', FALSE),
('Edificio de Fisioterapia', 3, '33M', FALSE),
('Edificio de Farmacia', 0, '1A', FALSE);