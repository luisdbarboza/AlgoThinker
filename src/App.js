import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SideBarContextProvider from "./context/sidebarContext";

const Topbar = React.lazy(() => import("./components/Topbar/Topbar"));
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const LearnSection = React.lazy(() =>
  import("./pages/LearnSection/LearnSection")
);

//Lecture es la pantalla donde se presenta la teoria, visualizacion y
//codigo relacionada a un concepto

//LearnSection es una de las clasificaciones de contenido, o algoritmos,
//estructuras de datos y practica

//Sidebar context por los momentos solo sirve para mostrar la barra lateral

//VisualizationContext mantiene la logica de estado relacionada con la visualizacion
//Si se ejecuta al completo o paso por paso
const App = () => {
  return (
    <>
      <React.Suspense fallback={<p>Cargando...</p>}>
        <BrowserRouter>
          <SideBarContextProvider>
            <Topbar />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/learn/:section" component={LearnSection} />
            </Switch>
          </SideBarContextProvider>
        </BrowserRouter>
      </React.Suspense>
    </>
  );
};

export default App;
