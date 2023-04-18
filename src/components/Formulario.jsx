import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [diagnostico, setDiagnostico] = useState('');

  const [error, setError] = useState(false);
  
  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setApellido(paciente.apellido);
      setTelefono(paciente.telefono);
      setFecha(paciente.fecha);
      setHora(paciente.hora);
      setSintomas(paciente.sintomas);
      setDiagnostico(paciente.diagnostico);
    };
    
  }, [paciente])
  
  //Creando Id Unico para usar como Key en el Array de Pacientes
  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  }

  //Acción a Realizar con el Submit del Formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    //Validando el Formulario
    if ([nombre, apellido, telefono, fecha, sintomas, diagnostico].includes('')) {
      setError(true);
      return;
    }
    setError(false);
    
    //Creando Objeto Paciente
    const objetoPaciente = {
      nombre,
      apellido,
      email,
      fecha,
      hora,
      sintomas,
      diagnostico
    };
    
    //Logica de Editar Registro
    if(paciente.id) {
      //Modificar Paciente
      objetoPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);
      
      setPacientes(pacientesActualizados);
      setPaciente({});
      
    }else {
      //Agrega Nuevo Registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }
    
    //Reiniciar el Formulario
    setNombre('');
    setApellido('');
    setEmail('');
    setFecha('');
    setHora('');
    setSintomas('');
    setDiagnostico('');
    
  };
  
  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">
        Seguimiento de Pacientes
      </h2>

      <p className="mt-5 mb-5 text-lg text-center">
        Añada tus Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={handleSubmit}
      >
        {error && (<Error mensaje="Todos los Campos son Obligatorios"/>)}
        <div className="mb-4">
          <label
            htmlFor="nombre"
            className="block text-gray-700 font-bold uppercase"
          >
            Nombre
          </label>
          <input
            id="nombre"
            className="w-full border-2 p-2 rounded-md mt-2 placeholder-gray-400"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="apellido"
            className="block text-gray-700 font-bold uppercase"
          >
            Apellido
          </label>
          <input
            id="apellido"
            className="w-full border-2 p-2 rounded-md mt-2 placeholder-gray-400"
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-bold uppercase"
          >
            Teléfono de Contacto del Paciente
          </label>
          <input
            id="telefono"
            className="w-full border-2 p-2 rounded-md mt-2 placeholder-gray-400"
            type="telefono"
            placeholder="Email de contacto"
            value={telefono}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="fecha"
            className="block text-gray-700 font-bold uppercase"
          >
            Fecha de la Cita
          </label>
          <input
            id="fecha"
            className="w-full border-2 p-2 rounded-md mt-2 placeholder-gray-400"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label
            htmlFor="hora"
            className="block text-gray-700 font-bold uppercase"
          >
            Hora de la Cita
          </label>
          <input
            id="hora"
            className="w-full border-2 p-2 rounded-md mt-2 placeholder-gray-400"
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 font-bold uppercase"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            className="w-full border-2 p-2 rounded-md mt-2 placeholder-gray-400"
            placeholder="Sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        
        <div className="mb-4">
          <label
            htmlFor="diagnostico"
            className="block text-gray-700 font-bold uppercase"
          >
            Diagnostico
          </label>
          <textarea
            id="diagnostico"
            className="w-full border-2 p-2 rounded-md mt-2 placeholder-gray-400"
            placeholder="diagnostico"
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
          />
        </div>

        <input
          className="bg-indigo-600 w-full font-bold text-white py-3 rounded-md cursor-pointer hover:bg-indigo-700 transition-all"
          type="submit"
          value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
        />
      </form>
    </div>
  );
};

export default Formulario
