/**
 * @license S5.js v2.0.0
 * (c) 2015-2018 Sincosoft, Inc. http://sinco.com.co
 * 
 * Creation date: 27/02/2018
 * Last change: 01/03/2018
 *
 * by GoldenBerry
**/

((win, doc, fac) => {

    const o = Object;
    const a = Array;
    const s = String;
    const j = JSON;

    if ( !('classList' in doc.createElementNS('http://www.w3.org/2000/svg', 'g')) ){
        let d = o.getOwnPropertyDescriptor(HTMLElement.prototype, 'classList');
        o.defineProperty(SVGElement.prototype, 'classList', d);
    }

    a.prototype.clean = function (d) {
        for (let i = 0; i < this.length; i++) {
            if (this[i] == d) {
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    };

    a.prototype.unique = function () {
        let u = {}, a = [];
        for (let i = 0, l = this.length; i < l; ++i) {
            if (u.hasOwnProperty(this[i])) {
                continue;
            }
            a.push(this[i]);
            u[this[i]] = 1;
        }
        return a;
    };

    a.prototype.contains = function (searchElement /*, fromIndex*/ ) {
        'use strict';
        const O = o(this);
        const len = parseInt(O.length) || 0;
        if (len === 0) {
            return false;
        }
        const n = parseInt(arguments[1]) || 0;
        let k;
        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            if (k < 0) {k = 0;}
        }
        let currentElement;
        while (k < len) {
            currentElement = O[k];
            if (searchElement === currentElement ||
                (searchElement !== searchElement && currentElement !== currentElement)) {
                return true;
            }
            k++;
        }
        return false;
    };

    const __lists = o.getOwnPropertyNames(win).filter((x) => x.endsWith('List') || x.indexOf('Array') >= 0);

    __lists.forEach((n) => {
        let __type = win[n];
        __type.prototype.stream = function () {
            if (this == void(0) || this === null || !(this instanceof __type))
                throw new TypeError();

            let Iterator = function (a) {
                this.reset = function () {
                    this.value = null;
                    this.index = -1;
                }

                this.next = function () {
                    if (this.index < a.length) {
                        this.index++;
                        this.value = a[this.index];
                        return this.index < a.length;
                    }
                    return false;
                }

                this.reset();
            };

            return new Iterator(this);
        };
    });

    if (!s.prototype.replaceAll) {
        s.prototype.replaceAll = function (rThis, rWith) {
            return this.replace(new RegExp(rThis, 'g'), rWith);
        };
    }

    s.format = s.prototype.format = function () {
        let i = 0, l = 0;
        let str = (typeof this == 'function' && !(i++)) ? arguments[0] : this;

        while (i < arguments.length) {
            str = str.replaceAll('\\{' + l + '\\}', arguments[i]);
            i++; l++;
        }

        return str;
    };

    s.concat = function () {
        return a.prototype.slice.call(arguments).join('');
    };

    s.toAESEncrypt = s.prototype.toAESEncrypt = function () {
        if (typeof CryptoJS === 'undefined') {
            throw new SincoInitializationError('¡Falta la referencia de AES.js!');
        }

        let text = '';
        let key = CryptoJS.enc.Utf8.parse(String.concat(String.fromCharCode(53), String.fromCharCode(49), String.fromCharCode(110),
            String.fromCharCode(99), String.fromCharCode(48), String.fromCharCode(115), String.fromCharCode(111),
            String.fromCharCode(102), String.fromCharCode(116), String.fromCharCode(95), String.fromCharCode(53),
            String.fromCharCode(46), String.fromCharCode(65), String.fromCharCode(46), String.fromCharCode(53),
            String.fromCharCode(46))); //Mismo KEY usado en C#


        let setKey = (k) => {
            let _k = [];
            for (let i = 0; i < k.length; i += 4) {
                if (k[i + 1]) {
                    _k.push(k[i] + k[i + 1]);
                }
            }
            k = new Uint8Array(_k);
            let r = s.fromCharCode.apply(String, k);
            key = CryptoJS.enc.Utf8.parse(r);
        }

        if (typeof (this) == 'function') {
            text = arguments[0];
            if (arguments[1]) {
                setKey(arguments[1]);
            }
        }
        else {
            text = this;
            if (arguments[0]) {
                setKey(arguments[0]);
            }
        }

        const iv = CryptoJS.enc.Utf8.parse(String.concat(String.fromCharCode(95), String.fromCharCode(84), String.fromCharCode(49),
            String.fromCharCode(99), String.fromCharCode(115), String.fromCharCode(124), String.fromCharCode(70),
            String.fromCharCode(111), String.fromCharCode(110), String.fromCharCode(42), String.fromCharCode(53),
            String.fromCharCode(111), String.fromCharCode(95), String.fromCharCode(83), String.fromCharCode(52),
            String.fromCharCode(53))); //Mismo IV usado en C#

        const valorIterar = Math.floor((Math.random() * 9) + 1);

        let iterar = (final, text, key, iv) => {
            let textoCrypto;

            textoCrypto = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), key,
                {
                    keySize: 16,
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
            if (final > 0) {
                return iterar(final - 1, textoCrypto, key, iv);
            } else {
                return textoCrypto;
            }
        }

        return iterar(valorIterar, text, key, iv).toString() + valorIterar;
    };

    j.tryParse = (str) => {
        try {
            return j.parse(str);
        }
        catch (e) {
            return { messageError: e.message };
        }
    };

    //Pollyfill RegisterElement
    if (!doc.registerElement) {
        (function (e, t) { "use strict"; function Ht() { var e = wt.splice(0, wt.length); Et = 0; while (e.length) e.shift().call(null, e.shift()) } function Bt(e, t) { for (var n = 0, r = e.length; n < r; n++) Jt(e[n], t) } function jt(e) { for (var t = 0, n = e.length, r; t < n; t++) r = e[t], Pt(r, A[It(r)]) } function Ft(e) { return function (t) { ut(t) && (Jt(t, e), O.length && Bt(t.querySelectorAll(O), e)) } } function It(e) { var t = ht.call(e, "is"), n = e.nodeName.toUpperCase(), r = _.call(L, t ? N + t.toUpperCase() : T + n); return t && -1 < r && !qt(n, t) ? -1 : r } function qt(e, t) { return -1 < O.indexOf(e + '[is="' + t + '"]') } function Rt(e) { var t = e.currentTarget, n = e.attrChange, r = e.attrName, i = e.target, s = e[y] || 2, o = e[w] || 3; kt && (!i || i === t) && t[h] && r !== "style" && (e.prevValue !== e.newValue || e.newValue === "" && (n === s || n === o)) && t[h](r, n === s ? null : e.prevValue, n === o ? null : e.newValue) } function Ut(e) { var t = Ft(e); return function (e) { wt.push(t, e.target), Et && clearTimeout(Et), Et = setTimeout(Ht, 1) } } function zt(e) { Ct && (Ct = !1, e.currentTarget.removeEventListener(S, zt)), O.length && Bt((e.target || n).querySelectorAll(O), e.detail === l ? l : a), st && Vt() } function Wt(e, t) { var n = this; vt.call(n, e, t), Lt.call(n, { target: n }) } function Xt(e, t) { nt(e, t), Mt ? Mt.observe(e, yt) : (Nt && (e.setAttribute = Wt, e[o] = Ot(e), e[u](x, Lt)), e[u](E, Rt)), e[m] && kt && (e.created = !0, e[m](), e.created = !1) } function Vt() { for (var e, t = 0, n = at.length; t < n; t++) e = at[t], M.contains(e) || (n--, at.splice(t--, 1), Jt(e, l)) } function $t(e) { throw new Error("A " + e + " type is already registered") } function Jt(e, t) { var n, r = It(e), i; -1 < r && (Dt(e, A[r]), r = 0, t === a && !e[a] ? (e[l] = !1, e[a] = !0, i = "connected", r = 1, st && _.call(at, e) < 0 && at.push(e)) : t === l && !e[l] && (e[a] = !1, e[l] = !0, i = "disconnected", r = 1), r && (n = e[t + f] || e[i + f]) && n.call(e)) } function Kt() { } function Qt(e, t, r) { var i = r && r[c] || "", o = t.prototype, u = tt(o), a = t.observedAttributes || j, f = { prototype: u }; ot(u, m, { value: function () { if (Q) Q = !1; else if (!this[W]) { this[W] = !0, new t(this), o[m] && o[m].call(this); var e = G[Z.get(t)]; (!V || e.create.length > 1) && Zt(this) } } }), ot(u, h, { value: function (e) { -1 < _.call(a, e) && o[h].apply(this, arguments) } }), o[d] && ot(u, p, { value: o[d] }), o[v] && ot(u, g, { value: o[v] }), i && (f[c] = i), e = e.toUpperCase(), G[e] = { constructor: t, create: i ? [i, et(e)] : [e] }, Z.set(t, e), n[s](e.toLowerCase(), f), en(e), Y[e].r() } function Gt(e) { var t = G[e.toUpperCase()]; return t && t.constructor } function Yt(e) { return typeof e == "string" ? e : e && e.is || "" } function Zt(e) { var t = e[h], n = t ? e.attributes : j, r = n.length, i; while (r--) i = n[r], t.call(e, i.name || i.nodeName, null, i.value || i.nodeValue) } function en(e) { return e = e.toUpperCase(), e in Y || (Y[e] = {}, Y[e].p = new K(function (t) { Y[e].r = t })), Y[e].p } function tn() { X && delete e.customElements, B(e, "customElements", { configurable: !0, value: new Kt }), B(e, "CustomElementRegistry", { configurable: !0, value: Kt }); for (var t = function (t) { var r = e[t]; if (r) { e[t] = function (t) { var i, s; return t || (t = this), t[W] || (Q = !0, i = G[Z.get(t.constructor)], s = V && i.create.length === 1, t = s ? Reflect.construct(r, j, i.constructor) : n.createElement.apply(n, i.create), t[W] = !0, Q = !1, s || Zt(t)), t }, e[t].prototype = r.prototype; try { r.prototype.constructor = e[t] } catch (i) { z = !0, B(r, W, { value: e[t] }) } } }, r = i.get(/^HTML[A-Z]*[a-z]/), o = r.length; o--; t(r[o])); n.createElement = function (e, t) { var n = Yt(t); return n ? gt.call(this, e, et(n)) : gt.call(this, e) }, St || (Tt = !0, n[s]("")) } var n = e.document, r = e.Object, i = function (e) { var t = /^[A-Z]+[a-z]/, n = function (e) { var t = [], n; for (n in s) e.test(n) && t.push(n); return t }, i = function (e, t) { t = t.toLowerCase(), t in
        s || (s[e] = (s[e] || []).concat(t), s[t] = s[t.toUpperCase()] = e) }, s = (r.create || r)(null), o = {}, u, a, f, l; for (a in e) for (l in e[a]) { f = e[a][l], s[l] = f; for (u = 0; u < f.length; u++) s[f[u].toLowerCase()] = s[f[u].toUpperCase()] = l } return o.get = function (r) { return typeof r == "string" ? s[r] || (t.test(r) ? [] : "") : n(r) }, o.set = function (n, r) { return t.test(n) ? i(n, r) : i(r, n), o }, o }({ collections: { HTMLAllCollection: ["all"], HTMLCollection: ["forms"], HTMLFormControlsCollection: ["elements"], HTMLOptionsCollection: ["options"] }, elements: { Element: ["element"], HTMLAnchorElement: ["a"], HTMLAppletElement: ["applet"], HTMLAreaElement: ["area"], HTMLAttachmentElement: ["attachment"], HTMLAudioElement: ["audio"], HTMLBRElement: ["br"], HTMLBaseElement: ["base"], HTMLBodyElement: ["body"], HTMLButtonElement: ["button"], HTMLCanvasElement: ["canvas"], HTMLContentElement: ["content"], HTMLDListElement: ["dl"], HTMLDataElement: ["data"], HTMLDataListElement: ["datalist"], HTMLDetailsElement: ["details"], HTMLDialogElement: ["dialog"], HTMLDirectoryElement: ["dir"], HTMLDivElement: ["div"], HTMLDocument: ["document"], HTMLElement: ["element", "abbr", "address", "article", "aside", "b", "bdi", "bdo", "cite", "code", "command", "dd", "dfn", "dt", "em", "figcaption", "figure", "footer", "header", "i", "kbd", "mark", "nav", "noscript", "rp", "rt", "ruby", "s", "samp", "section", "small", "strong", "sub", "summary", "sup", "u", "var", "wbr"], HTMLEmbedElement: ["embed"], HTMLFieldSetElement: ["fieldset"], HTMLFontElement: ["font"], HTMLFormElement: ["form"], HTMLFrameElement: ["frame"], HTMLFrameSetElement: ["frameset"], HTMLHRElement: ["hr"], HTMLHeadElement: ["head"], HTMLHeadingElement: ["h1", "h2", "h3", "h4", "h5", "h6"], HTMLHtmlElement: ["html"], HTMLIFrameElement: ["iframe"], HTMLImageElement: ["img"], HTMLInputElement: ["input"], HTMLKeygenElement: ["keygen"], HTMLLIElement: ["li"], HTMLLabelElement: ["label"], HTMLLegendElement: ["legend"], HTMLLinkElement: ["link"], HTMLMapElement: ["map"], HTMLMarqueeElement: ["marquee"], HTMLMediaElement: ["media"], HTMLMenuElement: ["menu"], HTMLMenuItemElement: ["menuitem"], HTMLMetaElement: ["meta"], HTMLMeterElement: ["meter"], HTMLModElement: ["del", "ins"], HTMLOListElement: ["ol"], HTMLObjectElement: ["object"], HTMLOptGroupElement: ["optgroup"], HTMLOptionElement: ["option"], HTMLOutputElement: ["output"], HTMLParagraphElement: ["p"], HTMLParamElement: ["param"], HTMLPictureElement: ["picture"], HTMLPreElement: ["pre"], HTMLProgressElement: ["progress"], HTMLQuoteElement: ["blockquote", "q", "quote"], HTMLScriptElement: ["script"], HTMLSelectElement: ["select"], HTMLShadowElement: ["shadow"], HTMLSlotElement: ["slot"], HTMLSourceElement: ["source"], HTMLSpanElement: ["span"], HTMLStyleElement: ["style"], HTMLTableCaptionElement: ["caption"], HTMLTableCellElement: ["td", "th"], HTMLTableColElement: ["col", "colgroup"], HTMLTableElement: ["table"], HTMLTableRowElement: ["tr"], HTMLTableSectionElement: ["thead", "tbody", "tfoot"], HTMLTemplateElement: ["template"], HTMLTextAreaElement: ["textarea"], HTMLTimeElement: ["time"], HTMLTitleElement: ["title"], HTMLTrackElement: ["track"], HTMLUListElement: ["ul"], HTMLUnknownElement: ["unknown", "vhgroupv", "vkeygen"], HTMLVideoElement: ["video"] }, nodes: { Attr: ["node"], Audio: ["audio"], CDATASection: ["node"], CharacterData: ["node"], Comment: ["#comment"], Document: ["#document"], DocumentFragment: ["#document-fragment"], DocumentType: ["node"], HTMLDocument: ["#document"], Image: ["img"], Option: ["option"], ProcessingInstruction: ["node"], ShadowRoot: ["#shadow-root"], Text: ["#text"], XMLDocument: ["xml"] } }); typeof t != "object" && (t = { type: t || "auto" }); var s = "registerElement", o = "__" + s + (e.Math.random() * 1e5 >> 0), u = "addEventListener", a = "attached", f = "Callback", l = "detached", c = "extends", h = "attributeChanged" + f, p = a + f, d = "connected" + f, v = "disconnected" + f, m = "created" + f, g = l + f, y = "ADDITION", b = "MODIFICATION", w = "REMOVAL", E 
        = "DOMAttrModified", S = "DOMContentLoaded", x = "DOMSubtreeModified", T = "<", N = "=", C = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/, k = ["ANNOTATION-XML", "COLOR-PROFILE", "FONT-FACE", "FONT-FACE-SRC", "FONT-FACE-URI", "FONT-FACE-FORMAT", "FONT-FACE-NAME", "MISSING-GLYPH"], L = [], A = [], O = "", M = n.documentElement, _ = L.indexOf || function (e) { for (var t = this.length; t-- && this[t] !== e;); return t }, D = r.prototype, P = D.hasOwnProperty, H = D.isPrototypeOf, B = r.defineProperty, j = [], F = r.getOwnPropertyDescriptor, I = r.getOwnPropertyNames, q = r.getPrototypeOf, R = r.setPrototypeOf, U = !!r.__proto__, z = !1, W = "__dreCEv1", X = e.customElements, V = !/^force/.test(t.type) && !!(X && X.define && X.get && X.whenDefined), $ = r.create || r, J = e.Map || function () { var t = [], n = [], r; return { get: function (e) { return n[_.call(t, e)] }, set: function (e, i) { r = _.call(t, e), r < 0 ? n[t.push(e) - 1] = i : n[r] = i } } }, K = e.Promise || function (e) { function i(e) { n = !0; while (t.length) t.shift()(e) } var t = [], n = !1, r = { "catch": function () { return r }, then: function (e) { return t.push(e), n && setTimeout(i, 1), r } }; return e(i), r }, Q = !1, G = $(null), Y = $(null), Z = new J, et = function (e) { return e.toLowerCase() }, tt = r.create || function sn(e) { return e ? (sn.prototype = e, new sn) : this }, nt = R || (U ? function (e, t) { return e.__proto__ = t, e } : I && F ? function () { function e(e, t) { for (var n, r = I(t), i = 0, s = r.length; i < s; i++) n = r[i], P.call(e, n) || B(e, n, F(t, n)) } return function (t, n) { do e(t, n); while ((n = q(n)) && !H.call(n, t)); return t } }() : function (e, t) { for (var n in t) e[n] = t[n]; return e }), rt = e.MutationObserver || e.WebKitMutationObserver, it = (e.HTMLElement || e.Element || e.Node).prototype, st = !H.call(it, M), ot = st ? function (e, t, n) { return e[t] = n.value, e } : B, ut = st ? function (e) { return e.nodeType === 1 } : function (e) { return H.call(it, e) }, at = st && [], ft = it.attachShadow, lt = it.cloneNode, ct = it.dispatchEvent, ht = it.getAttribute, pt = it.hasAttribute, dt = it.removeAttribute, vt = it.setAttribute, mt = n.createElement, gt = mt, yt = rt && { attributes: !0, characterData: !0, attributeOldValue: !0 }, bt = rt || function (e) { Nt = !1, M.removeEventListener(E, bt) }, wt, Et = 0, St = s in n && !/^force-all/.test(t.type), xt = !0, Tt = !1, Nt = !0, Ct = !0, kt = !0, Lt, At, Ot, Mt, _t, Dt, Pt; St || (R || U ? (Dt = function (e, t) { H.call(t, e) || Xt(e, t) }, Pt = Xt) : (Dt = function (e, t) { e[o] || (e[o] = r(!0), Xt(e, t)) }, Pt = Dt), st ? (Nt = !1, function () { var e = F(it, u), t = e.value, n = function (e) { var t = new CustomEvent(E, { bubbles: !0 }); t.attrName = e, t.prevValue = ht.call(this, e), t.newValue = null, t[w] = t.attrChange = 2, dt.call(this, e), ct.call(this, t) }, r = function (e, t) { var n = pt.call(this, e), r = n && ht.call(this, e), i = new CustomEvent(E, { bubbles: !0 }); vt.call(this, e, t), i.attrName = e, i.prevValue = n ? r : null, i.newValue = t, n ? i[b] = i.attrChange = 1 : i[y] = i.attrChange = 0, ct.call(this, i) }, i = function (e) { var t = e.currentTarget, n = t[o], r = e.propertyName, i; n.hasOwnProperty(r) && (n = n[r], i = new CustomEvent(E, { bubbles: !0 }), i.attrName = n.name, i.prevValue = n.value || null, i.newValue = n.value = t[r] || null, i.prevValue == null ? i[y] = i.attrChange = 0 : i[b] = i.attrChange = 1, ct.call(t, i)) }; e.value = function (e, s, u) { e === E && this[h] && this.setAttribute !== r && (this[o] = { className: { name: "class", value: this.className } }, this.setAttribute = r, this.removeAttribute = n, t.call(this, "propertychange", i)), t.call(this, e, s, u) }, B(it, u, e) }()) : rt || (M[u](E, bt), M.setAttribute(o, 1), M.removeAttribute(o), Nt && (Lt = function (e) { var t = this, n, r, i; if (t === e.target) { n = t[o], t[o] = r = Ot(t); for (i in r) { if (!(i in n)) return At(0, t, i, n[i], r[i], y); if (r[i] !== n[i]) return At(1, t, i, n[i], r[i], b) } for (i in n) if (!(i in r)) return At(2, t, i, n[i]
        , r[i], w) } }, At = function (e, t, n, r, i, s) { var o = { attrChange: e, currentTarget: t, attrName: n, prevValue: r, newValue: i }; o[s] = e, Rt(o) }, Ot = function (e) { for (var t, n, r = {}, i = e.attributes, s = 0, o = i.length; s < o; s++) t = i[s], n = t.name, n !== "setAttribute" && (r[n] = t.value); return r })), n[s] = function (t, r) { p = t.toUpperCase(), xt && (xt = !1, rt ? (Mt = function (e, t) { function n(e, t) { for (var n = 0, r = e.length; n < r; t(e[n++])); } return new rt(function (r) { for (var i, s, o, u = 0, a = r.length; u < a; u++) i = r[u], i.type === "childList" ? (n(i.addedNodes, e), n(i.removedNodes, t)) : (s = i.target, kt && s[h] && i.attributeName !== "style" && (o = ht.call(s, i.attributeName), o !== i.oldValue && s[h](i.attributeName, i.oldValue, o))) }) }(Ft(a), Ft(l)), _t = function (e) { return Mt.observe(e, { childList: !0, subtree: !0 }), e }, _t(n), ft && (it.attachShadow = function () { return _t(ft.apply(this, arguments)) })) : (wt = [], n[u]("DOMNodeInserted", Ut(a)), n[u]("DOMNodeRemoved", Ut(l))), n[u](S, zt), n[u]("readystatechange", zt), it.cloneNode = function (e) { var t = lt.call(this, !!e), n = It(t); return -1 < n && Pt(t, A[n]), e && O.length && jt(t.querySelectorAll(O)), t }); if (Tt) return Tt = !1; -2 < _.call(L, N + p) + _.call(L, T + p) && $t(t); if (!C.test(p) || -1 < _.call(k, p)) throw new Error("The type " + t + " is invalid"); var i = function () { return o ? n.createElement(f, p) : n.createElement(f) }, s = r || D, o = P.call(s, c), f = o ? r[c].toUpperCase() : p, p, d; return o && -1 < _.call(L, T + f) && $t(f), d = L.push((o ? N : T) + p) - 1, O = O.concat(O.length ? "," : "", o ? f + '[is="' + t.toLowerCase() + '"]' : f), i.prototype = A[d] = P.call(s, "prototype") ? s.prototype : tt(it), O.length && Bt(n.querySelectorAll(O), a), i }, n.createElement = gt = function (e, t) { var r = Yt(t), i = r ? mt.call(n, e, et(r)) : mt.call(n, e), s = "" + e, o = _.call(L, (r ? N : T) + (r || s).toUpperCase()), u = -1 < o; return r && (i.setAttribute("is", r = r.toLowerCase()), u && (u = qt(s.toUpperCase(), r))), kt = !n.createElement.innerHTMLHelper, u && Pt(i, A[o]), i }), Kt.prototype = { constructor: Kt, define: V ? function (e, t, n) { if (n) Qt(e, t, n); else { var r = e.toUpperCase(); G[r] = { constructor: t, create: [r] }, Z.set(t, r), X.define(e, t) } } : Qt, get: V ? function (e) { return X.get(e) || Gt(e) } : Gt, whenDefined: V ? function (e) { return K.race([X.whenDefined(e), en(e)]) } : en }; if (!X || /^force/.test(t.type)) tn(); else if (!t.noBuiltIn) try { (function (t, r, i) { r[c] = "a", t.prototype = tt(HTMLAnchorElement.prototype), t.prototype.constructor = t, e.customElements.define(i, t, r); if (ht.call(n.createElement("a", { is: i }), "is") !== i || V && ht.call(new t, "is") !== i) throw r })(function on() { return Reflect.construct(HTMLAnchorElement, [], on) }, {}, "document-register-element-a") } catch (nn) { tn() } if (!t.noBuiltIn) try { mt.call(n, "a", "a") } catch (rn) { et = function (e) { return { is: e.toLowerCase() } } } })(win);
    }

    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    const isMobile = navigator.isMobile || /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    const isIE =    navigator.appName == 'Microsoft Internet Exporer' ||
                    !!(navigator.userAgent.match(/Trident/) ||
                    navigator.userAgent.match(/rv 11/));


    const versionIE = (() => {
        let rv = -1;
        if (win['isIE']) {
            let ua = navigator.userAgent;
            let re = new RegExp((ua.lastIndexOf('rv:') > 0 ? 'rv:' : (ua.lastIndexOf('MSIE ') > 0 ? 'MSIE ' : 'Edge/')) + "([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null) {
                rv = parseFloat(RegExp.$1);
            }
        }
        return rv;
    })();

    /**
     * @name SincoInitializationError
     * 
     * @description Objeto que muestra una excepción al inicializar un objeto de S5/Sinco
     * @param {String} m String para mostrar como mensaje de error
     */
    const SincoInitializationError = function (m) {
        this.name = 'Sinco Initialization Error';
        this.message = m;
    }
    SincoInitializationError.prototype = Error.prototype;
    win['SincoInitializationError'] = SincoInitializationError;

    const s5 = fac(win, doc);

    const def = (n, v) => 
        o.defineProperty(win, n, {
            get: () => v,
            set: (v) => { throw new ReferenceError('¡El elemento no se puede eliminar ni reasignar!') },
            enumerable: false,
            configurable: false
        });

    def('isIE', isIE);
    def('isFirefox', isFirefox);
    def('isMobile', isMobile);
    def('versionIE', versionIE);
    def('s5', s5);
    def('Sinco', s5);

})(typeof window !== 'undefined' ? window : this, document, (win, doc) => {

    const arr = [];
    const o = Object;
    const s = String;

    const _get = function (id) {
        id = id.toString();
        let dis = ( this.attribute == __htmlElementsProps.attribute ? this : doc );
        if ( id.lastIndexOf('.') > -1 ) {
            return s5.map(dis.querySelectorAll(id), (elem) => s5.extend(elem));
        }
        else {
            let el = dis.querySelector('#' + id);

            if ( el ) {
                el = s5.extend(el);
            }

            return el;
        }
    };

    const _createElem = (type, attr) => {
        let ele = s5.extend(doc.createElement(type));
        attr = attr || {};
        let k = Object.keys(attr).stream();
        while (k.next()){
            ele.attribute(k.value, attr[k.value]);
        }
        return ele;
    };

    const _attribute = function (name, value) {
        if ( !value ) return this.getAttribute(name);
        else {
            this.setAttribute(name, value);
            _dispatch.call(this, 'attribute', { name: name, value: value });
            return this;
        }
    };

    const _insert = function (e, opc) {
        if (Array.isArray(e)) {
            //let orig = this;
            e.forEach((el) => this.appendChild(el));
        }
        else if (typeof opc === 'undefined' || (typeof opc === 'boolean' && !opc)) {
            this.appendChild(e);
        }
        else if (typeof opc === 'number') {
            if (this.childNodes[opc]) {
                this.insertBefore(e, this.childNodes[opc]);
            }
            else {
                this.appendChild(e);
            }
        }
        else {
            this.insertBefore(e, this.firstChild);
        }

        if (this.listeners['insert']) {
            _dispatch.call(this, 'insert');
        }
        return this;
    };

    const _addEvent = function (type, callback) {
        let _this = this;

        if (_this.addEventListener) {
            _this['_' + type] = callback;
            _this.addEventListener(type, callback, false);
        }
        else if (_this.attachEvent) {
            _this['_' + type] = callback;
            _this['e' + type + callback] = callback;
            _this[type + callback] = () => _this['e' + type + callback](win.event);
            _this.attachEvent('on' + type, _this[type + callback]);
        }
        return _this;
    };

    const _removeEvent = function (type, callback) {
        if (this.detachEvent) {
            this.detachEvent('on' + type, this[type + callback]);
            this[type + callback] = null;
        }
        else
            this.removeEventListener(type, callback, false);
        return this;
    };

    const _styles = function (name, value) {
        if (!value)
            return this.style[name];
        else {
            this.style[name] = value;
            return this;
        }
    };

    const _on = function (eventName, listener) {
        if (!this.listeners[eventName]) this.listeners[eventName] = [];
        this.listeners[eventName].push(listener);
    };

    const _off = function (eventName) {
        this.listeners[eventName] = [];
    };

    const _delete = function (ele) {
        let _this = ele || this;
        const _r = s5.extend(_this.cloneNode());
        if (!_this.remove) {
            if (_this.parentElement)
                _this.parentElement.removeChild(_this);
        }
        else
            _this.remove();
        return _r;
    };

    const _dispatch = function (eventName, values) {
        if (this.listeners[eventName]) {
            for (const i = 0; this.listeners[eventName] && i < this.listeners[eventName].length; i++) {
                this.listeners[eventName][i](this, values);
            }
        }
    };

    const __htmlElementsProps = {
        get: _get,
        attribute: _attribute,
        insert: _insert,
        addEvent: _addEvent,
        removeEvent: _removeEvent,
        styles: _styles,
        on: _on,
        off: _off,
        dispatch: _dispatch,
        'delete': _delete
    };

    const _fileToBase64 = (f, c) => {
        if (f){
            if (FileReader) {
                if (f instanceof File) {
                    let FR = new FileReader();
                    FR.name = f.name;
                    FR.size = f.size;
                    FR.onload = function (e) {
                        if (c) {
                            c({
                                'name': this.name,
                                'src': e.target.result.split(',').pop(),
                                'kilobytes': this.size
                            });
                        }
                    };
                    FR.readAsDataURL(f);
                }
                else {
                    throw new SincoInitializationError('¡El primer parámetro debe ser de tipo "File"!');
                }
            }
            else {
                throw new SincoInitializationError('¡El navegador no soporta esta funcionalidad!');
            }
        }
    };

    const _map = (obj, iterator) => arr.map.call(obj, iterator);

    const _filter = (obj, iterator) => arr.filter.call(obj, iterator);

    const _reduce = (obj, iterator, memo) => arr.reduce.call(obj, iterator, memo);

    const _validacionesOnClick = (config) => {
        doc.addEventListener('click', (event) => {
            let _target = event.target || event.srcElement;
            if (_target.nodeName.toLowerCase() !== 'body') {
                let encontrado,
                    excepcionEncontrada;

                const validarClick = function (obj, target) {
                    encontrado = false;
                    excepcionEncontrada = false;
                    if (!!target && target.nodeName.toLowerCase() !== 'html') {
                        while (target.nodeName.toLowerCase() !== 'body') {
                            if (!excepcionEncontrada) {
                                for (let i = 0; i < obj.excepciones.length; i++) {
                                    if (target.classList && obj.excepciones[i].startsWith('.') && target.classList.contains(obj.excepciones[i].replace('.', ''))) {
                                        excepcionEncontrada = true;
                                        break;
                                    }
                                    else if (target.id == obj.excepciones[i]) {
                                        excepcionEncontrada = true;
                                        break;
                                    }
                                }
                            }

                            if ((obj.target instanceof Array && obj.target.indexOf(target.id) >= 0) || target.id == obj.target) {
                                encontrado = true;
                                break;
                            }
                            target = target.parentNode;
                        }
                    }

                    if (!obj.iguales && !encontrado && !excepcionEncontrada) {
                        obj.funcion();
                    }
                    else if (obj.iguales && encontrado && !excepcionEncontrada) {
                        obj.funcion();
                    }
                }

                config.forEach((obj) => validarClick(obj, _target));
            }
        }, true);
    };

    const _extend = (el, opt) => {
        if (!el) return null;
        opt = opt || __htmlElementsProps;

        let extendProps = function (el, opt) {
            for (const n in opt) {
                if (el[n] !== null && typeof el[n] == 'object' && !(el[n] instanceof Array))
                    extendProps(el[n], opt[n]);
                else
                    el[n] = opt[n];
            }
            return el;
        }

        el = extendProps(el, opt);
        el.listeners = el.listeners || {};

        return el;
    };

    const _addStyles = (e, p) => {
        e = s5.extend(e);
        for (const key in p)
            e.styles(key, p[key]);
    };

    const _parseXml = (xmlStr) => {
        if (win.DOMParser) {
            return new win.DOMParser().parseFromString(xmlStr, 'text/xml');
        }
        let xmlDoc = null;
        if (typeof win.ActiveXObject != 'undefined' && !!(xmlDoc = new win.ActiveXObject('Microsoft.XMLDOM'))) {
            xmlDoc.async = 'false';
            xmlDoc.loadXML(xmlStr);
        }
        return xmlDoc;
    };

    let _QueryString = {
        toString: () => {
            let retorno = '',
                sep = '';
            for (const name in s5.QueryString) {
                if (typeof s5.QueryString[name] !== 'function') {
                    retorno += sep + name + '=' + s5.QueryString[name];
                    sep = '&';
                }
            }
            return retorno;
        },
        hasProperties: () => {
            for (const name in s5.QueryString)
                if (typeof s5.QueryString[name] !== 'function')
                    return true;
            return false;
        }
    };

    (() => {
        const hashes = win.location.href.slice(win.location.href.indexOf('?') + 1).split('&');
        if (win.location.href.lastIndexOf(hashes[0]) != 0) {
            hashes.forEach((hash) => _QueryString[hash.split('=')[0].toLowerCase()] = hash.split('=')[1].split('#').shift());
        }
    })();

    let _script = (() => {
        const extractHostname = (url) => {
            let hostname;

            if (url.indexOf("://") > -1) {
                hostname = url.split('/')[2];
            }
            else {
                hostname = url.split('/')[0];
            }

            hostname = hostname.split(':')[0];
            hostname = hostname.split('?')[0];

            return hostname;
        }

        let _url = win.location.href.split('/');
        _url.pop();

        let _s = doc.getElementsByTagName('script');
        let _src = _s[_s.length - 1].src;

        const _domain = extractHostname(_src);
        const _urlOriginal = _src;

        _src = _src.replaceAll(_url.join('/'), '').split('/');
        _s = _src.pop();
        _src.shift();

        return {
            name: _s.split('.').shift(),
            url: _s,
            path: _src.join('/'),
            originalUrl: _urlOriginal.split(_s).join(''),
            host: _domain,
            locationHost: extractHostname(win.location.href)
        };
    })();

    let modules = [],
        pending = [],
        loaded = [];

    const _define = (name, _dependencies, _module) => {
        let dependencies, module;
        if (typeof _dependencies === 'function'){
            module = _dependencies;
            dependencies = _require.extractDependencies(module);
        }
        else {
            dependencies = _dependencies;
            module = _module;
        }

        if (!dependencies || !dependencies.length) {
            loaded.push(name);

            modules[name] = {
                name: name,
                callback: module,
                module: module(),
                loaded: true,
                dependencies: []
            };
        }
        else {
            modules[name] = {
                name: name,
                callback: module,
                loaded: false,
                dependencies: dependencies
            };
        }

        _unroll();

        if (_require.onModule)
            _require.onModule(modules[name]);

        return modules[name];
    }

    const _require = (_dependencies, _callback) => {
        let dependencies, callback;
        if (typeof _dependencies === 'function') {
            callback = _dependencies;
            dependencies = _require.extractDependencies(callback);
        }
        else {
            dependencies = _dependencies;
            callback = _callback;
        }

        let module = {
            callback: callback,
            dependencies: dependencies
        };

        modules.push(module);

        if (_require.onModule)
            _require.onModule(module);

        _unroll();

        return module;
    };

    const _unroll = () => {
        s5.map(Object.keys(modules), (name) => modules[name])
            .concat(modules)
            .forEach((module) => {
                if (!module.loaded && module.dependencies.every((depn) =>loaded.indexOf(depn) !== -1)) {
                    loaded.push(module.name);
                    module.loaded = true;
                    module.module = module.callback.apply(null, module.dependencies
                        .map((depn) => modules[depn].module));

                    _unroll();
                }
            });
    };

    _require.extractDependencies = (fn) => {
        fn = fn.toString();

        fn = fn.replace(/\/\*[^(?:\*\/)]+\*\//g, '');
        if (fn.indexOf('function') >= 0){
            fn = fn.match(/function \(([^\)]*)\)/)[1];
        }
        else{
            fn = fn.match(/\(([^\)]*)\)(.|)+(=>)+/)[1];
        }

        return fn ? fn.split(',').map((dependency) => dependency.trim()) : [];
    };

    _require.loadScript = (src, callback) => {
        let script = doc.createElement('script');
        script.onload = callback;
        script.onerror = () => Sinco.extend(script)['delete']();

        doc.getElementsByTagName('head')[0].appendChild(script);
        script.src = src + (win['version-js'] ? '?v=' + win['version-js'] : '');
    };

    _require.modules = modules;

    const _init = (plugins, fnEnd) => {
        let url = win.location.href.split('/');
        url.pop();
        let src = s5.map(doc.getElementsByTagName('script'), (sc) => sc).pop().src.replaceAll(url.join('/'), '').split('/');
        src.shift();
        src.pop();
        src = src.join('/');

        let modulos, version;

        const getVersion = () => {
            let splitted = doc.querySelector('script[src*="s5.js"]').src.split('=');
            if (splitted.length > 1) {
                version = splitted.pop();
            }
        };

        const addOnModule = () => {
            plugins = null;
            if (modulos && modulos.dependencies) {
                modulos.dependencies.forEach((dependency) => {
                    if (pending.indexOf(dependency) == -1) {
                        _require.loadScript(src + '/' + dependency + '.js', function () {
                            //pending.splice(pending.indexOf(dependency), 1);
                        });

                        pending.push(dependency);
                    }
                });
            }
            if (!!fnEnd && typeof fnEnd === "function") {
                fnEnd();
            }
        };

        if (plugins) {
            let sum = 0;
            getVersion();
            plugins.forEach((script) => {
                let _url = 's5.' + script + '.js' + (version ? '?v=' + version : '');

                if (s5.script.locationHost != s5.script.host) {
                    _url = s5.script.originalUrl + _url;
                }
                else {
                    _url = s5.script.path + '/' + _url;
                }

                _require.loadScript(_url, () => {
                    sum++;
                    if (sum == plugins.length) {
                        addOnModule();
                    }
                });
            });
        }

        _require.onModule = (module) => {
            modulos = module;
            if (!plugins) {
                addOnModule();
            }
        };

        return {
            require: _require,
            define: _define
        }
    };

    const _interpolate = (str) => function interpolate(o) {
            return str.replace(/\${([^{}]*)}/g, function (a, b) {
                var r = typeof o[b] == "function" ? o[b]() : o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            });
    };

    const _model = {
        create: (clase, data) => new win[clase](data),
        define: (nombreClase, props, functions) => {
            const propiedades_Clase = o.keys(props);
            const funciones = o.keys(functions);
                
            win[nombreClase] = (new Function('parametros_NuevaInstancia', 'return (props_Clase, funcion_Constructor) => { \
                return function ' + nombreClase + ' (parametros_NuevaInstancia) { \
                    let obj = this; \
                    props_Clase.forEach((key) => obj[key] = parametros_NuevaInstancia[key]); \
                    funcion_Constructor.call(this); \
                    return obj; \
                }; \
            };')())(propiedades_Clase, functions.constructor);

            funciones.forEach((key) => win[nombreClase].prototype[key] = functions[key]);

            const extend = function (name, props, functions) {

                const ext = (el, opt) => {
                    for (const n in opt)
                        el[n] = opt[n];
                    return el;
                };

                functions = functions || {};

                ext(props, this.props);
                ext(functions, this.functions);

                return _model.define(name, props, functions);
            }

            win[nombreClase].prototype.validate = function () { };

            return {
                extend: extend,
                props: props,
                functions: functions
            }
        }
    };

    const _watch = function (obj, prop, callback) {
        let oldValue = obj[prop]
            , newValue = oldValue
            , getter = () => newValue
            , setter = (value) => {
                oldValue = newValue;
                newValue = value;
                callback.call(obj, prop, oldValue, newValue);
            };
        if (delete obj[prop]) {
            o.defineProperty(obj, prop, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
        return this;
    };

    const _Request = (method, url, fn, data, contentType, includeAccept) => {
        const f = () => { };
        includeAccept = typeof includeAccept == 'boolean' ? includeAccept : true;
        fn = fn || {};

        let functions = {};
        functions['200'] =  fn.Ok || f;
        functions['201'] =  fn.Created || f;
        functions['204'] =  fn.NoContent || f;
        functions['302'] =  fn.Moved || f;
        functions['400'] =  fn.BadRequest || f;
        functions['401'] =  fn.Unauthorized || f;
        functions['404'] =  fn.NotFound || f;
        functions['500'] = 
        functions['0'] =    fn.InternalServerError || f;
        functions['504'] =  fn.GatewayTimeout || f;
        functions['408'] =  () => alert('No se puede establecer comunicación con el servidor');
        functions['409'] =  () => {
            alert('Se cerrará esta sesión porque el usuario ha ingresado en otro dispositivo');
            win.location.href = 'login.aspx';
        };
        functions['412'] =  () => {
            console.log('Posiblemente la sesión no se comparte entre el marco y el módulo');
            if (!alerta) {
                alerta = true;
                alert('No existe Sesión');
            }
            win.location.href = 'login.aspx';
        };

        const types = {
            JSON: 'application/json; charset=utf-8',
            XML: 'application/xml; charset=utf-8',
            TEXT: 'text/plain; charset=utf-8',
            DEFAULT: 'application/x-www-form-urlencoded'
        };

        const _exec = (fn, text, viewContent) => {
            if (viewContent) {
                switch (contentType.toUpperCase()) {
                    case 'JSON':
                    case 'DEFAULT':
                        text = JSON.tryParse(text);
                        break;
                    case 'XML':
                        text = _parseXml(text);
                        break;
                }
            }

            fn(text);
        };

        contentType = contentType || 'json';

        let http = new XMLHttpRequest();
        http.open(method, url, true);

        if (includeAccept === true) {
            http.setRequestHeader('Accept', 'application/json, text/javascript');
        }

        http.setRequestHeader('Content-type', types.hasOwnProperty(contentType.toUpperCase()) ? types[contentType.toUpperCase()] : contentType);

        const header = _Request.headersConfig.find((header) => url.toLowerCase().startsWith(header.url.toLowerCase()));

        if (header != undefined) {
            http.setRequestHeader(header.type, header.value);
        }

        let alerta;
        const __switch = [200, 201];

        http.onreadystatechange = () => {
            if (http.readyState == 4) {
                _exec( functions[http.status], http.responseText, __switch.contains(http.status) );
            }
        };
        if (data) {
            if (contentType.toUpperCase() == 'DEFAULT') {
                let params = [];
                for (const attr in data) {
                    if (data[attr] instanceof Array) {
                        if (!!data[attr].length) {
                            data[attr].forEach((d) =>
                                params.push(s.format('{0}={1}', attr, encodeURIComponent(d))));
                        }
                        else {
                            params.push(s.format('{0}={1}', attr, ''));
                        }
                    }
                    else {
                        params.push(s.format('{0}={1}', attr, encodeURIComponent(data[attr])));
                    }
                }
                http.send(params.join('&'));
            }
            else if (contentType.toUpperCase() == 'TEXT') {
                http.send(data);
            }
            else {
                http.send(JSON.stringify(data));
            }
        }
        else
            http.send();

        return http;
    };

    o.defineProperty(_Request, 'headersConfig', {
        value: [],
        enumerable: false,
        configurable: false
    });

    _Request.setHeader = (url, type, value) => _Request.headersConfig.push({ url: url, type: type, value: value });

    return {
        fileToBase64: _fileToBase64,
        map: _map,
        filter: _filter,
        QueryString: _QueryString,
        script: _script,
        initialize: _init,
        interpolate: _interpolate,
        model: _model,
        watch: _watch,
        Request: _Request,

        utilities: {
            onClickValidations: _validacionesOnClick,
            addStyles: _addStyles,
            parseXml: _parseXml
        },

        get: _get,
        extend: _extend,
        createElem: _createElem,
        'delete': _delete
    };
});