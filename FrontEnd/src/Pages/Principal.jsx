import React from "react";
import Header from "../Components/Header";
import TablaOperaciones from "../Components/TablaOperaciones";
import { Link } from "react-router-dom";
function Principal() {
  return (
    <>
      <Header></Header>
      <div className="pt-28 flex items-center justify-center">
        <Link
          to={"/nueva-operacion-contenedor"}
          className="bg-blue-600 text-center font-bold rounded-lg p-2 m-4 "
        >
          Nueva Operacion: Contenedores
        </Link>
        <Link
          to={"/nueva-operacion-carga-suelta"}
          className="bg-orange-600 text-center font-bold rounded-lg p-2 m-4"
        >
          Nueva Operacion: Carga Suelta
        </Link>
      </div>
      <div className="px-10 ">
        <TablaOperaciones></TablaOperaciones>
      </div>
    </>
  );
}

export default Principal;
