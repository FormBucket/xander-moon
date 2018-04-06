/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import React from "react";

let routes = [
  {
    path: "/",
    load: () => System.import("./components/Welcome")
  },
  {
    path: "/about",
    load: () => System.import("./components/About")
  },
  {
    path: "/contact",
    load: () => System.import("./components/Contact")
  },
  {
    path: "/compare",
    load: () => System.import("./components/Compare")
  },
  {
    path: "/formbucket-vs-formkeep",
    load: () => System.import("./components/CompareFormKeep")
  },
  {
    path: "/formbucket-vs-formspree",
    load: () => System.import("./components/CompareFormSpree")
  },
  {
    path: "/formbucket-vs-getform",
    load: () => System.import("./components/CompareGetForm")
  },
  {
    path: "/formbucket-vs-wufoo",
    load: () => System.import("./components/CompareWufoo")
  },
  {
    path: "/terms",
    load: () => System.import("./components/Terms")
  },
  {
    path: "/privacy",
    load: () => System.import("./components/Privacy")
  },
  {
    path: "/privacy-policy",
    load: () => System.import("./components/Privacy")
  },
  {
    path: "/login",
    load: () => System.import("./components/Login")
  },
  {
    path: "/signup",
    load: () => System.import("./components/Signup")
  },
  {
    path: "/account",
    load: () => System.import("./components/Account")
  },
  {
    path: "/account/invoices",
    load: () => System.import("./components/Invoices")
  },
  {
    path: "/buckets",
    load: () => System.import("./components/Buckets")
  },
  {
    path: "/buckets/:id/settings",
    load: () => System.import("./components/Bucket")
  },
  {
    path: "/buckets/:id/submissions",
    load: () => System.import("./components/Submissions")
  },
  {
    path: "/buckets/:id/submissions/:mode/:offset/:limit/:select",
    load: () => System.import("./components/Submissions")
  },
  {
    path: "/password_reset",
    load: () => System.import("./components/PasswordReset")
  },
  {
    path: "/logs",
    load: () => System.import("./components/Logs")
  },
  {
    path: "/logs/:log_id",
    load: () => System.import("./components/Logs")
  },
  {
    path: "/log/:log_id",
    load: () => System.import("./components/Log")
  },
  {
    path: "/guides",
    load: () => System.import("./components/Guide")
  },
  {
    path: "/docs/:name",
    load: () => System.import("./components/Guide")
  },
  {
    path: "/guides/:name",
    load: () => System.import("./components/Guide")
  },
  {
    path: "*",
    load: () => System.import("./components/PageNotFound")
  }
];

export default routes;
