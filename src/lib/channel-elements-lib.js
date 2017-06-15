/******/ (function (modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
      /******/
}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
      /******/
};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
    /******/
}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function (value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function (exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
        /******/
});
      /******/
}
    /******/
};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function (module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
    /******/
};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
  /******/
})
/************************************************************************/
/******/([
/* 0 */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", { value: true });
      var DB_NAME = 'channels-db';
      var DB_VERSION = 1;
      var STORE_REGISTRIES = "registries";
      var MODE_READWRITE = "readwrite";
      var MODE_READ = "readonly";
      var ClientDb = (function () {
        function ClientDb() {
        }
        ClientDb.prototype.open = function () {
          var _this = this;
          return new Promise(function (resolve, reject) {
            if (_this.db) {
              resolve();
              return;
            }
            var request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onerror = function (event) {
              console.error("Failed to load DB: ", event);
              reject(new Error("Error loading database: " + event));
            };
            request.onsuccess = function (event) {
              _this.db = request.result;
              resolve();
            };
            request.onupgradeneeded = function (event) {
              var db = event.target.result;
              if (!event.oldVersion) {
                var store = db.createObjectStore(STORE_REGISTRIES, { keyPath: "services.registrationUrl" });
                store.createIndex("providerUrl", "services.providerUrl", { unique: true });
              }
            };
          });
        };
        ClientDb.prototype.getStore = function (name, mode) {
          var tx = this.db.transaction(name, mode);
          return tx.objectStore(name);
        };
        ClientDb.prototype.saveRegistry = function (registry) {
          var _this = this;
          return new Promise(function (resolve, reject) {
            var store = _this.getStore(STORE_REGISTRIES, MODE_READWRITE);
            try {
              var request = store.add(registry);
              request.onerror = function (event) {
                reject(new Error("Error loading database: " + event));
              };
              request.onsuccess = function (event) {
                resolve();
              };
            }
            catch (ex) {
              reject(ex);
            }
          });
        };
        ClientDb.prototype.getRegistry = function (registerUrl, providerUrl) {
          var _this = this;
          return new Promise(function (resolve, reject) {
            var store = _this.getStore(STORE_REGISTRIES, MODE_READ);
            var request;
            if (registerUrl) {
              request = store.get(registerUrl);
            }
            else if (providerUrl) {
              var index = store.index('providerUrl');
              request = index.get(providerUrl);
            }
            else {
              resolve(null);
              return;
            }
            request.onerror = function (event) {
              console.error("Failed to load registry from DB: ", event);
              reject(new Error("Failed to load registry: " + event));
            };
            request.onsuccess = function (event) {
              resolve(request.result);
            };
          });
        };
        ClientDb.prototype.getAllRegistries = function () {
          var _this = this;
          return new Promise(function (resolve, reject) {
            var store = _this.getStore(STORE_REGISTRIES, MODE_READ);
            var request = store.openCursor();
            var result = [];
            request.onerror = function (event) {
              console.error("Failed to open registry cursor: ", event);
              reject(new Error("Failed to open registry cursor: " + event));
            };
            request.onsuccess = function (event) {
              var cursor = event.target.result;
              if (cursor) {
                result.push(cursor.value);
                cursor.continue();
              }
              else {
                resolve(result);
              }
            };
          });
        };
        return ClientDb;
      }());
      exports.ClientDb = ClientDb;


      /***/
}),
/* 1 */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";

      var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = (this && this.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                if (t[2]) _.ops.pop();
                _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var Rest = (function () {
        function Rest() {
        }
        Rest.get = function (url, headers) {
          return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              return [2 /*return*/, new Promise(function (resolve, reject) {
                var req = new XMLHttpRequest();
                req.withCredentials = false;
                req.open("GET", url);
                if (headers) {
                  for (var key in headers) {
                    req.setRequestHeader(key, headers[key]);
                  }
                }
                req.onload = function (event) {
                  var status = req.status;
                  if (status === 0 || status >= 400) {
                    if (req.responseText) {
                      Rest.onError(reject, status, req.responseText);
                    }
                    else {
                      Rest.onError(reject, status, 'Request failed with code: ' + status);
                    }
                  }
                  else {
                    if (req.responseText) {
                      var result = JSON.parse(req.responseText);
                      resolve(result);
                    }
                    else {
                      resolve(null);
                    }
                  }
                };
                req.onerror = function (err) {
                  Rest.onError(reject, 0, "There was a network error: " + err.message);
                };
                req.send();
              })];
            });
          });
        };
        Rest.post = function (url, object, headers) {
          return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              return [2 /*return*/, new Promise(function (resolve, reject) {
                var req = new XMLHttpRequest();
                req.withCredentials = false;
                req.open("POST", url);
                if (headers) {
                  for (var key in headers) {
                    req.setRequestHeader(key, headers[key]);
                  }
                }
                req.setRequestHeader("Content-Type", 'application/json');
                req.onload = function (event) {
                  var status = req.status;
                  if (status === 0 || status >= 400) {
                    if (req.responseText) {
                      Rest.onError(reject, status, req.responseText);
                    }
                    else {
                      Rest.onError(reject, status, 'Request failed with code: ' + status);
                    }
                  }
                  else {
                    if (req.responseText) {
                      var result = JSON.parse(req.responseText);
                      resolve(result);
                    }
                    else {
                      resolve(null);
                    }
                  }
                };
                req.onerror = function (err) {
                  Rest.onError(reject, 0, "There was a network error: " + err.message);
                };
                if (object) {
                  req.send(JSON.stringify(object));
                }
                else {
                  req.send();
                }
              })];
            });
          });
        };
        Rest.onError = function (reject, code, message) {
          reject({
            status: code,
            message: message
          });
        };
        return Rest;
      }());
      exports.Rest = Rest;


      /***/
}),
/* 2 */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", { value: true });
      var TransportManager = (function () {
        function TransportManager() {
          this.sockets = {};
        }
        TransportManager.prototype.connect = function (url) {
          var _this = this;
          return new Promise(function (resolve, reject) {
            var info = _this.sockets[url];
            if (info) {
              if (info.connected) {
                resolve();
                return;
              }
              if (info.connecting) {
                info.pendingCallbacks.push(function (err) {
                  if (err) {
                    reject(err);
                  }
                  else {
                    resolve();
                  }
                });
                return;
              }
            }
            if (!info) {
              info = {
                url: url,
                connected: false,
                connecting: true,
                pendingCallbacks: []
              };
              _this.sockets[url] = info;
            }
            else {
              info.connecting = true;
              info.pendingCallbacks = [];
            }
            info.pendingCallbacks.push(function (err) {
              if (err) {
                reject(err);
              }
              else {
                resolve();
              }
            });
            _this.connectSocket(info);
          });
        };
        TransportManager.prototype.connectSocket = function (info) {
          info.connecting = true;
          try {
            var socket_1 = new WebSocket(info.url);
            socket_1.binaryType = "arraybuffer";
            info.socket = socket_1;
            socket_1.onopen = function (event) {
              if (socket_1.readyState === WebSocket.OPEN) {
                info.connecting = false;
                info.connected = true;
                try {
                  for (var _i = 0, _a = info.pendingCallbacks; _i < _a.length; _i++) {
                    var cb = _a[_i];
                    cb();
                  }
                }
                catch (err) {
                  // noop
                }
              }
            };
            socket_1.onerror = function (error) {
              try {
                for (var _i = 0, _a = info.pendingCallbacks; _i < _a.length; _i++) {
                  var cb = _a[_i];
                  cb(error);
                }
              }
              catch (err) {
                // noop
              }
              finally {
                info.connected = false;
                info.connecting = false;
                info.pendingCallbacks = [];
              }
            };
            socket_1.onclose = function (event) {
              info.connected = false;
              info.connecting = false;
            };
            socket_1.onmessage = function (event) {
              // TODO: 
            };
          }
          catch (err) {
            try {
              for (var _i = 0, _a = info.pendingCallbacks; _i < _a.length; _i++) {
                var cb = _a[_i];
                cb(err);
              }
            }
            catch (err) {
              // noop
            }
            finally {
              info.connected = false;
              info.connecting = false;
              info.pendingCallbacks = [];
            }
          }
        };
        return TransportManager;
      }());
      exports.TransportManager = TransportManager;


      /***/
}),
/* 3 */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";

      Object.defineProperty(exports, "__esModule", { value: true });
      var Utils = (function () {
        function Utils() {
        }
        Utils.createAuth = function (registry) {
          var user = registry.id;
          var pswd = registry.token;
          return 'Basic ' + Utils.base64([user, pswd].join(':'));
        };
        Utils.base64 = function (input) {
          return btoa(input);
        };
        return Utils;
      }());
      exports.Utils = Utils;


      /***/
}),
/* 4 */
/***/ (function (module, exports, __webpack_require__) {

      "use strict";

      var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      var __generator = (this && this.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                if (t[2]) _.ops.pop();
                _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var rest_1 = __webpack_require__(1);
      var utils_1 = __webpack_require__(3);
      var db_1 = __webpack_require__(0);
      var transport_manager_1 = __webpack_require__(2);
      var ChannelsClientImpl = (function () {
        function ChannelsClientImpl() {
          this.db = new db_1.ClientDb();
          this.transport = new transport_manager_1.TransportManager();
        }
        ChannelsClientImpl.prototype.ensureDb = function () {
          return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0: return [4 /*yield*/, this.db.open()];
                case 1:
                  _a.sent();
                  return [2 /*return*/];
              }
            });
          });
        };
        ChannelsClientImpl.prototype.register = function (serverUrl, identity) {
          return __awaiter(this, void 0, void 0, function () {
            var cached, serverInfo, response;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0: return [4 /*yield*/, this.ensureDb()];
                case 1:
                  _a.sent();
                  return [4 /*yield*/, this.db.getRegistry(null, serverUrl)];
                case 2:
                  cached = _a.sent();
                  if (cached) {
                    return [2 /*return*/, cached];
                  }
                  return [4 /*yield*/, rest_1.Rest.get(serverUrl)];
                case 3:
                  serverInfo = _a.sent();
                  if (!(serverInfo && serverInfo.services.registrationUrl)) return [3 /*break*/, 5];
                  return [4 /*yield*/, this.getRegistry(serverInfo.services.registrationUrl, identity)];
                case 4:
                  response = _a.sent();
                  return [2 /*return*/, response];
                case 5: throw new Error("Failed to fetch channel server info.");
              }
            });
          });
        };
        ChannelsClientImpl.prototype.getRegistry = function (registryUrl, identity) {
          return __awaiter(this, void 0, void 0, function () {
            var cached, response;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0: return [4 /*yield*/, this.ensureDb()];
                case 1:
                  _a.sent();
                  return [4 /*yield*/, this.db.getRegistry(registryUrl)];
                case 2:
                  cached = _a.sent();
                  if (cached) {
                    return [2 /*return*/, cached];
                  }
                  return [4 /*yield*/, rest_1.Rest.post(registryUrl, {
                    identity: identity || {}
                  })];
                case 3:
                  response = _a.sent();
                  if (!response) return [3 /*break*/, 5];
                  return [4 /*yield*/, this.db.saveRegistry(response)];
                case 4:
                  _a.sent();
                  return [2 /*return*/, response];
                case 5: throw new Error("Failed to register with server at " + registryUrl);
              }
            });
          });
        };
        ChannelsClientImpl.prototype.createChannel = function (registryUrl, request) {
          if (request === void 0) { request = {}; }
          return __awaiter(this, void 0, void 0, function () {
            var registry, headers;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0: return [4 /*yield*/, this.ensureDb()];
                case 1:
                  _a.sent();
                  return [4 /*yield*/, this.db.getRegistry(registryUrl)];
                case 2:
                  registry = _a.sent();
                  if (!registry) {
                    throw new Error("Failed to create channel: Provider is not registered");
                  }
                  headers = { Authorization: utils_1.Utils.createAuth(registry) };
                  return [4 /*yield*/, rest_1.Rest.post(registry.services.createChannelUrl, request, headers)];
                case 3: return [2 /*return*/, _a.sent()];
              }
            });
          });
        };
        ChannelsClientImpl.prototype.connectToChannel = function (channelCodeUrl) {
          return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              return [2 /*return*/, null];
            });
          });
        };
        ChannelsClientImpl.prototype.getChannelsWithProvider = function (url) {
          return __awaiter(this, void 0, void 0, function () {
            var result, registry, listResponse, _i, _a, cs;
            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0: return [4 /*yield*/, this.ensureDb()];
                case 1:
                  _b.sent();
                  result = [];
                  return [4 /*yield*/, this.db.getRegistry(url)];
                case 2:
                  registry = _b.sent();
                  if (!!registry) return [3 /*break*/, 4];
                  return [4 /*yield*/, this.db.getRegistry(null, url)];
                case 3:
                  registry = _b.sent();
                  _b.label = 4;
                case 4:
                  if (!registry) return [3 /*break*/, 6];
                  return [4 /*yield*/, this.getChannelsFromRegistry(registry)];
                case 5:
                  listResponse = _b.sent();
                  if (listResponse && listResponse.channels) {
                    for (_i = 0, _a = listResponse.channels; _i < _a.length; _i++) {
                      cs = _a[_i];
                      result.push(cs);
                    }
                  }
                  _b.label = 6;
                case 6: return [2 /*return*/, result];
              }
            });
          });
        };
        ChannelsClientImpl.prototype.listAllChannels = function () {
          return __awaiter(this, void 0, void 0, function () {
            var registeries, result, i, registry, listResponse, _i, _a, cs;
            return __generator(this, function (_b) {
              switch (_b.label) {
                case 0: return [4 /*yield*/, this.ensureDb()];
                case 1:
                  _b.sent();
                  return [4 /*yield*/, this.db.getAllRegistries()];
                case 2:
                  registeries = _b.sent();
                  result = [];
                  i = 0;
                  _b.label = 3;
                case 3:
                  if (!(i < registeries.length)) return [3 /*break*/, 6];
                  registry = registeries[i];
                  return [4 /*yield*/, this.getChannelsFromRegistry(registry)];
                case 4:
                  listResponse = _b.sent();
                  if (listResponse && listResponse.channels) {
                    for (_i = 0, _a = listResponse.channels; _i < _a.length; _i++) {
                      cs = _a[_i];
                      result.push(cs);
                    }
                  }
                  _b.label = 5;
                case 5:
                  i++;
                  return [3 /*break*/, 3];
                case 6:
                  result.sort(function (a, b) {
                    return b.created - a.created;
                  });
                  return [2 /*return*/, result];
              }
            });
          });
        };
        ChannelsClientImpl.prototype.getChannelsFromRegistry = function (registry) {
          return __awaiter(this, void 0, void 0, function () {
            var headers;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  headers = { Authorization: utils_1.Utils.createAuth(registry) };
                  return [4 /*yield*/, rest_1.Rest.get(registry.services.channelListUrl, headers)];
                case 1: return [2 /*return*/, _a.sent()];
              }
            });
          });
        };
        ChannelsClientImpl.prototype.getChannel = function (registryUrl, channelUrl) {
          return __awaiter(this, void 0, void 0, function () {
            var registry, headers;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0: return [4 /*yield*/, this.ensureDb()];
                case 1:
                  _a.sent();
                  return [4 /*yield*/, this.db.getRegistry(registryUrl)];
                case 2:
                  registry = _a.sent();
                  if (!registry) {
                    throw new Error("Failed to fetch channel: Provider is not registered");
                  }
                  headers = { Authorization: utils_1.Utils.createAuth(registry) };
                  return [4 /*yield*/, rest_1.Rest.get(channelUrl, headers)];
                case 3: return [2 /*return*/, _a.sent()];
              }
            });
          });
        };
        ChannelsClientImpl.prototype.connectTransport = function (registryUrl, url) {
          return __awaiter(this, void 0, void 0, function () {
            var registry, fullUrl, query;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0: return [4 /*yield*/, this.ensureDb()];
                case 1:
                  _a.sent();
                  return [4 /*yield*/, this.db.getRegistry(registryUrl)];
                case 2:
                  registry = _a.sent();
                  if (!registry) {
                    throw new Error("Failed to connect: Provider is not registered");
                  }
                  fullUrl = new URL(url);
                  query = fullUrl.search || "";
                  if (!query) {
                    query = "?";
                  }
                  else if (query.length > 1) {
                    query = query + "&";
                  }
                  query += "id=" + encodeURIComponent(registry.id);
                  query += "&token=" + encodeURIComponent(registry.token);
                  fullUrl.search = query;
                  return [4 /*yield*/, this.transport.connect(fullUrl.toString())];
                case 3:
                  _a.sent();
                  return [2 /*return*/];
              }
            });
          });
        };
        return ChannelsClientImpl;
      }());
      window.ChannelsClient = ChannelsClientImpl;


      /***/
})
/******/]);