import { useState } from 'react';
import './App.css';

function App() {

  const [nombre, setNombre]= useState ("");
  const [edad, setEdad]= useState (0);
  const [pais, setPais]= useState ("");
  const [cargo, setCargo]= useState ("");
  const [anios, setAnios]= useState (0);

  const mostrarDatos = () =>{
    alert(nombre);
  }

  return (
    <div className="App">
    <div className='datos'>
      <label>Nombre:<input 
      onChange={(event) => {
        setNombre(event.target.value);
      }}
      type="text" id="" name="" placeholder="" /></label>
      <label>Edad:<input 
      onChange={(event ) =>{
        setEdad(event.target.value);
      }}
      type="number" id="" name="" placeholder="" /></label>
      <label>Pais:<input 
      onChange={(event) => {
        setPais(event.target.value);
      }}
      type="text" id="" name="" placeholder="" /></label>
      <label>Cargo:<input 
      onChange={(event) => {
        setCargo(event.target.value);
      }}
      type="text" id="" name="" placeholder="" /></label>
      <label>Años:<input 
      onChange={(event) => {
        setAnios(event.target.value);
      }}
      type="numer" id="" name="" placeholder="" /></label>
      <button onClick={mostrarDatos}>Registrar</button>
    </div>
    </div>
  );
}

export default App;
