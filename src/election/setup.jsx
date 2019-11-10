import React, { Component } from "react";
import { Link } from "react-router-dom";

const items = [
  {
    icon: "/images/undraw_experts3_3njd.svg",
    bg: "rgb(255, 193, 7)",
    title: "Listas",
    description: "Listado de todas las listas concursantes con sus integrantes y sus propuestas",
    path: "/elections/listas"
  },
  {
    icon: "/images/staditics.svg",
    bg: "rgb(139, 235, 27)",
    title: "Contador",
    description: "Votos de listas concursantes",
    path: "/elections/counter"
  },
  {
    icon: "/images/voting.svg",
    bg: "rgb(159, 174, 255)",
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
    <div key={key} className="col-sm">
      <Link to={item.path} style={{ backgroundColor: item.bg }} className="card text-white">
        <img src={item.icon} class="p-3 card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{item.title}</h5>
          <p class="card-text">{item.description}</p>
        </div>
      </Link>
    </div>
  );
};
export default Setup;
