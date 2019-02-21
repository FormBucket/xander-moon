/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import eq from "formula/src/eq";
import text from "formula/src/text";
import format from "date-fns/format";
import { requestInvoices } from "../webutils";

let formatDate = unix => format(new Date(unix * 1000), "MMMM DD, YYYY hh:mm a");

class Invoices extends Component {
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
    return <div>Invoices</div>;
    return (
      <div>
        <div class="page-heading">
          <div class="wrapper">
            <h1>Invoices</h1>
          </div>
        </div>
        <div class="wrapper">
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
                    <a href={d.invoice_pdf}>{d.id}</a>
                  </td>
                  <td>{text(d.total / 100, "$#,##0.00")}</td>
                  <td>{d.paid ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Invoices;
