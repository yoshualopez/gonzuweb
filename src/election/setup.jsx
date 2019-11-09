import React, { Component } from "react";
import { Link } from "react-router-dom";

const items = [
  {
    icon: "",
    bg: "red",
    title: "Listas",
    description: "Listado de todas las listas concursantes con sus integrantes y sus propuestas",
    path: "/elections/listas"
  },
  {
    icon: "",
    bg: "yellow",
    title: "Contador",
    description: "Votos de listas concursantes",
    path: "/elections/counter"
  },
  {
    icon: "",
    bg: "green",
    title: "Votar",
    description: "Seccion para votar",
    path: "/elections/vote"
  }
];

class Setup extends Component {
  render() {
    return (
      <div className="container my-5">
        <div className="row">{items.map(cardBuilder)}</div>
      </div>
    );
  }
}

const cardBuilder = (item, key) => {
  return (
    <div key={key} className="col">
      <Link to={item.path} style={{ backgroundColor: item.bg }} className="card">
        <div className="container">
          <p className="text-white">{item.title}</p>
        </div>
      </Link>
    </div>
  );
};
export default Setup;
