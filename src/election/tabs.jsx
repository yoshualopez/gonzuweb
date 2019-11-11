import React, { Component } from "react";
import lang from "../lang";
import templates from "../templates";

class TabPersonalData extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.nextTab = this.nextTab.bind(this);
    this.fullname = React.createRef();
    this.age = React.createRef();
    this.course = React.createRef();
    this.cardIdenty = React.createRef();
  }
  //this.props.next
  nextTab = () => {
    const data = {
      fullname: this.fullname.value,
      age: this.age.value,
      course: this.course.value,
      cardIdenty: this.cardIdenty.value,
      listSelect: null
    };
    this.props.next(data);
  };
  render() {
    const defaultLanguaje = "es";
    const { personalData } = this.props;
    const data = personalData();
    return (
      <div className="container">
        <div className="row align-items-center">
          <div className="col text-center">
            <h3>{lang[defaultLanguaje].fieldElections} Gonzu 2019 - 2020</h3>
            <img className="img-fluid" src="/gonzu.jpg" alt="" />
          </div>
          <div className="col">
            <div>
              <h6>{lang[defaultLanguaje].fieldFullnameIndicator}</h6>
              <input
                defaultValue={data ? data.fullname : ""}
                className="form-control my-3"
                ref={e => (this.fullname = e)}
                type="text"
                placeholder={lang[defaultLanguaje].exampleFullNameIndicator}
              />
            </div>
            <div>
              <h6>{lang[defaultLanguaje].fieldCardIDindicator}</h6>
              <input
                defaultValue={data ? data.cardIdenty : ""}
                className="form-control my-3"
                ref={e => (this.cardIdenty = e)}
                type="text"
                placeholder={lang[defaultLanguaje].exampleCardIDIndicator}
              />
            </div>
            <div>
              <h6>AGE :</h6>
              <input defaultValue={data ? data.age : ""} className="form-control my-3" ref={e => (this.age = e)} type="text" placeholder="18" />
            </div>
            <div>
              <h6>Course :</h6>
              <input defaultValue={data ? data.course : ""} className="form-control my-3" ref={e => (this.course = e)} type="text" placeholder="3ro BGU" />
            </div>
          </div>
        </div>
        <div className=" mt-5 d-flex justify-content-center">
          <button className="btn btn-outline-primary" onClick={this.nextTab}>
            {lang[defaultLanguaje].buttonNextIndicator}
          </button>
        </div>
      </div>
    );
  }
}

const list = [
  {
    // coverName: "Lista A",
    // nickNameCover: "L.V.E",
    // logo: "/",

    coverName: "Lista A",
    nickNameList: "L.V.E",
    nickNameListMeaning: "La Voz Estudiantil",
    nickLogoUrl: "/IFUG2.jpg",
    integrants: [
      {
        fullname: "Diego Flores",
        position: "president",
        age: 17
      },
      {
        fullname: "Benjamin Jarrin",
        position: "vpresident",
        age: 17
      },
      {
        fullname: "ETC ETC",
        position: "secretary",
        age: 17
      },
      {
        fullname: "Carpin Augiro",
        position: "treasurer",
        age: 17
      }
    ]
  },
  {
    // coverName: "Lista B",
    // logo: "/IFUG2.jpg",
    // nickNameCover: "IFUG",

    coverName: "Lista B",
    nickNameList: "IFUG",
    nickNameListMeaning: "Igualdad Fuerza Unión Gonzu",
    nickLogoUrl: "/IFUG2.jpg",
    integrants: [
      {
        fullname: "Melanie Valenzuela",
        position: "president",
        age: 17
      },
      {
        fullname: "Omar Ronquillo",
        position: "vpresident",
        age: 17
      },
      {
        fullname: "Sofía Quinapaxi",
        position: "secretary",
        age: 17
      },
      {
        fullname: "Nicole Pérez",
        position: "treasurer",
        age: 17
      }
    ]
  }
];

