CREATE OR REPLACE VIEW trabajadoresConTurnos AS -- Vista que enlaza a los trabajadores con sus turnos de trabajo
SELECT 
	m.id AS id,
	m.nombre AS nombre,
	m.apellido1 AS apellido,
	m.tipo_trabajador AS tipo_trabajador,
	t.fecha_comienzo AS fecha_comienzo,
	t.fecha_fin AS fecha_fin,
	t.hora_inicio AS hora_inicio,
	t.hora_fin AS hora_fin,
	t.dias_ap AS asuntos_propios,
	t.vacaciones AS vacaciones
FROM 
	pacientes m
JOIN 
	turnos t ON m.id = t.id_paciente
GROUP BY id, nombre, apellido, tipo_trabajador, fecha_comienzo, fecha_fin, hora_inicio, hora_fin, asuntos_propios, vacaciones
ORDER BY m.id ASC;

CREATE OR REPLACE VIEW pacientesConEdad AS -- Vista que enlaza la edad actual con cada paciente
SELECT
	p.id as id,
	p.nombre as nombre,
	p.apellido1 as apellido1,
	p.apellido2 as apellido2,
	p.fecha_nacimiento as fecha_nacimiento,
	p.dni as dni,
	p.telefono as telefono,
	p.correo as correo,
	TIMESTAMPDIFF(YEAR, p.fecha_nacimiento, CURDATE()) AS edad
FROM Pacientes p
GROUP BY id, nombre, apellido1, apellido2, fecha_nacimiento, dni, telefono, correo, edad
ORDER BY p.id ASC;

CREATE OR REPLACE VIEW Trabajadores AS
SELECT
	p.id as id,
	p.nombre as nombre,
	p.apellido1 as apellido,
	p.correo as correo
FROM Pacientes p
WHERE tipo_trabajador IS NOT NULL
GROUP BY id, nombre, apellido, correo
ORDER BY p.id ASC;