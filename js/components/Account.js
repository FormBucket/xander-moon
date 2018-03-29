import React, { PropTypes } from "react";
import FontAwesome from "react-fontawesome";
import { dispatch, router, Link } from "xander";
import FlashMessage from "./FlashMessage";
import {
  requestCreditCards,
  requestDestroyAccount,
  requestStripePubKey,
  requestUpdateUser,
  requestUnsubscribe
} from "../stores/webutils";
import {
  cancelSubscription,
  loadProfile,
  subscribe
} from "../stores/ActionCreator";
import { IF } from "formula";
import Layout from "./Layout";

const plan = "plan_mo_7_14";

function subscribeUser({ account_id, number, cvc, exp }) {
  return new Promise((resolve, reject) => {
    if (!Stripe.card.validateCardNumber(number)) {
      reject("Invalid card number.");
      return;
    }

    if (!Stripe.card.validateCVC(cvc)) {
      reject("Invalid cvc number.");
      return;
    }

    if (!Stripe.card.validateExpiry(exp)) {
      reject("Invalid exp date. Must be MM/YY or MM/YYYY");
      return;
    }

    Stripe.card.createToken(
      {
        number: number,
        cvc: cvc,
        exp: exp
      },
      (status, response) => {
        if (status !== 200) {
          reject(response.error.message);
          return;
        }

        // got back response from Stripe
        // console.log('got token', response.id)

        // Subscribe user to Plan
        subscribe(account_id, response.id, plan)
          .then(result => {
            resolve(result);
          })
          .catch(error => {
            reject(error.message);
          });
      }
    );
  });
}

class Account extends React.Component {
  state = {
    show_token: false,
    flash: undefined,
    cards: [],
    number: "",
    exp: "",
    cvc: ""
  };

  componentWillMount() {
    if (localStorage.hasOwnProperty("token") === false) {
      router.open("/login");
      return;
    }
  }

  componentDidMount() {
    Promise.all([requestStripePubKey(), loadProfile()])
      .then(values => {
        // console.log(values)
        Stripe.setPublishableKey(values[0].key);
        dispatch("loadProfile", values[1]);
        return Promise.resolve(values[1]);
      })
      .then(user => requestCreditCards(user.account_id))
      .then(cards => {
        this.setState({ cards });
        if (cards.length > 0 && this.props.user.status !== "canceled") {
          var card = cards[0];
          this.setState({
            number: "#### #### #### " + card.last4,
            exp: card.exp_month + "/" + card.exp_year
          });
        }
      })
      .catch(error => {
        this.setState({ flash: error.message, error });
      });
  }

  handleDeleteSubscription = () => {
    if (
      confirm(
        "Pausing your account will stop submissions immediately. Your account and data will remain on our service. Continue?"
      )
    ) {
      cancelSubscription(this.props.user.account_id)
        .then(n => {
          alert("Your subscription has been canceled.");
          this.setState({
            number: "",
            exp: "",
            cvc: "",
            user: Object.assign({}, this.props.user, { status: "canceled" })
          });
        })
        .catch(e =>
          alert("An error occurred. Please contact support@formbucket.com")
        );
    }
  };

  handleDeleteAccount = () => {
    if (confirm("Your account and data will be gone forever. Continue?")) {
      requestDestroyAccount()
        .then(n => {
          localStorage.removeItem("token");
          router.open("/");
        })
        .catch(e =>
          alert("An error occurred. Please contact support@formbucket.com")
        );
    }
  };

  handleSave = () => {
    // TBD: Subscribe the user.
    // 1. Exchange credit card info for source id.
    // 2. Subscribe user with plan and source id.

    this.setState({ saving: true });

    var { number, exp, cvc } = this.state,
      { account_id } = this.props.user;

    var next =
      number && number.length > 0 && number.trim()[0] !== "#"
        ? subscribeUser({ account_id, number, exp, cvc })
        : Promise.resolve();

    //subscribeUser()
    next
      .then(() =>
        requestUpdateUser({
          id: this.props.user.id,
          name: this.refs.name.value,
          email: this.refs.email.value,
          password: this.refs.password.value
        })
      )
      .then(user => {
        // console.log('user', user)
        this.setState({
          saving: false,
          number:
            number && number.length > 0
              ? "#### #### #### " + this.state.number.substr(-4)
              : "",
          cvc: "",
          flash: "Saved"
        });

        setTimeout(() => this.setState({ flash: undefined }), 2000);
      })
      .then(loadProfile)
      .catch(error =>
        this.setState({
          saving: false,
          flash: error,
          error: error
        })
      );
  };

  handleNumberChange = event => {
    var number = event.target.value;
    this.setState({ number });
  };

  handleExpChange = event => {
    var exp = event.target.value;
    this.setState({ exp });
  };

  handleCVCChange = event => {
    var cvc = event.target.value;
    this.setState({ cvc });
  };

