DELIMITER //

CREATE TRIGGER marcar_sala_ocupada -- Trigger para cuando se asigne una cita a una sala aparezca como ocupada
AFTER INSERT ON citas -- Se realiza el trigger justo después de añadir una cita
FOR EACH ROW
BEGIN 
	UPDATE salas
	SET salas.ocupacion = 1
	WHERE salas.id = NEW.id_sala; -- Pone la ocupación a 1 de la sala cuyo id coincida con el id_sala que se haya seleccionado en la asignación de la nueva cita
END;
//

DELIMITER ;

DELIMITER //

CREATE TRIGGER marcar_sala_libre -- Trigger para liberar una sala cuando no haya citas en esa sala
AFTER UPDATE ON citas
FOR EACH ROW
BEGIN 
	IF OLD.fecha_fin IS NULL AND NEW.fecha_fin IS NOT NULL AND NEW.fecha_fin <= NOW() THEN
		UPDATE salas
		SET salas.ocupacion = 0
		WHERE salas.id = NEW.id_sala;
	END IF;
END;
//

DELIMITER ;