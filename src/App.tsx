import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import i18next from "i18next";

class App extends Component {
  state = {
    text: "",
  };
  // default lng
  lang = "en";

  componentDidMount = async () => {
    await i18next.changeLanguage(this.lang);
    // the way how to set the default language
    axios.defaults.headers["Accept-Language"] = this.lang;

    const response = await axios.get("http://localhost:8000/text");
    this.setState({
      text: response.data.text,
    });
  };

  change = async (lang: string) => {
    this.lang = lang;
    await this.componentDidMount();
  };

  click = async () => {
    const response = await axios.post("http://localhost:8000/like");
    const text = i18next.t(response.data.message);

    alert(text);
  };

  render() {
    return (
      <main className="container">
        <div className="row py-3">
          <div className="col-10">
            <div className="col-2">
              <select
                className="form-control"
                onChange={(e) => this.change(e.target.value)}
              >
                <option value="en">English</option>
                <option value="he">Hebrew</option>
                <option value="ru">Русский</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <h2>{i18next.t("title")}</h2>
              <p>{i18next.t("paragraph")}</p>
            </div>

            <p>{this.state.text}</p>

            <button className="btn btn-outline-primary" onClick={this.click}>
              {i18next.t("Like")}
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
