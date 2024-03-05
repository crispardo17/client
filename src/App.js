import { useState } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Swal from 'sweetalert2'

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);
  const [id, setId] = useState(0);

  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);



  //agregar empleado
  const add = () => {
    axios
      .post("http://localhost:3001/create", {
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios,
      })
      .then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire({
          title: "!Registro Guardado Satisfactoriamente¡",
          html: "<i>El empleado <strong>"+nombre+"</strong> fue registrado con exito</i>",
          icon: "success",
          timer:3000,
        });
      })
      .catch((err) => console.log(err));
  };


 //actualizar empleado creado anteriormente
  const update = () => {
    axios
      .put("http://localhost:3001/update", {
        id: id,
        nombre: nombre,
        edad: edad,
        pais: pais,
        cargo: cargo,
        anios: anios,
      })
      .then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire({
          title: "!Actualización Guardada Satisfactoriamente¡",
          html: "<i>El empleado <strong>"+nombre+"</strong> fue actualizado con exito</i>",
          icon: "success",
          timer:3000,
        });
      })
      .catch((err) => console.log(err));
  };


  //eliminar empleado
  const deleteEmpleado = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`).then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire({
          title: "Quieres eliminar al Empleado?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "si, eliminar",
          denyButtonText: `No`
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Eliminado!", "", "success");
          } else if (result.isDenied) {
            Swal.fire("El empleado no fue eliminado", "", "info");
          }
        });
      })
      .catch((err) => console.log(err));
  };


  //limpia el formulario ya sea al crear usuario o al cancelar actualizar el empleado
  const limpiarCampos = ()=>{
    setNombre("");
    setAnios("");
    setCargo("");
    setEdad("");
    setPais("");
    setId("");
    setEditar(false);

  }

//lleva al formulario los datos del empleado a editar
  const editarEmpleado = (val) => {
    setEditar(true);


    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.id);

  }


  //muestra los usuarios creados en base en la tabla 
  const getEmpleados = () => {
    axios
      .get("http://localhost:3001/empleados")
      .then((response) => {
        setEmpleados(response.data);
      })
      .catch((err) => console.log(err));
  };
  getEmpleados();

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">Gestion de Empleados</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre
            </span>
            <input
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              type="text"
              value={nombre}
              className="form-control"
              placeholder="Ingrese el nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
            ></input>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad
            </span>
            <input
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              type="number"
              value={edad}
              className="form-control"
              placeholder="Ingrese la Edad"
              aria-label="Username"
              aria-describedby="basic-addon1"
            ></input>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Pais
            </span>
            <input
              onChange={(event) => {
                setPais(event.target.value);
              }}
              type="text"
              value={pais}
              className="form-control"
              placeholder="Ingrese el pais"
              aria-label="Username"
              aria-describedby="basic-addon1"
            ></input>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cargo
            </span>
            <input
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              type="text"
              value={cargo}
              className="form-control"
              placeholder="Ingrese el Cargo"
              aria-label="Username"
              aria-describedby="basic-addon1"
            ></input>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Años de experiencia
            </span>
            <input
              onChange={(event) => {
                setAnios(event.target.value);
              }}
              type="text"
              value={anios}
              className="form-control"
              placeholder="Ingrese los años de experiencia"
              aria-label="Username"
              aria-describedby="basic-addon1"
            ></input>
          </div>
        </div>
        <div className="card-footer text-muted">
          {
            editar?
          <div>
            <button className="btn btn-warning m-2" onClick={update}>Actualizar</button>
            <button className="btn btn-info m-2" onClick={limpiarCampos}>Cancelar</button>
          </div>
          :<button className="btn btn-success" onClick={add}>Registrar</button>
          }
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NOMBRE</th>
            <th scope="col">EDAD</th>
            <th scope="col">PAIS</th>
            <th scope="col">CARGO</th>
            <th scope="col">EXPERIENCIA</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          {
          empleadosList.map((val, key) => {
              return <tr key= {val.id}>
              <th>{val.id}</th>
              <td>{val.nombre}</td>
              <td>{val.edad}</td>
              <td>{val.pais}</td>
              <td>{val.cargo}</td>
              <td>{val.anios}</td>
              <td>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button"
                onClick={()=>{
                  editarEmpleado(val)
                }}
                className="btn btn-info">Editar</button>
                <button type="button" 
                onClick={()=>{
                  deleteEmpleado(val.id);
                }}
                className="btn btn-danger">Eliminar</button>
              </div>
              </td>
            </tr> 
            })
          }
          
        </tbody>
      </table>
    </div>
  );
}

export default App;
