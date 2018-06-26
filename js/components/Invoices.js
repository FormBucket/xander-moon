/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import React, { PropTypes } from "react";
import FontAwesome from "react-fontawesome";
import { EQ as eq, TEXT as text, DATEVALUE as dateValue } from "formula";
import UserStore from "../stores/user";
import moment from "moment";
import { requestInvoices } from "../stores/webutils";
import Layout from "./Layout";
import { Link } from "xander";

let formatDate = unix =>
  moment(new Date(unix * 1000)).format("MMMM DD, YYYY hh:mm a");

class Invoices extends React.Component {
  state = {
    submissions: undefined,
    loaded: false,
    loading: false
  };

  componentDidMount() {
    if (UserStore.isUserLoggedIn()) {
      this.setState({ loading: true });

      requestInvoices()
        .then(invoices =>
          this.setState({
            loading: false,
            loaded: true,
            invoices
          })
        )
        .catch(error => this.setState({ error: error }));
    }
  }

  render() {
    if (eq(this.state.loaded, false)) {
      return (
        <div className="wrapper">
          <div className="flash">
            <img className="loading" src="/img/loading.gif" alt="Loading..." />
          </div>
        </div>
      );
    }

    return (
      <Layout>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Invoices</h1>
          </div>
        </div>
        <div className="wrapper">
          <table>
            <tbody>
              <tr>
                <th>Date</th>
                <th>Total</th>
                <th>Paid?</th>
              </tr>
              {this.state.invoices.map(d => (
                <tr key={d.id}>
                  <td>
                    {formatDate(d.date)}
                    <br />
                    <span style={{ fontSize: "0.7em" }}>{d.id}</span>
                  </td>
                  <td>{text(d.total / 100, "$#,##0.00")}</td>
                  <td>{d.paid ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    );
  }
}

export default Invoices;
