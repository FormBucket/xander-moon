/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import FontAwesome from "react-fontawesome";
import {
  requestCreditCards,
  requestDestroyAccount,
  requestStripePubKey,
  requestUpdateUser,
  requestDeleteCreditCard
} from "../webutils";

import IF from "formula/src/branch";
import {} from "react-stripe-elements";
import {
  StripeProvider,
  Elements,
  CardElement,
  injectStripe
} from "react-stripe-elements";

import "./styles/account.scss";
import { route } from "preact-router";

const plan_monthly = "plan_monthly_7_14";
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "18px",
      color: "#424770",
      letterSpacing: "0.025em",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#9e2146"
    }
  }
};

class _CardForm extends Component {
  handleSubmit = ev => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.onSubmit();

      this.props.stripe
        .createToken({ name: this.refs.cardName.value })
        .then(payload => {
          let { token } = payload;
          subscribe(this.props.account_id, token.id, plan_monthly)
            .then(this.props.onSubscribe)
            .catch(this.props.onSubscribeError);
        });
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="card-element">
          <div class="card-element-row">
            <label htmlFor="cardName">Name</label>
            <input
              type="text"
              name="cardName"
              placeholder="Enter name on card here"
            />
          </div>
          <div class="card-element-row">
            {this.props.stripe ? (
              <CardElement {...CARD_ELEMENT_OPTIONS} />
            ) : (
              <div class="StripeElement loading" />
            )}
          </div>
        </div>
        <button class="button secondary" disabled={!this.props.stripe}>
          Register Card
        </button>
      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);

class Account extends Component {
  state = {
    show_token: false,
    flash: undefined,
    cards: [],
    submittingCard: false,
    changeCard: false,
    cardsLoaded: false,
    number: "",
    exp: "",
    cvc: ""
  };

  componentDidMount() {
    Promise.all([requestStripePubKey()])
      .then(values => {
        let stripe_pk = values[0].key;
        this.setState({ stripe_pk, stripe: window.Stripe(stripe_pk) });
        return requestCreditCards(this.props.user.account_id);
      })
      .then(cards => {
        this.setState({ cardsLoaded: true, cards });
      })
      .catch(error => {
        this.setState({ flash: error.message, error });
      });
  }