  render() {
    if (!this.props.user || !this.props.user.email) {
      return (
        <Layout className="wrapper">
          <div className="flash">
            <img className="loading" src="/img/loading.gif" alt="Loading..." />
          </div>
        </Layout>
      );
    }

    var { status, valid_until, trial_end, plan_amount } = this.props.user;
    var { cards } = this.state;

    valid_until = new Date(valid_until);
    trial_end = new Date(trial_end);
    // status = 'active'

    // console.log('render', this.state, cards)

    var CreditCardForm = (
      <div className="payment-info">
        <div className="payment-meta">
          <div className="security-info">
            <p>
              <FontAwesome name="lock" /> All transactions are secure and
              encrypted.
            </p>
          </div>
          <img className="stripe-badge" src="/img/stripe.svg" />
        </div>
        <div className="card-details">
          <div className="cardNumber">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              value={this.state.number}
              onChange={this.handleNumberChange}
              onFocus={e =>
                this.state.number.substr(-4) ===
                (this.state.cards[0] || {}).last4
                  ? this.setState({ number: "", exp: "" })
                  : null
              }
              onBlur={e =>
                this.setState({
                  number:
                    e.target.value === "" ? this.props.number : e.target.value,
                  exp: e.target.value === "" ? "" : this.state.exp
                })
              }
              name="number"
              type="text"
              data-stripe="number"
            />
          </div>
          <div className="exp">
            <label htmlFor="exp">Exp</label>
            <input
              name="expiry"
              value={this.state.exp}
              onChange={this.handleExpChange}
              onBlur={e =>
                this.setState({
                  exp: e.target.value === "" ? "" : e.target.value
                })
              }
              type="text"
              maxLength="7"
              data-stripe="exp"
              placeholder="MM/YYYY"
            />
          </div>
          <div className="cvc">
            <label htmlFor="cvc">CVC</label>
            <input
              name="csv"
              maxLength="4"
              value={this.state.cvc}
              onChange={this.handleCVCChange}
              type="text"
              data-stripe="cvc"
            />
          </div>
        </div>
      </div>
    );

    return (
      <Layout>
        <FlashMessage text={this.state.flash} />
        <div className="page-heading">
          <div className="wrapper">
            <h1>Account</h1>
          </div>
        </div>
        <div className="wrapper">
          <div className="half-width">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              ref="name"
              name="displayName"
              defaultValue={this.props.user.name}
              placeholder="e.g. Nikola Tesla"
            />
            {/*<label htmlFor="orgName">Company / Org</label>
              <in$put type="text" ref="org" defaultValue={this.props.user.org} />*/}
            <label htmlFor="emailAddress">Email Address</label>
            <input
              type="text"
              ref="email"
              name="username"
              defaultValue={this.props.user.email}
              placeholder="nikola@altcurrent.com"
            />
            <label htmlFor="password">
              <FontAwesome name="lock" /> Change Password
            </label>
            <input type="password" ref="password" defaultValue="" />
            {IF(
              status === "trialing",
              <div className="inline-info">
                <span>
                  Your free trial ends on{" "}
                  {trial_end.getMonth() +
                    1 +
                    "/" +
                    trial_end.getDate() +
                    "/" +
                    trial_end.getFullYear()}
                </span>
              </div>,
              status === "active",
              <div className="inline-info">
                <span>
                  Your next billing date is{" "}
                  {valid_until.getMonth() +
                    1 +
                    "/" +
                    valid_until.getDate() +
                    "/" +
                    valid_until.getFullYear()}{" "}
                  for ${plan_amount / 100}
                </span>
              </div>,
              status === "past_due",
              <div className="inline-error">
                <span>Please update your billing details</span>
              </div>,
              status === "canceled",
              <div className="inline-error">
                <span>Please update your billing details</span>
              </div>
            )}
            {CreditCardForm}
            <button
              disabled={this.state.saving}
              className="button secondary"
              onClick={this.handleSave}
            >
              Save Changes
            </button>
          </div>
          <div className="account-sidebar">
            <p>
              <a
                onClick={() => {
                  localStorage.removeItem("token");
                  router.open("/");
                }}
              >
                Log Out
              </a>
            </p>
            <p>
              <a
                onClick={() =>
                  this.setState({ show_token: !this.state.show_token })
                }
              >
                {this.state.show_token ? "Hide API Key" : "Show API Key"}
              </a>
              <span style={{ display: this.state.show_token ? "" : "none" }}>
                <br />
                <span>
                  <a href="/docs/api">(How to use this)</a>
                </span>
                <textarea
                  rows={4}
                  value={this.state.show_token ? localStorage.token : ""}
                />
              </span>
            </p>
            <p>
              <a
                onClick={() => {
                  router.open("/logs?offset=0&limit=10");
                }}
              >
                View Logs
              </a>
            </p>
            <p>
              <a
                onClick={() => {
                  router.open("/account/invoices");
                }}
              >
                View Invoices
              </a>
            </p>
            {IF(
              status === "trialing" ||
                status === "active" ||
                status === "past_due",
              <p>
                <a className="danger" onClick={this.handleDeleteSubscription}>
                  Pause Account
                </a>
              </p>,
              status === "canceled",
              null
            )}

            <p>
              <a className="danger" onClick={this.handleDeleteAccount}>
                Cancel Account
              </a>{" "}
              <FontAwesome className="danger" name="frown-o" />
            </p>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Account;
