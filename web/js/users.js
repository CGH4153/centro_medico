"use strict";

import {sessionManager} from "/js/utils/session.js";

function main(){
    hideHeaderOptions();
}

function hideHeaderOptions(){
    let headerUser = document.getElementById("navbar-user");
    let headerLogin = document.getElementById("navbar-login");
    let headerHelp = document.getElementById("navbar-help");
    let headerContact = document.getElementById("navbar-contact");
    let headerReviews = document.getElementById("navbar-reviews");
    let headerCitas = document.getElementById("navbar-crear_cita");
    let headerInformation = document.getElementById("navbar-information");
    let headerServices = document.getElementById("navbar-services");
    let headerIndex = document.getElementById("navbar-index");
    let headerCalendar = document.getElementById("navbar-calendar");
    let headerClients = document.getElementById("navbar-clients");
    let headerStock = document.getElementById("navbar-stock");


    if(sessionManager.isLogged()){
        const loggedUser = sessionManager.getLoggedUser();
        const tipo = loggedUser.tipo_trabajador;

        if (tipo) {
            // Es trabajador
            headerLogin.style.display = "none";
            headerCitas.style.display = "none"; // Los trabajadores no piden cita
            headerHelp.style.display = "none";
            headerContact.style.display = "none";
            headerReviews.style.display = "none";
            headerInformation.style.display = "none";
            headerServices.style.display = "none";
            headerIndex.style.display = "none";
        } else {
            // Es paciente
            headerLogin.style.display = "none";
            headerCalendar.style.display = "none";
            headerClients.style.display = "none";
            headerStock.style.display = "none";
        }
    } else {
        // No logueado
        headerUser.style.display = "none";
        headerCitas.style.display = "none";
    }
}


document.addEventListener("DOMContentLoaded", main);