!function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return e[i].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}var r=n(10),s=i(r);s["default"].isUserLoggedIn()&&(document.getElementById("nav-logged-out").style.display="none",document.getElementById("nav-logged-in").style.display="");var o=document.getElementsByClassName("navigation-menu-button");for(var a in o)"length"!==a&&(o[a].onclick=function(e){1===e.target.nextSibling.nextSibling.classList.length?e.target.nextSibling.nextSibling.classList.add("show"):e.target.nextSibling.nextSibling.classList.remove("show")})},,,,,,,,function(e,t,n){"use strict";function i(e,t){if("string"==typeof e)u.dispatch({type:e,data:t});else{if("object"!==("undefined"==typeof e?"undefined":s(e)))throw"type must be string or object";u.dispatch(e)}}function r(e,t,n){var r=arguments.length<=3||void 0===arguments[3]?{}:arguments[3],a="function"!=typeof t?"object"===("undefined"==typeof t?"undefined":s(t))?Object.freeze(t):t:Object.freeze({}),f=new o,h={},d=void 0;if("function"==typeof t&&(r=n,n=t),"object"===("undefined"==typeof n?"undefined":s(n)))d=function(e,t){return t&&"string"==typeof t.type&&n.hasOwnProperty(t.type)?n[t.type](e,t.data,l):e},h=Object.keys(n).reduce(function(e,t){return e[t]=function(e){return u.dispatch({type:t,data:e})},e},{});else{if("function"!=typeof n)throw new Error("reducer must be object or function");d=n}var p=Object.keys(r).reduce(function(e,t,n){var i={};return i[t]=function(){for(var e,n=arguments.length,i=Array(n),s=0;s<n;s++)i[s]=arguments[s];return(e=r)[t].apply(e,[a].concat(i))},Object.assign(e,i)},{});return Object.freeze(Object.assign({},p,h,{name:e,dispatchToken:u.register(function(e){var t=d(a,e,l);a!==t&&(a="object"===("undefined"==typeof t?"undefined":s(t))?Object.freeze(t):t,f.emit("changed"))}),subscribe:function(e){if("function"!=typeof e)throw"Callback must be a function";return f.addListener("changed",e),c+=1,function(){f.removeListener("changed",e)}},replaceState:void 0,replaceReducer:void 0,dispatch:function(){return i.apply(void 0,arguments)},getState:function(e){return a}}))}Object.defineProperty(t,"__esModule",{value:!0});var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};t.createStore=r;var o=n(23).EventEmitter,a=n(24),c=0;Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(e){if(void 0===e||null===e)throw new TypeError("Cannot convert first argument to object");for(var t=Object(e),n=1;n<arguments.length;n++){var i=arguments[n];if(void 0!==i&&null!==i){i=Object(i);for(var r=Object.keys(i),s=0,o=r.length;s<o;s++){var a=r[s],c=Object.getOwnPropertyDescriptor(i,a);void 0!==c&&c.enumerable&&(t[a]=i[a])}}}return t}}),Object.freeze||(Object.freeze=function(e){if(Object(e)!==e)throw new TypeError("Object.freeze can only be called on Objects.");return e});var u=new a,l=u.waitFor.bind(u);t.dispatch=i},,function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(8),s=n(22),o=i(s),a=n(18),c=i(a),u=n(17),l=i(u);(0,c["default"])().exp<(0,l["default"])().unix()&&localStorage.removeItem("token");var f=(0,r.createStore)("UserStore",{},{setProfile:function(e,t){return t},cancelSubscription:function(e,t){return t},clearProfile:function(){return{}}},{isUserLoggedIn:function(e){return(0,c["default"])().exp>(0,l["default"])().unix()},isLoaded:function(e){return"undefined"!=typeof e.email},canCreateForm:function(e){return!0},getProvider:function(e){return e.provider},getEmail:function(e){return e.email},getName:function(e){return e.display_name},getAPIKey:function(e){return e.apikey},getUser:function(e){return e},getPlan:function(e){return e.plan},getPlanName:function(e){return o["default"].getPlanByName(e.plan)?o["default"].getPlanByName(e.plan).name:void 0},getMaxBuckets:function(e){return+e.max_buckets},getPaidUntil:function(e){return e.paid_until}});t["default"]=f},,,,,,,function(e,t){e.exports=moment},function(e,t){"use strict";function n(e){return decodeURIComponent(Array.prototype.map.call(atob(e),function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)}).join(""))}function i(e){try{return JSON.parse(n(localStorage.getItem("token").split(".")[1]))}catch(t){return{exp:-1}}}Object.defineProperty(t,"__esModule",{value:!0}),t["default"]=i},,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(8),r=(0,i.createStore)("Subscriptions",{plans:[]},{getSubscriptionPlans:function(e,t){return Object.assign({},e,{plans:t.data})}},{getPlans:function(e){return e.plans},getPlanByName:function(e,t){var n=e.plans.filter(function(e){return e.id===t});return 0===n.length?{}:n[0]}});t["default"]=r},function(e,t){function n(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function i(e){return"function"==typeof e}function r(e){return"number"==typeof e}function s(e){return"object"==typeof e&&null!==e}function o(e){return void 0===e}e.exports=n,n.EventEmitter=n,n.prototype._events=void 0,n.prototype._maxListeners=void 0,n.defaultMaxListeners=10,n.prototype.setMaxListeners=function(e){if(!r(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},n.prototype.emit=function(e){var t,n,r,a,c,u;if(this._events||(this._events={}),"error"===e&&(!this._events.error||s(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;var l=new Error('Uncaught, unspecified "error" event. ('+t+")");throw l.context=t,l}if(n=this._events[e],o(n))return!1;if(i(n))switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:a=Array.prototype.slice.call(arguments,1),n.apply(this,a)}else if(s(n))for(a=Array.prototype.slice.call(arguments,1),u=n.slice(),r=u.length,c=0;c<r;c++)u[c].apply(this,a);return!0},n.prototype.addListener=function(e,t){var r;if(!i(t))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,i(t.listener)?t.listener:t),this._events[e]?s(this._events[e])?this._events[e].push(t):this._events[e]=[this._events[e],t]:this._events[e]=t,s(this._events[e])&&!this._events[e].warned&&(r=o(this._maxListeners)?n.defaultMaxListeners:this._maxListeners,r&&r>0&&this._events[e].length>r&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())),this},n.prototype.on=n.prototype.addListener,n.prototype.once=function(e,t){function n(){this.removeListener(e,n),r||(r=!0,t.apply(this,arguments))}if(!i(t))throw TypeError("listener must be a function");var r=!1;return n.listener=t,this.on(e,n),this},n.prototype.removeListener=function(e,t){var n,r,o,a;if(!i(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(n=this._events[e],o=n.length,r=-1,n===t||i(n.listener)&&n.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(s(n)){for(a=o;a-- >0;)if(n[a]===t||n[a].listener&&n[a].listener===t){r=a;break}if(r<0)return this;1===n.length?(n.length=0,delete this._events[e]):n.splice(r,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},n.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(n=this._events[e],i(n))this.removeListener(e,n);else if(n)for(;n.length;)this.removeListener(e,n[n.length-1]);return delete this._events[e],this},n.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?i(this._events[e])?[this._events[e]]:this._events[e].slice():[]},n.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(i(t))return 1;if(t)return t.length}return 0},n.listenerCount=function(e,t){return e.listenerCount(t)}},function(e,t,n){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(25),o=1,a="ID_",c=function(){function e(){i(this,e),this._callbacks={},this._isPending={},this._isHandled={},this._isDispatching=!1,this._pendingPayload=null}return r(e,[{key:"register",value:function(e){var t=a+o++;return this._callbacks[t]=e,t}},{key:"unregister",value:function(e){s(this._callbacks[e],"Dispatcher.unregister(...): `%s` does not map to a registered callback.",e),delete this._callbacks[e]}},{key:"waitFor",value:function(e){s(this._isDispatching,"Dispatcher.waitFor(...): Must be invoked while dispatching.");for(var t=0;t<e.length;t++){var n=e[t];this._isPending[n]?s(this._isHandled[n],"Dispatcher.waitFor(...): Circular dependency detected while waiting for `%s`.",n):(s(this._callbacks[n],"Dispatcher.waitFor(...): `%s` does not map to a registered callback.",n),this._invokeCallback(n))}}},{key:"dispatch",value:function(e){s(!this._isDispatching,"Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch."),this._startDispatching(e);try{for(var t in this._callbacks)this._isPending[t]||this._invokeCallback(t)}finally{this._stopDispatching()}}},{key:"isDispatching",value:function(){return this._isDispatching}},{key:"_invokeCallback",value:function(e){this._isPending[e]=!0,this._callbacks[e](this._pendingPayload),this._isHandled[e]=!0}},{key:"_startDispatching",value:function(e){for(var t in this._callbacks)this._isPending[t]=!1,this._isHandled[t]=!1;this._pendingPayload=e,this._isDispatching=!0}},{key:"_stopDispatching",value:function(){this._pendingPayload=null,this._isDispatching=!1}}]),e}();e.exports=c},function(e,t){"use strict";var n=function(e,t,n,i,r,s,o,a){if(!e){var c;if(void 0===t)c=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var u=[n,i,r,s,o,a],l=0;c=new Error("Invariant Violation: "+t.replace(/%s/g,function(){return u[l++]}))}throw c.framesToPop=1,c}};e.exports=n}]);