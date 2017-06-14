!function (e) { function t(n) { if (r[n]) return r[n].exports; var o = r[n] = { i: n, l: !1, exports: {} }; return e[n].call(o.exports, o, o.exports, t), o.l = !0, o.exports } var r = {}; t.m = e, t.c = r, t.i = function (e) { return e }, t.d = function (e, r, n) { t.o(e, r) || Object.defineProperty(e, r, { configurable: !1, enumerable: !0, get: n }) }, t.n = function (e) { var r = e && e.__esModule ? function () { return e.default } : function () { return e }; return t.d(r, "a", r), r }, t.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, t.p = "", t(t.s = 3) }([function (e, t, r) { "use strict"; var n = this && this.__awaiter || function (e, t, r, n) { return new (r || (r = Promise))(function (o, i) { function s(e) { try { a(n.next(e)) } catch (e) { i(e) } } function u(e) { try { a(n.throw(e)) } catch (e) { i(e) } } function a(e) { e.done ? o(e.value) : new r(function (t) { t(e.value) }).then(s, u) } a((n = n.apply(e, t || [])).next()) }) }, o = this && this.__generator || function (e, t) { function r(e) { return function (t) { return n([e, t]) } } function n(r) { if (o) throw new TypeError("Generator is already executing."); for (; a;)try { if (o = 1, i && (s = i[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(s = s.call(i, r[1])).done) return s; switch (i = 0, s && (r = [0, s.value]), r[0]) { case 0: case 1: s = r; break; case 4: return a.label++ , { value: r[1], done: !1 }; case 5: a.label++ , i = r[1], r = [0]; continue; case 7: r = a.ops.pop(), a.trys.pop(); continue; default: if (s = a.trys, !(s = s.length > 0 && s[s.length - 1]) && (6 === r[0] || 2 === r[0])) { a = 0; continue } if (3 === r[0] && (!s || r[1] > s[0] && r[1] < s[3])) { a.label = r[1]; break } if (6 === r[0] && a.label < s[1]) { a.label = s[1], s = r; break } if (s && a.label < s[2]) { a.label = s[2], a.ops.push(r); break } s[2] && a.ops.pop(), a.trys.pop(); continue }r = t.call(e, a) } catch (e) { r = [6, e], i = 0 } finally { o = s = 0 } if (5 & r[0]) throw r[1]; return { value: r[0] ? r[1] : void 0, done: !0 } } var o, i, s, u, a = { label: 0, sent: function () { if (1 & s[0]) throw s[1]; return s[1] }, trys: [], ops: [] }; return u = { next: r(0), throw: r(1), return: r(2) }, "function" == typeof Symbol && (u[Symbol.iterator] = function () { return this }), u }; Object.defineProperty(t, "__esModule", { value: !0 }); var i = function () { function e() { } return e.prototype.open = function () { return n(this, void 0, void 0, function () { var e = this; return o(this, function (t) { return [2, new Promise(function (t, r) { if (e.db) return void t(); var n = indexedDB.open("channels-db", 1); n.onerror = function (e) { console.error("Failed to load DB: ", e), r(new Error("Error loading database: " + e)) }, n.onsuccess = function (r) { e.db = n.result, t() }, n.onupgradeneeded = function (e) { var t = e.target.result; if (!e.oldVersion) { t.createObjectStore("registries", { keyPath: "services.registrationUrl" }).createIndex("providerUrl", "services.providerUrl", { unique: !0 }) } } })] }) }) }, e.prototype.getStore = function (e, t) { return this.db.transaction(e, t).objectStore(e) }, e.prototype.saveRegistry = function (e) { return n(this, void 0, void 0, function () { var t = this; return o(this, function (r) { return [2, new Promise(function (r, n) { var o = t.getStore("registries", "readwrite"); try { var i = o.add(e); i.onerror = function (e) { n(new Error("Error loading database: " + e)) }, i.onsuccess = function (e) { r() } } catch (e) { n(e) } })] }) }) }, e.prototype.getRegistry = function (e, t) { return n(this, void 0, void 0, function () { var r = this; return o(this, function (n) { return [2, new Promise(function (n, o) { var i, s = r.getStore("registries", "readonly"); if (e) i = s.get(e); else { if (!t) return void n(null); var u = s.index("providerUrl"); i = u.get(t) } i.onerror = function (e) { console.error("Failed to load registry from DB: ", e), o(new Error("Failed to load registry: " + e)) }, i.onsuccess = function (e) { n(i.result) } })] }) }) }, e }(); t.ClientDb = i }, function (e, t, r) { "use strict"; var n = this && this.__awaiter || function (e, t, r, n) { return new (r || (r = Promise))(function (o, i) { function s(e) { try { a(n.next(e)) } catch (e) { i(e) } } function u(e) { try { a(n.throw(e)) } catch (e) { i(e) } } function a(e) { e.done ? o(e.value) : new r(function (t) { t(e.value) }).then(s, u) } a((n = n.apply(e, t || [])).next()) }) }, o = this && this.__generator || function (e, t) { function r(e) { return function (t) { return n([e, t]) } } function n(r) { if (o) throw new TypeError("Generator is already executing."); for (; a;)try { if (o = 1, i && (s = i[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(s = s.call(i, r[1])).done) return s; switch (i = 0, s && (r = [0, s.value]), r[0]) { case 0: case 1: s = r; break; case 4: return a.label++ , { value: r[1], done: !1 }; case 5: a.label++ , i = r[1], r = [0]; continue; case 7: r = a.ops.pop(), a.trys.pop(); continue; default: if (s = a.trys, !(s = s.length > 0 && s[s.length - 1]) && (6 === r[0] || 2 === r[0])) { a = 0; continue } if (3 === r[0] && (!s || r[1] > s[0] && r[1] < s[3])) { a.label = r[1]; break } if (6 === r[0] && a.label < s[1]) { a.label = s[1], s = r; break } if (s && a.label < s[2]) { a.label = s[2], a.ops.push(r); break } s[2] && a.ops.pop(), a.trys.pop(); continue }r = t.call(e, a) } catch (e) { r = [6, e], i = 0 } finally { o = s = 0 } if (5 & r[0]) throw r[1]; return { value: r[0] ? r[1] : void 0, done: !0 } } var o, i, s, u, a = { label: 0, sent: function () { if (1 & s[0]) throw s[1]; return s[1] }, trys: [], ops: [] }; return u = { next: r(0), throw: r(1), return: r(2) }, "function" == typeof Symbol && (u[Symbol.iterator] = function () { return this }), u }; Object.defineProperty(t, "__esModule", { value: !0 }); var i = function () { function e() { } return e.get = function (t, r) { return n(this, void 0, void 0, function () { return o(this, function (n) { return [2, new Promise(function (n, o) { var i = new XMLHttpRequest; if (i.withCredentials = !0, i.open("GET", t), r) for (var s in r) i.setRequestHeader(s, r[s]); i.onload = function (t) { var r = i.status; if (0 === r || r >= 400) i.responseText ? e.onError(o, r, i.responseText) : e.onError(o, r, "Request failed with code: " + r); else if (i.responseText) { var s = JSON.parse(i.responseText); n(s) } else n(null) }, i.onerror = function (t) { e.onError(o, 0, "There was a network error: " + t.message) }, i.send() })] }) }) }, e.post = function (t, r, i) { return n(this, void 0, void 0, function () { return o(this, function (n) { return [2, new Promise(function (n, o) { var s = new XMLHttpRequest; if (s.withCredentials = !0, s.open("POST", t), i) for (var u in i) s.setRequestHeader(u, i[u]); s.setRequestHeader("Content-Type", "application/json"), s.onload = function (t) { var r = s.status; if (0 === r || r >= 400) s.responseText ? e.onError(o, r, s.responseText) : e.onError(o, r, "Request failed with code: " + r); else if (s.responseText) { var i = JSON.parse(s.responseText); n(i) } else n(null) }, s.onerror = function (t) { e.onError(o, 0, "There was a network error: " + t.message) }, r ? s.send(JSON.stringify(r)) : s.send() })] }) }) }, e.onError = function (e, t, r) { e({ status: t, message: r }) }, e }(); t.Rest = i }, function (e, t, r) { "use strict"; Object.defineProperty(t, "__esModule", { value: !0 }); var n = function () { function e() { } return e.createAuth = function (t) { var r = t.id, n = t.token; return "Basic " + e.base64([r, n].join(":")) }, e.base64 = function (e) { return btoa(e) }, e }(); t.Utils = n }, function (e, t, r) { "use strict"; var n = this && this.__awaiter || function (e, t, r, n) { return new (r || (r = Promise))(function (o, i) { function s(e) { try { a(n.next(e)) } catch (e) { i(e) } } function u(e) { try { a(n.throw(e)) } catch (e) { i(e) } } function a(e) { e.done ? o(e.value) : new r(function (t) { t(e.value) }).then(s, u) } a((n = n.apply(e, t || [])).next()) }) }, o = this && this.__generator || function (e, t) { function r(e) { return function (t) { return n([e, t]) } } function n(r) { if (o) throw new TypeError("Generator is already executing."); for (; a;)try { if (o = 1, i && (s = i[2 & r[0] ? "return" : r[0] ? "throw" : "next"]) && !(s = s.call(i, r[1])).done) return s; switch (i = 0, s && (r = [0, s.value]), r[0]) { case 0: case 1: s = r; break; case 4: return a.label++ , { value: r[1], done: !1 }; case 5: a.label++ , i = r[1], r = [0]; continue; case 7: r = a.ops.pop(), a.trys.pop(); continue; default: if (s = a.trys, !(s = s.length > 0 && s[s.length - 1]) && (6 === r[0] || 2 === r[0])) { a = 0; continue } if (3 === r[0] && (!s || r[1] > s[0] && r[1] < s[3])) { a.label = r[1]; break } if (6 === r[0] && a.label < s[1]) { a.label = s[1], s = r; break } if (s && a.label < s[2]) { a.label = s[2], a.ops.push(r); break } s[2] && a.ops.pop(), a.trys.pop(); continue }r = t.call(e, a) } catch (e) { r = [6, e], i = 0 } finally { o = s = 0 } if (5 & r[0]) throw r[1]; return { value: r[0] ? r[1] : void 0, done: !0 } } var o, i, s, u, a = { label: 0, sent: function () { if (1 & s[0]) throw s[1]; return s[1] }, trys: [], ops: [] }; return u = { next: r(0), throw: r(1), return: r(2) }, "function" == typeof Symbol && (u[Symbol.iterator] = function () { return this }), u }; Object.defineProperty(t, "__esModule", { value: !0 }); var i = r(1), s = r(2), u = r(0), a = function () { function e() { this.db = new u.ClientDb } return e.prototype.ensureDb = function () { return n(this, void 0, void 0, function () { return o(this, function (e) { switch (e.label) { case 0: return [4, this.db.open()]; case 1: return e.sent(), [2] } }) }) }, e.prototype.register = function (e, t) { return n(this, void 0, void 0, function () { var r, n, s; return o(this, function (o) { switch (o.label) { case 0: return [4, this.ensureDb()]; case 1: return o.sent(), [4, this.db.getRegistry(null, e)]; case 2: return r = o.sent(), r ? [2, r] : [4, i.Rest.get(e)]; case 3: return n = o.sent(), n && n.services.registrationUrl ? [4, this.getRegistry(n.services.registrationUrl, t)] : [3, 6]; case 4: return s = o.sent(), [4, this.db.saveRegistry(s)]; case 5: return o.sent(), [2, s]; case 6: throw new Error("Failed to fetch Braid server info.") } }) }) }, e.prototype.getRegistry = function (e, t) { return n(this, void 0, void 0, function () { var r, n; return o(this, function (o) { switch (o.label) { case 0: return [4, this.ensureDb()]; case 1: return o.sent(), [4, this.db.getRegistry(e)]; case 2: return r = o.sent(), r ? [2, r] : [4, i.Rest.post(e, { identity: t || {} })]; case 3: return n = o.sent(), n ? [4, this.db.saveRegistry(n)] : [3, 5]; case 4: return o.sent(), [2, n]; case 5: throw new Error("Failed to register with server at " + e) } }) }) }, e.prototype.createChannel = function (e, t) { return void 0 === t && (t = {}), n(this, void 0, void 0, function () { var r, n; return o(this, function (o) { switch (o.label) { case 0: return [4, this.ensureDb()]; case 1: return o.sent(), [4, this.db.getRegistry(e)]; case 2: if (!(r = o.sent())) throw new Error("Failed to create channel: Provider is not registered"); return n = { Authorization: s.Utils.createAuth(r) }, [4, i.Rest.post(r.services.createChannelUrl, t, n)]; case 3: return [2, o.sent()] } }) }) }, e.prototype.connectToChannel = function (e) { return n(this, void 0, void 0, function () { return o(this, function (e) { return [2, null] }) }) }, e }(); window.ChannelsClient = a }]);