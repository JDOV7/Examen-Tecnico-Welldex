import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./Pages/Principal";
import CrearOperacionContenedor from "./Pages/CrearOperacionContenedor";
import CrearOperacionCargaSuelta from "./Pages/CrearOperacionCargaSuelta";
import DescargarMercancia from "./Pages/DescargarMercancia";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Principal></Principal>}></Route>
            <Route
              path="nueva-operacion-contenedor"
              element={<CrearOperacionContenedor></CrearOperacionContenedor>}
            />
            <Route
              path="nueva-operacion-carga-suelta"
              element={<CrearOperacionCargaSuelta></CrearOperacionCargaSuelta>}
            />
            <Route
              path="descargar/:IdOperacionAduanera"
              element={<DescargarMercancia></DescargarMercancia>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
