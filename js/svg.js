/*!
 * Copyright (c) 2021 Momo Bassit.
 * Licensed under the MIT License (MIT)
 * https://github.com/mdbassit/Coloris
 */
!(function (u, d, s, c) {
  var p,
    f,
    h,
    i,
    b,
    v,
    y,
    g,
    m,
    l,
    w,
    k,
    L,
    E,
    a,
    n,
    r = d.createElement("canvas").getContext("2d"),
    x = { r: 0, g: 0, b: 0, h: 0, s: 0, v: 0, a: 1 },
    A = {},
    S = {
      el: "[data-coloris]",
      parent: "body",
      theme: "default",
      themeMode: "light",
      rtl: !1,
      wrap: !0,
      margin: 2,
      format: "hex",
      formatToggle: !1,
      swatches: [],
      swatchesOnly: !1,
      alpha: !0,
      forceAlpha: !1,
      focusInput: !0,
      selectInput: !1,
      inline: !1,
      defaultColor: "#000000",
      clearButton: !1,
      clearLabel: "Clear",
      closeButton: !1,
      closeLabel: "Close",
      onChange: function () {
        return c;
      },
      a11y: {
        open: "Open color picker",
        close: "Close color picker",
        clear: "Clear the selected color",
        marker: "Saturation: {s}. Brightness: {v}.",
        hueSlider: "Hue slider",
        alphaSlider: "Opacity slider",
        input: "Color value field",
        format: "Color format",
        swatch: "Color swatch",
        instruction:
          "Saturation and brightness selector. Use up, down, left and right arrow keys to select.",
      },
    },
    o = {},
    C = "",
    T = {},
    B = !1;
  function M(e) {
    if ("object" == typeof e)
      for (var t in e)
        switch (t) {
          case "el":
            N(e.el), !1 !== e.wrap && j(e.el);
            break;
          case "parent":
            (p = d.querySelector(e.parent)) &&
              (p.appendChild(f),
              (S.parent = e.parent),
              p === d.body && (p = c));
            break;
          case "themeMode":
            (S.themeMode = e.themeMode),
              "auto" === e.themeMode &&
                u.matchMedia &&
                u.matchMedia("(prefers-color-scheme: dark)").matches &&
                (S.themeMode = "dark");
          case "theme":
            e.theme && (S.theme = e.theme),
              (f.className =
                "clr-picker clr-" + S.theme + " clr-" + S.themeMode),
              S.inline && I();
            break;
          case "rtl":
            (S.rtl = !!e.rtl),
              d.querySelectorAll(".clr-field").forEach(function (e) {
                return e.classList.toggle("clr-rtl", S.rtl);
              });
            break;
          case "margin":
            (e.margin *= 1), (S.margin = (isNaN(e.margin) ? S : e).margin);
            break;
          case "wrap":
            e.el && e.wrap && j(e.el);
            break;
          case "formatToggle":
            (S.formatToggle = !!e.formatToggle),
              (z("clr-format").style.display = S.formatToggle
                ? "block"
                : "none"),
              S.formatToggle && (S.format = "auto");
            break;
          case "swatches":
            Array.isArray(e.swatches) &&
              (function () {
                var a = [];
                e.swatches.forEach(function (e, t) {
                  a.push(
                    '<button type="button" id="clr-swatch-' +
                      t +
                      '" aria-labelledby="clr-swatch-label clr-swatch-' +
                      t +
                      '" style="color: ' +
                      e +
                      ';">' +
                      e +
                      "</button>"
                  );
                }),
                  (z("clr-swatches").innerHTML = a.length
                    ? "<div>" + a.join("") + "</div>"
                    : ""),
                  (S.swatches = e.swatches.slice());
              })();
            break;
          case "swatchesOnly":
            (S.swatchesOnly = !!e.swatchesOnly),
              f.setAttribute("data-minimal", S.swatchesOnly);
            break;
          case "alpha":
            (S.alpha = !!e.alpha), f.setAttribute("data-alpha", S.alpha);
            break;
          case "inline":
            (S.inline = !!e.inline),
              f.setAttribute("data-inline", S.inline),
              S.inline &&
                ((l = e.defaultColor || S.defaultColor), (E = q(l)), I(), W(l));
            break;
          case "clearButton":
            "object" == typeof e.clearButton &&
              (e.clearButton.label &&
                ((S.clearLabel = e.clearButton.label),
                (y.innerHTML = S.clearLabel)),
              (e.clearButton = e.clearButton.show)),
              (S.clearButton = !!e.clearButton),
              (y.style.display = S.clearButton ? "block" : "none");
            break;
          case "clearLabel":
            (S.clearLabel = e.clearLabel), (y.innerHTML = S.clearLabel);
            break;
          case "closeButton":
            (S.closeButton = !!e.closeButton),
              S.closeButton ? f.insertBefore(g, b) : b.appendChild(g);
            break;
          case "closeLabel":
            (S.closeLabel = e.closeLabel), (g.innerHTML = S.closeLabel);
            break;
          case "a11y":
            var a,
              l,
              r = e.a11y,
              n = !1;
            if ("object" == typeof r)
              for (var o in r)
                r[o] && S.a11y[o] && ((S.a11y[o] = r[o]), (n = !0));
            n &&
              ((a = z("clr-open-label")),
              (l = z("clr-swatch-label")),
              (a.innerHTML = S.a11y.open),
              (l.innerHTML = S.a11y.swatch),
              g.setAttribute("aria-label", S.a11y.close),
              y.setAttribute("aria-label", S.a11y.clear),
              m.setAttribute("aria-label", S.a11y.hueSlider),
              w.setAttribute("aria-label", S.a11y.alphaSlider),
              v.setAttribute("aria-label", S.a11y.input),
              h.setAttribute("aria-label", S.a11y.instruction));
            break;
          default:
            S[t] = e[t];
        }
  }
  function H(e, t) {
    "string" == typeof e && "object" == typeof t && ((o[e] = t), (B = !0));
  }
  function O(e) {
    delete o[e], 0 === Object.keys(o).length && ((B = !1), e === C && D());
  }
  function t(l) {
    if (B) {
      var e,
        r = ["el", "wrap", "rtl", "inline", "defaultColor", "a11y"];
      for (e in o)
        if (
          "break" ===
          (function (e) {
            var t = o[e];
            if (l.matches(e)) {
              for (var a in ((C = e),
              (T = {}),
              r.forEach(function (e) {
                return delete t[e];
              }),
              t))
                T[a] = Array.isArray(S[a]) ? S[a].slice() : S[a];
              return M(t), "break";
            }
          })(e)
        )
          break;
    }
  }
  function D() {
    0 < Object.keys(T).length && (M(T), (C = ""), (T = {}));
  }
  function N(e) {
    J(d, "click", e, function (e) {
      S.inline ||
        (t(e.target),
        (L = e.target),
        (a = L.value),
        (E = q(a)),
        f.classList.add("clr-open"),
        I(),
        W(a),
        (S.focusInput || S.selectInput) &&
          (v.focus({ preventScroll: !0 }),
          v.setSelectionRange(L.selectionStart, L.selectionEnd)),
        S.selectInput && v.select(),
        (n || S.swatchesOnly) && $().shift().focus(),
        L.dispatchEvent(new Event("open", { bubbles: !0 })));
    }),
      J(d, "input", e, function (e) {
        var t = e.target.parentNode;
        t.classList.contains("clr-field") && (t.style.color = e.target.value);
      });
  }
  function I() {
    var e,
      t,
      a,
      l,
      r = p,
      n = u.scrollY,
      o = f.offsetWidth,
      c = f.offsetHeight,
      i = { left: !1, top: !1 },
      s = { x: 0, y: 0 };
    r &&
      ((a = u.getComputedStyle(r)),
      (e = parseFloat(a.marginTop)),
      (l = parseFloat(a.borderTopWidth)),
      ((s = r.getBoundingClientRect()).y += l + n)),
      S.inline ||
        ((a = (t = L.getBoundingClientRect()).x),
        (l = n + t.y + t.height + S.margin),
        r
          ? ((a -= s.x),
            (l -= s.y),
            a + o > r.clientWidth && ((a += t.width - o), (i.left = !0)),
            l + c > r.clientHeight - e &&
              c + S.margin <= t.top - (s.y - n) &&
              ((l -= t.height + c + 2 * S.margin), (i.top = !0)),
            (l += r.scrollTop))
          : (a + o > d.documentElement.clientWidth &&
              ((a += t.width - o), (i.left = !0)),
            l + c - n > d.documentElement.clientHeight &&
              c + S.margin <= t.top &&
              ((l = n + t.y - c - S.margin), (i.top = !0))),
        f.classList.toggle("clr-left", i.left),
        f.classList.toggle("clr-top", i.top),
        (f.style.left = a + "px"),
        (f.style.top = l + "px"),
        (s.x += f.offsetLeft),
        (s.y += f.offsetTop)),
      (A = {
        width: h.offsetWidth,
        height: h.offsetHeight,
        x: h.offsetLeft + s.x,
        y: h.offsetTop + s.y,
      });
  }
  function j(e) {
    d.querySelectorAll(e).forEach(function (e) {
      var t,
        a,
        l = e.parentNode;
      l.classList.contains("clr-field") ||
        ((t = d.createElement("div")),
        (a = "clr-field"),
        (S.rtl || e.classList.contains("clr-rtl")) && (a += " clr-rtl"),
        (t.innerHTML =
          '<button type="button" aria-labelledby="clr-open-label"></button>'),
        l.insertBefore(t, e),
        t.setAttribute("class", a),
        (t.style.color = e.value),
        t.appendChild(e));
    });
  }
  function R(e) {
    var t;
    L &&
      !S.inline &&
      ((t = L),
      e &&
        ((L = c),
        a !== t.value &&
          ((t.value = a),
          t.dispatchEvent(new Event("input", { bubbles: !0 })))),
      setTimeout(function () {
        a !== t.value && t.dispatchEvent(new Event("change", { bubbles: !0 }));
      }),
      f.classList.remove("clr-open"),
      B && D(),
      t.dispatchEvent(new Event("close", { bubbles: !0 })),
      S.focusInput && t.focus({ preventScroll: !0 }),
      (L = c));
  }
  function W(e) {
    var t = (function (e) {
        var t;
        (r.fillStyle = "#000"),
          (r.fillStyle = e),
          (e =
            /^((rgba)|rgb)[\D]+([\d.]+)[\D]+([\d.]+)[\D]+([\d.]+)[\D]*?([\d.]+|$)/i.exec(
              r.fillStyle
            ))
            ? ((t = { r: +e[3], g: +e[4], b: +e[5], a: +e[6] }).a =
                +t.a.toFixed(2))
            : ((e = r.fillStyle
                .replace("#", "")
                .match(/.{2}/g)
                .map(function (e) {
                  return parseInt(e, 16);
                })),
              (t = { r: e[0], g: e[1], b: e[2], a: 1 }));
        return t;
      })(e),
      e = (function (e) {
        var t = e.r / 255,
          a = e.g / 255,
          l = e.b / 255,
          r = s.max(t, a, l),
          n = s.min(t, a, l),
          o = r - n,
          c = r,
          i = 0,
          n = 0;
        o &&
          (r === t && (i = (a - l) / o),
          r === a && (i = 2 + (l - t) / o),
          r === l && (i = 4 + (t - a) / o),
          r && (n = o / r));
        return {
          h: (i = s.floor(60 * i)) < 0 ? i + 360 : i,
          s: s.round(100 * n),
          v: s.round(100 * c),
          a: e.a,
        };
      })(t);
    P(e.s, e.v),
      G(t, e),
      (m.value = e.h),
      (f.style.color = "hsl(" + e.h + ", 100%, 50%)"),
      (l.style.left = (e.h / 360) * 100 + "%"),
      (i.style.left = (A.width * e.s) / 100 + "px"),
      (i.style.top = A.height - (A.height * e.v) / 100 + "px"),
      (w.value = 100 * e.a),
      (k.style.left = 100 * e.a + "%");
  }
  function q(e) {
    e = e.substring(0, 3).toLowerCase();
    return "rgb" === e || "hsl" === e ? e : "hex";
  }
  function F(e) {
    (e = e !== c ? e : v.value),
      L &&
        ((L.value = e), L.dispatchEvent(new Event("input", { bubbles: !0 }))),
      S.onChange && S.onChange.call(u, e, L),
      d.dispatchEvent(
        new CustomEvent("coloris:pick", { detail: { color: e, currentEl: L } })
      );
  }
  function Y(e, t) {
    (e = {
      h: +m.value,
      s: (e / A.width) * 100,
      v: 100 - (t / A.height) * 100,
      a: w.value / 100,
    }),
      (t = (function (e) {
        var t = e.s / 100,
          a = e.v / 100,
          l = t * a,
          r = e.h / 60,
          n = l * (1 - s.abs((r % 2) - 1)),
          o = a - l;
        (l += o), (n += o);
        (t = s.floor(r) % 6),
          (a = [l, n, o, o, n, l][t]),
          (r = [n, l, l, n, o, o][t]),
          (t = [o, o, n, l, l, n][t]);
        return {
          r: s.round(255 * a),
          g: s.round(255 * r),
          b: s.round(255 * t),
          a: e.a,
        };
      })(e));
    P(e.s, e.v), G(t, e), F();
  }
  function P(e, t) {
    var a = S.a11y.marker;
    (e = +e.toFixed(1)),
      (t = +t.toFixed(1)),
      (a = (a = a.replace("{s}", e)).replace("{v}", t)),
      i.setAttribute("aria-label", a);
  }
  function U(e) {
    var t = {
        pageX: ((a = e).changedTouches ? a.changedTouches[0] : a).pageX,
        pageY: (a.changedTouches ? a.changedTouches[0] : a).pageY,
      },
      a = t.pageX - A.x,
      t = t.pageY - A.y;
    p && (t += p.scrollTop), X(a, t), e.preventDefault(), e.stopPropagation();
  }
  function X(e, t) {
    (e = e < 0 ? 0 : e > A.width ? A.width : e),
      (t = t < 0 ? 0 : t > A.height ? A.height : t),
      (i.style.left = e + "px"),
      (i.style.top = t + "px"),
      Y(e, t),
      i.focus();
  }
  function G(e, t) {
    void 0 === t && (t = {});
    var a,
      l,
      r = S.format;
    for (a in (e = void 0 === e ? {} : e)) x[a] = e[a];
    for (l in t) x[l] = t[l];
    var n,
      o = (function (e) {
        var t = e.r.toString(16),
          a = e.g.toString(16),
          l = e.b.toString(16),
          r = "";
        e.r < 16 && (t = "0" + t);
        e.g < 16 && (a = "0" + a);
        e.b < 16 && (l = "0" + l);
        S.alpha &&
          (e.a < 1 || S.forceAlpha) &&
          ((e = (255 * e.a) | 0),
          (r = e.toString(16)),
          e < 16 && (r = "0" + r));
        return "#" + t + a + l + r;
      })(x),
      c = o.substring(0, 7);
    switch (
      ((i.style.color = c),
      (k.parentNode.style.color = c),
      (k.style.color = o),
      (b.style.color = o),
      (h.style.display = "none"),
      h.offsetHeight,
      (h.style.display = ""),
      (k.nextElementSibling.style.display = "none"),
      k.nextElementSibling.offsetHeight,
      (k.nextElementSibling.style.display = ""),
      "mixed" === r ? (r = 1 === x.a ? "hex" : "rgb") : "auto" === r && (r = E),
      r)
    ) {
      case "hex":
        v.value = o;
        break;
      case "rgb":
        v.value =
          ((n = x),
          !S.alpha || (1 === n.a && !S.forceAlpha)
            ? "rgb(" + n.r + ", " + n.g + ", " + n.b + ")"
            : "rgba(" + n.r + ", " + n.g + ", " + n.b + ", " + n.a + ")");
        break;
      case "hsl":
        v.value =
          ((n = (function (e) {
            var t,
              a = e.v / 100,
              l = a * (1 - e.s / 100 / 2);
            0 < l && l < 1 && (t = s.round(((a - l) / s.min(l, 1 - l)) * 100));
            return { h: e.h, s: t || 0, l: s.round(100 * l), a: e.a };
          })(x)),
          !S.alpha || (1 === n.a && !S.forceAlpha)
            ? "hsl(" + n.h + ", " + n.s + "%, " + n.l + "%)"
            : "hsla(" + n.h + ", " + n.s + "%, " + n.l + "%, " + n.a + ")");
    }
    d.querySelector('.clr-format [value="' + r + '"]').checked = !0;
  }
  function e() {
    var e = +m.value,
      t = +i.style.left.replace("px", ""),
      a = +i.style.top.replace("px", "");
    (f.style.color = "hsl(" + e + ", 100%, 50%)"),
      (l.style.left = (e / 360) * 100 + "%"),
      Y(t, a);
  }
  function K() {
    var e = w.value / 100;
    (k.style.left = 100 * e + "%"), G({ a: e }), F();
  }
  function $() {
    return Array.from(f.querySelectorAll("input, button")).filter(function (e) {
      return !!e.offsetWidth;
    });
  }
  function z(e) {
    return d.getElementById(e);
  }
  function J(e, t, a, l) {
    var r = Element.prototype.matches || Element.prototype.msMatchesSelector;
    "string" == typeof a
      ? e.addEventListener(t, function (e) {
          r.call(e.target, a) && l.call(e.target, e);
        })
      : ((l = a), e.addEventListener(t, l));
  }
  function Q(e, t) {
    (t = t !== c ? t : []),
      "loading" !== d.readyState
        ? e.apply(void 0, t)
        : d.addEventListener("DOMContentLoaded", function () {
            e.apply(void 0, t);
          });
  }
  NodeList !== c &&
    NodeList.prototype &&
    !NodeList.prototype.forEach &&
    (NodeList.prototype.forEach = Array.prototype.forEach),
    (u.Coloris = (function () {
      var r = {
        set: M,
        wrap: j,
        close: R,
        setInstance: H,
        removeInstance: O,
        updatePosition: I,
      };
      function e(e) {
        Q(function () {
          e && ("string" == typeof e ? N : M)(e);
        });
      }
      for (var t in r)
        !(function (l) {
          e[l] = function () {
            for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++)
              t[a] = arguments[a];
            Q(r[l], t);
          };
        })(t);
      return e;
    })()),
    Q(function () {
      (p = c),
        (f = d.createElement("div")).setAttribute("id", "clr-picker"),
        (f.className = "clr-picker"),
        (f.innerHTML =
          '<input id="clr-color-value" name="clr-color-value" class="clr-color" type="text" value="" spellcheck="false" aria-label="' +
          S.a11y.input +
          '"><div id="clr-color-area" class="clr-gradient" role="application" aria-label="' +
          S.a11y.instruction +
          '"><div id="clr-color-marker" class="clr-marker" tabindex="0"></div></div><div class="clr-hue"><input id="clr-hue-slider" name="clr-hue-slider" type="range" min="0" max="360" step="1" aria-label="' +
          S.a11y.hueSlider +
          '"><div id="clr-hue-marker"></div></div><div class="clr-alpha"><input id="clr-alpha-slider" name="clr-alpha-slider" type="range" min="0" max="100" step="1" aria-label="' +
          S.a11y.alphaSlider +
          '"><div id="clr-alpha-marker"></div><span></span></div><div id="clr-format" class="clr-format"><fieldset class="clr-segmented"><legend>' +
          S.a11y.format +
          '</legend><input id="clr-f1" type="radio" name="clr-format" value="hex"><label for="clr-f1">Hex</label><input id="clr-f2" type="radio" name="clr-format" value="rgb"><label for="clr-f2">RGB</label><input id="clr-f3" type="radio" name="clr-format" value="hsl"><label for="clr-f3">HSL</label><span></span></fieldset></div><div id="clr-swatches" class="clr-swatches"></div><button type="button" id="clr-clear" class="clr-clear" aria-label="' +
          S.a11y.clear +
          '">' +
          S.clearLabel +
          '</button><div id="clr-color-preview" class="clr-preview"><button type="button" id="clr-close" class="clr-close" aria-label="' +
          S.a11y.close +
          '">' +
          S.closeLabel +
          '</button></div><span id="clr-open-label" hidden>' +
          S.a11y.open +
          '</span><span id="clr-swatch-label" hidden>' +
          S.a11y.swatch +
          "</span>"),
        d.body.appendChild(f),
        (h = z("clr-color-area")),
        (i = z("clr-color-marker")),
        (y = z("clr-clear")),
        (g = z("clr-close")),
        (b = z("clr-color-preview")),
        (v = z("clr-color-value")),
        (m = z("clr-hue-slider")),
        (l = z("clr-hue-marker")),
        (w = z("clr-alpha-slider")),
        (k = z("clr-alpha-marker")),
        N(S.el),
        j(S.el),
        J(f, "mousedown", function (e) {
          f.classList.remove("clr-keyboard-nav"), e.stopPropagation();
        }),
        J(h, "mousedown", function (e) {
          J(d, "mousemove", U);
        }),
        J(h, "touchstart", function (e) {
          d.addEventListener("touchmove", U, { passive: !1 });
        }),
        J(i, "mousedown", function (e) {
          J(d, "mousemove", U);
        }),
        J(i, "touchstart", function (e) {
          d.addEventListener("touchmove", U, { passive: !1 });
        }),
        J(v, "change", function (e) {
          var t = v.value;
          (L || S.inline) && F("" === t ? t : W(t));
        }),
        J(y, "click", function (e) {
          F(""), R();
        }),
        J(g, "click", function (e) {
          F(), R();
        }),
        J(z("clr-format"), "click", ".clr-format input", function (e) {
          (E = e.target.value), G(), F();
        }),
        J(f, "click", ".clr-swatches button", function (e) {
          W(e.target.textContent), F(), S.swatchesOnly && R();
        }),
        J(d, "mouseup", function (e) {
          d.removeEventListener("mousemove", U);
        }),
        J(d, "touchend", function (e) {
          d.removeEventListener("touchmove", U);
        }),
        J(d, "mousedown", function (e) {
          (n = !1), f.classList.remove("clr-keyboard-nav"), R();
        }),
        J(d, "keydown", function (e) {
          var t,
            a = e.key,
            l = e.target,
            r = e.shiftKey;
          "Escape" === a
            ? R(!0)
            : [
                "Tab",
                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight",
              ].includes(a) && ((n = !0), f.classList.add("clr-keyboard-nav")),
            "Tab" === a &&
              l.matches(".clr-picker *") &&
              ((a = (t = $()).shift()),
              (t = t.pop()),
              r && l === a
                ? (t.focus(), e.preventDefault())
                : r || l !== t || (a.focus(), e.preventDefault()));
        }),
        J(d, "click", ".clr-field button", function (e) {
          B && D(),
            e.target.nextElementSibling.dispatchEvent(
              new Event("click", { bubbles: !0 })
            );
        }),
        J(i, "keydown", function (e) {
          var t = {
            ArrowUp: [0, -1],
            ArrowDown: [0, 1],
            ArrowLeft: [-1, 0],
            ArrowRight: [1, 0],
          };
          Object.keys(t).includes(e.key) &&
            (!function (e, t) {
              X(
                +i.style.left.replace("px", "") + e,
                +i.style.top.replace("px", "") + t
              );
            }.apply(void 0, t[e.key]),
            e.preventDefault());
        }),
        J(h, "click", U),
        J(m, "input", e),
        J(w, "input", K);
    });
})(window, document, Math);
