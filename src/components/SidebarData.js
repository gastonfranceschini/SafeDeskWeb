import React from 'react';
import AutoIcon from '@material-ui/icons/LocalHospital';
import ReservarIcon from '@material-ui/icons/InsertInvitation';
import ReservasIcon from '@material-ui/icons/ImportContacts';
import ReportesIcon from '@material-ui/icons/Assessment';
import AdminIcon from '@material-ui/icons/AssignmentInd';
import LogoutIcon from '@material-ui/icons/ExitToApp';

export const SidebarData = [
    {
        title: "Autodiagnostico",
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
        link: '/Login'
    }
]