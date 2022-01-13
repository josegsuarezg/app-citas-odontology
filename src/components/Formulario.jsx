import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [alta, setAlta] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);
  
  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setAlta(paciente.alta);
      setSintomas(paciente.sintomas);
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
    if ([nombre, propietario, email, alta, sintomas].includes('')) {
      setError(true);
      return;
    }
    setError(false);
    
    //Creando Objeto Paciente
    const objetoPaciente = {
      nombre,
      propietario,
      email,
      alta,
      sintomas,
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
    setPropietario('');
    setEmail('');
    setAlta('');
    setSintomas('');
    
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
            htmlFor="mascota"
            className="block text-gray-700 font-bold uppercase"
          >
            Nombre Mascota
          </label>
          <input
            id="mascota"
            className="w-full border-2 p-2 rounded-md mt-2 placeholder-gray-400"
            type="text"
            placeholder="Nombre de la Mascota"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="propietario"
            className="block text-gray-700 font-bold uppercase"
          >
            Nombre Propietario
          </label>
          <input
            id="propietario"
            className="w-full border-2 p-2 rounded-md mt-2 placeholder-gray-400"
            type="text"
            placeholder="Nombre del Propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-bold uppercase"
          >
            E-mail de Contacto del Propietario
          </label>
          <input
            id="email"
            className="w-full border-2 p-2 rounded-md mt-2 placeholder-gray-400"
            type="email"
            placeholder="Email de contacto"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="alta"
            className="block text-gray-700 font-bold uppercase"
          >
            Fecha del Alta de la Mascota
          </label>
          <input
            id="alta"
            className="w-full border-2 p-2 rounded-md mt-2 placeholder-gray-400"
            type="date"
            value={alta}
            onChange={(e) => setAlta(e.target.value)}
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
