import React from 'react';
import AutoIcon from '@material-ui/icons/LocalHospital';
import ReservarIcon from '@material-ui/icons/InsertInvitation';
import ReservasIcon from '@material-ui/icons/ImportContacts';
import ReportesIcon from '@material-ui/icons/Assessment';
import AdminIcon from '@material-ui/icons/AssignmentInd';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { getUser } from "../utils/auth-helper";


const OPERADOR = 1;
const SUPERVISOR = 2;
const GERENTE = 3;
const ADMINISTRADOR = 4;
const SEGURIDAD = 5;

const btnAutoDiagnostico = {
    title: "Auto Diagnostico",
    icon: <AutoIcon />,
    path: '/Diagnostico',
    cName: 'nav-text'
};

const btnReservar = {
    title: "Reservar Turno",
    icon: <ReservarIcon />,
    path: '/Reserva',
    cName: 'nav-text'
};

const btnMisReservas = {
    title: "Mis Reservas",
    icon: <ReservasIcon />,
    path: '/MisReservas',
    cName: 'nav-text'
};

const btnReportes = {
    title: "Reportes",
    icon: <ReportesIcon />,
    path: '/Reporte',
    cName: 'nav-text'
};


const btnAdministracion = {
    title: "Administracion",
    icon: <AdminIcon />,
    path: '/Administracion',
    cName: 'nav-text'
};

const btnCerrarSesion =  {
    title: "Cerrar Sesion",
    icon: <LogoutIcon />,
    path: '/',
    cName: 'nav-text'
};


export const SidebarData = (autoDiagnostico,reservarTurno) => {
    const menu = []
    const idTipoUsuario = getUser().IdTipoDeUsuario;
    
    switch (idTipoUsuario) {
        case OPERADOR:
            if (autoDiagnostico == 1) menu.push(btnAutoDiagnostico);
            if (reservarTurno == 1) menu.push(btnReservar);
            menu.push(btnMisReservas);
            menu.push(btnCerrarSesion);
          break;
        case SUPERVISOR:
            if (autoDiagnostico == 1) menu.push(btnAutoDiagnostico);
            if (reservarTurno == 1) menu.push(btnReservar);
            menu.push(btnMisReservas);
            menu.push(btnReportes);
            menu.push(btnCerrarSesion);
          break;
        case  GERENTE:
            if (autoDiagnostico == 1) menu.push(btnAutoDiagnostico);
            if (reservarTurno == 1) menu.push(btnReservar);
            menu.push(btnMisReservas);
            menu.push(btnReportes);
            menu.push(btnCerrarSesion);
          break;
        case ADMINISTRADOR:
            if (autoDiagnostico == 1) menu.push(btnAutoDiagnostico);
            if (reservarTurno == 1) menu.push(btnReservar);
            menu.push(btnMisReservas);
            menu.push(btnReportes);
            menu.push(btnAdministracion);
            menu.push(btnCerrarSesion);
          break;
        case SEGURIDAD:
            if (autoDiagnostico == 1) menu.push(btnAutoDiagnostico);
            if (reservarTurno == 1) menu.push(btnReservar);
            menu.push(btnMisReservas);
            menu.push(btnReportes);
            menu.push(btnCerrarSesion);
          break;

        default:
            //error
          break;
      }



return menu;

/*[
    {
        title: "Auto Diagnostico",
        icon: <AutoIcon />,
        link: '/Diagnostico'
    },
    {
        title: "Reservar Turno",
        icon: <ReservarIcon />,
        link: '/Reserva'
    },
    {
        title: "Mis Reservas",
        icon: <ReservasIcon />,
        link: '/MisReservas'
    },
    {
        title: "Reportes",
        icon: <ReportesIcon />,
        link: '/Reporte'
    },
    {
        title: "Administracion",
        icon: <AdminIcon />,
        link: '/Administracion'
    },
    {
        title: "Cerrar Sesion",
        icon: <LogoutIcon />,
        link: '/'
    }
]*/


}