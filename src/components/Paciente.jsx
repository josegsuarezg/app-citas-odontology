
const Paciente = ({ paciente, setPaciente, eliminarPaciente }) => {
  
  const { nombre, apellido, email, fecha, hora, sintomas, id } = paciente;
  
  
  //Confirmación para Eliminar Registro
  const handleEliminar = () => {
    const respuesta = confirm('¿Deseas Eliminar este Paciente?');
    if(respuesta) {
      eliminarPaciente(id);
    }
  }

  return (
    <div className="m-5 bg-white shadow-md px-5 py-5 rounded-xl">
      <p className="font-bold mb-3 text-gray-700 upercase">
        Nombre: {''}
        <span className="font-normal normal-case"> {nombre} </span>
      </p>

      <p className="font-bold mb-3 text-gray-700 upercase">
        Apellido: {''}
        <span className="font-normal normal-case">{apellido}</span>
      </p>

      <p className="font-bold mb-3 text-gray-700 upercase">
        E-mail: {''}
        <span className="font-normal normal-case"> {email}</span>
      </p>

      <p className="font-bold mb-3 text-gray-700 upercase">
        Fecha: {''}
        <span className="font-normal normal-case"> {fecha} </span>
      </p>
      
      <p className="font-bold mb-3 text-gray-700 upercase">
        Hora: {''}
        <span className="font-normal normal-case"> {hora} </span>
      </p>

      <p className="font-bold mb-3 text-gray-700 upercase">
        Sintomas: {''}
        <span className="font-normal normal-case">{sintomas}</span>
      </p>

      <div className="flex justify-evenly mt-10">
        <button
          className="py-2 px-10 bg-indigo-500 hover:bg-indigo-700 rounded-lg font-medium uppercase text-white"
          onClick={() => setPaciente(paciente)}
        >
          Editar
        </button>

        <button
          className="py-2 px-7 bg-red-500 hover:bg-red-700 rounded-lg font-medium uppercase text-white"
          onClick={handleEliminar}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Paciente
