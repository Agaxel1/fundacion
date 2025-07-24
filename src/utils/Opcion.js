const Opcion = ({ Opcion }) => {
    switch (Opcion) {
        case 'topic':
            return <>Temas</>;
        case 'convocatoria':
            return <>Convocatorias</>;
        case 'noticias':
            return <>Noticias</>;
        case 'proyecto':
            return <>Proyectos</>;
        case 'actividad':
            return <>Actividades</>;
        case 'capacitacion':
            return <>Capacitaciones</>;
        default:
            return <>Contenido</>; // Valor por defecto si no coincide ninguno
    }
};

export default Opcion;
