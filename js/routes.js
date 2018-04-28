/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import React from "react";
import { loader } from "hrx";

let routes = [
  {
    path: "/",
    component: loader(() => System.import("./components/Welcome"))
  },
  {
    path: "/about",
    component: loader(() => System.import("./components/About"))
  },
  {
    path: "/contact",
    component: loader(() => System.import("./components/Contact"))
  },
  {
    path: "/compare",
    component: loader(() => System.import("./components/Compare"))
  },
  {
    path: "/formbucket-vs-formkeep",
    component: loader(() => System.import("./components/CompareFormKeep"))
  },
  {
    path: "/formbucket-vs-formspree",
    component: loader(() => System.import("./components/CompareFormSpree"))
  },
  {
    path: "/formbucket-vs-getform",
    component: loader(() => System.import("./components/CompareGetForm"))
  },
  {
    path: "/formbucket-vs-wufoo",
    component: loader(() => System.import("./components/CompareWufoo"))
  },
  {
    path: "/terms",
    component: loader(() => System.import("./components/Terms"))
  },
  {
    path: "/privacy",
    component: loader(() => System.import("./components/Privacy"))
  },
  {
    path: "/privacy-policy",
    component: loader(() => System.import("./components/Privacy"))
  },
  {
    path: "/login",
    component: loader(() => System.import("./components/Login"))
  },
  {
    path: "/signup",
    component: loader(() => System.import("./components/Signup"))
  },
  {
    path: "/account",
    component: loader(() => System.import("./components/Account"))
  },
  {
    path: "/account/invoices",
    component: loader(() => System.import("./components/Invoices"))
  },
  {
    path: "/buckets",
    component: loader(() => System.import("./components/Buckets"))
  },
  {
    path: "/buckets/:id/settings",
    component: loader(() => System.import("./components/Bucket"))
  },
  {
    path: "/buckets/:id/submissions",
    component: loader(() => System.import("./components/Submissions"))
  },
  {
    path: "/buckets/:id/submissions/:mode/:offset/:limit/:select",
    component: loader(() => System.import("./components/Submissions"))
  },
  {
    path: "/password_reset",
    component: loader(() => System.import("./components/PasswordReset"))
  },
  {
    path: "/logs",
    component: loader(() => System.import("./components/Logs"))
  },
  {
    path: "/logs/:log_id",
    component: loader(() => System.import("./components/Logs"))
  },
  {
    path: "/log/:log_id",
    component: loader(() => System.import("./components/Log"))
  },
  {
    path: "/guides",
    component: loader(() => System.import("./components/Guide"))
  },
  {
    path: "/docs/:name",
    component: loader(() => System.import("./components/Guide"))
  },
  {
    path: "/guides/:name",
    component: loader(() => System.import("./components/Guide"))
  },
  {
    path: "*",
    component: loader(() => System.import("./components/PageNotFound"))
  }
];

export default routes;
