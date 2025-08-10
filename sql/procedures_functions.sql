DELIMITER //

CREATE OR REPLACE PROCEDURE asignar_cita ( -- Elementos que se dan al pedir la cita
	IN p_pacienteId INT,
	IN p_fecha DATETIME,
	IN p_triage INT,
	IN p_motivo VARCHAR(255)
)
BEGIN 
	-- Declarar variables que utilizaremos a lo largo del procedimiento
	DECLARE v_pacienteId INT;
	DECLARE v_trabajadorId INT;
	DECLARE v_salaId INT;
	DECLARE v_otrasCitas INT;
	DECLARE v_duracionCita TIME;
	DECLARE v_horaFin TIME;
	
	-- Iniciamos la transacción
	START TRANSACTION;
	SET lc_time_names = 'es_ES';
	SET v_duracionCita = '00:20:00';
	SET v_horaFin = ADDTIME(p_fecha, v_duracionCita);
	
	SELECT pacientes.id
	INTO v_pacienteId
	FROM pacientes
	WHERE pacientes.id = p_pacienteId;
	
	IF (v_pacienteId IS NULL) THEN
		ROLLBACK;
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'No se puede asignar la cita: el paciente no existe';
	END IF;
	
	-- Meter variable para añadir el turno que coincide con la fecha y hora de la cita, y seleccionar al médico que esté en ese turno si triage >= 2; 
	-- si no seleccionar al enfermero de ese turno.
	-- LIMIT 1 sirve para que solo seleccione uno (el primero que cumpla todas las condiciones), si no se pone la consulta lanza el error (more than one row).
	SELECT trabajadoresconturnos.id
	INTO v_trabajadorId
	FROM trabajadoresconturnos
	WHERE ((trabajadoresconturnos.tipo_trabajador = 'Médico' AND p_triage >= 2) OR (trabajadoresconturnos.tipo_trabajador = 'Enfermero' AND p_triage <= 1))
		AND DATE(p_fecha) BETWEEN trabajadoresconturnos.fecha_comienzo AND trabajadoresconturnos.fecha_fin 
		AND TIME(p_fecha) BETWEEN trabajadoresconturnos.hora_comienzo AND trabajadoresconturnos.hora_fin
	LIMIT 1;
	
	-- Seleccionamos una sala del Edificio Principal que esté sin ocupar en este momento
	SELECT salas.id
	INTO v_salaId
	FROM salas
	WHERE salas.ocupacion = 0 AND salas.edificio = 'Edificio Principal' 
	LIMIT 1;
	
	-- Ver que durante el tiempo que dura la cita, el trabajador seleccionado no tiene otra cita prevista
	SELECT citas.id
	INTO v_otrasCitas
	FROM citas
	WHERE (citas.id_medico = v_trabajadorId) AND v_horaFin BETWEEN citas.fecha AND ADDTIME(citas.fecha, v_duracionCita)
	LIMIT 1;
	
	IF v_otrasCitas IS NOT NULL THEN -- Se lanza un error si el trabajador ya tiene una cita asignada en esa fecha
		ROLLBACK;
			SIGNAL SQLSTATE '45000'
			SET MESSAGE_TEXT = 'No se puede asignar la cita: el trabajador ya tiene una cita en esa fecha';
	END IF;
	
	-- Insertamos la cita si no hay ningún error
	INSERT INTO citas(fecha_inicio, fecha_fin, triage, motivo, id_paciente, id_medico, id_sala) VALUES 
	(p_fecha, v_horaFin, p_triage, p_motivo, p_pacienteId, v_trabajadorId, v_salaId);
	
	-- Confirmar la transacción
	COMMIT;
END //
DELIMITER ;