  handleDeleteSubscription = () => {
    if (
      confirm(
        "Cancelling your subscription will stop submissions immediately. Your account and data will remain on our service. Continue?"
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
    if (
      confirm(
        "Your account and datasubmittingCard will be gone forever. Continue?"
      )
    ) {
      requestDestroyAccount()
        .then(n => {
          localStorage.removeItem("token");
          window.location.href = "/";
        })
        .catch(e =>
          alert("An error occurred. Please contact support@formbucket.com")
        );
    }
  };

  handleDeleteCard = () => {
    if (confirm("Remove your credit card on file?")) {
      requestDeleteCreditCard(this.state.cards[0].id)
        .then(result => {
          this.setState({
            cardsLoaded: true,
            cards: []
          });
          requestCreditCards(this.props.user.account_id).then(cards =>
            this.setState({ cardsLoaded: true, cards })
          );
        })
        .catch(e => {
          console.log("error", e);
          alert("An error occurred. Please contact support@formbucket.com");
        });
    }
  };

  handleSave = () => {
    let { account_id } = this.props.user;

    this.setState({ saving: true });

    requestUpdateUser({
      id: this.props.user.id,
      name: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    })
      .then(user => {
        this.setState({
          saving: false,
          flash: "Saved"
        });

        setTimeout(() => this.setState({ flash: undefined }), 2000);

        return loadProfile();
      })
      .catch(error =>
        this.setState({
          saving: false,
          flash: error,
          error: errorchangeCard
        })
      );
  };

  render() {
    let { user } = this.props;

    var { status, valid_until, trial_end, plan_amount } = user;
    var { cards, cardsLoaded, changeCard, submittingCard } = this.state;
    let card = cards[0];

    let today = new Date();
    let today_month = today.getMonth() + 1;
    let today_year = today.getFullYear();
    let isCardExpired = card
      ? card.exp_year < today_year ||
        (card.exp_year === today_year && card.exp_month < today_month)
      : false;
    let hasCardOnFile = cards && cards.length > 0;
    let isCardActive = card && !isCardExpired;

    valid_until = new Date(valid_until);
    trial_end = new Date(trial_end);

    var PaymentNotice = IF(
      status === "trialing",
      <div class="inline-info">
        {IF(
          hasCardOnFile,
          <span>
            Your card will be charged on{" "}
            {trial_end.getMonth() +
              1 +
              "/" +
              trial_end.getDate() +
              "/" +
              trial_end.getFullYear()}
            .
          </span>,
          <span>
            Your free trial ends on{" "}
            {trial_end.getMonth() +
              1 +
              "/" +
              trial_end.getDate() +
              "/" +
              trial_end.getFullYear()}
            .
          </span>
        )}
      </div>,
      status === "active" && isCardExpired,
      <div class="inline-error">
        <span>
          Card expired, please update before{" "}
          {valid_until.getMonth() +
            1 +
            "/" +
            valid_until.getDate() +
            "/" +
            valid_until.getFullYear()}{" "}
          for ${plan_amount / 100}.
        </span>
      </div>,
      status === "active",
      <div class="inline-info">
        <span>
          Your next payment is due on{" "}
          {valid_until.getMonth() +
            1 +
            "/" +
            valid_until.getDate() +
            "/" +
            valid_until.getFullYear()}{" "}
          .
        </span>
      </div>,
      status === "past_due",
      <div class="inline-error">
        <span>Add a payment card to avoid service interuption.</span>
      </div>,
      status === "canceled",
      <div class="inline-error">
        <span>Add a payment card to reactivate your account.</span>
      </div>
    );

    var PaymentForm = (
      <div class="payment-info">
        <div class="payment-meta">
          <div class="security-info">
            <p>
              <FontAwesome name="lock" /> All transactions are secure and
              encrypted.
            </p>
          </div>
          <img class="stripe-badge" src={require("../img/stripe.svg")} />
        </div>
        <div class="card-details">
          {IF(
            submittingCard === true,
            <p>Registering your card...</p>,
            changeCard === false && hasCardOnFile,
            () => (
              <div class="card-details-info">
                <div class="card-details-info-details">
                  <p>{card.name}</p>
                  <p>
                    <i
                      class={IF(
                        ["mastercard", "visa"].includes(
                          card.brand.toLowerCase()
                        ),
                        "pf pf-" + card.brand.toLowerCase(),
                        "pf pf-credit-card"
                      )}
                      id="brand-icon"
                    />{" "}
                    #### #### #### {card.last4}{" "}
                  </p>
                  <p>
                    <strong>Expires:</strong> {card.exp_month < 10 ? "0" : ""}
                    {card.exp_month} / {card.exp_year}
                  </p>
                </div>
                <div class="card-details-info-actions">
                  <div class="half-width">
                    <button
                      class=" button secondary"
                      onClick={() => this.setState({ changeCard: true })}
                    >
                      Update Card
                    </button>
                  </div>
                  <div class="half-width">
                    <button
                      class="half-width button secondary"
                      onClick={this.handleDeleteCard}
                    >
                      Remove Card
                    </button>
                  </div>
                </div>
              </div>
            ),
            !this.state.stripe || cardsLoaded === false,
            <div>Loading...</div>
          )}
          {IF(this.state.stripe, () => (
            <div
              style={{
                display: IF(
                  submittingCard === true,
                  "none",
                  changeCard === true,
                  "",
                  cardsLoaded === true && hasCardOnFile === false,
                  "",
                  "none"
                )
              }}
            >
              <StripeProvider stripe={this.state.stripe}>
                <Elements>
                  <CardForm
                    account_id={this.props.user.account_id}
                    onSubmit={() => this.setState({ submittingCard: true })}
                    onSubscribe={() => {
                      this.setState({
                        changeCard: false,
                        cardsLoaded: false,
                        submittingCard: false
                      });

                      requestCreditCards(user.account_id).then(cards =>
                        this.setState({ cardsLoaded: true, cards })
                      );
                    }}
                  />
                </Elements>
              </StripeProvider>
              {IF(
                status === "trialing",
                <p class="card-register-message">
                  Your card will be charged on{" "}
                  {trial_end.getMonth() +
                    1 +
                    "/" +
                    trial_end.getDate() +
                    "/" +
                    trial_end.getFullYear()}{" "}
                  and every following month. .
                </p>,
                status === "active",
                <p class="card-register-message">
                  Replaces your existing card on file.
                </p>,
                status === "past_due" || status === "canceled",
                <p class="card-register-message">
                  Your card will be charged now.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div class="account-wrapper">
        <div class="page-heading">
          <div class="wrapper">
            <h1>Account</h1>
          </div>
        </div>
        <div class="wrapper">
          <div class="account-details">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="displayName"
              defaultValue={this.props.user.name}
              placeholder="e.g. Nikola Tesla"
            />
            {/*<label htmlFor="orgName">Company / Org</label>
              <in$put type="text" ref="org" defaultValue={this.props.user.org} />*/}
            <label htmlFor="emailAddress">Email Address</label>
            <input
              type="text"
              name="username"
              defaultValue={this.props.user.email}
              placeholder="nikola@altcurrent.com"
            />
            <label htmlFor="password">
              <FontAwesome name="lock" /> Change Password (Optional)
            </label>
            <input type="password" defaultValue="" />

            <button
              disabled={this.state.saving}
              class="button secondary"
              onClick={this.handleSave}
            >
              Save Changes
            </button>
            <h3>Subscription: {status.replace("_", " ")}</h3>
            {PaymentNotice}
            {PaymentForm}
          </div>
          <div class="account-sidebar">
            <p>
              <a
                onClick={() => localStorage.removeItem("token")}
                href={"/logout?redirect_uri=https://" + window.location.host}
                native
              >
                Log Out
              </a>
            </p>
            {/* <p>
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
            </p> */}
            <p>
              <a href="/logs?offset=0&limit=10">View Logs</a>
            </p>
            <p>
              <a href="/account/invoices">View Invoices</a>
            </p>
            {IF(
              status === "trialing" ||
                status === "active" ||
                status === "past_due",
              <p>
                <a class="danger" onClick={this.handleDeleteSubscription}>
                  Cancel Subscription{" "}
                  <FontAwesome class="danger" name="frown-o" />
                </a>
              </p>,
              status === "canceled",
              null
            )}
            <p>
              <a class="danger" onClick={this.handleDeleteAccount}>
                Destroy Account
              </a>{" "}
              <FontAwesome class="danger" name="frown-o" />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
