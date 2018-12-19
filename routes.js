/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { h, Component } from "preact";
import Loader from "../components/Loader";

let routes = [
  {
    path: "/",
    component: loader(() => import("./components/Welcome"))
  },
  {
    path: "/about",
    component: loader(() => import("./components/About"))
  },
  {
    path: "/contact",
    component: loader(() => import("./components/Contact"))
  },
  {
    path: "/compare",
    component: loader(() => import("./components/Compare"))
  },
  {
    path: "/formbucket-vs-formkeep",
    component: loader(() => import("./components/CompareFormKeep"))
  },
  {
    path: "/formbucket-vs-formspree",
    component: loader(() => import("./components/CompareFormSpree"))
  },
  {
    path: "/formbucket-vs-getform",
    component: loader(() => import("./components/CompareGetForm"))
  },
  {
    path: "/formbucket-vs-wufoo",
    component: loader(() => import("./components/CompareWufoo"))
  },
  {
    path: "/terms",
    component: loader(() => import("./components/Terms"))
  },
  {
    path: "/privacy",
    component: loader(() => import("./components/Privacy"))
  },
  {
    path: "/privacy-policy",
    component: loader(() => import("./components/Privacy"))
  },
  {
    path: "/account",
    component: loader(() => import("./components/Account"))
  },
  {
    path: "/account/invoices",
    component: loader(() => import("./components/Invoices"))
  },
  {
    path: "/buckets",
    component: loader(() => import("./components/Buckets"))
  },
  {
    path: "/buckets/:id/settings",
    component: loader(() => import("./components/Bucket"))
  },
  {
    path: "/buckets/:id/submissions",
    component: loader(() => import("./components/Submissions"))
  },
  {
    path: "/buckets/:id/submissions/:mode/:offset/:limit/:select",
    component: loader(() => import("./components/Submissions"))
  },
  {
    path: "/logs",
    component: loader(() => import("./components/Logs"))
  },
  {
    path: "/notifications",
    component: loader(() => import("./components/Notifications"))
  },
  {
    path: "/logs/:log_id",
    component: loader(() => import("./components/Logs"))
  },
  {
    path: "/log/:log_id",
    component: loader(() => import("./components/Log"))
  },
  {
    path: "/guides",
    component: loader(() => import("./components/Guide"))
  },
  {
    path: "/docs/:name",
    component: loader(() => import("./components/Guide"))
  },
  {
    path: "/guides/:name",
    component: loader(() => import("./components/Guide"))
  },
  {
    path: "*",
    component: loader(() => import("./components/PageNotFound"))
  }
];

export default routes;
