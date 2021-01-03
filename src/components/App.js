import React, { Component } from "react";
import "../css/App.css";

import AddAppointments from "./AddApponitment";
import SearchAppointments from "./SearchAppintment";
import ListAppointments from "./ListAppointment";

import { without } from "lodash";

class App extends Component {
  constructor() {
    super();
    this.state = {
      myAppointments: [],
      formDisplay: true,
      lastIndex: 0,
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
    // this.toggleForm = this.toggleForm.bind(this);
    this.AddAppointment = this.AddAppointment.bind(this);
  }
  AddAppointment(apt) {
    let tempApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1,
    });
  }

  deleteAppointment(apt) {
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);

    this.setState({
      myAppointments: tempApts,
    });
  }

  componentDidMount() {
    fetch("./data.json")
      .then((response) => response.json())
      .then((result) => {
        const apts = result.map((item) => {
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        });
        this.setState({
          myAppointments: apts,
        });
      });
  }

  render() {
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                  AddAppointment={this.AddAppointment}
                />
                <SearchAppointments />
                <ListAppointments
                  appointments={this.state.myAppointments}
                  deleteAppointment={this.deleteAppointment}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
