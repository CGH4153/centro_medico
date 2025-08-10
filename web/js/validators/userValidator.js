"use strict";

const userValidator = {
    validateRegister: function(formData){
        let errors = [];
        let name = formData.get("name");
        let lastName1 = formData.get("lastname1");
        let lastName2 = formData.get("lastname2");
        let dni = formData.get("dni");
        let phone = formData.get("phone");
        const nacimiento = formData.get("nacimiento");
        let password = formData.get("password");
        let password2 = formData.get("password2");

        if (name.length < 3 || lastName1.length < 3 || lastName2.length < 3) {
            errors.push("El nombre y apellidos deben ser mayor de 3 caracteres");
        }

        if (!/^[a-zA-Z\s]+$/.test(name) || !/^[a-zA-Z\s]+$/.test(lastName1) || !/^[a-zA-Z\s]+$/.test(lastName2)) {
            errors.push("El nombre y apellidos solo pueden contener letras y espacios");
        }

        if(!/^[0-9]{8}[A-Za-z]{1}$/.test(dni)) {
            errors.push("El DNI o NIF debe tener 8 números y 1 letra");
        }

        if(phone.length < 9) {
            errors.push("El número de teléfono debe tener una longitud de 9 números");
        }

        if (new Date(nacimiento) > new Date()) {
            errors.push("La fecha de nacimiento no puede ser posterior a hoy.");
        }

        if (password.length < 8) {
            errors.push("La contraseña debe tener al menos 8 caracteres");
        }
    
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
            errors.push("La contraseña debe contener al menos un número, una letra minúscula y una mayúscula");
        }

        if (password !== password2) {
            errors.push("Las contraseñas deben coincidir");
        }

        return errors;
    }
};

export { userValidator };