class TabVote extends Component {
  constructor(props) {
    super(props);
    this.state = { cardSelected: null };

    this.vote = this.vote.bind(this);
    this.cardSelect = this.cardSelect.bind(this);
  }
  componentDidMount = () => this.setState();
  cardSelect = card => this.setState({ cardSelected: card });
  vote = () => {
    if (this.state.cardSelected === null) return;
    const userCover = this.props.personalData();
    userCover.listSelect = list[this.state.cardSelected];
    this.props.next(userCover);
  };
  render() {
    const { personalData } = this.props;
    const defaultLanguaje = "es";
    const areDontListSelected = this.state.cardSelected === null;
    const data = personalData();
    if (!data) {
      return (
        <div className="d-flex justify-content-center my-3 container">
          <templates.spinner />;
        </div>
      );
    }
    return (
      <div style={{ marginTop: "-30px" }} className="text-center">
        <h3>Seleccionar una lista</h3>
        <div className="card-group row">
          {list.map((lista, key) => {
            const cardActive = this.state.cardSelected === key ? "selected" : "";
            const className = "selectable " + cardActive;
            return (
              <div key={key} className="col">
                <div style={{ border: "none" }} onClick={() => this.cardSelect(key)} className="card">
                  <div className={className}>
                    <div className="content">
                      <div className="row">
                        <div className="col">
                          <h1 className="title">{lista.coverName}</h1>
                          <h4 className="title">{lista.nickNameList}</h4>
                          <h3 className="title">{lista.nickNameListMeaning}</h3>
                        </div>
                        <div className="col">
                          <img className="img-fluid " src={lista.nickLogoUrl} alt="Welcome" />
                        </div>
                      </div>
                      <div className="col px-0 pt-3">
                        {lista.integrants.map((integrant, key) => {
                          return (
                            <div key={key} className="d-flex align-items-center justify-content-between">
                              <h5 className="description">{integrant.fullname}</h5>
                              <span className="badge badge-primary">{chargeFilter(integrant.position)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="check">
                      <span className="checkmark">
                        <ion-icon name="checkmark"></ion-icon>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-primary" onClick={() => this.props.back(data)}>
            {lang[defaultLanguaje].buttonBackIndicator}
          </button>
          {areDontListSelected ? (
            <button className="btn btn-outline-success" onClick={null}>
              {lang[defaultLanguaje].buttonNextIndicator}
            </button>
          ) : (
            <button className="btn btn-success" onClick={this.vote}>
              {lang[defaultLanguaje].buttonNextIndicator}
            </button>
          )}
        </div>
      </div>
    );
  }
}
const chargeFilter = charge => {
  charge = charge ? charge.toLowerCase() : "unxpected";
  switch (charge) {
    case "president":
      return "Presidente/a";
    case "vpresident":
      return "Vicepresidente/a";
    case "treasurer":
      return "Tesorero/a";
    case "secretary":
      return "Secretario/a";
    default:
      return "Unxpected";
  }
};

class TabConfirmVote extends Component {
  state = { loading: false };
  render() {
    const { personalData } = this.props;
    const data = personalData();
    const defaultLanguaje = "es";
    return (
      <div className="text-center">
        <div className="container mb-3">
          <div className="row my-3">
            <div className="col">
              <h4>{lang[defaultLanguaje].fieldFullnameIndicator}</h4>
            </div>
            <div className="col">
              <p>{data ? data.fullname : ""}</p>
            </div>
          </div>
          <div className="row my-3">
            <div className="col">
              <h4>{lang[defaultLanguaje].fieldCardIDindicator}</h4>
            </div>
            <div className="col">
              <p>{data ? data.cardIdenty : ""}</p>
            </div>
          </div>
          <div className="row my-3">
            <div className="col">
              <h4>Age</h4>
            </div>
            <div className="col">
              <p>{data ? data.age : ""}</p>
            </div>
          </div>
          <div className="row my-3 ">
            <div className="col">
              <h4>Course</h4>
            </div>
            <div className="col">
              <p>{data ? data.course : ""}</p>
            </div>
          </div>
          <div className="my-3 d-flex justify-content-center">{data && <h3 className="text-white p-3 bg-success rounded shadow">{data.listSelect.coverName}</h3>}</div>
        </div>
        <div className="d-flex justify-content-between">
          <button onClick={this.state.loading ? null : this.props.back} className="btn btn-outline-primary">
            {lang[defaultLanguaje].buttonBackIndicator}
          </button>
          {this.state.loading ? (
            <button className="btn btn-success" onClick={null}>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </button>
          ) : (
            <button className="btn btn-success" onClick={data ? () => this.props.confirm(data, loading => this.setState({ loading })) : null}>
              {lang[defaultLanguaje].buttonConfirmIndicator}
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default {
  TabPersonalData,
  TabVote,
  TabConfirmVote
};

// [
//   {
//     electionsYear: "NUMBER: YEAR",
//     status : "STRING: "["closed","listening","open"],
//     listWinner : "STRING: LIST NAME",
//     lists : [
//       {
//         coverName : "STRING: NAME LIST EX: Lista A, Lista B...",
//         nickNameList : "STRING: NICKNAME OR SIGLAS EX: WEB",
//         nickNameListMeaning : "STRING: PHRASE LIST OR MEANING EX: World Wide Web",
//         nickLogoUrl : "STRING: IMAGE NETWORK",
//         integranst : [
//           {
//             fullName : "STRING: NAME AND LASTNAME",
//             course : "NUMBER: NUMBER COURSE STUDY",
//             position : "STRING:"["president","vpresident","secretary","treasurer"],
//             age : "NUMBER:"
//           }
//         ]

//       }
//     ]
//   }
// ];
