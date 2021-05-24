import React from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import { Link } from "react-router-dom";
import classes from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <PageWrapper>
      <p>
       Esqueleto vacio, se ampliara progresivamennte
      </p>
      <h2>Poner aqui pantallas:</h2>
      <ul>
        <li>
          <Link to="/learn/estructurasDeDatos">
            estructurasDeDatos - Pantalla de seccion
          </Link>
        </li>
      </ul>
    </PageWrapper>
  );
};

export default Dashboard;
