import React, { Component } from "react";
import component from '../components';
class ModalEditUser extends Component {
  constructor(props) {
    super(props);

    this.saveData = this.saveData.bind(this);

    this.fielFullname = React.createRef();
    this.fielEmail = React.createRef();
    this.fielTypeAccount = React.createRef();
  }
  async saveData() {
    const fullname = this.fielFullname.value;
    const email = this.fielEmail.value;
    const typeAccount = this.fielTypeAccount.value;
    // pending solve how to change this data to server
    const endpoint = "user/"+this.props.data._id+"/UPDATE";
    const body = {
      accountType: typeAccount || this.props.data.accountType,
      email: email || this.props.data.email,
      fullname: fullname || this.props.data.fullname,
      //gender: "M",
      //permissions: [""],
      //teacherAssignature: "",
      //teacherTutor: ""
    };
    const header = {"x-access-token" : this.props.user.token };
    await component.net.post(endpoint,body,header);
    this.props.update();
    this.props.closeModal();
  }
  render() {
    const { data, closeModal } = this.props;
    if (!data) {
      return <div></div>;
    }
    return (
      <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,.5)" }} tabIndex="-1" aria-modal="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title h6">Editar usuario</h5>
              <button onClick={closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row py-2">
                <div className="col-6">
                  <p>Nombre Completo</p>
                </div>
                <div className="col-6">
                  <input
                    ref={e => (this.fielFullname = e)}
                    spellCheck="false"
                    className="form-control rounded border-0"
                    type="text"
                    placeholder="Nombre Completo"
                    defaultValue={data.fullname}
                  />
                </div>
              </div>
              <div className="row py-2">
                <div className="col-6">
                  <p>Correo</p>
                </div>
                <div className="col-6">
                  <input ref={e => (this.fielEmail = e)} spellCheck="false" className="form-control rounded border-0" type="text" placeholder="Correo" defaultValue={data.email} />
                </div>
              </div>
              <div className="row py-2">
                <div className="col-6">
                  <p>Tipo de cuenta</p>
                </div>
                <div className="col-6">
                  <select ref={e => (this.fielTypeAccount = e)} className="custom-select" id="inputGroupSelect01">
                    <option selected value={data.accountType}>
                      {data.accountType}
                    </option>
                    <option value="super_admin">super_admin</option>
                    <option value="parent">parent</option>
                    <option value="administrator">administrator</option>
                    <option value="teacher">teacher</option>
                    <option value="basic">basic</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={closeModal} type="button" className="btn btn-secondary">
                Cerrar
              </button>
              <button onClick={this.saveData} type="button" className="btn btn-primary">
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export { ModalEditUser };
