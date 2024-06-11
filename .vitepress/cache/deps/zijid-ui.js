import {
  Fragment,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  inject,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onMounted,
  onUnmounted,
  openBlock,
  popScopeId,
  provide,
  pushScopeId,
  reactive,
  ref,
  renderList,
  renderSlot,
  resolveComponent,
  toDisplayString,
  unref,
  useCssVars,
  vShow,
  watchEffect,
  withCtx,
  withDirectives
} from "./chunk-RV5F5XHA.js";
import "./chunk-F3FYYIAV.js";

// C:/Users/Administrator/AppData/Roaming/nvm/v22.2.0/node_modules/zijid-ui/package/main.mjs
import "C:/Users/Administrator/AppData/Roaming/nvm/v22.2.0/node_modules/zijid-ui/package/style.css";
var d3 = Object.defineProperty;
var r3 = (t, e, c) => e in t ? d3(t, e, { enumerable: true, configurable: true, writable: true, value: c }) : t[e] = c;
var $ = (t, e, c) => (r3(t, typeof e != "symbol" ? e + "" : e, c), c);
var g;
var c3 = false;
var t3 = [];
window.addEventListener("load", H3);
function M3(t) {
  e3(t);
}
function e3(t) {
  const e = f3(t);
  c3 ? s3(e) : t3.push(e);
}
var l3 = 2e3;
function f3(t) {
  const e = {
    title: "",
    html: false,
    type: "info",
    time: l3,
    close: false
  };
  return typeof t == "string" || typeof t == "number" ? e.title = t : Object.assign(e, t), e;
}
var w3 = [
  "info",
  "error",
  "warn",
  "succeed",
  "success"
];
w3.forEach((t) => {
  M3[t] = function(e) {
    e3({
      title: e,
      type: t,
      time: l3,
      close: false
    });
  };
});
function s3(t) {
  const e = t.time;
  try {
    let i = function() {
      clearTimeout(s), s = null;
    }, a = function() {
      s = setTimeout(() => {
        c.classList.add("zijid_message_stop"), setTimeout(h, 300);
      }, e);
    }, h = function() {
      s && (clearTimeout(s), s = null), g.removeChild(l);
    };
    const c = document.createElement("div"), l = document.createElement("div");
    if (t.html ? c.innerHTML = t.title : c.textContent = t.title || t.message, c.classList.add("zijid_message"), c.classList.add("zijid_message_" + t.type), l.className = "zijid_message_div", t.close) {
      const o = document.createElement("div"), n = document.createElement("div");
      n.className = "zijid_x", o.className = "zijid_x_box", o.append(), o.append(n), c.append(o), n.onclick = h;
    }
    l.append(c), g.append(l);
    let s = setTimeout(() => {
      c.classList.add("zijid_message_stop"), setTimeout(h, 300);
    }, e);
    c.onmouseover = i, c.onmouseout = a;
  } catch (c) {
    console.error("err:", c);
  }
}
function H3() {
  c3 = true, g || j3(), t3.forEach((t) => {
    s3(t);
  });
}
function j3() {
  const t = document.querySelector(".zijid_messageList");
  t ? g = t : (g = document.createElement("div"), g.className = "zijid_messageList", document.body.append(g));
}
function g3(t, e) {
  const c = window.indexedDB.open(t, e);
  return new Promise((l, s) => {
    c.onerror = (i) => {
      s(i);
    }, c.onsuccess = () => {
      l(c);
    };
  });
}
var M6 = class {
  constructor(e = "zijid") {
    $(this, "db", null);
    $(this, "name", "");
    this.name = e || "zijid";
  }
  async getDB() {
    return this.db || (this.db = (await g3(this.name)).result, this.db.onclose = () => {
      console.log("关闭");
    }), this.db;
  }
  createTable(e, c, l) {
    return this.setKey(e, c, l);
  }
  isCreate(e) {
    return this.getDB().then((c) => c.objectStoreNames.contains(e));
  }
  async setKey(e, c, l) {
    console.log("table, config, indexs:", e, c, l);
    const s = await this.getDB();
    return s.close(), new Promise(async (i, a) => {
      const h = window.indexedDB.open(s.name, s.version + 1);
      h.onupgradeneeded = (o) => {
        const n = o.target.result;
        this.db = n;
        try {
          n.objectStoreNames.contains(e) && n.deleteObjectStore(e);
          let r = n.createObjectStore(e, c);
          Array.isArray(l) && l.forEach((d) => {
            r.indexNames.contains(d.name) || (console.log("index.config:", d.config), r.createIndex(d.name, d.key || d.name, d.config || { ...d }));
          }), r.transaction.oncomplete = () => {
            this.close(), i(true);
          };
        } catch (r) {
          console.error("err:", r), this.close(), a(r);
        }
      };
    });
  }
  push(e, c, l = false) {
    return new Promise(async (s) => {
      const h = (await this.getDB()).transaction([e], "readwrite").objectStore(e), o = [], n = [];
      c.forEach(async (r) => {
        let d, v;
        typeof r == "object" && r.value !== void 0 ? (d = r.value, v = r.key) : d = r;
        let f, _;
        l ? _ = (x, P) => this.put(e, x, P) : _ = (...x) => h.add(...x), typeof d == "object" && h.keyPath in d ? f = await _(d) : f = _(d, v), n.push(new Promise(async (x, P) => {
          console.log("request:", f), typeof f == "boolean" ? x(f) : (f.onsuccess = () => {
            x(true);
          }, f.onerror = (T) => {
            const Y = T.currentTarget || T.target;
            console.log("key||customerData:", v || c), o.push("push(" + (v || JSON.stringify(c)) + `)
 err:` + (Y.error || Y.error)), P(T);
          });
        }));
      }), Promise.allSettled(n).then((r) => {
        console.log("res:", r), o.length && console.error(o.join(`

`)), this.close(), s(true);
      });
    });
  }
  add(e, c, l, s = false) {
    return new Promise(async (i) => {
      const o = (await this.getDB()).transaction([e], "readwrite").objectStore(e);
      let n;
      console.log("value,objectStore.keyPath:", c, o.keyPath), console.log('typeof value==="object":', typeof c == "object"), typeof c == "object" && o.keyPath ? (!(o.keyPath in c) && l && (c[o.keyPath] = l), console.log("----value:", c), n = o.add(c)) : (console.log("value:", c), n = o.add(c, l)), n.onsuccess = () => {
        this.close(), i(true);
      }, n.onerror = (r) => {
        s ? this.put(e, c, l).then(i) : (this.close(), console.error("add(", l || c, ") err:", r.currentTarget.error), i(false));
      };
    });
  }
  put(e, c, l) {
    return new Promise(async (s) => {
      const h = (await this.getDB()).transaction([e], "readwrite").objectStore(e);
      typeof c == "object" ? (!(h.keyPath in c) && l && (c[h.keyPath] = l), h.put(c)) : (console.log("value:", c), h.put(c, l)), this.close(), s(true);
    });
  }
  delete(e, c) {
    return new Promise(async (l) => {
      const i = (await this.getDB()).transaction([e], "readwrite").objectStore(e);
      let a = [], h = [];
      Array.isArray(c) ? c.forEach((o) => {
        a.push(new Promise((n, r) => {
          const d = i.delete(o);
          d.onsuccess = () => {
            n(true);
          }, d.onerror = (v) => {
            console.error("delete(", e || c, ") err:", v.currentTarget.error), r(false);
          };
        }));
      }) : a.push(new Promise((o, n) => {
        const r = i.delete(c);
        r.onsuccess = () => {
          o(true);
        }, r.onerror = (d) => {
          h.push("delete(" + (e || c) + ") err:" + d.currentTarget.error), n(false);
        };
      })), Promise.allSettled(a).then((o) => {
        this.close(), h.length && console.error(h.join(`

`)), l(true);
      });
    });
  }
  async deleteIndex(e, c) {
    const l = await this.getDB();
    return new Promise(async (s) => {
      let i = l;
      i.objectStoreNames.contains(e) ? (i.close(), i = window.indexedDB.open(i.name, i.version + 1), i.onupgradeneeded = (a) => {
        this.db = i.result;
        try {
          console.log("11:", 11);
          const h = this.db.transaction, o = h.objectStore(e);
          Array.isArray(c) ? c.forEach((n) => {
            console.log("objectStore.deleteIndex(i):", o.deleteIndex(n));
          }) : o.deleteIndex(c), h.oncomplete = () => {
            this.close(), s(true);
          };
        } catch {
          this.close(), s(false);
        }
      }) : (this.close(), s(true));
    });
  }
  async createIndex(e, c) {
    const l = await this.getDB();
    return new Promise(async (s, i) => {
      let a = l;
      a.close(), a = window.indexedDB.open(a.name, a.version + 1), a.onupgradeneeded = (h) => {
        const o = h.target.result;
        this.db = o;
        try {
          let n;
          o.objectStoreNames.contains(e) ? n = a.transaction.objectStore(e) : n = o.createObjectStore(e), console.log("objectStore:", n), Array.isArray(c) && c.forEach((r) => {
            n.indexNames.contains(r.name) || n.createIndex(r.name, r.key || r.name, r.config || { ...r });
          }), n.transaction.oncomplete = () => {
            this.close(), s(true);
          };
        } catch (n) {
          this.close(), i(n);
        }
      };
    });
  }
  find(e, c) {
    return new Promise(async (l) => {
      const i = (await this.getDB()).transaction([e], "readwrite").objectStore(e).get(c);
      i.onsuccess = (a) => {
        this.close(), l(i.result);
      };
    });
  }
  clear(e) {
    return new Promise(async (c) => {
      const s = (await this.getDB()).transaction([e], "readwrite").objectStore(e).clear();
      s.onsuccess = () => {
        this.close(), c(true);
      }, s.onerror = (i) => {
        this.close(), console.error("clear() err:", i.currentTarget.error), c(false);
      };
    });
  }
  count(e) {
    return new Promise(async (c) => {
      const s = (await this.getDB()).transaction([e], "readwrite").objectStore(e).count();
      s.onsuccess = () => {
        this.close(), c(s.result);
      }, s.onerror = (i) => {
        this.close(), console.error("count() err:", i.currentTarget.error), c(false);
      };
    });
  }
  findIndex(e, c, l) {
    return new Promise(async (s) => {
      const a = (await this.getDB()).transaction([e], "readwrite").objectStore(e).index(c).get(l);
      a.onsuccess = (h) => {
        this.close(), s(a.result);
      };
    });
  }
  findAll(e) {
    return new Promise(async (c) => {
      const s = (await this.getDB()).transaction([e], "readwrite").objectStore(e).getAll();
      s.onsuccess = (i) => {
        this.close(), c(s.result);
      };
    });
  }
  close() {
    return new Promise((e) => {
      console.log("this.db:", this.db), this.db && (this.db.close(), this.db = null), e();
    });
  }
};
var V3 = "zi-";
function U(t) {
  return t.map((c) => J(c) ? U(c) : W(c) ? F(c) : c);
}
function F(t) {
  let e = {};
  return Object.entries(t).forEach((c) => {
    const l = c[1], s = c[0];
    J(l) ? e[s] = U(l) : W(l) ? e[s] = F(l) : e[s] = l;
  }), e;
}
function J(t) {
  return Array.isArray(t) || Object.prototype.toString.call(t) === "[object Array]";
}
function W(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
function _3(t) {
  let e = null;
  return J(t) ? e = U(t) : W(t) ? e = F(t) : e = JSON.parse(JSON.stringify(t)), e;
}
function o3(t = "-") {
  if (!crypto && crypto.randomUUID)
    return crypto.randomUUID();
  {
    const e = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", c = [];
    for (let s = 0; s < 3; s++) {
      const i = [];
      for (let a = 0; a < 4; a++)
        i.push(e[Math.floor(Math.random() * 52)]);
      c.push(i.join(""));
    }
    const l = (Date.now() + "").slice(-5) + t + (Math.random() + "").slice(-5);
    return c.join(t) + t + l;
  }
}
var b = (t, e) => {
  const c = t.__vccOpts || t;
  for (const [l, s] of e)
    c[l] = s;
  return c;
};
var x3 = {
  __name: "button",
  props: {
    type: {
      type: String,
      default: "default"
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    }
  },
  emits: [],
  setup(t, { emit: e }) {
    return (c, l) => (openBlock(), createElementBlock("button", {
      class: normalizeClass(["zi-button", [t.type, {
        plain: t.plain,
        round: t.round
      }]])
    }, [
      createBaseVNode("span", null, [
        renderSlot(c.$slots, "default", {}, () => [
          createTextVNode("按钮")
        ], true)
      ])
    ], 2));
  }
};
var B3 = b(x3, [["__scopeId", "data-v-2e2f8203"]]);
var S3 = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: B3
}, Symbol.toStringTag, { value: "Module" }));
var X = ref("");
var N = ref(true);
var k = ref(false);
function i3(t) {
  return {
    state: computed(() => X.value === t ? N.value === true || k.value ? (k.value = false, "action") : "blur" : "")
  };
}
var L3 = {
  __name: "file",
  props: {
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: "file"
    },
    padding: {
      type: Number,
      default: 0
    },
    data: {
      type: String,
      default: ""
    }
  },
  emits: ["myClick"],
  setup(t, { emit: e }) {
    const c = t, l = o3(), { state: s } = i3(l);
    function i() {
      X.value = l, k.value = true, e("myClick", c.data);
    }
    return (a, h) => {
      const o = resolveComponent("zi-icon");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["title", [unref(s)]]),
        style: normalizeStyle({ paddingLeft: `calc( ${t.padding} * 1em )` }),
        onMouseup: i
      }, [
        createVNode(o, {
          name: t.icon,
          style: { padding: "0 .5em" }
        }, null, 8, ["name"]),
        renderSlot(a.$slots, "default", {}, void 0, true)
      ], 38);
    };
  }
};
var a3 = b(L3, [["__scopeId", "data-v-7a93ff36"]]);
var C3 = {
  key: 0,
  class: "empty-folder"
};
var O3 = {
  __name: "dir",
  props: {
    dir: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: "arrow-down-bold"
    },
    iconClose: {
      type: String,
      default: "arrow-right-bold"
    },
    padding: {
      type: Number,
      default: 0
    }
  },
  emits: ["myClick"],
  setup(t, { emit: e }) {
    const c = o3(), { state: l } = i3(c), s = ref(false);
    return (i, a) => {
      const h = resolveComponent("zi-icon");
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", {
          class: normalizeClass(["dir-title", [unref(l)]]),
          onMouseup: a[0] || (a[0] = () => {
            s.value = !s.value, X.value = unref(c), k.value = true;
          }),
          style: normalizeStyle({ paddingLeft: `calc( ${t.padding} * 1em )` })
        }, [
          createBaseVNode("div", {
            class: "t",
            style: normalizeStyle({ width: `calc( 100% - ${t.dir.length === 0 ? "4.5em" : "0"} )` })
          }, [
            createVNode(h, {
              name: s.value ? t.icon : t.iconClose,
              style: { padding: "0 .5em" }
            }, null, 8, ["name"]),
            createTextVNode(toDisplayString(t.title), 1)
          ], 4),
          t.dir.length === 0 ? (openBlock(), createElementBlock("div", C3, " 空文件夹 ")) : createCommentVNode("", true)
        ], 38),
        withDirectives(createBaseVNode("div", null, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(t.dir, (o) => (openBlock(), createElementBlock("div", {
            key: o.title,
            class: "file"
          }, [
            o.children ? (openBlock(), createBlock(h3, {
              key: 0,
              dir: o.children,
              title: o.title,
              icon: t.icon,
              padding: t.padding + 1
            }, null, 8, ["dir", "title", "icon", "padding"])) : (openBlock(), createBlock(a3, {
              key: 1,
              name: o.icon,
              padding: t.padding + 1,
              data: o.data,
              onMyClick: a[1] || (a[1] = (n) => e("myClick", n))
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(o.title), 1)
              ]),
              _: 2
            }, 1032, ["name", "padding", "data"]))
          ]))), 128))
        ], 512), [
          [vShow, s.value]
        ])
      ], 64);
    };
  }
};
var h3 = b(O3, [["__scopeId", "data-v-05aa201c"]]);
var k3 = {
  __name: "index",
  props: {
    title: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: []
    }
  },
  emits: ["open"],
  setup(t, { emit: e }) {
    ref(true);
    function c() {
      N.value = true;
    }
    function l() {
      N.value = false;
    }
    const s = {
      mounted: (a, { value: { focusClick: h = () => {
      }, focusBlur: o = () => {
      } } }) => {
        a.addEventListener("mouseup", h), a.addEventListener("blur", o);
      },
      unmounted(a, { value: { focusClick: h = () => {
      }, focusBlur: o = () => {
      } } }) {
        a.removeEventListener("mouseup", h), a.removeEventListener("blur", o);
      }
    };
    function i(a) {
      e("open", a);
    }
    return (a, h) => withDirectives((openBlock(), createElementBlock("div", {
      class: "dir",
      tabindex: "1",
      onMousedown: h[0] || (h[0] = (o) => k.value = true)
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(t.data, (o) => (openBlock(), createElementBlock("div", {
        key: o.title
      }, [
        o.children ? (openBlock(), createBlock(h3, {
          key: 0,
          dir: o.children,
          title: o.title,
          icon: o.icon,
          onMyClick: i
        }, null, 8, ["dir", "title", "icon"])) : (openBlock(), createBlock(a3, {
          key: 1,
          icon: o.icon,
          data: o.data,
          onMyClick: i
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(o.title), 1)
          ]),
          _: 2
        }, 1032, ["icon", "data"]))
      ]))), 128))
    ], 32)), [
      [s, { focusClick: c, focusBlur: l }]
    ]);
  }
};
var D3 = b(k3, [["__scopeId", "data-v-fbb4d1c0"]]);
var I3 = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: D3
}, Symbol.toStringTag, { value: "Module" }));
var A3 = { class: "dir-group" };
var E3 = {
  __name: "dir-group",
  props: {
    data: {
      type: Object,
      default: () => ({
        key: "",
        title: "",
        icon: "",
        isOpen: true,
        children: [],
        handle: () => {
        }
      })
    },
    show: Boolean,
    tabSize: Number
  },
  emits: ["dir-action"],
  setup(t, { emit: e }) {
    function c(l) {
      e("dir-action", l);
    }
    return (l, s) => (openBlock(true), createElementBlock(Fragment, null, renderList(t.data, (i) => withDirectives((openBlock(), createElementBlock("div", A3, [
      i ? (openBlock(), createBlock(n3, {
        key: 0,
        data: i,
        onDirAction: c,
        handle: i.handle,
        isOpen: i.isOpen,
        title: i.title,
        icon: i.icon,
        children: i.children,
        isGroup: !!i.isGroup,
        tabSize: t.tabSize + 1
      }, null, 8, ["data", "handle", "isOpen", "title", "icon", "children", "isGroup", "tabSize"])) : createCommentVNode("", true)
    ], 512)), [
      [vShow, t.show]
    ])), 256));
  }
};
var P3 = b(E3, [["__scopeId", "data-v-7103d9c6"]]);
var T3 = {
  key: 0,
  class: "span"
};
var $3 = ["innerHTML"];
var Z3 = {
  key: 1,
  class: "dir-state-icon"
};
var N3 = {
  __name: "dir-item",
  props: {
    title: String,
    children: Array,
    icon: String,
    isOpen: Boolean,
    isGroup: Boolean,
    tabSize: Number,
    handle: Function,
    data: Object
  },
  emits: ["dir-action"],
  setup(t, { emit: e }) {
    const c = t, l = ref(false);
    watchEffect(() => {
      l.value = c.isOpen;
    });
    function s(v) {
      e("dir-action", v);
    }
    const i = inject("dirActionStatus"), a = inject("actionKey");
    function h(v) {
      l.value = !l.value, (!c.children || c.children.length === 0 || !c.title) && e("dir-action", c.data[a] || c.title), c.handle && c.handle(c.title, c.children, v);
    }
    const o = inject("dirIcon", c.dirIcon), n = inject("dirIconOpen", c.dirIconOpen), r = inject("zoomState", true), d = computed(() => {
      const v = c.data;
      return v[a] ? i.value === v[a] : i.value === c.title;
    });
    return (v, f) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["dir-item", { isGroup: t.isGroup, zoomState: !unref(r) }]),
      style: normalizeStyle({ "--size": unref(r) === false ? 1 : t.tabSize })
    }, [
      createBaseVNode("div", {
        class: normalizeClass([{ "dir-title-action": d.value }, "dir-item-title"]),
        onClick: h
      }, [
        t.icon ? (openBlock(), createElementBlock("span", T3, [
          createBaseVNode("i", {
            class: normalizeClass(["zijid-ui", t.icon])
          }, null, 2)
        ])) : createCommentVNode("", true),
        withDirectives(createBaseVNode("span", {
          innerHTML: t.title,
          class: "dir-item-title-span"
        }, null, 8, $3), [
          [vShow, unref(r) || !t.icon]
        ]),
        t.children && t.children.length ? withDirectives((openBlock(), createElementBlock("div", Z3, [
          withDirectives(createBaseVNode("span", null, [
            createBaseVNode("i", {
              class: normalizeClass(["zijid-ui", unref(o)])
            }, null, 2)
          ], 512), [
            [vShow, l.value]
          ]),
          withDirectives(createBaseVNode("span", null, [
            createBaseVNode("i", {
              class: normalizeClass(["zijid-ui", unref(n)])
            }, null, 2)
          ], 512), [
            [vShow, !l.value]
          ])
        ], 512)), [
          [vShow, unref(r)]
        ]) : createCommentVNode("", true)
      ], 2),
      t.children && t.children.length ? (openBlock(), createBlock(P3, {
        key: 0,
        onDirAction: s,
        data: t.children,
        show: l.value,
        tabSize: t.tabSize
      }, null, 8, ["data", "show", "tabSize"])) : createCommentVNode("", true)
    ], 6));
  }
};
var n3 = b(N3, [["__scopeId", "data-v-ff87498c"]]);
var q3 = { class: "dir-content" };
var G3 = {
  __name: "file-dir",
  props: {
    defaultActive: "",
    defaultOpeneds: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    actionKey: {
      type: String,
      default: "title"
    },
    dirIcon: {
      type: String,
      default: "zj-arrow-down-bold"
    },
    dirIconOpen: {
      type: String,
      default: "zj-arrow-up-bold"
    },
    isZoom: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "3em"
    }
  },
  emits: ["action"],
  setup(t, { emit: e }) {
    const c = t;
    useCssVars((h) => ({
      "371e5f88": t.width
    })), watchEffect(() => {
      provide("actionKey", c.actionKey);
    }), watchEffect(() => {
      provide("dirIcon", c.dirIcon), provide("dirIconOpen", c.dirIconOpen);
    });
    const l = reactive({
      action: "",
      data: []
    }), s = ref("");
    provide("dirActionStatus", s), watchEffect(() => {
      if (c.data) {
        l.data = _3(c.data);
        const h = [];
        if (c.defaultOpeneds && c.defaultOpeneds.length) {
          let n = function(r, d) {
            return r.forEach((v) => {
              o.map((_) => _ + "").indexOf(v.title) > -1 && (h.push(v), d && h.push(...d)), v.children && v.children.length && n(v.children, [...d || [], v]);
            });
          }, o = c.defaultOpeneds.slice(0);
          c.defaultActive && o.push(c.defaultActive), n(l.data);
        } else if (c.defaultActive) {
          let o = function(n, r) {
            return n.some((d) => {
              if (d.title === c.defaultActive)
                return h.push(d), (!(d != null && d.children) || d.children.length === 0 && d.title) && (console.log("111:", d.title), s.value = d.title), r && h.push(...r), true;
              if (d.children && d.children.length)
                return o(d.children, [...r || [], d]);
            });
          };
          o(l.data);
        }
        h.forEach((o) => o.isOpen = true);
      }
    });
    function i(h) {
      s.value = h, e("action", h);
    }
    const a = ref(window.innerWidth > 400);
    return provide("zoomState", a), (h, o) => (openBlock(), createElementBlock("div", {
      class: "dir-box",
      style: normalizeStyle({ "--dir-zoom": t.isZoom ? "3em" : 0, "--dir-width": a.value ? "15em" : "3em" })
    }, [
      createBaseVNode("div", q3, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(l.data, (n) => (openBlock(), createBlock(n3, {
          onDirAction: i,
          data: n,
          isOpen: n.isOpen,
          title: n.title,
          icon: n.icon,
          children: n.children,
          isGroup: n.isGroup,
          tabSize: 1
        }, null, 8, ["data", "isOpen", "title", "icon", "children", "isGroup"]))), 256))
      ]),
      t.isZoom ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: "dir-zoom",
        onClick: o[0] || (o[0] = (n) => a.value = !a.value)
      }, [
        createBaseVNode("div", {
          class: "dir-zoom-button",
          style: normalizeStyle({ float: a.value ? "right" : "left" })
        }, [
          createBaseVNode("div", {
            class: normalizeClass(["zijid-ui", a.value ? "zj-toggle-left" : "zj-toggle-right"])
          }, null, 2)
        ], 4)
      ])) : createCommentVNode("", true)
    ], 4));
  }
};
var K3 = b(G3, [["__scopeId", "data-v-177930cf"]]);
var U3 = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: K3
}, Symbol.toStringTag, { value: "Module" }));
var F3 = { class: "zoom_box" };
var J3 = { class: "bg" };
var W3 = { class: "show_box" };
var X3 = Object.assign({
  name: "zoom"
}, {
  __name: "zoom",
  props: {
    noZoom: {
      type: String,
      default: "zi_zoom_default"
    },
    zoom: {
      type: String,
      default: "zi_zoom_defaultZoom"
    },
    offset: {
      type: String,
      default: "0"
    }
  },
  setup(t) {
    const e = ref(false), c = ref(false);
    function l() {
      e.value = window.innerWidth <= 1e3, c.value = false, e.value === true && (s.value = false);
    }
    onMounted(() => {
      l(), window.addEventListener("resize", l);
    }), onUnmounted(() => {
      window.removeEventListener("resize", l);
    });
    const s = ref(false);
    function i() {
      s.value = !s.value, nextTick(() => {
        e.value === true && (c.value = true);
      });
    }
    return (a, h) => {
      const o = resolveComponent("zi-icon");
      return openBlock(), createElementBlock("div", F3, [
        createBaseVNode("div", J3, [
          createBaseVNode("div", {
            class: "button",
            onClick: i
          }, [
            createVNode(o, { name: "menu" })
          ])
        ]),
        createBaseVNode("div", {
          class: "show",
          style: normalizeStyle({ right: t.offset })
        }, [
          createBaseVNode("div", W3, [
            createBaseVNode("div", {
              class: normalizeClass([{ transition: c.value }]),
              style: normalizeStyle({
                transform: `translateY(${e.value === false || s.value === false ? e.value === false ? "0" : "-100%" : "0%"})`
              })
            }, [
              renderSlot(a.$slots, "default", {
                class: normalizeClass(e.value === false ? t.noZoom : t.zoom)
              }, void 0, true)
            ], 6)
          ])
        ], 4)
      ]);
    };
  }
});
var Y3 = b(X3, [["__scopeId", "data-v-a2f17329"]]);
var Q3 = { class: "header" };
var R3 = { class: "content" };
var c6 = {
  __name: "header",
  props: {
    type: {
      type: String,
      default: "default"
    }
  },
  emits: [],
  setup(t, { emit: e }) {
    return (c, l) => (openBlock(), createElementBlock("div", Q3, [
      renderSlot(c.$slots, "logo", {}, void 0, true),
      createBaseVNode("div", R3, [
        renderSlot(c.$slots, "default", {}, void 0, true)
      ])
    ]));
  }
};
var t6 = b(c6, [["__scopeId", "data-v-7a2444a2"]]);
var e6 = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: t6
}, Symbol.toStringTag, { value: "Module" }));
window._iconfont_svg_string_3983158 = '<svg><symbol id="zj-3column" viewBox="0 0 1024 1024"><path d="M874.666667 117.333333H149.333333C108.8 117.333333 74.666667 151.466667 74.666667 192v640c0 40.533333 34.133333 74.666667 74.666666 74.666667h725.333334c40.533333 0 74.666667-34.133333 74.666666-74.666667V192c0-40.533333-34.133333-74.666667-74.666666-74.666667z m-245.333334 64v661.333334h-234.666666v-661.333334h234.666666zM138.666667 832V192c0-6.4 4.266667-10.666667 10.666666-10.666667h181.333334v661.333334H149.333333c-6.4 0-10.666667-4.266667-10.666666-10.666667z m746.666666 0c0 6.4-4.266667 10.666667-10.666666 10.666667h-181.333334v-661.333334H874.666667c6.4 0 10.666667 4.266667 10.666666 10.666667v640z"  ></path></symbol><symbol id="zj-column-4" viewBox="0 0 1024 1024"><path d="M874.666667 117.333333H149.333333C108.8 117.333333 74.666667 151.466667 74.666667 192v640c0 40.533333 34.133333 74.666667 74.666666 74.666667h725.333334c40.533333 0 74.666667-34.133333 74.666666-74.666667V192c0-40.533333-34.133333-74.666667-74.666666-74.666667z m-330.666667 64h128v661.333334h-128v-661.333334z m-64 661.333334h-128v-661.333334h128v661.333334z m-341.333333-10.666667V192c0-6.4 4.266667-10.666667 10.666666-10.666667h138.666667v661.333334H149.333333c-6.4 0-10.666667-4.266667-10.666666-10.666667z m746.666666 0c0 6.4-4.266667 10.666667-10.666666 10.666667h-138.666667v-661.333334H874.666667c6.4 0 10.666667 4.266667 10.666666 10.666667v640z"  ></path></symbol><symbol id="zj-add" viewBox="0 0 1024 1024"><path d="M853.333333 480H544V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v309.333333H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h309.333333V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V544H853.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-add-circle" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"  ></path><path d="M682.666667 480h-138.666667V341.333333c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v138.666667H341.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h138.666667V682.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-138.666667H682.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-adjust" viewBox="0 0 1024 1024"><path d="M522.666667 458.666667c-17.066667 0-32 14.933333-32 32v362.666666c0 17.066667 14.933333 32 32 32S554.666667 870.4 554.666667 853.333333V490.666667c0-17.066667-14.933333-32-32-32zM341.333333 554.666667H106.666667c-17.066667 0-32 14.933333-32 32S89.6 618.666667 106.666667 618.666667h74.666666v234.666666c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V618.666667H341.333333c17.066667 0 32-14.933333 32-32S358.4 554.666667 341.333333 554.666667zM693.333333 373.333333c0-17.066667-14.933333-32-32-32h-106.666666V170.666667c0-17.066667-14.933333-32-32-32S490.666667 153.6 490.666667 170.666667v170.666666h-106.666667c-17.066667 0-32 14.933333-32 32S366.933333 405.333333 384 405.333333h277.333333c17.066667 0 32-14.933333 32-32zM917.333333 618.666667H682.666667c-17.066667 0-32 14.933333-32 32S665.6 682.666667 682.666667 682.666667h96v170.666666c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-170.666666H917.333333c17.066667 0 32-14.933333 32-32S934.4 618.666667 917.333333 618.666667zM213.333333 458.666667c17.066667 0 32-14.933333 32-32V170.666667c0-17.066667-14.933333-32-32-32S181.333333 153.6 181.333333 170.666667v256c0 17.066667 14.933333 32 32 32zM810.666667 522.666667c17.066667 0 32-14.933333 32-32V170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v320c0 17.066667 14.933333 32 32 32z"  ></path></symbol><symbol id="zj-arrow-up-circle" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"  ></path><path d="M533.333333 307.2c-12.8-10.666667-32-10.666667-44.8 0l-181.333333 170.666667c-12.8 12.8-12.8 32-2.133333 44.8s32 12.8 44.8 2.133333l128-119.466667v277.333334c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V405.333333l128 119.466667c6.4 6.4 14.933333 8.533333 21.333333 8.533333 8.533333 0 17.066667-4.266667 23.466667-10.666666 12.8-12.8 10.666667-34.133333-2.133334-44.8l-179.2-170.666667z"  ></path></symbol><symbol id="zj-arrow-right-circle" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"  ></path><path d="M546.133333 309.333333c-12.8-12.8-32-12.8-44.8-2.133333-12.8 12.8-12.8 32-2.133333 44.8l119.466667 128H341.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h277.333334l-119.466667 128c-12.8 12.8-10.666667 34.133333 2.133333 44.8 6.4 6.4 14.933333 8.533333 21.333334 8.533333 8.533333 0 17.066667-4.266667 23.466666-10.666666l170.666667-181.333334c10.666667-12.8 10.666667-32 0-44.8l-170.666667-179.2z"  ></path></symbol><symbol id="zj-arrow-down" viewBox="0 0 1024 1024"><path d="M512 714.666667c-8.533333 0-17.066667-2.133333-23.466667-8.533334l-341.333333-341.333333c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l320 317.866667 317.866667-320c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L533.333333 704c-4.266667 8.533333-12.8 10.666667-21.333333 10.666667z"  ></path></symbol><symbol id="zj-ashbin" viewBox="0 0 1024 1024"><path d="M874.666667 241.066667h-202.666667V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667h-170.666666c-40.533333 0-74.666667 34.133333-74.666667 74.666667v70.4H149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h53.333334V853.333333c0 40.533333 34.133333 74.666667 74.666666 74.666667h469.333334c40.533333 0 74.666667-34.133333 74.666666-74.666667V305.066667H874.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM416 170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h170.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v70.4h-192V170.666667z m341.333333 682.666666c0 6.4-4.266667 10.666667-10.666666 10.666667H277.333333c-6.4 0-10.666667-4.266667-10.666666-10.666667V309.333333h490.666666V853.333333z"  ></path><path d="M426.666667 736c17.066667 0 32-14.933333 32-32V490.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v213.333333c0 17.066667 14.933333 32 32 32zM597.333333 736c17.066667 0 32-14.933333 32-32V490.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v213.333333c0 17.066667 14.933333 32 32 32z"  ></path></symbol><symbol id="zj-arrow-right" viewBox="0 0 1024 1024"><path d="M320 885.333333c-8.533333 0-17.066667-4.266667-23.466667-10.666666-12.8-12.8-10.666667-34.133333 2.133334-44.8L654.933333 512 298.666667 194.133333c-12.8-10.666667-14.933333-32-2.133334-44.8 10.666667-12.8 32-14.933333 44.8-2.133333l384 341.333333c6.4 6.4 10.666667 14.933333 10.666667 23.466667 0 8.533333-4.266667 17.066667-10.666667 23.466667l-384 341.333333c-6.4 6.4-12.8 8.533333-21.333333 8.533333z"  ></path></symbol><symbol id="zj-browse" viewBox="0 0 1024 1024"><path d="M512 836.266667C230.4 836.266667 74.666667 533.333333 68.266667 520.533333c-4.266667-8.533333-4.266667-19.2 0-29.866666 6.4-12.8 164.266667-315.733333 443.733333-315.733334 281.6 0 437.333333 305.066667 443.733333 317.866667 4.266667 8.533333 4.266667 19.2 0 29.866667-6.4 10.666667-162.133333 313.6-443.733333 313.6zM132.266667 505.6c34.133333 57.6 170.666667 266.666667 379.733333 266.666667s345.6-209.066667 379.733333-266.666667c-34.133333-57.6-170.666667-266.666667-379.733333-266.666667S166.4 448 132.266667 505.6z"  ></path><path d="M512 650.666667c-76.8 0-138.666667-61.866667-138.666667-138.666667s61.866667-138.666667 138.666667-138.666667 138.666667 61.866667 138.666667 138.666667-61.866667 138.666667-138.666667 138.666667z m0-213.333334c-40.533333 0-74.666667 34.133333-74.666667 74.666667s34.133333 74.666667 74.666667 74.666667 74.666667-34.133333 74.666667-74.666667-34.133333-74.666667-74.666667-74.666667z"  ></path></symbol><symbol id="zj-bottom" viewBox="0 0 1024 1024"><path d="M896 864H128c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h768c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM488.533333 727.466667c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466667-8.533333l213.333333-213.333334c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0l-157.866667 157.866667V170.666667c0-17.066667-14.933333-32-32-32s-34.133333 14.933333-34.133333 32v456.533333L322.133333 469.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l211.2 213.333334z"  ></path></symbol><symbol id="zj-back" viewBox="0 0 1024 1024"><path d="M853.333333 245.333333H245.333333l93.866667-93.866666c12.8-12.8 12.8-34.133333 0-46.933334-12.8-12.8-34.133333-12.8-46.933333 0l-145.066667 145.066667c-12.8 12.8-12.8 34.133333 0 46.933333l145.066667 145.066667c6.4 6.4 14.933333 10.666667 23.466666 10.666667s17.066667-4.266667 23.466667-10.666667c12.8-12.8 12.8-34.133333 0-46.933333L256 311.466667h597.333333c6.4 0 10.666667 4.266667 10.666667 10.666666v426.666667c0 6.4-4.266667 10.666667-10.666667 10.666667H170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h682.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667V320c0-40.533333-34.133333-74.666667-74.666667-74.666667z"  ></path></symbol><symbol id="zj-bad" viewBox="0 0 1024 1024"><path d="M904.533333 522.666667L853.333333 185.6c-8.533333-51.2-55.466667-89.6-106.666666-89.6H204.8c-59.733333 0-108.8 46.933333-108.8 106.666667v258.133333c0 57.6 49.066667 106.666667 108.8 106.666667h91.733333l125.866667 281.6c2.133333 2.133333 2.133333 4.266667 4.266667 6.4 14.933333 23.466667 38.4 36.266667 64 36.266666 12.8 0 25.6-4.266667 38.4-10.666666 57.6-34.133333 87.466667-72.533333 87.466666-117.333334v-117.333333h183.466667c32 0 59.733333-12.8 81.066667-36.266667 19.2-25.6 29.866667-55.466667 23.466666-87.466666z m-616.533333-21.333334H204.8c-25.6 0-44.8-19.2-44.8-42.666666v-256c0-23.466667 19.2-42.666667 44.8-42.666667h83.2v341.333333zM832 567.466667c-8.533333 8.533333-21.333333 14.933333-34.133333 14.933333h-213.333334c-17.066667 0-32 14.933333-32 32v149.333333c0 25.6-29.866667 49.066667-55.466666 64-4.266667 2.133333-10.666667 2.133333-14.933334-4.266666L352 533.333333V160H746.666667c21.333333 0 40.533333 14.933333 42.666666 36.266667L842.666667 533.333333c2.133333 10.666667-2.133333 23.466667-10.666667 34.133334z"  ></path></symbol><symbol id="zj-arrow-double-left" viewBox="0 0 1024 1024"><path d="M842.666667 864c-8.533333 0-14.933333-2.133333-21.333334-8.533333l-341.333333-309.333334c-6.4-6.4-10.666667-14.933333-10.666667-23.466666 0-8.533333 4.266667-17.066667 10.666667-23.466667l341.333333-309.333333c12.8-12.8 34.133333-10.666667 44.8 2.133333 12.8 12.8 10.666667 34.133333-2.133333 44.8L548.266667 522.666667l315.733333 285.866666c12.8 10.666667 14.933333 32 2.133333 44.8-6.4 6.4-14.933333 10.666667-23.466666 10.666667z"  ></path><path d="M512 864c-8.533333 0-14.933333-2.133333-21.333333-8.533333L149.333333 546.133333c-6.4-6.4-10.666667-14.933333-10.666666-23.466666 0-8.533333 4.266667-17.066667 10.666666-23.466667L490.666667 189.866667c12.8-12.8 34.133333-10.666667 44.8 2.133333 12.8 12.8 10.666667 34.133333-2.133334 44.8L217.6 522.666667 533.333333 808.533333c12.8 12.8 14.933333 32 2.133334 44.8-6.4 6.4-14.933333 10.666667-23.466667 10.666667z"  ></path></symbol><symbol id="zj-arrow-left-circle" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"  ></path><path d="M682.666667 480H405.333333l119.466667-128c12.8-12.8 10.666667-34.133333-2.133333-44.8s-34.133333-10.666667-44.8 2.133333l-170.666667 181.333334c-10.666667 12.8-10.666667 32 0 44.8l170.666667 181.333333c6.4 6.4 14.933333 10.666667 23.466666 10.666667 8.533333 0 14.933333-2.133333 21.333334-8.533334 12.8-12.8 12.8-32 2.133333-44.8l-119.466667-128h277.333334c17.066667 0 32-14.933333 32-32s-14.933333-34.133333-32-34.133333z"  ></path></symbol><symbol id="zj-arrow-double-right" viewBox="0 0 1024 1024"><path d="M544 522.666667c0-8.533333-4.266667-17.066667-10.666667-23.466667L192 189.866667c-12.8-12.8-34.133333-10.666667-44.8 2.133333-12.8 12.8-10.666667 34.133333 2.133333 44.8l315.733334 285.866667L149.333333 808.533333c-12.8 12.8-14.933333 32-2.133333 44.8 6.4 6.4 14.933333 10.666667 23.466667 10.666667 8.533333 0 14.933333-2.133333 21.333333-8.533333l341.333333-309.333334c6.4-6.4 10.666667-14.933333 10.666667-23.466666z"  ></path><path d="M864 499.2l-341.333333-309.333333c-12.8-12.8-34.133333-10.666667-44.8 2.133333-12.8 12.8-10.666667 34.133333 2.133333 44.8l315.733333 285.866667-315.733333 285.866666c-12.8 12.8-14.933333 32-2.133333 44.8 6.4 6.4 14.933333 10.666667 23.466666 10.666667 8.533333 0 14.933333-2.133333 21.333334-8.533333l341.333333-309.333334c6.4-6.4 10.666667-14.933333 10.666667-23.466666 0-8.533333-4.266667-17.066667-10.666667-23.466667z"  ></path></symbol><symbol id="zj-caps-lock" viewBox="0 0 1024 1024"><path d="M853.333333 96H170.666667C130.133333 96 96 130.133333 96 170.666667v682.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h682.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667z m10.666667 757.333333c0 6.4-4.266667 10.666667-10.666667 10.666667H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h682.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v682.666666z"  ></path><path d="M544 298.666667c-19.2-12.8-42.666667-12.8-61.866667 0l-185.6 145.066666-2.133333 4.266667c-6.4 6.4-17.066667 19.2-17.066667 38.4 0 8.533333 2.133333 14.933333 4.266667 21.333333 8.533333 17.066667 25.6 29.866667 44.8 29.866667h59.733333v172.8c0 27.733333 21.333333 51.2 51.2 51.2h147.2c29.866667 0 53.333333-21.333333 53.333334-51.2v-172.8h57.6c21.333333 0 42.666667-14.933333 46.933333-36.266667 4.266667-19.2 0-38.4-14.933333-51.2L544 298.666667z m29.866667 172.8v221.866666h-121.6V471.466667h-85.333334l145.066667-115.2 145.066667 115.2h-83.2z"  ></path></symbol><symbol id="zj-camera" viewBox="0 0 1024 1024"><path d="M846.933333 238.933333h-140.8L646.4 149.333333c-6.4-10.666667-17.066667-17.066667-29.866667-17.066666h-209.066666c-12.8 0-23.466667 6.4-29.866667 17.066666l-59.733333 89.6H177.066667c-57.6 0-106.666667 46.933333-106.666667 106.666667v426.666667c0 57.6 46.933333 106.666667 106.666667 106.666666h672c57.6 0 106.666667-46.933333 106.666666-106.666666v-426.666667c-2.133333-59.733333-49.066667-106.666667-108.8-106.666667z m34.133334 533.333334c0 19.2-14.933333 34.133333-34.133334 34.133333H177.066667c-19.2 0-34.133333-14.933333-34.133334-34.133333v-426.666667c0-19.2 14.933333-34.133333 34.133334-34.133333h160c12.8 0 23.466667-6.4 29.866666-17.066667L426.666667 206.933333h170.666666l59.733334 89.6c6.4 10.666667 17.066667 17.066667 29.866666 17.066667h160c19.2 0 34.133333 14.933333 34.133334 34.133333v424.533334z"  ></path><path d="M512 364.8c-96 0-174.933333 78.933333-174.933333 174.933333 0 96 78.933333 174.933333 174.933333 174.933334 96 0 174.933333-78.933333 174.933333-174.933334 0-96-78.933333-174.933333-174.933333-174.933333z m0 279.466667c-57.6 0-104.533333-46.933333-104.533333-104.533334s46.933333-104.533333 104.533333-104.533333 104.533333 46.933333 104.533333 104.533333-46.933333 104.533333-104.533333 104.533334z"  ></path></symbol><symbol id="zj-chart-bar" viewBox="0 0 1024 1024"><path d="M149.333333 800h128c29.866667 0 53.333333-23.466667 53.333334-53.333333V533.333333c0-29.866667-23.466667-53.333333-53.333334-53.333333H149.333333c-29.866667 0-53.333333 23.466667-53.333333 53.333333v213.333334c0 29.866667 23.466667 53.333333 53.333333 53.333333z m10.666667-256h106.666667v192h-106.666667v-192zM448 800h128c29.866667 0 53.333333-23.466667 53.333333-53.333333V149.333333c0-29.866667-23.466667-53.333333-53.333333-53.333333h-128c-29.866667 0-53.333333 23.466667-53.333333 53.333333v597.333334c0 29.866667 23.466667 53.333333 53.333333 53.333333z m10.666667-640h106.666666v576h-106.666666v-576zM874.666667 309.333333h-128c-29.866667 0-53.333333 23.466667-53.333334 53.333334v384c0 29.866667 23.466667 53.333333 53.333334 53.333333h128c29.866667 0 53.333333-23.466667 53.333333-53.333333V362.666667c0-29.866667-23.466667-53.333333-53.333333-53.333334z m-10.666667 426.666667h-106.666667v-362.666667h106.666667v362.666667zM896 853.333333H128c-17.066667 0-32 14.933333-32 32S110.933333 917.333333 128 917.333333h768c17.066667 0 32-14.933333 32-32S913.066667 853.333333 896 853.333333z"  ></path></symbol><symbol id="zj-attachment" viewBox="0 0 1024 1024"><path d="M874.666667 467.2c-10.666667-10.666667-29.866667-12.8-42.666667 0l-343.466667 341.333333c-74.666667 74.666667-198.4 74.666667-275.2 0-36.266667-36.266667-57.6-85.333333-57.6-136.533333s19.2-100.266667 57.6-136.533333L556.8 192c46.933333-46.933333 121.6-46.933333 168.533333 0 23.466667 23.466667 34.133333 53.333333 34.133334 83.2 0 32-12.8 61.866667-34.133334 83.2L384 704c-17.066667 17.066667-44.8 17.066667-64 0-8.533333-8.533333-12.8-19.2-12.8-32s4.266667-23.466667 12.8-32l317.866667-315.733333c10.666667-10.666667 12.8-29.866667 0-42.666667-10.666667-12.8-29.866667-12.8-42.666667 0L277.333333 597.333333c-19.2 19.2-29.866667 46.933333-29.866666 74.666667S258.133333 725.333333 277.333333 746.666667c40.533333 40.533333 106.666667 40.533333 147.2 0L768 403.2c34.133333-34.133333 53.333333-78.933333 53.333333-125.866667s-19.2-93.866667-53.333333-125.866666a178.986667 178.986667 0 0 0-253.866667 0l-341.333333 341.333333c-46.933333 46.933333-74.666667 110.933333-74.666667 179.2s25.6 132.266667 74.666667 179.2c49.066667 49.066667 115.2 74.666667 179.2 74.666667s130.133333-25.6 179.2-74.666667l343.466667-341.333333c10.666667-12.8 10.666667-32 0-42.666667z"  ></path></symbol><symbol id="zj-code" viewBox="0 0 1024 1024"><path d="M322.133333 296.533333c-12.8-12.8-32-12.8-44.8 0l-192 192c-12.8 12.8-12.8 32 0 44.8l192 192c6.4 6.4 14.933333 8.533333 23.466667 8.533334s17.066667-2.133333 23.466667-8.533334c12.8-12.8 12.8-32 0-44.8L151.466667 512l168.533333-168.533333c12.8-12.8 12.8-34.133333 2.133333-46.933334zM940.8 488.533333l-192-192c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l168.533333 168.533334-168.533333 168.533333c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333l192-192c8.533333-8.533333 8.533333-29.866667-2.133333-42.666667zM622.933333 76.8c-17.066667-4.266667-34.133333 6.4-38.4 23.466667L366.933333 902.4c-4.266667 17.066667 6.4 34.133333 23.466667 38.4 2.133333 0 6.4 2.133333 8.533333 2.133333 14.933333 0 27.733333-8.533333 29.866667-23.466666L644.266667 115.2c4.266667-17.066667-4.266667-34.133333-21.333334-38.4z"  ></path></symbol><symbol id="zj-close" viewBox="0 0 1024 1024"><path d="M556.8 512L832 236.8c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L512 467.2l-275.2-277.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l275.2 277.333333-277.333333 275.2c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333L512 556.8 787.2 832c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8L556.8 512z"  ></path></symbol><symbol id="zj-check-item" viewBox="0 0 1024 1024"><path d="M853.333333 96H170.666667C130.133333 96 96 130.133333 96 170.666667v682.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h682.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667z m10.666667 757.333333c0 6.4-4.266667 10.666667-10.666667 10.666667H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h682.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v682.666666z"  ></path><path d="M704 381.866667l-243.2 234.666666-117.333333-125.866666c-12.8-12.8-32-12.8-44.8-2.133334-12.8 12.8-12.8 32-2.133334 44.8l140.8 149.333334c6.4 6.4 14.933333 10.666667 23.466667 10.666666 8.533333 0 17.066667-4.266667 21.333333-8.533333l264.533334-256c12.8-12.8 12.8-32 0-44.8-10.666667-12.8-29.866667-14.933333-42.666667-2.133333z"  ></path></symbol><symbol id="zj-calendar" viewBox="0 0 1024 1024"><path d="M853.333333 149.333333h-138.666666V106.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v42.666666h-277.333334V106.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v42.666666H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666667v618.666667C96 883.2 130.133333 917.333333 170.666667 917.333333h682.666666c40.533333 0 74.666667-34.133333 74.666667-74.666666v-618.666667C928 183.466667 893.866667 149.333333 853.333333 149.333333zM170.666667 213.333333h138.666666v64c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-64h277.333334v64c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-64H853.333333c6.4 0 10.666667 4.266667 10.666667 10.666667v194.133333c-4.266667-2.133333-6.4-2.133333-10.666667-2.133333H170.666667c-4.266667 0-6.4 0-10.666667 2.133333v-194.133333c0-6.4 4.266667-10.666667 10.666667-10.666667z m682.666666 640H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666666V477.866667c4.266667 2.133333 6.4 2.133333 10.666667 2.133333h682.666666c4.266667 0 6.4 0 10.666667-2.133333v364.8c0 6.4-4.266667 10.666667-10.666667 10.666666z"  ></path><path d="M384 608h-85.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h85.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM725.333333 608h-192c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h192c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-comment" viewBox="0 0 1024 1024"><path d="M853.333333 138.666667H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666666v512c0 40.533333 34.133333 74.666667 74.666667 74.666667h151.466666V917.333333c0 12.8 8.533333 25.6 19.2 29.866667 4.266667 2.133333 8.533333 2.133333 12.8 2.133333 8.533333 0 17.066667-4.266667 23.466667-10.666666l136.533333-138.666667H853.333333c40.533333 0 74.666667-34.133333 74.666667-74.666667V213.333333c0-40.533333-34.133333-74.666667-74.666667-74.666666z m10.666667 586.666666c0 6.4-4.266667 10.666667-10.666667 10.666667H501.333333c-8.533333 0-17.066667 4.266667-23.466666 10.666667l-89.6 93.866666V768c0-17.066667-14.933333-32-32-32H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V213.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h682.666666c6.4 0 10.666667 4.266667 10.666667 10.666666v512z"  ></path><path d="M512 490.666667H298.666667c-17.066667 0-32 14.933333-32 32S281.6 554.666667 298.666667 554.666667h213.333333c17.066667 0 32-14.933333 32-32S529.066667 490.666667 512 490.666667zM672 341.333333H298.666667c-17.066667 0-32 14.933333-32 32S281.6 405.333333 298.666667 405.333333h373.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-column-vertical" viewBox="0 0 1024 1024"><path d="M874.666667 117.333333H149.333333C108.8 117.333333 74.666667 151.466667 74.666667 192v640c0 40.533333 34.133333 74.666667 74.666666 74.666667h725.333334c40.533333 0 74.666667-34.133333 74.666666-74.666667V192c0-40.533333-34.133333-74.666667-74.666666-74.666667z m-725.333334 64h725.333334c6.4 0 10.666667 4.266667 10.666666 10.666667v288h-746.666666V192c0-6.4 4.266667-10.666667 10.666666-10.666667z m725.333334 661.333334H149.333333c-6.4 0-10.666667-4.266667-10.666666-10.666667V544h746.666666V832c0 6.4-4.266667 10.666667-10.666666 10.666667z"  ></path></symbol><symbol id="zj-column-horizontal" viewBox="0 0 1024 1024"><path d="M874.666667 117.333333H149.333333C108.8 117.333333 74.666667 151.466667 74.666667 192v640c0 40.533333 34.133333 74.666667 74.666666 74.666667h725.333334c40.533333 0 74.666667-34.133333 74.666666-74.666667V192c0-40.533333-34.133333-74.666667-74.666666-74.666667zM138.666667 832V192c0-6.4 4.266667-10.666667 10.666666-10.666667h330.666667v661.333334H149.333333c-6.4 0-10.666667-4.266667-10.666666-10.666667z m746.666666 0c0 6.4-4.266667 10.666667-10.666666 10.666667H544v-661.333334H874.666667c6.4 0 10.666667 4.266667 10.666666 10.666667v640z"  ></path></symbol><symbol id="zj-complete" viewBox="0 0 1024 1024"><path d="M874.666667 501.333333c-17.066667 0-32 14.933333-32 32v298.666667c0 6.4-4.266667 10.666667-10.666667 10.666667H192c-6.4 0-10.666667-4.266667-10.666667-10.666667V192c0-6.4 4.266667-10.666667 10.666667-10.666667h469.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H192C151.466667 117.333333 117.333333 151.466667 117.333333 192v640c0 40.533333 34.133333 74.666667 74.666667 74.666667h640c40.533333 0 74.666667-34.133333 74.666667-74.666667V533.333333c0-17.066667-14.933333-32-32-32z"  ></path><path d="M940.8 168.533333c-12.8-12.8-32-12.8-44.8 0l-390.4 384-106.666667-106.666666c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l130.133334 128c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333l411.733333-405.333334c8.533333-10.666667 10.666667-32-2.133333-44.8z"  ></path></symbol><symbol id="zj-chart-pie" viewBox="0 0 1024 1024"><path d="M887.466667 642.133333c-17.066667-6.4-34.133333 0-42.666667 17.066667-64 151.466667-221.866667 243.2-386.133333 221.866667-164.266667-21.333333-294.4-149.333333-315.733334-313.6C119.466667 405.333333 209.066667 245.333333 358.4 179.2c17.066667-6.4 23.466667-25.6 17.066667-42.666667-6.4-17.066667-25.6-23.466667-42.666667-17.066666C155.733333 198.4 51.2 386.133333 78.933333 578.133333c27.733333 192 179.2 343.466667 371.2 369.066667 19.2 2.133333 36.266667 4.266667 55.466667 4.266667 170.666667 0 330.666667-102.4 398.933333-264.533334 6.4-17.066667-2.133333-36.266667-17.066666-44.8z"  ></path><path d="M814.933333 209.066667C727.466667 121.6 612.266667 74.666667 490.666667 74.666667c-17.066667 0-32 14.933333-32 32v426.666666c0 17.066667 14.933333 32 32 32h426.666666c17.066667 0 32-14.933333 32-32 0-121.6-46.933333-236.8-134.4-324.266666zM522.666667 501.333333V140.8c93.866667 6.4 179.2 46.933333 247.466666 115.2 66.133333 66.133333 106.666667 153.6 115.2 247.466667h-362.666666z"  ></path></symbol><symbol id="zj-cry" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"  ></path><path d="M512 597.333333c-81.066667 0-151.466667 36.266667-211.2 106.666667-10.666667 12.8-8.533333 34.133333 4.266667 44.8 12.8 10.666667 34.133333 8.533333 44.8-4.266667 46.933333-57.6 100.266667-85.333333 162.133333-85.333333s115.2 27.733333 162.133333 85.333333c6.4 8.533333 14.933333 10.666667 25.6 10.666667 6.4 0 14.933333-2.133333 21.333334-6.4 12.8-10.666667 14.933333-32 4.266666-44.8-61.866667-70.4-132.266667-106.666667-213.333333-106.666667zM362.666667 512c23.466667 0 42.666667-19.2 42.666666-42.666667v-64c0-23.466667-19.2-42.666667-42.666666-42.666666s-42.666667 19.2-42.666667 42.666666v64c0 23.466667 19.2 42.666667 42.666667 42.666667zM661.333333 512c23.466667 0 42.666667-19.2 42.666667-42.666667v-64c0-23.466667-19.2-42.666667-42.666667-42.666666s-42.666667 19.2-42.666666 42.666666v64c0 23.466667 19.2 42.666667 42.666666 42.666667z"  ></path></symbol><symbol id="zj-customer-service" viewBox="0 0 1024 1024"><path d="M864 439.466667V426.666667c0-194.133333-157.866667-352-352-352S160 232.533333 160 426.666667v12.8c-36.266667 4.266667-64 36.266667-64 72.533333v170.666667c0 40.533333 34.133333 74.666667 74.666667 74.666666h85.333333c40.533333 0 74.666667-34.133333 74.666667-74.666666v-170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667h-32V426.666667c0-157.866667 130.133333-288 288-288S800 268.8 800 426.666667v10.666666H768c-40.533333 0-74.666667 34.133333-74.666667 74.666667v170.666667c0 40.533333 34.133333 74.666667 74.666667 74.666666h21.333333c-17.066667 49.066667-59.733333 98.133333-179.2 106.666667-12.8-19.2-32-32-55.466666-32-36.266667 0-64 27.733333-64 64s27.733333 64 64 64c23.466667 0 44.8-12.8 55.466666-34.133333 166.4-10.666667 226.133333-91.733333 245.333334-170.666667 40.533333-2.133333 72.533333-34.133333 72.533333-74.666667v-170.666666c0-36.266667-27.733333-66.133333-64-70.4z m-597.333333 72.533333v170.666667c0 6.4-4.266667 10.666667-10.666667 10.666666H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666666v-170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h85.333333c6.4 0 10.666667 4.266667 10.666667 10.666667z m597.333333 170.666667c0 6.4-4.266667 10.666667-10.666667 10.666666h-85.333333c-6.4 0-10.666667-4.266667-10.666667-10.666666v-170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h85.333333c6.4 0 10.666667 4.266667 10.666667 10.666667v170.666667z"  ></path></symbol><symbol id="zj-delete" viewBox="0 0 1024 1024"><path d="M874.666667 202.666667H360.533333c-21.333333 0-40.533333 8.533333-55.466666 23.466666l-217.6 234.666667c-25.6 27.733333-25.6 72.533333 0 100.266667l217.6 234.666666c14.933333 14.933333 34.133333 23.466667 55.466666 23.466667H874.666667c40.533333 0 74.666667-34.133333 74.666666-74.666667V277.333333c0-40.533333-34.133333-74.666667-74.666666-74.666666z m10.666666 544c0 6.4-4.266667 10.666667-10.666666 10.666666H360.533333c-2.133333 0-6.4-2.133333-8.533333-4.266666l-217.6-234.666667c-4.266667-4.266667-4.266667-10.666667 0-14.933333l217.6-234.666667c2.133333-2.133333 4.266667-4.266667 8.533333-4.266667H874.666667c6.4 0 10.666667 4.266667 10.666666 10.666667V746.666667z"  ></path><path d="M684.8 403.2c-12.8-12.8-32-12.8-44.8 0l-64 64-61.866667-61.866667c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l61.866667 61.866667-61.866667 61.866667c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466667-8.533333l61.866666-61.866667L640 618.666667c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8L620.8 512l61.866667-61.866667c12.8-12.8 12.8-34.133333 2.133333-46.933333z"  ></path></symbol><symbol id="zj-direction-down" viewBox="0 0 1024 1024"><path d="M898.133333 512c-12.8-12.8-32-12.8-44.8-2.133333L544 800V149.333333c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v650.666667L170.666667 509.866667c-12.8-12.8-34.133333-10.666667-44.8 2.133333-12.8 12.8-10.666667 34.133333 2.133333 44.8l362.666667 341.333333c2.133333 2.133333 6.4 4.266667 8.533333 6.4 4.266667 2.133333 6.4 2.133333 10.666667 2.133334s8.533333 0 10.666666-2.133334c4.266667-2.133333 6.4-4.266667 8.533334-6.4l362.666666-341.333333c17.066667-12.8 19.2-32 6.4-44.8z"  ></path></symbol><symbol id="zj-copy" viewBox="0 0 1024 1024"><path d="M853.333333 224h-53.333333V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667H170.666667C130.133333 96 96 130.133333 96 170.666667v554.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h53.333333V853.333333c0 40.533333 34.133333 74.666667 74.666667 74.666667h554.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667V298.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667zM160 725.333333V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h554.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v554.666666c0 6.4-4.266667 10.666667-10.666667 10.666667H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667z m704 128c0 6.4-4.266667 10.666667-10.666667 10.666667H298.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667v-53.333333H725.333333c40.533333 0 74.666667-34.133333 74.666667-74.666667V288H853.333333c6.4 0 10.666667 4.266667 10.666667 10.666667v554.666666z"  ></path><path d="M576 416h-96V320c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v96H320c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h96V576c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-96H576c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-cut" viewBox="0 0 1024 1024"><path d="M917.333333 202.666667h-96V106.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v96H277.333333c-40.533333 0-74.666667 34.133333-74.666666 74.666666v480H106.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h96V917.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-96H746.666667c40.533333 0 74.666667-34.133333 74.666666-74.666666V266.666667H917.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM757.333333 746.666667c0 6.4-4.266667 10.666667-10.666666 10.666666H266.666667V277.333333c0-6.4 4.266667-10.666667 10.666666-10.666666h480V746.666667z"  ></path></symbol><symbol id="zj-data-view" viewBox="0 0 1024 1024"><path d="M874.666667 864H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V149.333333c0-17.066667-14.933333-32-32-32S96 132.266667 96 149.333333v704c0 40.533333 34.133333 74.666667 74.666667 74.666667h704c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path><path d="M437.333333 469.333333v320c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V469.333333c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32zM298.666667 821.333333c17.066667 0 32-14.933333 32-32V533.333333c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v256c0 17.066667 14.933333 32 32 32zM640 565.333333c-17.066667 0-32 14.933333-32 32v192c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-192c0-17.066667-14.933333-32-32-32zM810.666667 352c-17.066667 0-32 14.933333-32 32v405.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V384c0-17.066667-14.933333-32-32-32zM322.133333 407.466667l147.2-147.2 147.2 147.2c6.4 6.4 14.933333 8.533333 23.466667 8.533333h2.133333c8.533333 0 17.066667-6.4 23.466667-12.8l170.666667-234.666667c10.666667-14.933333 6.4-34.133333-6.4-44.8-14.933333-10.666667-34.133333-6.4-44.8 6.4l-149.333334 204.8L490.666667 189.866667c-12.8-12.8-32-12.8-44.8 0l-170.666667 170.666666c-12.8 12.8-12.8 32 0 44.8 12.8 12.8 34.133333 12.8 46.933333 2.133334z"  ></path></symbol><symbol id="zj-direction-right" viewBox="0 0 1024 1024"><path d="M904.533333 522.666667c2.133333-4.266667 2.133333-6.4 2.133334-10.666667s0-8.533333-2.133334-10.666667c-2.133333-4.266667-4.266667-6.4-6.4-8.533333l-341.333333-362.666667c-12.8-12.8-32-12.8-44.8-2.133333-12.8 12.8-12.8 32-2.133333 44.8l290.133333 309.333333H149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h650.666667L509.866667 853.333333c-12.8 12.8-10.666667 34.133333 2.133333 44.8 6.4 6.4 14.933333 8.533333 21.333333 8.533334 8.533333 0 17.066667-4.266667 23.466667-10.666667l341.333333-362.666667c2.133333-2.133333 4.266667-6.4 6.4-10.666666z"  ></path></symbol><symbol id="zj-direction-up" viewBox="0 0 1024 1024"><path d="M896 467.2l-362.666667-341.333333c-2.133333-2.133333-6.4-4.266667-8.533333-6.4-4.266667-2.133333-6.4-2.133333-10.666667-2.133334s-8.533333 0-10.666666 2.133334c-4.266667 2.133333-6.4 4.266667-8.533334 6.4l-362.666666 341.333333c-12.8 12.8-12.8 32-2.133334 44.8 12.8 12.8 32 12.8 44.8 2.133333l309.333334-290.133333V874.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V224L853.333333 514.133333c6.4 6.4 14.933333 8.533333 21.333334 8.533334 8.533333 0 17.066667-4.266667 23.466666-10.666667 12.8-12.8 10.666667-32-2.133333-44.8z"  ></path></symbol><symbol id="zj-discount" viewBox="0 0 1024 1024"><path d="M874.666667 96H593.066667c-19.2 0-38.4 8.533333-53.333334 21.333333l-405.333333 405.333334c-29.866667 29.866667-29.866667 76.8 0 104.533333l260.266667 260.266667c14.933333 14.933333 32 21.333333 53.333333 21.333333s38.4-8.533333 53.333333-21.333333l405.333334-405.333334c14.933333-14.933333 21.333333-32 21.333333-53.333333V149.333333c0-29.866667-23.466667-53.333333-53.333333-53.333333z m-10.666667 334.933333c0 2.133333-2.133333 6.4-2.133333 8.533334l-405.333334 405.333333c-2.133333 2.133333-6.4 2.133333-8.533333 2.133333s-4.266667 0-8.533333-2.133333L181.333333 584.533333c-4.266667-4.266667-4.266667-10.666667 0-14.933333l405.333334-405.333333c2.133333-2.133333 4.266667-2.133333 8.533333-2.133334h270.933333v268.8z"  ></path><path d="M704 416c53.333333 0 96-42.666667 96-96s-42.666667-96-96-96-96 42.666667-96 96 42.666667 96 96 96z m0-128c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32-32-14.933333-32-32 14.933333-32 32-32z"  ></path></symbol><symbol id="zj-direction-left" viewBox="0 0 1024 1024"><path d="M874.666667 480H224L514.133333 170.666667c12.8-12.8 10.666667-34.133333-2.133333-44.8s-32-10.666667-44.8 2.133333l-341.333333 362.666667c-2.133333 2.133333-4.266667 6.4-6.4 8.533333-2.133333 4.266667-2.133333 6.4-2.133334 10.666667s0 8.533333 2.133334 10.666666c2.133333 4.266667 4.266667 6.4 6.4 8.533334l341.333333 362.666666c6.4 6.4 14.933333 10.666667 23.466667 10.666667 8.533333 0 14.933333-2.133333 21.333333-8.533333 12.8-12.8 12.8-32 2.133333-44.8L224 544H874.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-download" viewBox="0 0 1024 1024"><path d="M896 672c-17.066667 0-32 14.933333-32 32v128c0 6.4-4.266667 10.666667-10.666667 10.666667H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667v-128c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v128c0 40.533333 34.133333 74.666667 74.666667 74.666667h682.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667v-128c0-17.066667-14.933333-32-32-32z"  ></path><path d="M488.533333 727.466667c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466667-8.533333l213.333333-213.333334c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0l-157.866667 157.866667V170.666667c0-17.066667-14.933333-32-32-32s-34.133333 14.933333-34.133333 32v456.533333L322.133333 469.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l211.2 213.333334z"  ></path></symbol><symbol id="zj-electronics" viewBox="0 0 1024 1024"><path d="M840.533333 117.333333H183.466667c-59.733333 0-108.8 49.066667-108.8 108.8v379.733334c0 59.733333 49.066667 108.8 108.8 108.8h232.533333v115.2H341.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h341.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32h-74.666667v-115.2h232.533333c59.733333 0 108.8-49.066667 108.8-108.8V226.133333c0-59.733333-49.066667-108.8-108.8-108.8zM544 829.866667h-64v-115.2h64v115.2z m341.333333-224c0 25.6-19.2 44.8-44.8 44.8H183.466667c-25.6 0-44.8-19.2-44.8-44.8V226.133333c0-25.6 19.2-44.8 44.8-44.8h657.066666c25.6 0 44.8 19.2 44.8 44.8v379.733334z"  ></path></symbol><symbol id="zj-drag" viewBox="0 0 1024 1024"><path d="M362.666667 192m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"  ></path><path d="M661.333333 192m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"  ></path><path d="M362.666667 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"  ></path><path d="M661.333333 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"  ></path><path d="M362.666667 832m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"  ></path><path d="M661.333333 832m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"  ></path></symbol><symbol id="zj-elipsis" viewBox="0 0 1024 1024"><path d="M192 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"  ></path><path d="M512 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"  ></path><path d="M832 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"  ></path></symbol><symbol id="zj-export" viewBox="0 0 1024 1024"><path d="M582.4 864H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h309.333333V320c0 40.533333 34.133333 74.666667 74.666667 74.666667h160v38.4c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V298.666667c0-8.533333-4.266667-17.066667-8.533334-23.466667l-170.666666-170.666667c-6.4-6.4-14.933333-8.533333-23.466667-8.533333H170.666667C130.133333 96 96 130.133333 96 170.666667v682.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h411.733333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z m132.266667-550.4v17.066667H554.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V160h19.2l151.466667 153.6z"  ></path><path d="M866.133333 669.866667l-106.666666-106.666667c-12.8-12.8-32-12.8-44.8 0s-12.8 32 0 44.8l51.2 51.2H512c-17.066667 0-32 14.933333-32 32S494.933333 725.333333 512 725.333333h253.866667l-51.2 51.2c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533334s17.066667-2.133333 23.466667-8.533334l106.666667-106.666666c8.533333-10.666667 8.533333-32-2.133334-44.8z"  ></path></symbol><symbol id="zj-explain" viewBox="0 0 1024 1024"><path d="M789.333333 74.666667H234.666667C194.133333 74.666667 160 108.8 160 149.333333v725.333334c0 40.533333 34.133333 74.666667 74.666667 74.666666h554.666666c40.533333 0 74.666667-34.133333 74.666667-74.666666V149.333333c0-40.533333-34.133333-74.666667-74.666667-74.666666z m-138.666666 64v296.533333L576 364.8c-6.4-6.4-14.933333-8.533333-21.333333-8.533333-8.533333 0-17.066667 2.133333-21.333334 8.533333l-74.666666 72.533333v-298.666666h192z m149.333333 736c0 6.4-4.266667 10.666667-10.666667 10.666666H234.666667c-6.4 0-10.666667-4.266667-10.666667-10.666666V149.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h160v322.133333c0 14.933333 6.4 27.733333 14.933333 36.266667 21.333333 21.333333 53.333333 21.333333 74.666667 0l70.4-68.266667 70.4 68.266667c10.666667 10.666667 23.466667 14.933333 36.266666 14.933333 29.866667 0 53.333333-23.466667 53.333334-53.333333v-320H789.333333c6.4 0 10.666667 4.266667 10.666667 10.666666v725.333334z"  ></path></symbol><symbol id="zj-edit" viewBox="0 0 1024 1024"><path d="M853.333333 501.333333c-17.066667 0-32 14.933333-32 32v320c0 6.4-4.266667 10.666667-10.666666 10.666667H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V213.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h320c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666666v640c0 40.533333 34.133333 74.666667 74.666667 74.666667h640c40.533333 0 74.666667-34.133333 74.666666-74.666667V533.333333c0-17.066667-14.933333-32-32-32z"  ></path><path d="M405.333333 484.266667l-32 125.866666c-2.133333 10.666667 0 23.466667 8.533334 29.866667 6.4 6.4 14.933333 8.533333 23.466666 8.533333h8.533334l125.866666-32c6.4-2.133333 10.666667-4.266667 14.933334-8.533333l300.8-300.8c38.4-38.4 38.4-102.4 0-140.8-38.4-38.4-102.4-38.4-140.8 0L413.866667 469.333333c-4.266667 4.266667-6.4 8.533333-8.533334 14.933334z m59.733334 23.466666L761.6 213.333333c12.8-12.8 36.266667-12.8 49.066667 0 12.8 12.8 12.8 36.266667 0 49.066667L516.266667 558.933333l-66.133334 17.066667 14.933334-68.266667z"  ></path></symbol><symbol id="zj-eye-close" viewBox="0 0 1024 1024"><path d="M955.733333 492.8c-6.4-12.8-162.133333-317.866667-443.733333-317.866667-23.466667 0-46.933333 2.133333-70.4 6.4-17.066667 4.266667-29.866667 19.2-25.6 36.266667 4.266667 17.066667 19.2 29.866667 36.266667 25.6 19.2-4.266667 38.4-4.266667 57.6-4.266667 209.066667 0 345.6 209.066667 379.733333 266.666667-10.666667 19.2-32 53.333333-64 91.733333-10.666667 12.8-8.533333 34.133333 4.266667 44.8 6.4 4.266667 12.8 6.4 21.333333 6.4s19.2-4.266667 25.6-10.666666c51.2-61.866667 78.933333-115.2 78.933333-117.333334 6.4-8.533333 6.4-19.2 0-27.733333zM215.466667 125.866667c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l91.733333 91.733333C138.666667 354.133333 72.533333 484.266667 68.266667 490.666667c-4.266667 8.533333-4.266667 19.2 0 29.866666 6.4 12.8 162.133333 315.733333 443.733333 315.733334 83.2 0 164.266667-27.733333 241.066667-81.066667l96 96c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c12.8-12.8 12.8-32 0-44.8L215.466667 125.866667z m243.2 334.933333l104.533333 104.533333c-12.8 12.8-32 21.333333-51.2 21.333334-40.533333 0-74.666667-34.133333-74.666667-74.666667 0-19.2 8.533333-38.4 21.333334-51.2zM512 772.266667c-209.066667 0-345.6-209.066667-379.733333-266.666667 21.333333-36.266667 81.066667-130.133333 174.933333-196.266667l104.533333 104.533334c-25.6 25.6-38.4 59.733333-38.4 96 0 76.8 61.866667 138.666667 138.666667 138.666666 36.266667 0 70.4-14.933333 96-38.4l98.133333 98.133334c-61.866667 42.666667-128 64-194.133333 64z"  ></path></symbol><symbol id="zj-email" viewBox="0 0 1024 1024"><path d="M874.666667 181.333333H149.333333c-40.533333 0-74.666667 34.133333-74.666666 74.666667v512c0 40.533333 34.133333 74.666667 74.666666 74.666667h725.333334c40.533333 0 74.666667-34.133333 74.666666-74.666667V256c0-40.533333-34.133333-74.666667-74.666666-74.666667z m-725.333334 64h725.333334c6.4 0 10.666667 4.266667 10.666666 10.666667v25.6L512 516.266667l-373.333333-234.666667V256c0-6.4 4.266667-10.666667 10.666666-10.666667z m725.333334 533.333334H149.333333c-6.4 0-10.666667-4.266667-10.666666-10.666667V356.266667l356.266666 224c4.266667 4.266667 10.666667 4.266667 17.066667 4.266666s12.8-2.133333 17.066667-4.266666l356.266666-224V768c0 6.4-4.266667 10.666667-10.666666 10.666667z"  ></path></symbol><symbol id="zj-error" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"  ></path><path d="M657.066667 360.533333c-12.8-12.8-32-12.8-44.8 0l-102.4 102.4-102.4-102.4c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l102.4 102.4-102.4 102.4c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533334s17.066667-2.133333 23.466667-8.533334l102.4-102.4 102.4 102.4c6.4 6.4 14.933333 8.533333 23.466667 8.533334s17.066667-2.133333 23.466666-8.533334c12.8-12.8 12.8-32 0-44.8l-106.666666-100.266666 102.4-102.4c12.8-12.8 12.8-34.133333 0-46.933334z"  ></path></symbol><symbol id="zj-favorite" viewBox="0 0 1024 1024"><path d="M934.4 356.266667c-8.533333-10.666667-21.333333-19.2-34.133333-21.333334l-234.666667-34.133333-104.533333-213.333333c-6.4-8.533333-14.933333-17.066667-25.6-23.466667-12.8-6.4-27.733333-6.4-40.533334-2.133333-12.8 4.266667-23.466667 14.933333-29.866666 27.733333l-104.533334 213.333333-234.666666 34.133334c-10.666667 2.133333-21.333333 6.4-29.866667 14.933333-21.333333 21.333333-19.2 55.466667 0 74.666667l170.666667 166.4-40.533334 234.666666c-2.133333 10.666667 0 23.466667 6.4 34.133334 12.8 25.6 46.933333 36.266667 72.533334 21.333333l211.2-110.933333 211.2 110.933333c8.533333 4.266667 17.066667 6.4 25.6 6.4h8.533333c14.933333-2.133333 25.6-10.666667 34.133333-21.333333 8.533333-10.666667 10.666667-25.6 8.533334-40.533334l-40.533334-234.666666 170.666667-166.4c8.533333-8.533333 14.933333-19.2 14.933333-29.866667-2.133333-14.933333-6.4-27.733333-14.933333-40.533333z m-224 194.133333c-12.8 12.8-19.2 29.866667-14.933333 46.933333l38.4 217.6L512 699.733333l-221.866667 115.2L328.533333 597.333333c2.133333-17.066667-2.133333-34.133333-14.933333-46.933333l-157.866667-153.6 219.733334-32c17.066667-2.133333 32-12.8 40.533333-29.866667L512 136.533333l98.133333 198.4c8.533333 14.933333 23.466667 27.733333 40.533334 29.866667l219.733333 32-160 153.6z"  ></path></symbol><symbol id="zj-file-common" viewBox="0 0 1024 1024"><path d="M832 74.666667H192c-17.066667 0-32 14.933333-32 32v765.866666c0 12.8 4.266667 23.466667 12.8 34.133334 8.533333 10.666667 21.333333 17.066667 36.266667 19.2h6.4c12.8 0 23.466667-4.266667 34.133333-12.8l264.533333-213.333334 264.533334 213.333334c8.533333 8.533333 21.333333 12.8 34.133333 12.8 29.866667 0 53.333333-23.466667 53.333333-53.333334V106.666667c-2.133333-17.066667-17.066667-32-34.133333-32z m-32 776.533333L531.2 633.6c-10.666667-8.533333-27.733333-8.533333-40.533333 0L224 851.2V138.666667h576v712.533333z"  ></path><path d="M341.333333 341.333333h320c17.066667 0 32-14.933333 32-32S678.4 277.333333 661.333333 277.333333H341.333333c-17.066667 0-32 14.933333-32 32S324.266667 341.333333 341.333333 341.333333zM341.333333 512h213.333334c17.066667 0 32-14.933333 32-32S571.733333 448 554.666667 448H341.333333c-17.066667 0-32 14.933333-32 32S324.266667 512 341.333333 512z"  ></path></symbol><symbol id="zj-file-delete" viewBox="0 0 1024 1024"><path d="M842.666667 285.866667l-187.733334-187.733334c-14.933333-14.933333-32-21.333333-53.333333-21.333333H234.666667C194.133333 74.666667 160 108.8 160 149.333333v725.333334c0 40.533333 34.133333 74.666667 74.666667 74.666666h554.666666c40.533333 0 74.666667-34.133333 74.666667-74.666666V337.066667c0-19.2-8.533333-38.4-21.333333-51.2z m-44.8 44.8c-2.133333 2.133333-4.266667 0-8.533334 0h-170.666666c-6.4 0-10.666667-4.266667-10.666667-10.666667V149.333333c0-2.133333 0-6.4-2.133333-8.533333 0 0 2.133333 0 2.133333 2.133333l189.866667 187.733334z m-8.533334 554.666666H234.666667c-6.4 0-10.666667-4.266667-10.666667-10.666666V149.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h311.466666c-2.133333 4.266667-2.133333 6.4-2.133333 10.666666v170.666667c0 40.533333 34.133333 74.666667 74.666667 74.666667h170.666666c4.266667 0 6.4 0 10.666667-2.133334V874.666667c0 6.4-4.266667 10.666667-10.666667 10.666666z"  ></path><path d="M640 586.666667H384c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h256c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-file-add" viewBox="0 0 1024 1024"><path d="M842.666667 285.866667l-187.733334-187.733334c-14.933333-14.933333-32-21.333333-53.333333-21.333333H234.666667C194.133333 74.666667 160 108.8 160 149.333333v725.333334c0 40.533333 34.133333 74.666667 74.666667 74.666666h554.666666c40.533333 0 74.666667-34.133333 74.666667-74.666666V337.066667c0-19.2-8.533333-38.4-21.333333-51.2z m-44.8 44.8H618.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V140.8l189.866667 189.866667z m-8.533334 554.666666H234.666667c-6.4 0-10.666667-4.266667-10.666667-10.666666V149.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h309.333333V320c0 40.533333 34.133333 74.666667 74.666667 74.666667h181.333333V874.666667c0 6.4-4.266667 10.666667-10.666667 10.666666z"  ></path><path d="M618.666667 586.666667h-74.666667V512c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v74.666667H405.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h74.666667V725.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-74.666666H618.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-film" viewBox="0 0 1024 1024"><path d="M853.333333 96H170.666667C130.133333 96 96 130.133333 96 170.666667v682.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h682.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667z m10.666667 384h-149.333333v-106.666667h149.333333v106.666667z m-213.333333 0h-277.333334v-320h277.333334v320z m-341.333334 0h-149.333333v-106.666667h149.333333v106.666667z m-149.333333 64h149.333333v106.666667h-149.333333v-106.666667z m213.333333 0h277.333334v320h-277.333334v-320z m341.333334 0h149.333333v106.666667h-149.333333v-106.666667z m149.333333-373.333333v138.666666h-149.333333v-149.333333H853.333333c6.4 0 10.666667 4.266667 10.666667 10.666667zM170.666667 160h138.666666v149.333333h-149.333333V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667zM160 853.333333v-138.666666h149.333333v149.333333H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667z m693.333333 10.666667h-138.666666v-149.333333h149.333333V853.333333c0 6.4-4.266667 10.666667-10.666667 10.666667z"  ></path></symbol><symbol id="zj-fabulous" viewBox="0 0 1024 1024"><path d="M859.733333 253.866667c-44.8-44.8-102.4-70.4-166.4-70.4-61.866667 0-121.6 25.6-166.4 70.4l-14.933333 17.066666-17.066667-17.066666c-44.8-44.8-102.4-70.4-166.4-70.4-61.866667 0-121.6 25.6-166.4 70.4-91.733333 91.733333-91.733333 243.2 0 337.066666l324.266667 330.666667c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-4.266667 23.466666-8.533333l324.266667-330.666667c44.8-44.8 68.266667-104.533333 68.266667-168.533333s-21.333333-123.733333-66.133334-168.533333z m-44.8 290.133333L512 853.333333 209.066667 544c-66.133333-68.266667-66.133333-179.2 0-247.466667 32-32 74.666667-51.2 119.466666-51.2 44.8 0 87.466667 17.066667 119.466667 51.2l38.4 40.533334c12.8 12.8 34.133333 12.8 44.8 0l38.4-40.533334c32-32 74.666667-51.2 119.466667-51.2 44.8 0 87.466667 17.066667 119.466666 51.2 32 32 49.066667 76.8 49.066667 123.733334s-12.8 91.733333-42.666667 123.733333z"  ></path></symbol><symbol id="zj-file" viewBox="0 0 1024 1024"><path d="M842.666667 285.866667l-187.733334-187.733334c-14.933333-14.933333-32-21.333333-53.333333-21.333333H234.666667C194.133333 74.666667 160 108.8 160 149.333333v725.333334c0 40.533333 34.133333 74.666667 74.666667 74.666666h554.666666c40.533333 0 74.666667-34.133333 74.666667-74.666666V337.066667c0-19.2-8.533333-38.4-21.333333-51.2z m-44.8 44.8c-2.133333 2.133333-4.266667 0-8.533334 0h-170.666666c-6.4 0-10.666667-4.266667-10.666667-10.666667V149.333333c0-2.133333 0-6.4-2.133333-8.533333 0 0 2.133333 0 2.133333 2.133333l189.866667 187.733334z m-8.533334 554.666666H234.666667c-6.4 0-10.666667-4.266667-10.666667-10.666666V149.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h311.466666c-2.133333 4.266667-2.133333 6.4-2.133333 10.666666v170.666667c0 40.533333 34.133333 74.666667 74.666667 74.666667h170.666666c4.266667 0 6.4 0 10.666667-2.133334V874.666667c0 6.4-4.266667 10.666667-10.666667 10.666666z"  ></path><path d="M640 693.333333H341.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h298.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM640 522.666667H341.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h298.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM341.333333 416h85.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32h-85.333334c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32z"  ></path></symbol><symbol id="zj-folder-close" viewBox="0 0 1024 1024"><path d="M853.333333 266.666667H514.133333c-4.266667 0-6.4-2.133333-8.533333-4.266667l-38.4-66.133333c-12.8-21.333333-38.4-36.266667-64-36.266667H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666667v554.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h682.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667V341.333333c0-40.533333-34.133333-74.666667-74.666667-74.666666z m-682.666666-42.666667h232.533333c4.266667 0 6.4 2.133333 8.533333 4.266667l38.4 66.133333c12.8 21.333333 38.4 36.266667 64 36.266667H853.333333c6.4 0 10.666667 4.266667 10.666667 10.666666v74.666667h-704V234.666667c0-6.4 4.266667-10.666667 10.666667-10.666667z m682.666666 576H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V480h704V789.333333c0 6.4-4.266667 10.666667-10.666667 10.666667z"  ></path></symbol><symbol id="zj-filter" viewBox="0 0 1024 1024"><path d="M872.533333 134.4c-12.8-10.666667-29.866667-17.066667-49.066666-17.066667H198.4C157.866667 117.333333 123.733333 151.466667 123.733333 192c0 17.066667 6.4 34.133333 17.066667 49.066667l256 302.933333v251.733333c0 12.8 6.4 23.466667 17.066667 27.733334l162.133333 81.066666c4.266667 2.133333 8.533333 4.266667 14.933333 4.266667 6.4 0 10.666667-2.133333 17.066667-4.266667 8.533333-6.4 14.933333-17.066667 14.933333-27.733333V541.866667l256-302.933334c12.8-14.933333 19.2-34.133333 17.066667-53.333333 2.133333-19.2-6.4-38.4-23.466667-51.2z m-38.4 64L569.6 509.866667c-4.266667 6.4-8.533333 12.8-8.533333 21.333333v292.266667l-98.133334-49.066667V531.2c0-8.533333-2.133333-14.933333-8.533333-21.333333L189.866667 198.4c0-2.133333-2.133333-4.266667-2.133334-6.4 0-6.4 4.266667-10.666667 10.666667-10.666667h625.066667c2.133333 0 4.266667 0 6.4 2.133334 2.133333 2.133333 4.266667 6.4 4.266666 6.4 2.133333 2.133333 2.133333 6.4 0 8.533333z"  ></path></symbol><symbol id="zj-good" viewBox="0 0 1024 1024"><path d="M881.066667 394.666667c-21.333333-23.466667-51.2-36.266667-81.066667-36.266667H618.666667v-117.333333c0-44.8-29.866667-85.333333-87.466667-117.333334-17.066667-10.666667-38.4-12.8-57.6-8.533333-19.2 4.266667-36.266667 17.066667-46.933333 34.133333-2.133333 2.133333-2.133333 4.266667-4.266667 6.4l-125.866667 281.6H204.8c-59.733333 0-108.8 46.933333-108.8 106.666667v258.133333c0 57.6 49.066667 106.666667 108.8 106.666667h544c53.333333 0 98.133333-38.4 106.666667-89.6l51.2-337.066667c4.266667-34.133333-6.4-64-25.6-87.466666z m-593.066667 448H204.8c-25.6 0-44.8-19.2-44.8-42.666667v-256c0-23.466667 19.2-42.666667 44.8-42.666667h83.2v341.333334z m554.666667-373.333334L789.333333 806.4c-4.266667 21.333333-21.333333 36.266667-42.666666 36.266667H352V471.466667l130.133333-290.133334c2.133333-4.266667 4.266667-4.266667 6.4-4.266666 2.133333 0 4.266667 0 8.533334 2.133333 25.6 14.933333 55.466667 38.4 55.466666 64v149.333333c0 17.066667 14.933333 32 32 32h213.333334c12.8 0 25.6 4.266667 34.133333 14.933334 8.533333 6.4 12.8 19.2 10.666667 29.866666z"  ></path></symbol><symbol id="zj-hide" viewBox="0 0 1024 1024"><path d="M917.333333 573.866667l-87.466666-87.466667c34.133333-32 66.133333-68.266667 91.733333-108.8 8.533333-14.933333 4.266667-34.133333-10.666667-44.8-14.933333-8.533333-34.133333-4.266667-44.8 10.666667-76.8 125.866667-209.066667 200.533333-356.266666 200.533333-145.066667 0-279.466667-74.666667-354.133334-198.4-8.533333-14.933333-29.866667-19.2-44.8-10.666667-14.933333 8.533333-19.2 29.866667-10.666666 44.8 25.6 40.533333 55.466667 76.8 91.733333 108.8l-85.333333 85.333334c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333l91.733333-91.733334c38.4 25.6 81.066667 46.933333 125.866667 59.733334l-34.133333 130.133333c-4.266667 17.066667 6.4 34.133333 23.466666 38.4 2.133333 0 6.4 2.133333 8.533334 2.133333 14.933333 0 27.733333-8.533333 29.866666-23.466666l36.266667-132.266667c25.6 4.266667 51.2 6.4 78.933333 6.4 27.733333 0 55.466667-2.133333 83.2-6.4l36.266667 132.266667c4.266667 14.933333 17.066667 23.466667 29.866667 23.466666 2.133333 0 6.4 0 8.533333-2.133333 17.066667-4.266667 27.733333-21.333333 23.466667-38.4L661.333333 584.533333c44.8-12.8 85.333333-34.133333 123.733334-59.733333l91.733333 91.733333c6.4 6.4 14.933333 8.533333 23.466667 8.533334s17.066667-2.133333 23.466666-8.533334c6.4-10.666667 6.4-29.866667-6.4-42.666666z"  ></path></symbol><symbol id="zj-home" viewBox="0 0 1024 1024"><path d="M923.733333 394.666667c-85.333333-70.4-206.933333-174.933333-362.666666-309.333334C533.333333 61.866667 490.666667 61.866667 462.933333 85.333333c-155.733333 134.4-277.333333 238.933333-362.666666 309.333334-14.933333 14.933333-25.6 34.133333-25.6 53.333333 0 38.4 32 70.4 70.4 70.4H192v358.4c0 29.866667 23.466667 53.333333 53.333333 53.333333H405.333333c29.866667 0 53.333333-23.466667 53.333334-53.333333v-206.933333h106.666666v206.933333c0 29.866667 23.466667 53.333333 53.333334 53.333333h160c29.866667 0 53.333333-23.466667 53.333333-53.333333V518.4h46.933333c38.4 0 70.4-32 70.4-70.4 0-21.333333-10.666667-40.533333-25.6-53.333333z m-44.8 59.733333h-57.6c-29.866667 0-53.333333 23.466667-53.333333 53.333333v358.4h-138.666667V661.333333c0-29.866667-23.466667-53.333333-53.333333-53.333333h-128c-29.866667 0-53.333333 23.466667-53.333333 53.333333v206.933334H256V507.733333c0-29.866667-23.466667-53.333333-53.333333-53.333333H145.066667c-4.266667 0-6.4-2.133333-6.4-6.4 0-2.133333 2.133333-4.266667 2.133333-6.4 85.333333-70.4 206.933333-174.933333 362.666667-309.333333 4.266667-4.266667 10.666667-4.266667 14.933333 0 155.733333 134.4 277.333333 238.933333 362.666667 309.333333 2.133333 2.133333 2.133333 2.133333 2.133333 4.266667 2.133333 6.4-2.133333 8.533333-4.266667 8.533333z"  ></path></symbol><symbol id="zj-history" viewBox="0 0 1024 1024"><path d="M411.733333 885.333333H192c-6.4 0-10.666667-4.266667-10.666667-10.666666V149.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h576c6.4 0 10.666667 4.266667 10.666667 10.666666v219.733334c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V149.333333c0-40.533333-34.133333-74.666667-74.666667-74.666666H192C151.466667 74.666667 117.333333 108.8 117.333333 149.333333v725.333334c0 40.533333 34.133333 74.666667 74.666667 74.666666h219.733333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path><path d="M704 458.666667c-134.4 0-245.333333 110.933333-245.333333 245.333333S569.6 949.333333 704 949.333333 949.333333 838.4 949.333333 704 838.4 458.666667 704 458.666667z m0 426.666666c-100.266667 0-181.333333-81.066667-181.333333-181.333333s81.066667-181.333333 181.333333-181.333333 181.333333 81.066667 181.333333 181.333333-81.066667 181.333333-181.333333 181.333333z"  ></path><path d="M802.133333 716.8l-66.133333-29.866667V597.333333c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v110.933334c0 12.8 8.533333 23.466667 19.2 29.866666l85.333333 38.4c4.266667 2.133333 8.533333 2.133333 12.8 2.133334 12.8 0 23.466667-6.4 29.866667-19.2 6.4-17.066667 0-34.133333-17.066667-42.666667zM693.333333 298.666667c0-17.066667-14.933333-32-32-32H298.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h362.666666c17.066667 0 32-14.933333 32-32zM298.666667 437.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h106.666666c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32h-106.666666z"  ></path></symbol><symbol id="zj-file-open" viewBox="0 0 1024 1024"><path d="M921.6 450.133333c-6.4-8.533333-14.933333-12.8-25.6-12.8h-10.666667V341.333333c0-40.533333-34.133333-74.666667-74.666666-74.666666H514.133333c-4.266667 0-6.4-2.133333-8.533333-4.266667l-38.4-66.133333c-12.8-21.333333-38.4-36.266667-64-36.266667H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666667v597.333333c0 6.4 2.133333 12.8 6.4 19.2 6.4 8.533333 14.933333 12.8 25.6 12.8h640c12.8 0 25.6-8.533333 29.866667-21.333333l128-362.666667c4.266667-10.666667 2.133333-21.333333-4.266667-29.866667zM170.666667 224h232.533333c4.266667 0 6.4 2.133333 8.533333 4.266667l38.4 66.133333c12.8 21.333333 38.4 36.266667 64 36.266667H810.666667c6.4 0 10.666667 4.266667 10.666666 10.666666v96H256c-12.8 0-25.6 8.533333-29.866667 21.333334l-66.133333 185.6V234.666667c0-6.4 4.266667-10.666667 10.666667-10.666667z m573.866666 576H172.8l104.533333-298.666667h571.733334l-104.533334 298.666667z"  ></path></symbol><symbol id="zj-forward" viewBox="0 0 1024 1024"><path d="M853.333333 757.333333H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666666V320c0-6.4 4.266667-10.666667 10.666667-10.666667h599.466666l-83.2 83.2c-12.8 12.8-12.8 34.133333 0 46.933334 6.4 6.4 14.933333 10.666667 23.466667 10.666666s17.066667-4.266667 23.466667-10.666666l145.066666-145.066667c12.8-12.8 12.8-34.133333 0-46.933333l-145.066666-145.066667c-12.8-12.8-34.133333-12.8-46.933334 0-12.8 12.8-12.8 34.133333 0 46.933333l93.866667 93.866667H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666667v426.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h682.666666c17.066667 0 32-14.933333 32-32s-14.933333-29.866667-32-29.866667z"  ></path></symbol><symbol id="zj-import" viewBox="0 0 1024 1024"><path d="M667.733333 864H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h309.333333V320c0 40.533333 34.133333 74.666667 74.666667 74.666667h160v38.4c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V298.666667c0-8.533333-4.266667-17.066667-8.533334-23.466667l-170.666666-170.666667c-6.4-6.4-14.933333-8.533333-23.466667-8.533333H170.666667C130.133333 96 96 130.133333 96 170.666667v682.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h497.066666c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z m46.933334-550.4v17.066667H554.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V160h19.2l151.466667 153.6z"  ></path><path d="M853.333333 597.333333H599.466667l51.2-51.2c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0l-106.666667 106.666667c-12.8 12.8-12.8 32 0 44.8l106.666667 106.666667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c12.8-12.8 12.8-32 0-44.8L599.466667 661.333333H853.333333c17.066667 0 32-14.933333 32-32S870.4 597.333333 853.333333 597.333333z"  ></path></symbol><symbol id="zj-image-text" viewBox="0 0 1024 1024"><path d="M819.2 96H204.8c-59.733333 0-108.8 49.066667-108.8 108.8v616.533333c0 59.733333 49.066667 108.8 108.8 108.8h616.533333c59.733333 0 108.8-49.066667 108.8-108.8V204.8c-2.133333-59.733333-51.2-108.8-110.933333-108.8z m44.8 723.2c0 23.466667-19.2 44.8-44.8 44.8H204.8c-23.466667 0-44.8-19.2-44.8-44.8V204.8c0-23.466667 19.2-44.8 44.8-44.8h616.533333c23.466667 0 44.8 19.2 44.8 44.8v614.4z"  ></path><path d="M298.666667 522.666667h128c29.866667 0 53.333333-23.466667 53.333333-53.333334v-128c0-29.866667-23.466667-53.333333-53.333333-53.333333h-128c-29.866667 0-53.333333 23.466667-53.333334 53.333333v128c0 29.866667 23.466667 53.333333 53.333334 53.333334z m10.666666-170.666667h106.666667v106.666667h-106.666667v-106.666667zM746.666667 437.333333h-170.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h170.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM746.666667 629.333333H277.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h469.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-keyboard-26" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"  ></path><path d="M448 437.333333c17.066667 0 32-14.933333 32-32v-42.666666c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v42.666666c0 17.066667 14.933333 32 32 32zM576 437.333333c17.066667 0 32-14.933333 32-32v-42.666666c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v42.666666c0 17.066667 14.933333 32 32 32zM320 437.333333c17.066667 0 32-14.933333 32-32v-42.666666c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v42.666666c0 17.066667 14.933333 32 32 32zM704 330.666667c-17.066667 0-32 14.933333-32 32v42.666666c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-42.666666c0-17.066667-14.933333-32-32-32zM448 586.666667c17.066667 0 32-14.933333 32-32v-42.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v42.666667c0 17.066667 14.933333 32 32 32zM576 586.666667c17.066667 0 32-14.933333 32-32v-42.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v42.666667c0 17.066667 14.933333 32 32 32zM352 554.666667v-42.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v42.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32zM704 480c-17.066667 0-32 14.933333-32 32v42.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-42.666667c0-17.066667-14.933333-32-32-32zM682.666667 650.666667H341.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h341.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-keyboard-9" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"  ></path><path d="M512 309.333333c-17.066667 0-32 14.933333-32 32v42.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-42.666667c0-17.066667-14.933333-32-32-32zM512 458.666667c-17.066667 0-32 14.933333-32 32v42.666666c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-42.666666c0-17.066667-14.933333-32-32-32zM512 608c-17.066667 0-32 14.933333-32 32v42.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-42.666667c0-17.066667-14.933333-32-32-32zM650.666667 309.333333c-17.066667 0-32 14.933333-32 32v42.666667c0 17.066667 14.933333 32 32 32S682.666667 401.066667 682.666667 384v-42.666667c0-17.066667-14.933333-32-32-32zM650.666667 458.666667c-17.066667 0-32 14.933333-32 32v42.666666c0 17.066667 14.933333 32 32 32S682.666667 550.4 682.666667 533.333333v-42.666666c0-17.066667-14.933333-32-32-32zM650.666667 608c-17.066667 0-32 14.933333-32 32v42.666667c0 17.066667 14.933333 32 32 32S682.666667 699.733333 682.666667 682.666667v-42.666667c0-17.066667-14.933333-32-32-32zM373.333333 309.333333c-17.066667 0-32 14.933333-32 32v42.666667c0 17.066667 14.933333 32 32 32S405.333333 401.066667 405.333333 384v-42.666667c0-17.066667-14.933333-32-32-32zM373.333333 458.666667c-17.066667 0-32 14.933333-32 32v42.666666c0 17.066667 14.933333 32 32 32S405.333333 550.4 405.333333 533.333333v-42.666666c0-17.066667-14.933333-32-32-32zM373.333333 608c-17.066667 0-32 14.933333-32 32v42.666667c0 17.066667 14.933333 32 32 32S405.333333 699.733333 405.333333 682.666667v-42.666667c0-17.066667-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-link" viewBox="0 0 1024 1024"><path d="M861.866667 164.266667c-87.466667-87.466667-230.4-89.6-320-2.133334l-68.266667 68.266667c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0l68.266667-68.266667c64-61.866667 166.4-61.866667 230.4 2.133334 64 64 64 168.533333 2.133333 232.533333l-117.333333 119.466667c-34.133333 34.133333-81.066667 51.2-128 49.066666-46.933333-4.266667-91.733333-27.733333-119.466667-66.133333-10.666667-14.933333-29.866667-17.066667-44.8-6.4-14.933333 10.666667-17.066667 29.866667-6.4 44.8 40.533333 53.333333 100.266667 87.466667 166.4 91.733333h17.066667c59.733333 0 119.466667-23.466667 162.133333-68.266666l117.333333-119.466667c83.2-89.6 83.2-234.666667-4.266666-322.133333z"  ></path><path d="M505.6 750.933333l-66.133333 68.266667c-64 61.866667-166.4 61.866667-230.4-2.133333-64-64-64-168.533333-2.133334-232.533334l117.333334-119.466666c34.133333-34.133333 81.066667-51.2 128-49.066667 46.933333 4.266667 91.733333 27.733333 119.466666 66.133333 10.666667 14.933333 29.866667 17.066667 44.8 6.4 14.933333-10.666667 17.066667-29.866667 6.4-44.8-40.533333-53.333333-100.266667-87.466667-166.4-91.733333-66.133333-4.266667-130.133333 19.2-177.066666 66.133333l-117.333334 119.466667c-85.333333 89.6-85.333333 234.666667 2.133334 322.133333 44.8 44.8 102.4 66.133333 162.133333 66.133334 57.6 0 115.2-21.333333 160-64l66.133333-68.266667c12.8-12.8 12.8-32 0-44.8-14.933333-10.666667-34.133333-10.666667-46.933333 2.133333z"  ></path></symbol><symbol id="zj-layout" viewBox="0 0 1024 1024"><path d="M853.333333 96H170.666667C130.133333 96 96 130.133333 96 170.666667v682.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h682.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667z m-682.666666 64h682.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v213.333333h-704V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667zM160 853.333333V448H341.333333v416H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667z m693.333333 10.666667H405.333333V448h458.666667v405.333333c0 6.4-4.266667 10.666667-10.666667 10.666667z"  ></path></symbol><symbol id="zj-fullscreen-shrink" viewBox="0 0 1024 1024"><path d="M313.6 358.4H177.066667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h213.333333c4.266667 0 8.533333 0 10.666667-2.133333 8.533333-4.266667 14.933333-8.533333 17.066666-17.066667 2.133333-4.266667 2.133333-8.533333 2.133334-10.666667v-213.333333c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v136.533333L172.8 125.866667c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l185.6 187.733333zM695.466667 650.666667H832c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H618.666667c-4.266667 0-8.533333 0-10.666667 2.133333-8.533333 4.266667-14.933333 8.533333-17.066667 17.066667-2.133333 4.266667-2.133333 8.533333-2.133333 10.666666v213.333334c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-136.533334l200.533333 200.533334c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466667-8.533333c12.8-12.8 12.8-32 0-44.8l-204.8-198.4zM435.2 605.866667c-4.266667-8.533333-8.533333-14.933333-17.066667-17.066667-4.266667-2.133333-8.533333-2.133333-10.666666-2.133333H192c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h136.533333L128 851.2c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333l200.533334-200.533333V832c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V618.666667c-2.133333-4.266667-2.133333-8.533333-4.266667-12.8zM603.733333 403.2c4.266667 8.533333 8.533333 14.933333 17.066667 17.066667 4.266667 2.133333 8.533333 2.133333 10.666667 2.133333h213.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32h-136.533333L896 170.666667c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0l-187.733333 187.733333V177.066667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v213.333333c2.133333 4.266667 2.133333 8.533333 4.266666 12.8z"  ></path></symbol><symbol id="zj-layers" viewBox="0 0 1024 1024"><path d="M110.933333 352l384 192c4.266667 2.133333 10.666667 4.266667 17.066667 4.266667s10.666667-2.133333 17.066667-4.266667l384-192c12.8-6.4 19.2-19.2 19.2-32s-8.533333-25.6-19.2-32l-384-192c-10.666667-4.266667-21.333333-4.266667-32 0l-384 192c-12.8 6.4-19.2 19.2-19.2 32s6.4 25.6 17.066666 32zM512 168.533333L814.933333 320 512 471.466667 209.066667 320 512 168.533333zM878.933333 672L512 855.466667 145.066667 672c-17.066667-8.533333-38.4-2.133333-49.066667 17.066667-8.533333 17.066667-2.133333 38.4 17.066667 49.066666l384 192c4.266667 2.133333 10.666667 4.266667 17.066666 4.266667s10.666667-2.133333 17.066667-4.266667l384-192c17.066667-8.533333 25.6-29.866667 17.066667-49.066666-12.8-19.2-34.133333-25.6-53.333334-17.066667z"  ></path><path d="M878.933333 480L512 663.466667 145.066667 480c-17.066667-8.533333-38.4-2.133333-49.066667 17.066667-8.533333 17.066667-2.133333 38.4 17.066667 49.066666l384 192c4.266667 2.133333 10.666667 4.266667 17.066666 4.266667s10.666667-2.133333 17.066667-4.266667l384-192c17.066667-8.533333 25.6-29.866667 17.066667-49.066666-12.8-19.2-34.133333-25.6-53.333334-17.066667z"  ></path></symbol><symbol id="zj-lock" viewBox="0 0 1024 1024"><path d="M785.066667 416h-61.866667v-121.6c0-108.8-91.733333-198.4-202.666667-198.4s-202.666667 89.6-202.666666 198.4v121.6h-78.933334c-55.466667 0-100.266667 44.8-100.266666 100.266667v311.466666c0 55.466667 44.8 100.266667 100.266666 100.266667h546.133334c55.466667 0 100.266667-44.8 100.266666-100.266667V516.266667c0-55.466667-44.8-100.266667-100.266666-100.266667z m-403.2-121.6c0-74.666667 61.866667-134.4 138.666666-134.4s138.666667 59.733333 138.666667 134.4v121.6h-277.333333v-121.6z m439.466666 533.333333c0 19.2-17.066667 36.266667-36.266666 36.266667H238.933333c-19.2 0-36.266667-17.066667-36.266666-36.266667V516.266667c0-19.2 17.066667-36.266667 36.266666-36.266667h546.133334c19.2 0 36.266667 17.066667 36.266666 36.266667v311.466666z"  ></path><path d="M512 544c-17.066667 0-32 14.933333-32 32v106.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-106.666667c0-17.066667-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-fullscreen-expand" viewBox="0 0 1024 1024"><path d="M149.333333 394.666667c17.066667 0 32-14.933333 32-32v-136.533334l187.733334 187.733334c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c12.8-12.8 12.8-32 0-44.8l-187.733333-187.733334H362.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H149.333333c-4.266667 0-8.533333 0-10.666666 2.133334-8.533333 4.266667-14.933333 10.666667-19.2 17.066666-2.133333 4.266667-2.133333 8.533333-2.133334 12.8v213.333334c0 17.066667 14.933333 32 32 32zM874.666667 629.333333c-17.066667 0-32 14.933333-32 32v136.533334L642.133333 597.333333c-12.8-12.8-32-12.8-44.8 0s-12.8 32 0 44.8l200.533334 200.533334H661.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h213.333334c4.266667 0 8.533333 0 10.666666-2.133334 8.533333-4.266667 14.933333-8.533333 17.066667-17.066666 2.133333-4.266667 2.133333-8.533333 2.133333-10.666667V661.333333c2.133333-17.066667-12.8-32-29.866666-32zM381.866667 595.2l-200.533334 200.533333V661.333333c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v213.333334c0 4.266667 0 8.533333 2.133334 10.666666 4.266667 8.533333 8.533333 14.933333 17.066666 17.066667 4.266667 2.133333 8.533333 2.133333 10.666667 2.133333h213.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32h-136.533333l200.533333-200.533333c12.8-12.8 12.8-32 0-44.8s-29.866667-10.666667-42.666666 0zM904.533333 138.666667c0-2.133333 0-2.133333 0 0-4.266667-8.533333-10.666667-14.933333-17.066666-17.066667-4.266667-2.133333-8.533333-2.133333-10.666667-2.133333H661.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h136.533334l-187.733334 187.733333c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466667-8.533333l187.733333-187.733333V362.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V149.333333c-2.133333-4.266667-2.133333-8.533333-4.266667-10.666666z"  ></path></symbol><symbol id="zj-map" viewBox="0 0 1024 1024"><path d="M512 74.666667C317.866667 74.666667 160 234.666667 160 428.8c0 264.533333 320 484.266667 334.933333 492.8 6.4 4.266667 10.666667 6.4 17.066667 6.4s12.8-2.133333 17.066667-6.4c12.8-8.533333 334.933333-228.266667 334.933333-492.8C864 234.666667 706.133333 74.666667 512 74.666667z m0 782.933333c-66.133333-49.066667-288-228.266667-288-426.666667 0-160 130.133333-290.133333 288-290.133333s288 130.133333 288 290.133333c0 196.266667-221.866667 377.6-288 426.666667z"  ></path><path d="M512 309.333333c-76.8 0-138.666667 61.866667-138.666667 138.666667s61.866667 138.666667 138.666667 138.666667 138.666667-61.866667 138.666667-138.666667-61.866667-138.666667-138.666667-138.666667z m0 213.333334c-40.533333 0-74.666667-34.133333-74.666667-74.666667s34.133333-74.666667 74.666667-74.666667 74.666667 34.133333 74.666667 74.666667-34.133333 74.666667-74.666667 74.666667z"  ></path></symbol><symbol id="zj-meh" viewBox="0 0 1024 1024"><path d="M512 949.333333C270.933333 949.333333 74.666667 753.066667 74.666667 512S270.933333 74.666667 512 74.666667 949.333333 270.933333 949.333333 512 753.066667 949.333333 512 949.333333z m0-810.666666C307.2 138.666667 138.666667 307.2 138.666667 512S307.2 885.333333 512 885.333333 885.333333 716.8 885.333333 512 716.8 138.666667 512 138.666667z"  ></path><path d="M362.666667 512c-23.466667 0-42.666667-19.2-42.666667-42.666667v-64c0-23.466667 19.2-42.666667 42.666667-42.666666s42.666667 19.2 42.666666 42.666666v64c0 23.466667-19.2 42.666667-42.666666 42.666667zM661.333333 512c-23.466667 0-42.666667-19.2-42.666666-42.666667v-64c0-23.466667 19.2-42.666667 42.666666-42.666666s42.666667 19.2 42.666667 42.666666v64c0 23.466667-19.2 42.666667-42.666667 42.666667zM699.733333 714.666667H324.266667c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32h373.333333c17.066667 0 32 14.933333 32 32s-12.8 32-29.866667 32z"  ></path></symbol><symbol id="zj-menu" viewBox="0 0 1024 1024"><path d="M170.666667 213.333333m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"  ></path><path d="M170.666667 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"  ></path><path d="M170.666667 810.666667m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"  ></path><path d="M896 778.666667H362.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h533.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM362.666667 245.333333h533.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H362.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32zM896 480H362.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h533.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-loading" viewBox="0 0 1024 1024"><path d="M512 74.666667c-17.066667 0-32 14.933333-32 32v149.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V106.666667c0-17.066667-14.933333-32-32-32zM693.333333 362.666667c8.533333 0 17.066667-2.133333 23.466667-8.533334l104.533333-104.533333c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0l-104.533333 104.533333c-12.8 12.8-12.8 32 0 44.8 4.266667 6.4 12.8 8.533333 21.333333 8.533334zM917.333333 480h-149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h149.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM714.666667 669.866667c-12.8-12.8-32-12.8-44.8 0s-12.8 32 0 44.8l104.533333 104.533333c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8l-106.666666-104.533333zM512 736c-17.066667 0-32 14.933333-32 32v149.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-149.333333c0-17.066667-14.933333-32-32-32zM309.333333 669.866667l-104.533333 104.533333c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333l104.533334-104.533333c12.8-12.8 12.8-32 0-44.8s-36.266667-12.8-46.933334 0zM288 512c0-17.066667-14.933333-32-32-32H106.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h149.333333c17.066667 0 32-14.933333 32-32zM247.466667 202.666667c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l104.533333 104.533333c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8l-106.666666-104.533333z"  ></path></symbol><symbol id="zj-help" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"  ></path><path d="M512 746.666667m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"  ></path><path d="M512 245.333333c-76.8 0-138.666667 61.866667-138.666667 138.666667 0 17.066667 14.933333 32 32 32s32-14.933333 32-32c0-40.533333 34.133333-74.666667 74.666667-74.666667s74.666667 34.133333 74.666667 74.666667c0 27.733333-53.333333 76.8-91.733334 100.266667-8.533333 6.4-14.933333 17.066667-14.933333 27.733333v106.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-89.6c34.133333-25.6 106.666667-83.2 106.666667-145.066667 0-76.8-61.866667-138.666667-138.666667-138.666667z"  ></path></symbol><symbol id="zj-minus-circle" viewBox="0 0 1024 1024"><path d="M512 949.333333C270.933333 949.333333 74.666667 753.066667 74.666667 512S270.933333 74.666667 512 74.666667 949.333333 270.933333 949.333333 512 753.066667 949.333333 512 949.333333z m0-810.666666C307.2 138.666667 138.666667 307.2 138.666667 512S307.2 885.333333 512 885.333333 885.333333 716.8 885.333333 512 716.8 138.666667 512 138.666667z"  ></path><path d="M682.666667 544H341.333333c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32h341.333334c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32z"  ></path></symbol><symbol id="zj-modular" viewBox="0 0 1024 1024"><path d="M405.333333 458.666667H149.333333c-29.866667 0-53.333333-23.466667-53.333333-53.333334V149.333333c0-29.866667 23.466667-53.333333 53.333333-53.333333h256c29.866667 0 53.333333 23.466667 53.333334 53.333333v256c0 29.866667-23.466667 53.333333-53.333334 53.333334z m-245.333333-64h234.666667v-234.666667h-234.666667v234.666667zM874.666667 458.666667H618.666667c-29.866667 0-53.333333-23.466667-53.333334-53.333334V149.333333c0-29.866667 23.466667-53.333333 53.333334-53.333333h256c29.866667 0 53.333333 23.466667 53.333333 53.333333v256c0 29.866667-23.466667 53.333333-53.333333 53.333334z m-245.333334-64h234.666667v-234.666667h-234.666667v234.666667zM874.666667 928H618.666667c-29.866667 0-53.333333-23.466667-53.333334-53.333333V618.666667c0-29.866667 23.466667-53.333333 53.333334-53.333334h256c29.866667 0 53.333333 23.466667 53.333333 53.333334v256c0 29.866667-23.466667 53.333333-53.333333 53.333333z m-245.333334-64h234.666667v-234.666667h-234.666667v234.666667zM405.333333 928H149.333333c-29.866667 0-53.333333-23.466667-53.333333-53.333333V618.666667c0-29.866667 23.466667-53.333333 53.333333-53.333334h256c29.866667 0 53.333333 23.466667 53.333334 53.333334v256c0 29.866667-23.466667 53.333333-53.333334 53.333333z m-245.333333-64h234.666667v-234.666667h-234.666667v234.666667z"  ></path></symbol><symbol id="zj-notification" viewBox="0 0 1024 1024"><path d="M800 625.066667V448c0-117.333333-70.4-217.6-170.666667-262.4-4.266667-61.866667-55.466667-110.933333-117.333333-110.933333s-113.066667 49.066667-117.333333 110.933333c-100.266667 44.8-170.666667 145.066667-170.666667 262.4v177.066667c-57.6 46.933333-85.333333 110.933333-85.333333 185.6 0 17.066667 14.933333 32 32 32h206.933333c14.933333 61.866667 70.4 106.666667 134.4 106.666666s119.466667-44.8 134.4-106.666666H853.333333c17.066667 0 32-14.933333 32-32 0-76.8-27.733333-138.666667-85.333333-185.6zM512 138.666667c19.2 0 36.266667 10.666667 44.8 25.6-14.933333-2.133333-29.866667-4.266667-44.8-4.266667-14.933333 0-29.866667 2.133333-44.8 4.266667 8.533333-14.933333 25.6-25.6 44.8-25.6z m0 746.666666c-29.866667 0-55.466667-17.066667-66.133333-42.666666h134.4c-12.8 25.6-38.4 42.666667-68.266667 42.666666z m-307.2-106.666666c6.4-46.933333 29.866667-83.2 70.4-113.066667 8.533333-6.4 12.8-14.933333 12.8-25.6v-192c0-123.733333 100.266667-224 224-224S736 324.266667 736 448v192c0 10.666667 4.266667 19.2 12.8 25.6 40.533333 29.866667 64 66.133333 70.4 113.066667H204.8z"  ></path></symbol><symbol id="zj-mic" viewBox="0 0 1024 1024"><path d="M516.266667 657.066667c78.933333 0 142.933333-64 142.933333-142.933334V217.6a142.933333 142.933333 0 0 0-285.866667 0v296.533333c0 78.933333 64 142.933333 142.933334 142.933334z m-78.933334-439.466667c0-42.666667 36.266667-78.933333 78.933334-78.933333s78.933333 36.266667 78.933333 78.933333v296.533333c0 42.666667-36.266667 78.933333-78.933333 78.933334s-78.933333-36.266667-78.933334-78.933334V217.6z"  ></path><path d="M774.4 409.6c-17.066667 0-32 14.933333-32 32v74.666667c0 125.866667-102.4 228.266667-228.266667 228.266666S288 640 288 514.133333v-74.666666c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v74.666666c0 149.333333 113.066667 273.066667 260.266667 290.133334v85.333333h-117.333334c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h296.533334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32h-117.333334v-85.333333c145.066667-14.933333 260.266667-140.8 260.266667-290.133334v-74.666666c0-17.066667-12.8-29.866667-32-29.866667z"  ></path></symbol><symbol id="zj-more" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"  ></path><path d="M512 512m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"  ></path><path d="M341.333333 512m-42.666666 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z"  ></path><path d="M682.666667 512m-42.666667 0a42.666667 42.666667 0 1 0 85.333333 0 42.666667 42.666667 0 1 0-85.333333 0Z"  ></path></symbol><symbol id="zj-pad" viewBox="0 0 1024 1024"><path d="M810.666667 949.333333H213.333333c-40.533333 0-74.666667-34.133333-74.666666-74.666666V149.333333c0-40.533333 34.133333-74.666667 74.666666-74.666666h597.333334c40.533333 0 74.666667 34.133333 74.666666 74.666666v725.333334c0 40.533333-34.133333 74.666667-74.666666 74.666666z m-597.333334-810.666666c-6.4 0-10.666667 4.266667-10.666666 10.666666v725.333334c0 6.4 4.266667 10.666667 10.666666 10.666666h597.333334c6.4 0 10.666667-4.266667 10.666666-10.666666V149.333333c0-6.4-4.266667-10.666667-10.666666-10.666666H213.333333z"  ></path><path d="M512 768m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"  ></path></symbol><symbol id="zj-operation" viewBox="0 0 1024 1024"><path d="M823.466667 512H578.133333v-187.733333c0-66.133333-53.333333-119.466667-117.333333-119.466667s-117.333333 53.333333-117.333333 119.466667v296.533333l-21.333334-21.333333c-46.933333-46.933333-121.6-46.933333-168.533333-2.133334s-44.8 121.6 2.133333 168.533334l174.933334 174.933333c6.4 6.4 14.933333 8.533333 23.466666 8.533333 8.533333 0 17.066667-2.133333 23.466667-8.533333 12.8-12.8 12.8-32 0-44.8l-174.933333-174.933333c-21.333333-21.333333-23.466667-57.6-2.133334-76.8 21.333333-21.333333 55.466667-19.2 76.8 2.133333l74.666667 74.666667c12.8 12.8 32 12.8 44.8 0 6.4-6.4 8.533333-14.933333 8.533333-23.466667V326.4c0-29.866667 23.466667-55.466667 53.333334-55.466667s53.333333 25.6 53.333333 55.466667v219.733333c0 17.066667 14.933333 32 32 32h277.333333c6.4 0 10.666667 6.4 10.666667 12.8V917.333333c0 17.066667 14.933333 32 32 32S896 934.4 896 917.333333V586.666667c2.133333-40.533333-32-74.666667-72.533333-74.666667z"  ></path><path d="M266.666667 330.666667c17.066667 0 32-14.933333 32-32 0-87.466667 72.533333-160 160-160S618.666667 211.2 618.666667 298.666667c0 17.066667 14.933333 32 32 32S682.666667 315.733333 682.666667 298.666667c0-123.733333-100.266667-224-224-224S234.666667 174.933333 234.666667 298.666667c0 17.066667 14.933333 32 32 32z"  ></path></symbol><symbol id="zj-play" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"  ></path><path d="M708.266667 465.066667l-234.666667-134.4c-8.533333-4.266667-17.066667-6.4-25.6-6.4-29.866667 0-53.333333 23.466667-53.333333 53.333333v268.8c0 8.533333 2.133333 19.2 6.4 25.6 10.666667 17.066667 27.733333 27.733333 46.933333 27.733333 8.533333 0 17.066667-2.133333 25.6-6.4l234.666667-134.4c8.533333-4.266667 14.933333-10.666667 19.2-19.2 6.4-12.8 8.533333-27.733333 4.266666-40.533333-2.133333-14.933333-10.666667-25.6-23.466666-34.133333z m-249.6 162.133333V396.8L661.333333 512l-202.666666 115.2z"  ></path></symbol><symbol id="zj-print" viewBox="0 0 1024 1024"><path d="M819.2 364.8h-44.8V128c0-17.066667-14.933333-32-32-32H281.6c-17.066667 0-32 14.933333-32 32v236.8H204.8c-59.733333 0-108.8 49.066667-108.8 108.8v192c0 59.733333 49.066667 108.8 108.8 108.8h44.8V896c0 17.066667 14.933333 32 32 32h460.8c17.066667 0 32-14.933333 32-32v-121.6h44.8c59.733333 0 108.8-49.066667 108.8-108.8v-192c0-59.733333-49.066667-108.8-108.8-108.8zM313.6 160h396.8v204.8H313.6V160z m396.8 704H313.6V620.8h396.8v243.2z m153.6-198.4c0 25.6-19.2 44.8-44.8 44.8h-44.8v-121.6c0-17.066667-14.933333-32-32-32H281.6c-17.066667 0-32 14.933333-32 32v121.6H204.8c-25.6 0-44.8-19.2-44.8-44.8v-192c0-25.6 19.2-44.8 44.8-44.8h614.4c25.6 0 44.8 19.2 44.8 44.8v192z"  ></path></symbol><symbol id="zj-mobile-phone" viewBox="0 0 1024 1024"><path d="M746.666667 949.333333H277.333333c-40.533333 0-74.666667-34.133333-74.666666-74.666666V149.333333c0-40.533333 34.133333-74.666667 74.666666-74.666666h469.333334c40.533333 0 74.666667 34.133333 74.666666 74.666666v725.333334c0 40.533333-34.133333 74.666667-74.666666 74.666666z m-469.333334-810.666666c-6.4 0-10.666667 4.266667-10.666666 10.666666v725.333334c0 6.4 4.266667 10.666667 10.666666 10.666666h469.333334c6.4 0 10.666667-4.266667 10.666666-10.666666V149.333333c0-6.4-4.266667-10.666667-10.666666-10.666666H277.333333z"  ></path><path d="M512 768m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"  ></path><path d="M597.333333 245.333333h-170.666666c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32h170.666666c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32z"  ></path></symbol><symbol id="zj-minus" viewBox="0 0 1024 1024"><path d="M853.333333 544H170.666667c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32h682.666666c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32z"  ></path></symbol><symbol id="zj-navigation" viewBox="0 0 1024 1024"><path d="M834.133333 213.333333c-6.4-12.8-17.066667-23.466667-29.866666-27.733333-12.8-4.266667-27.733333-4.266667-40.533334 2.133333L106.666667 501.333333c-14.933333 6.4-25.6 21.333333-29.866667 36.266667-6.4 27.733333 12.8 57.6 40.533333 64l249.6 53.333333 53.333334 249.6c4.266667 17.066667 14.933333 29.866667 29.866666 36.266667 6.4 4.266667 14.933333 4.266667 23.466667 4.266667 19.2 0 38.4-10.666667 49.066667-29.866667l313.6-657.066667c6.4-12.8 6.4-29.866667-2.133334-44.8zM477.866667 861.866667L426.666667 622.933333c-2.133333-12.8-12.8-21.333333-23.466667-23.466666L162.133333 546.133333l601.6-288-285.866666 603.733334z"  ></path></symbol><symbol id="zj-pdf" viewBox="0 0 1024 1024"><path d="M582.4 864H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h309.333333V320c0 40.533333 34.133333 74.666667 74.666667 74.666667h160v38.4c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V298.666667c0-8.533333-4.266667-17.066667-8.533334-23.466667l-170.666666-170.666667c-6.4-6.4-14.933333-8.533333-23.466667-8.533333H170.666667C130.133333 96 96 130.133333 96 170.666667v682.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h411.733333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z m132.266667-550.4v17.066667H554.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V160h19.2l151.466667 153.6z"  ></path><path d="M332.8 533.333333c-12.8 0-19.2 2.133333-25.6 6.4-6.4 4.266667-8.533333 12.8-8.533333 23.466667v206.933333c0 6.4 2.133333 12.8 6.4 19.2 4.266667 4.266667 10.666667 8.533333 21.333333 8.533334s17.066667-4.266667 21.333333-8.533334c4.266667-4.266667 6.4-10.666667 6.4-19.2v-64h32c57.6 0 89.6-29.866667 89.6-87.466666 0-27.733333-8.533333-51.2-23.466666-64-14.933333-14.933333-36.266667-21.333333-66.133334-21.333334h-53.333333z m87.466667 85.333334c0 12.8-2.133333 23.466667-8.533334 27.733333-4.266667 4.266667-14.933333 8.533333-27.733333 8.533333h-32v-70.4H384c12.8 0 21.333333 2.133333 27.733333 8.533334 6.4 4.266667 8.533333 12.8 8.533334 25.6zM667.733333 571.733333c-8.533333-12.8-21.333333-21.333333-34.133333-29.866666-14.933333-4.266667-32-8.533333-51.2-8.533334h-61.866667c-8.533333 0-17.066667 0-23.466666 8.533334-2.133333 4.266667-4.266667 10.666667-4.266667 19.2V768c0 8.533333 2.133333 14.933333 4.266667 19.2 6.4 8.533333 14.933333 8.533333 23.466666 8.533333h64c19.2 0 34.133333-4.266667 49.066667-10.666666 12.8-6.4 25.6-17.066667 34.133333-29.866667 8.533333-12.8 14.933333-25.6 19.2-42.666667 4.266667-14.933333 6.4-32 6.4-49.066666 0-17.066667-2.133333-34.133333-6.4-49.066667-4.266667-14.933333-10.666667-29.866667-19.2-42.666667z m-42.666666 153.6c-8.533333 12.8-21.333333 19.2-38.4 19.2h-38.4v-160H576c21.333333 0 38.4 6.4 46.933333 19.2 10.666667 12.8 14.933333 34.133333 14.933334 59.733334 2.133333 27.733333-4.266667 46.933333-12.8 61.866666zM851.2 533.333333h-106.666667c-8.533333 0-17.066667 2.133333-21.333333 6.4-6.4 4.266667-8.533333 12.8-8.533333 21.333334v209.066666c0 6.4 2.133333 12.8 6.4 17.066667 4.266667 6.4 10.666667 8.533333 21.333333 8.533333 8.533333 0 17.066667-2.133333 21.333333-8.533333 2.133333-4.266667 6.4-8.533333 6.4-19.2v-85.333333h72.533334c12.8 0 23.466667-6.4 25.6-17.066667 2.133333-8.533333 2.133333-14.933333 0-17.066667-2.133333-4.266667-6.4-17.066667-25.6-17.066666H768v-49.066667h81.066667c8.533333 0 14.933333-2.133333 19.2-4.266667 4.266667-2.133333 8.533333-8.533333 8.533333-21.333333 2.133333-12.8-8.533333-23.466667-25.6-23.466667z"  ></path></symbol><symbol id="zj-prompt" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"  ></path><path d="M512 320m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"  ></path><path d="M512 437.333333c-17.066667 0-32 14.933333-32 32v234.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V469.333333c0-17.066667-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-move" viewBox="0 0 1024 1024"><path d="M921.6 492.8l-121.6-121.6c-12.8-12.8-32-12.8-44.8 0s-12.8 32 0 44.8l66.133333 66.133333h-277.333333v-277.333333l66.133333 66.133333c6.4 6.4 14.933333 8.533333 23.466667 8.533334s17.066667-2.133333 23.466667-8.533334c12.8-12.8 12.8-32 0-44.8l-121.6-121.6c-12.8-12.8-32-12.8-44.8 0l-121.6 121.6c-12.8 12.8-12.8 32 0 44.8 12.8 12.8 32 12.8 44.8 0l66.133333-66.133333v277.333333h-277.333333l66.133333-66.133333c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0l-121.6 121.6c-12.8 12.8-12.8 32 0 44.8l121.6 121.6c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8l-66.133333-66.133333h277.333333v277.333333l-66.133333-66.133333c-12.8-12.8-32-12.8-44.8 0s-12.8 32 0 44.8l121.6 121.6c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333l121.6-121.6c12.8-12.8 12.8-32 0-44.8s-32-12.8-44.8 0l-66.133333 66.133333v-277.333333h277.333333l-66.133333 66.133333c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333l121.6-121.6c6.4-6.4 8.533333-14.933333 8.533334-23.466667s-10.666667-14.933333-17.066667-21.333333z"  ></path></symbol><symbol id="zj-refresh" viewBox="0 0 1024 1024"><path d="M934.4 206.933333c-17.066667-4.266667-34.133333 6.4-38.4 23.466667l-23.466667 87.466667C797.866667 183.466667 654.933333 96 497.066667 96 264.533333 96 74.666667 281.6 74.666667 512s189.866667 416 422.4 416c179.2 0 339.2-110.933333 398.933333-275.2 6.4-17.066667-2.133333-34.133333-19.2-40.533333-17.066667-6.4-34.133333 2.133333-40.533333 19.2-51.2 138.666667-187.733333 232.533333-339.2 232.533333C298.666667 864 138.666667 706.133333 138.666667 512S300.8 160 497.066667 160c145.066667 0 277.333333 87.466667 330.666666 217.6l-128-36.266667c-17.066667-4.266667-34.133333 6.4-38.4 23.466667-4.266667 17.066667 6.4 34.133333 23.466667 38.4l185.6 49.066667c2.133333 0 6.4 2.133333 8.533333 2.133333 6.4 0 10.666667-2.133333 17.066667-4.266667 6.4-4.266667 12.8-10.666667 14.933333-19.2l49.066667-185.6c0-17.066667-8.533333-34.133333-25.6-38.4z"  ></path></symbol><symbol id="zj-run-up" viewBox="0 0 1024 1024"><path d="M409.6 294.661224l71.053061-71.053061v248.685715c0 16.718367 14.628571 31.346939 31.346939 31.346938s31.346939-14.628571 31.346939-31.346938v-250.775511l71.053061 71.053062c6.269388 6.269388 14.628571 8.359184 22.987755 8.359183s16.718367-2.089796 22.987755-8.359183c12.538776-12.538776 12.538776-31.346939 0-43.885715l-125.387755-125.387755c-12.538776-12.538776-31.346939-12.538776-43.885714 0l-125.387755 125.387755c-12.538776 12.538776-12.538776 31.346939 0 43.885715 10.44898 12.538776 31.346939 12.538776 43.885714 2.089795z"  ></path><path d="M936.228571 451.395918l-242.416326-81.50204c-16.718367-6.269388-33.436735 4.179592-39.706123 18.808163-6.269388 16.718367 4.179592 33.436735 18.808164 39.706122l156.734694 52.244898L512 593.502041 194.35102 480.653061l156.734694-52.244898c16.718367-6.269388 25.077551-22.987755 18.808164-39.706122-6.269388-16.718367-22.987755-25.077551-39.706123-18.808163L87.771429 451.395918c-12.538776 4.179592-20.897959 16.718367-20.89796 29.257143 0 12.538776 8.359184 25.077551 20.89796 29.257143l413.779591 146.285714c4.179592 2.089796 6.269388 2.089796 10.44898 2.089796s6.269388 0 10.44898-2.089796l413.779591-146.285714c12.538776-4.179592 20.897959-16.718367 20.89796-29.257143 0-14.628571-8.359184-25.077551-20.89796-29.257143zM512 714.710204c-16.718367 0-31.346939 14.628571-31.346939 31.346939v156.734694c0 16.718367 14.628571 31.346939 31.346939 31.346939s31.346939-14.628571 31.346939-31.346939v-156.734694c0-16.718367-14.628571-31.346939-31.346939-31.346939z"  ></path></symbol><symbol id="zj-picture" viewBox="0 0 1024 1024"><path d="M819.2 96H204.8c-59.733333 0-108.8 49.066667-108.8 108.8v616.533333c0 59.733333 49.066667 108.8 108.8 108.8h616.533333c59.733333 0 108.8-49.066667 108.8-108.8V204.8c-2.133333-59.733333-51.2-108.8-110.933333-108.8zM160 819.2V204.8c0-23.466667 19.2-44.8 44.8-44.8h616.533333c23.466667 0 44.8 19.2 44.8 44.8v388.266667l-125.866666-125.866667c-27.733333-27.733333-76.8-27.733333-104.533334 0l-390.4 384c-4.266667 4.266667-6.4 8.533333-6.4 12.8H204.8c-25.6 0-44.8-19.2-44.8-44.8z m659.2 44.8H324.266667l354.133333-354.133333c2.133333-2.133333 6.4-2.133333 8.533333-2.133334s4.266667 0 8.533334 2.133334l160 160c4.266667 4.266667 8.533333 6.4 12.8 6.4v142.933333c-4.266667 25.6-23.466667 44.8-49.066667 44.8z"  ></path><path d="M375.466667 482.133333c59.733333 0 106.666667-46.933333 106.666666-106.666666s-46.933333-106.666667-106.666666-106.666667-106.666667 46.933333-106.666667 106.666667 49.066667 106.666667 106.666667 106.666666z m0-149.333333c23.466667 0 42.666667 19.2 42.666666 42.666667s-19.2 42.666667-42.666666 42.666666-42.666667-19.2-42.666667-42.666666 19.2-42.666667 42.666667-42.666667z"  ></path></symbol><symbol id="zj-run-in" viewBox="0 0 1024 1024"><path d="M612.352 765.952l-69.632 69.632V716.8c0-16.384-14.336-30.72-30.72-30.72s-30.72 14.336-30.72 30.72v120.832l-69.632-69.632c-12.288-12.288-30.72-12.288-43.008 0s-12.288 30.72 0 43.008l122.88 122.88c6.144 6.144 14.336 8.192 22.528 8.192s16.384-2.048 22.528-8.192l122.88-122.88c12.288-12.288 12.288-30.72 0-43.008s-34.816-12.288-47.104-2.048zM927.744 421.888l-237.568-79.872c-16.384-6.144-32.768 4.096-38.912 18.432-6.144 16.384 4.096 32.768 18.432 38.912l153.6 51.2L512 561.152 200.704 450.56l153.6-51.2c16.384-6.144 24.576-22.528 18.432-38.912-6.144-16.384-22.528-24.576-38.912-18.432L96.256 421.888c-12.288 4.096-20.48 16.384-20.48 28.672 0 12.288 8.192 24.576 20.48 28.672l405.504 143.36c4.096 2.048 6.144 2.048 10.24 2.048s6.144 0 10.24-2.048l405.504-143.36c12.288-4.096 20.48-16.384 20.48-28.672 0-14.336-8.192-24.576-20.48-28.672z"  ></path><path d="M512 501.76c16.384 0 30.72-14.336 30.72-30.72V153.6c0-16.384-14.336-30.72-30.72-30.72s-30.72 14.336-30.72 30.72V471.04c0 16.384 14.336 30.72 30.72 30.72z"  ></path></symbol><symbol id="zj-pin" viewBox="0 0 1024 1024"><path d="M911.15102 323.918367L689.632653 102.4c-18.808163-18.808163-50.155102-20.897959-71.053061-2.089796l-267.493878 229.877551-96.130612 14.628572c-6.269388 0-12.538776 4.179592-16.718367 8.359183l-58.514286 58.514286c-20.897959 20.897959-20.897959 54.334694 0 73.142857l152.555102 152.555102L125.387755 844.277551c-12.538776 12.538776-12.538776 31.346939 0 43.885714 6.269388 6.269388 14.628571 10.44898 20.897959 10.44898s16.718367-2.089796 22.987755-8.359184l204.8-204.8 152.555102 152.555102c10.44898 10.44898 22.987755 14.628571 37.616327 14.628572s27.167347-6.269388 37.616326-14.628572l58.514286-58.514285c4.179592-4.179592 8.359184-10.44898 8.359184-16.718368l14.628571-96.130612 227.787755-267.493878c18.808163-25.077551 18.808163-56.42449 0-75.232653zM631.118367 629.028571c-4.179592 4.179592-6.269388 10.44898-6.269387 14.628572l-14.628572 94.040816-45.97551 45.97551-334.367347-334.367347 43.885714-43.885714 94.040817-14.628571c6.269388 0 10.44898-4.179592 14.628571-6.269388l269.583674-229.877551 206.889795 206.889796-227.787755 267.493877z"  ></path></symbol><symbol id="zj-save" viewBox="0 0 1024 1024"><path d="M906.666667 298.666667L725.333333 117.333333c-14.933333-14.933333-32-21.333333-53.333333-21.333333H170.666667C130.133333 96 96 130.133333 96 170.666667v682.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h682.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667V349.866667c0-19.2-8.533333-38.4-21.333333-51.2zM652.8 864H371.2V648.533333h281.6v215.466667z m211.2-10.666667c0 6.4-4.266667 10.666667-10.666667 10.666667h-140.8V618.666667c0-17.066667-12.8-29.866667-29.866666-29.866667H341.333333c-17.066667 0-29.866667 12.8-29.866666 29.866667v245.333333H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h140.8V320c0 17.066667 12.8 29.866667 29.866666 29.866667h277.333334c17.066667 0 29.866667-12.8 29.866666-29.866667s-12.8-29.866667-29.866666-29.866667H371.2V160h302.933333c2.133333 0 6.4 2.133333 8.533334 2.133333l179.2 179.2c2.133333 2.133333 2.133333 4.266667 2.133333 8.533334V853.333333z"  ></path></symbol><symbol id="zj-search" viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"  ></path></symbol><symbol id="zj-share" viewBox="0 0 1024 1024"><path d="M874.666667 544c-17.066667 0-32 14.933333-32 32v256c0 6.4-4.266667 10.666667-10.666667 10.666667H192c-6.4 0-10.666667-4.266667-10.666667-10.666667V192c0-6.4 4.266667-10.666667 10.666667-10.666667h256c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H192C151.466667 117.333333 117.333333 151.466667 117.333333 192v640c0 40.533333 34.133333 74.666667 74.666667 74.666667h640c40.533333 0 74.666667-34.133333 74.666667-74.666667V576c0-17.066667-14.933333-32-32-32z"  ></path><path d="M874.666667 117.333333H640c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h157.866667L509.866667 467.2c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333l285.866667-285.866667V384c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V149.333333c0-17.066667-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-scanning" viewBox="0 0 1024 1024"><path d="M341.333333 864H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667v-170.666666c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v170.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h170.666666c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM896 650.666667c-17.066667 0-32 14.933333-32 32v170.666666c0 6.4-4.266667 10.666667-10.666667 10.666667h-170.666666c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h170.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667v-170.666666c0-17.066667-14.933333-32-32-32zM128 373.333333c17.066667 0 32-14.933333 32-32V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h170.666666c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H170.666667C130.133333 96 96 130.133333 96 170.666667v170.666666c0 17.066667 14.933333 32 32 32zM853.333333 96h-170.666666c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h170.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v170.666666c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667zM896 469.333333H128c-17.066667 0-32 14.933333-32 32S110.933333 533.333333 128 533.333333h768c17.066667 0 32-14.933333 32-32S913.066667 469.333333 896 469.333333z"  ></path></symbol><symbol id="zj-security" viewBox="0 0 1024 1024"><path d="M814.933333 179.2L529.066667 78.933333c-10.666667-4.266667-23.466667-4.266667-34.133334 0L209.066667 179.2c-29.866667 10.666667-49.066667 38.4-49.066667 70.4V597.333333c0 194.133333 157.866667 352 352 352S864 791.466667 864 597.333333V249.6c0-32-19.2-61.866667-49.066667-70.4zM800 597.333333c0 157.866667-130.133333 288-288 288S224 755.2 224 597.333333V249.6c0-4.266667 2.133333-8.533333 6.4-10.666667L512 140.8l281.6 98.133333c4.266667 2.133333 6.4 6.4 6.4 10.666667V597.333333z"  ></path><path d="M659.2 403.2l-192 194.133333-85.333333-68.266666c-12.8-10.666667-34.133333-8.533333-44.8 4.266666-10.666667 12.8-8.533333 34.133333 4.266666 44.8l106.666667 85.333334c6.4 4.266667 12.8 6.4 19.2 6.4 8.533333 0 17.066667-2.133333 23.466667-8.533334l213.333333-213.333333c12.8-12.8 12.8-32 0-44.8-10.666667-10.666667-32-10.666667-44.8 0z"  ></path></symbol><symbol id="zj-sign-out" viewBox="0 0 1024 1024"><path d="M919.466667 488.533333l-149.333334-149.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l93.866667 93.866667H522.666667c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h296.533333L725.333333 635.733333c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466667 8.533334s17.066667-2.133333 23.466667-8.533334l149.333333-149.333333c8.533333-8.533333 8.533333-29.866667-2.133333-42.666667z"  ></path><path d="M832 714.666667c-17.066667 0-32 14.933333-32 32v106.666666c0 6.4-4.266667 10.666667-10.666667 10.666667H234.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h554.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v106.666666c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667H234.666667C194.133333 96 160 130.133333 160 170.666667v682.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h554.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667v-106.666666c0-17.066667-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-select" viewBox="0 0 1024 1024"><path d="M409.6 757.333333c-8.533333 0-17.066667-2.133333-23.466667-8.533333l-238.933333-234.666667c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l215.466667 213.333334 422.4-428.8c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L430.933333 746.666667c-4.266667 8.533333-12.8 10.666667-21.333333 10.666666z"  ></path></symbol><symbol id="zj-stop" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667zM885.333333 512c0 85.333333-29.866667 164.266667-78.933333 228.266667l-533.333333-514.133334c64-55.466667 149.333333-87.466667 238.933333-87.466666 204.8 0 373.333333 168.533333 373.333333 373.333333z m-746.666666 0c0-91.733333 34.133333-174.933333 87.466666-241.066667l535.466667 516.266667c-66.133333 59.733333-153.6 98.133333-251.733333 98.133333-202.666667 0-371.2-168.533333-371.2-373.333333z"  ></path></symbol><symbol id="zj-success" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"  ></path><path d="M701.866667 381.866667L448 637.866667 322.133333 512c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l149.333334 149.333333c6.4 6.4 14.933333 8.533333 23.466666 8.533334s17.066667-2.133333 23.466667-8.533334l277.333333-277.333333c12.8-12.8 12.8-32 0-44.8-14.933333-12.8-36.266667-12.8-49.066666-2.133333z"  ></path></symbol><symbol id="zj-smile" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"  ></path><path d="M674.133333 608c-46.933333 57.6-100.266667 85.333333-162.133333 85.333333s-115.2-27.733333-162.133333-85.333333c-10.666667-12.8-32-14.933333-44.8-4.266667-12.8 10.666667-14.933333 32-4.266667 44.8 59.733333 70.4 130.133333 106.666667 211.2 106.666667s151.466667-36.266667 211.2-106.666667c10.666667-12.8 8.533333-34.133333-4.266667-44.8-12.8-10.666667-34.133333-8.533333-44.8 4.266667zM362.666667 512c23.466667 0 42.666667-19.2 42.666666-42.666667v-64c0-23.466667-19.2-42.666667-42.666666-42.666666s-42.666667 19.2-42.666667 42.666666v64c0 23.466667 19.2 42.666667 42.666667 42.666667zM661.333333 512c23.466667 0 42.666667-19.2 42.666667-42.666667v-64c0-23.466667-19.2-42.666667-42.666667-42.666666s-42.666667 19.2-42.666666 42.666666v64c0 23.466667 19.2 42.666667 42.666666 42.666667z"  ></path></symbol><symbol id="zj-switch" viewBox="0 0 1024 1024"><path d="M128 522.666667c17.066667 0 32-14.933333 32-32v-170.666667c0-6.4 4.266667-10.666667 10.666667-10.666667h652.8l-83.2 83.2c-12.8 12.8-12.8 34.133333 0 46.933334 6.4 6.4 14.933333 10.666667 23.466666 10.666666s17.066667-4.266667 23.466667-10.666666l145.066667-145.066667c12.8-12.8 12.8-34.133333 0-46.933333l-145.066667-145.066667c-12.8-12.8-34.133333-12.8-46.933333 0-12.8 12.8-12.8 34.133333 0 46.933333l93.866666 93.866667H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666667v170.666666c0 19.2 14.933333 34.133333 32 34.133334zM906.666667 501.333333c-17.066667 0-32 14.933333-32 32v170.666667c0 6.4-4.266667 10.666667-10.666667 10.666667H211.2l83.2-83.2c12.8-12.8 12.8-34.133333 0-46.933334-12.8-12.8-34.133333-12.8-46.933333 0l-145.066667 145.066667c-12.8 12.8-12.8 34.133333 0 46.933333l145.066667 145.066667c6.4 6.4 14.933333 10.666667 23.466666 10.666667s17.066667-4.266667 23.466667-10.666667c12.8-12.8 12.8-34.133333 0-46.933333l-93.866667-93.866667h663.466667c40.533333 0 74.666667-34.133333 74.666667-74.666667v-170.666666c0-19.2-12.8-34.133333-32-34.133334z"  ></path></symbol><symbol id="zj-setting" viewBox="0 0 1024 1024"><path d="M904.533333 422.4l-85.333333-14.933333-17.066667-38.4 49.066667-70.4c14.933333-21.333333 12.8-49.066667-6.4-68.266667l-53.333333-53.333333c-19.2-19.2-46.933333-21.333333-68.266667-6.4l-70.4 49.066666-38.4-17.066666-14.933333-85.333334c-2.133333-23.466667-23.466667-42.666667-49.066667-42.666666h-74.666667c-25.6 0-46.933333 19.2-53.333333 44.8l-14.933333 85.333333-38.4 17.066667L296.533333 170.666667c-21.333333-14.933333-49.066667-12.8-68.266666 6.4l-53.333334 53.333333c-19.2 19.2-21.333333 46.933333-6.4 68.266667l49.066667 70.4-17.066667 38.4-85.333333 14.933333c-21.333333 4.266667-40.533333 25.6-40.533333 51.2v74.666667c0 25.6 19.2 46.933333 44.8 53.333333l85.333333 14.933333 17.066667 38.4L170.666667 727.466667c-14.933333 21.333333-12.8 49.066667 6.4 68.266666l53.333333 53.333334c19.2 19.2 46.933333 21.333333 68.266667 6.4l70.4-49.066667 38.4 17.066667 14.933333 85.333333c4.266667 25.6 25.6 44.8 53.333333 44.8h74.666667c25.6 0 46.933333-19.2 53.333333-44.8l14.933334-85.333333 38.4-17.066667 70.4 49.066667c21.333333 14.933333 49.066667 12.8 68.266666-6.4l53.333334-53.333334c19.2-19.2 21.333333-46.933333 6.4-68.266666l-49.066667-70.4 17.066667-38.4 85.333333-14.933334c25.6-4.266667 44.8-25.6 44.8-53.333333v-74.666667c-4.266667-27.733333-23.466667-49.066667-49.066667-53.333333z m-19.2 117.333333l-93.866666 17.066667c-10.666667 2.133333-19.2 8.533333-23.466667 19.2l-29.866667 70.4c-4.266667 10.666667-2.133333 21.333333 4.266667 29.866667l53.333333 76.8-40.533333 40.533333-76.8-53.333333c-8.533333-6.4-21.333333-8.533333-29.866667-4.266667L576 768c-10.666667 4.266667-17.066667 12.8-19.2 23.466667l-17.066667 93.866666h-57.6l-17.066666-93.866666c-2.133333-10.666667-8.533333-19.2-19.2-23.466667l-70.4-29.866667c-10.666667-4.266667-21.333333-2.133333-29.866667 4.266667l-76.8 53.333333-40.533333-40.533333 53.333333-76.8c6.4-8.533333 8.533333-21.333333 4.266667-29.866667L256 576c-4.266667-10.666667-12.8-17.066667-23.466667-19.2l-93.866666-17.066667v-57.6l93.866666-17.066666c10.666667-2.133333 19.2-8.533333 23.466667-19.2l29.866667-70.4c4.266667-10.666667 2.133333-21.333333-4.266667-29.866667l-53.333333-76.8 40.533333-40.533333 76.8 53.333333c8.533333 6.4 21.333333 8.533333 29.866667 4.266667L448 256c10.666667-4.266667 17.066667-12.8 19.2-23.466667l17.066667-93.866666h57.6l17.066666 93.866666c2.133333 10.666667 8.533333 19.2 19.2 23.466667l70.4 29.866667c10.666667 4.266667 21.333333 2.133333 29.866667-4.266667l76.8-53.333333 40.533333 40.533333-53.333333 76.8c-6.4 8.533333-8.533333 21.333333-4.266667 29.866667L768 448c4.266667 10.666667 12.8 17.066667 23.466667 19.2l93.866666 17.066667v55.466666z"  ></path><path d="M512 394.666667c-64 0-117.333333 53.333333-117.333333 117.333333s53.333333 117.333333 117.333333 117.333333 117.333333-53.333333 117.333333-117.333333-53.333333-117.333333-117.333333-117.333333z m0 170.666666c-29.866667 0-53.333333-23.466667-53.333333-53.333333s23.466667-53.333333 53.333333-53.333333 53.333333 23.466667 53.333333 53.333333-23.466667 53.333333-53.333333 53.333333z"  ></path></symbol><symbol id="zj-survey" viewBox="0 0 1024 1024"><path d="M810.666667 138.666667h-85.333334V128c0-29.866667-23.466667-53.333333-53.333333-53.333333h-320C322.133333 74.666667 298.666667 98.133333 298.666667 128v10.666667h-85.333334c-40.533333 0-74.666667 34.133333-74.666666 74.666666v661.333334c0 40.533333 34.133333 74.666667 74.666666 74.666666h597.333334c40.533333 0 74.666667-34.133333 74.666666-74.666666V213.333333c0-40.533333-34.133333-74.666667-74.666666-74.666666z m-149.333334 0v64H362.666667v-64h298.666666zM821.333333 874.666667c0 6.4-4.266667 10.666667-10.666666 10.666666H213.333333c-6.4 0-10.666667-4.266667-10.666666-10.666666V213.333333c0-6.4 4.266667-10.666667 10.666666-10.666666h85.333334v10.666666c0 29.866667 23.466667 53.333333 53.333333 53.333334h320c29.866667 0 53.333333-23.466667 53.333333-53.333334v-10.666666h85.333334c6.4 0 10.666667 4.266667 10.666666 10.666666v661.333334z"  ></path><path d="M659.2 445.866667l-211.2 213.333333-83.2-83.2c-12.8-12.8-32-12.8-44.8 0s-12.8 32 0 44.8l106.666667 106.666667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333l234.666667-234.666667c12.8-12.8 12.8-32 0-44.8-14.933333-12.8-36.266667-12.8-49.066667-2.133333z"  ></path></symbol><symbol id="zj-task" viewBox="0 0 1024 1024"><path d="M846.933333 115.2c-8.533333-6.4-21.333333-6.4-29.866666-2.133333 0 0-74.666667 34.133333-174.933334 34.133333-49.066667 0-96-17.066667-145.066666-34.133333-53.333333-19.2-106.666667-38.4-166.4-38.4-119.466667 0-162.133333 40.533333-168.533334 44.8-4.266667 6.4-8.533333 14.933333-8.533333 23.466666V917.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V595.2c14.933333-8.533333 51.2-21.333333 113.066667-21.333333 49.066667 0 96 17.066667 145.066666 34.133333 53.333333 19.2 106.666667 38.4 166.4 38.4 115.2 0 198.4-38.4 200.533334-38.4 10.666667-4.266667 19.2-17.066667 19.2-29.866667V142.933333c0-10.666667-6.4-21.333333-14.933334-27.733333z m-49.066666 441.6c-27.733333 10.666667-85.333333 25.6-155.733334 25.6-49.066667 0-96-17.066667-145.066666-34.133333-53.333333-19.2-106.666667-38.4-166.4-38.4-49.066667 0-87.466667 6.4-113.066667 17.066666V160c14.933333-8.533333 51.2-21.333333 113.066667-21.333333 49.066667 0 96 17.066667 145.066666 34.133333 53.333333 19.2 106.666667 38.4 166.4 38.4 64 0 119.466667-12.8 155.733334-23.466667v369.066667z"  ></path></symbol><symbol id="zj-skip" viewBox="0 0 1024 1024"><path d="M921.6 356.266667c-14.933333-8.533333-34.133333-4.266667-42.666667 12.8L829.866667 448c-51.2-157.866667-200.533333-266.666667-369.066667-266.666667-172.8 0-324.266667 115.2-373.333333 277.333334-4.266667 17.066667 4.266667 34.133333 21.333333 40.533333 17.066667 4.266667 34.133333-4.266667 40.533333-21.333333 40.533333-136.533333 166.4-232.533333 311.466667-232.533334 140.8 0 264.533333 89.6 307.2 219.733334l-81.066667-46.933334c-14.933333-8.533333-34.133333-4.266667-42.666666 10.666667-8.533333 14.933333-4.266667 34.133333 10.666666 42.666667l147.2 85.333333c4.266667 2.133333 10.666667 4.266667 17.066667 4.266667 2.133333 0 6.4 0 8.533333-2.133334 8.533333-2.133333 14.933333-8.533333 19.2-14.933333l85.333334-147.2c8.533333-12.8 4.266667-32-10.666667-40.533333zM896 757.333333H128c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h768c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-text" viewBox="0 0 1024 1024"><path d="M853.333333 138.666667H170.666667c-17.066667 0-32 14.933333-32 32v128c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V202.666667h277.333333v618.666666H384c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h256c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32h-96v-618.666666h277.333333V298.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V170.666667c0-17.066667-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-time" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 810.666666c-204.8 0-373.333333-168.533333-373.333333-373.333333S307.2 138.666667 512 138.666667 885.333333 307.2 885.333333 512 716.8 885.333333 512 885.333333z"  ></path><path d="M695.466667 567.466667l-151.466667-70.4V277.333333c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v238.933334c0 12.8 6.4 23.466667 19.2 29.866666l170.666667 81.066667c4.266667 2.133333 8.533333 2.133333 12.8 2.133333 12.8 0 23.466667-6.4 29.866666-19.2 6.4-14.933333 0-34.133333-17.066666-42.666666z"  ></path></symbol><symbol id="zj-telephone-out" viewBox="0 0 1024 1024"><path d="M817.066667 586.666667c-32-4.266667-64-12.8-96-23.466667-38.4-14.933333-81.066667-4.266667-110.933334 23.466667l-27.733333 27.733333c-70.4-44.8-130.133333-102.4-172.8-172.8l27.733333-27.733333c27.733333-29.866667 38.4-72.533333 23.466667-110.933334-10.666667-29.866667-19.2-61.866667-23.466667-96-6.4-51.2-51.2-89.6-104.533333-89.6h-108.8c-32 0-59.733333 12.8-78.933333 34.133334-19.2 21.333333-29.866667 51.2-27.733334 81.066666 12.8 117.333333 53.333333 230.4 117.333334 328.533334 57.6 91.733333 136.533333 170.666667 228.266666 228.266666 98.133333 64 211.2 104.533333 328.533334 117.333334h8.533333c25.6 0 51.2-10.666667 70.4-27.733334 21.333333-19.2 34.133333-49.066667 34.133333-76.8v-108.8c4.266667-53.333333-36.266667-98.133333-87.466666-106.666666z m25.6 106.666666v108.8c0 10.666667-4.266667 23.466667-12.8 29.866667-8.533333 8.533333-19.2 10.666667-29.866667 10.666667-106.666667-10.666667-211.2-49.066667-300.8-106.666667-83.2-53.333333-155.733333-125.866667-209.066667-209.066667-57.6-89.6-96-194.133333-106.666666-300.8 0-10.666667 2.133333-23.466667 10.666666-32 8.533333-8.533333 19.2-12.8 29.866667-12.8h108.8c21.333333 0 38.4 14.933333 40.533333 34.133334 4.266667 36.266667 14.933333 74.666667 27.733334 108.8 6.4 14.933333 2.133333 32-8.533334 42.666666l-46.933333 46.933334c-10.666667 10.666667-12.8 25.6-4.266667 38.4 55.466667 96 134.4 174.933333 230.4 230.4 12.8 6.4 27.733333 4.266667 38.4-4.266667l46.933334-46.933333c10.666667-10.666667 27.733333-14.933333 42.666666-8.533334 36.266667 12.8 72.533333 21.333333 108.8 27.733334 19.2 2.133333 34.133333 19.2 34.133334 42.666666 0-2.133333 0-2.133333 0 0zM930.133333 270.933333c2.133333-4.266667 2.133333-8.533333 2.133334-12.8s0-8.533333-2.133334-10.666666c-2.133333-4.266667-4.266667-8.533333-6.4-10.666667L793.6 106.666667c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l74.666667 74.666666H640c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h183.466667L746.666667 364.8c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333l130.133333-130.133333c2.133333-2.133333 4.266667-4.266667 6.4-8.533334z"  ></path></symbol><symbol id="zj-toggle-left" viewBox="0 0 1024 1024"><path d="M874.666667 800H149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h725.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM149.333333 224h725.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32zM341.333333 480c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h512c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H341.333333z"  ></path><path d="M275.2 684.8c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8l-128-128 125.866667-125.866667c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0l-149.333333 149.333334c-12.8 12.8-12.8 32 0 44.8l149.333333 149.333333z"  ></path></symbol><symbol id="zj-toggle-right" viewBox="0 0 1024 1024"><path d="M874.666667 800H149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h725.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM149.333333 224h725.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32zM149.333333 544h512c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32H149.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32z"  ></path><path d="M748.8 339.2c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l125.866667 125.866667-125.866667 125.866666c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466667 8.533334s17.066667-2.133333 23.466666-8.533334l149.333334-149.333333c12.8-12.8 12.8-32 0-44.8l-151.466667-147.2z"  ></path></symbol><symbol id="zj-telephone" viewBox="0 0 1024 1024"><path d="M817.066667 586.666667c-32-4.266667-64-12.8-96-23.466667-38.4-14.933333-81.066667-4.266667-110.933334 23.466667l-27.733333 27.733333c-70.4-44.8-130.133333-102.4-172.8-172.8l27.733333-27.733333c27.733333-29.866667 38.4-72.533333 23.466667-110.933334-10.666667-29.866667-19.2-61.866667-23.466667-96-6.4-51.2-51.2-89.6-104.533333-89.6h-108.8c-32 0-59.733333 12.8-78.933333 34.133334-19.2 21.333333-29.866667 51.2-27.733334 81.066666 12.8 117.333333 53.333333 230.4 117.333334 328.533334 57.6 91.733333 136.533333 170.666667 228.266666 228.266666 98.133333 64 211.2 104.533333 328.533334 117.333334h8.533333c25.6 0 51.2-10.666667 70.4-27.733334 21.333333-19.2 34.133333-49.066667 34.133333-76.8v-108.8c4.266667-53.333333-36.266667-98.133333-87.466666-106.666666z m25.6 106.666666v108.8c0 10.666667-4.266667 23.466667-12.8 29.866667-8.533333 8.533333-19.2 10.666667-29.866667 10.666667-106.666667-10.666667-211.2-49.066667-300.8-106.666667-83.2-53.333333-155.733333-125.866667-209.066667-209.066667-57.6-89.6-96-194.133333-106.666666-300.8 0-10.666667 2.133333-23.466667 10.666666-32 8.533333-8.533333 19.2-12.8 29.866667-12.8h108.8c21.333333 0 38.4 14.933333 40.533333 34.133334 4.266667 36.266667 14.933333 74.666667 27.733334 108.8 6.4 14.933333 2.133333 32-8.533334 42.666666l-46.933333 46.933334c-10.666667 10.666667-12.8 25.6-4.266667 38.4 55.466667 96 134.4 174.933333 230.4 230.4 12.8 6.4 27.733333 4.266667 38.4-4.266667l46.933334-46.933333c10.666667-10.666667 27.733333-14.933333 42.666666-8.533334 36.266667 12.8 72.533333 21.333333 108.8 27.733334 19.2 2.133333 34.133333 19.2 34.133334 42.666666 0-2.133333 0-2.133333 0 0z"  ></path></symbol><symbol id="zj-top" viewBox="0 0 1024 1024"><path d="M896 96H128c-17.066667 0-32 14.933333-32 32S110.933333 160 128 160h768c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM535.466667 296.533333c-12.8-12.8-32-12.8-44.8 0l-213.333334 213.333334c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0l157.866667-157.866667V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V396.8l157.866667 157.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c12.8-12.8 12.8-32 0-44.8l-213.333333-213.333334z"  ></path></symbol><symbol id="zj-unlock" viewBox="0 0 1024 1024"><path d="M785.066667 416H381.866667v-121.6c0-74.666667 61.866667-134.4 138.666666-134.4 59.733333 0 113.066667 36.266667 132.266667 91.733333 6.4 17.066667 23.466667 25.6 40.533333 19.2 17.066667-6.4 25.6-23.466667 19.2-40.533333-27.733333-81.066667-104.533333-134.4-192-134.4-110.933333 0-202.666667 89.6-202.666666 198.4v121.6h-78.933334c-55.466667 0-100.266667 44.8-100.266666 100.266667v311.466666c0 55.466667 44.8 100.266667 100.266666 100.266667h546.133334c55.466667 0 100.266667-44.8 100.266666-100.266667V516.266667c0-55.466667-44.8-100.266667-100.266666-100.266667z m36.266666 411.733333c0 19.2-17.066667 36.266667-36.266666 36.266667H238.933333c-19.2 0-36.266667-17.066667-36.266666-36.266667V516.266667c0-19.2 17.066667-36.266667 36.266666-36.266667h546.133334c19.2 0 36.266667 17.066667 36.266666 36.266667v311.466666z"  ></path><path d="M512 544c-17.066667 0-32 14.933333-32 32v106.666667c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-106.666667c0-17.066667-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-user" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667zM288 810.666667c0-123.733333 100.266667-224 224-224S736 686.933333 736 810.666667c-61.866667 46.933333-140.8 74.666667-224 74.666666s-162.133333-27.733333-224-74.666666z m128-384c0-53.333333 42.666667-96 96-96s96 42.666667 96 96-42.666667 96-96 96-96-42.666667-96-96z m377.6 328.533333c-19.2-96-85.333333-174.933333-174.933333-211.2 32-29.866667 51.2-70.4 51.2-117.333333 0-87.466667-72.533333-160-160-160s-160 72.533333-160 160c0 46.933333 19.2 87.466667 51.2 117.333333-89.6 36.266667-155.733333 115.2-174.933334 211.2-55.466667-66.133333-91.733333-149.333333-91.733333-243.2 0-204.8 168.533333-373.333333 373.333333-373.333333S885.333333 307.2 885.333333 512c0 93.866667-34.133333 177.066667-91.733333 243.2z"  ></path></symbol><symbol id="zj-upload" viewBox="0 0 1024 1024"><path d="M896 629.333333c-17.066667 0-32 14.933333-32 32v170.666667c0 6.4-4.266667 10.666667-10.666667 10.666667H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667v-170.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v170.666667c0 40.533333 34.133333 74.666667 74.666667 74.666667h682.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667v-170.666667c0-17.066667-14.933333-32-32-32z"  ></path><path d="M322.133333 407.466667l157.866667-157.866667V704c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V247.466667l157.866667 157.866666c6.4 6.4 14.933333 8.533333 23.466666 8.533334s17.066667-2.133333 23.466667-8.533334c12.8-12.8 12.8-32 0-44.8l-213.333333-213.333333c-12.8-12.8-32-12.8-44.8 0l-213.333334 213.333333c-12.8 12.8-12.8 32 0 44.8 10.666667 12.8 32 12.8 44.8 2.133334z"  ></path></symbol><symbol id="zj-work" viewBox="0 0 1024 1024"><path d="M885.333333 256H725.333333V198.4C723.2 157.866667 689.066667 128 648.533333 128h-298.666666c-40.533333 2.133333-72.533333 34.133333-72.533334 74.666667V256H138.666667C98.133333 256 64 290.133333 64 330.666667v490.666666C64 861.866667 98.133333 896 138.666667 896h746.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667v-490.666666c0-40.533333-34.133333-74.666667-74.666667-74.666667zM341.333333 202.666667c2.133333-6.4 6.4-10.666667 12.8-10.666667h296.533334c6.4 0 10.666667 6.4 10.666666 10.666667V256H341.333333V202.666667zM138.666667 320h746.666666c6.4 0 10.666667 4.266667 10.666667 10.666667v128H128v-128c0-6.4 4.266667-10.666667 10.666667-10.666667z m277.333333 202.666667h192V576c0 6.4-4.266667 10.666667-10.666667 10.666667h-170.666666c-6.4 0-10.666667-4.266667-10.666667-10.666667v-53.333333z m469.333333 309.333333h-746.666666c-6.4 0-10.666667-4.266667-10.666667-10.666667v-298.666666h224V576c0 40.533333 34.133333 74.666667 74.666667 74.666667h170.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667v-53.333333H896v298.666666c0 6.4-4.266667 10.666667-10.666667 10.666667z"  ></path></symbol><symbol id="zj-training" viewBox="0 0 1024 1024"><path d="M853.333333 202.666667H544V106.666667c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v96H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666666v384c0 40.533333 34.133333 74.666667 74.666667 74.666667h187.733333l-87.466667 151.466667c-8.533333 14.933333-4.266667 34.133333 10.666667 42.666666 4.266667 2.133333 10.666667 4.266667 14.933333 4.266667 10.666667 0 21.333333-6.4 27.733334-17.066667l106.666666-183.466666h157.866667l106.666667 183.466666c6.4 10.666667 17.066667 17.066667 27.733333 17.066667 6.4 0 10.666667-2.133333 14.933333-4.266667 14.933333-8.533333 21.333333-27.733333 10.666667-42.666666L661.333333 736h192c40.533333 0 74.666667-34.133333 74.666667-74.666667V277.333333c0-40.533333-34.133333-74.666667-74.666667-74.666666z m10.666667 458.666666c0 6.4-4.266667 10.666667-10.666667 10.666667H170.666667c-6.4 0-10.666667-4.266667-10.666667-10.666667V277.333333c0-6.4 4.266667-10.666667 10.666667-10.666666h682.666666c6.4 0 10.666667 4.266667 10.666667 10.666666v384z"  ></path><path d="M682.666667 501.333333H341.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h341.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM682.666667 373.333333H341.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h341.333334c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-warning" viewBox="0 0 1024 1024"><path d="M934.4 770.133333L605.866667 181.333333C586.666667 147.2 550.4 128 512 128c-38.4 0-74.666667 21.333333-93.866667 53.333333L89.6 770.133333c-19.2 34.133333-19.2 76.8 0 110.933334S145.066667 938.666667 183.466667 938.666667h657.066666c38.4 0 74.666667-21.333333 93.866667-57.6 19.2-34.133333 19.2-76.8 0-110.933334z m-55.466667 81.066667c-8.533333 14.933333-23.466667 23.466667-38.4 23.466667H183.466667c-14.933333 0-29.866667-8.533333-38.4-23.466667-8.533333-14.933333-8.533333-34.133333 0-49.066667L473.6 213.333333c8.533333-12.8 23.466667-21.333333 38.4-21.333333s29.866667 8.533333 38.4 21.333333l328.533333 588.8c8.533333 14.933333 8.533333 32 0 49.066667z"  ></path><path d="M512 746.666667m-42.666667 0a42.666667 42.666667 0 1 0 85.333334 0 42.666667 42.666667 0 1 0-85.333334 0Z"  ></path><path d="M512 629.333333c17.066667 0 32-14.933333 32-32v-192c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v192c0 17.066667 14.933333 32 32 32z"  ></path></symbol><symbol id="zj-zoom-in" viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"  ></path><path d="M597.333333 437.333333H341.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h256c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-zoom-out" viewBox="0 0 1024 1024"><path d="M945.066667 898.133333l-189.866667-189.866666c55.466667-64 87.466667-149.333333 87.466667-241.066667 0-204.8-168.533333-373.333333-373.333334-373.333333S96 264.533333 96 469.333333 264.533333 842.666667 469.333333 842.666667c91.733333 0 174.933333-34.133333 241.066667-87.466667l189.866667 189.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c8.533333-12.8 8.533333-34.133333-2.133333-46.933334zM469.333333 778.666667C298.666667 778.666667 160 640 160 469.333333S298.666667 160 469.333333 160 778.666667 298.666667 778.666667 469.333333 640 778.666667 469.333333 778.666667z"  ></path><path d="M597.333333 437.333333h-96V341.333333c0-17.066667-14.933333-32-32-32s-32 14.933333-32 32v96H341.333333c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h96V597.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32v-96H597.333333c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-add-bold" viewBox="0 0 1024 1024"><path d="M874.666667 469.333333H554.666667V149.333333c0-23.466667-19.2-42.666667-42.666667-42.666666s-42.666667 19.2-42.666667 42.666666v320H149.333333c-23.466667 0-42.666667 19.2-42.666666 42.666667s19.2 42.666667 42.666666 42.666667h320v320c0 23.466667 19.2 42.666667 42.666667 42.666666s42.666667-19.2 42.666667-42.666666V554.666667h320c23.466667 0 42.666667-19.2 42.666666-42.666667s-19.2-42.666667-42.666666-42.666667z"  ></path></symbol><symbol id="zj-arrow-left-bold" viewBox="0 0 1024 1024"><path d="M384 512L731.733333 202.666667c17.066667-14.933333 19.2-42.666667 4.266667-59.733334-14.933333-17.066667-42.666667-19.2-59.733333-4.266666l-384 341.333333c-10.666667 8.533333-14.933333 19.2-14.933334 32s4.266667 23.466667 14.933334 32l384 341.333333c8.533333 6.4 19.2 10.666667 27.733333 10.666667 12.8 0 23.466667-4.266667 32-14.933333 14.933333-17.066667 14.933333-44.8-4.266667-59.733334L384 512z"  ></path></symbol><symbol id="zj-arrow-up-bold" viewBox="0 0 1024 1024"><path d="M904.533333 674.133333l-362.666666-362.666666c-17.066667-17.066667-42.666667-17.066667-59.733334 0l-362.666666 362.666666c-17.066667 17.066667-17.066667 42.666667 0 59.733334 17.066667 17.066667 42.666667 17.066667 59.733333 0L512 401.066667l332.8 332.8c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866666-12.8c17.066667-17.066667 17.066667-42.666667 0-59.733334z"  ></path></symbol><symbol id="zj-close-bold" viewBox="0 0 1024 1024"><path d="M571.733333 512l268.8-268.8c17.066667-17.066667 17.066667-42.666667 0-59.733333-17.066667-17.066667-42.666667-17.066667-59.733333 0L512 452.266667 243.2 183.466667c-17.066667-17.066667-42.666667-17.066667-59.733333 0-17.066667 17.066667-17.066667 42.666667 0 59.733333L452.266667 512 183.466667 780.8c-17.066667 17.066667-17.066667 42.666667 0 59.733333 8.533333 8.533333 19.2 12.8 29.866666 12.8s21.333333-4.266667 29.866667-12.8L512 571.733333l268.8 268.8c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866666-12.8c17.066667-17.066667 17.066667-42.666667 0-59.733333L571.733333 512z"  ></path></symbol><symbol id="zj-arrow-down-bold" viewBox="0 0 1024 1024"><path d="M904.533333 311.466667c-17.066667-17.066667-42.666667-17.066667-59.733333 0L512 644.266667 179.2 311.466667c-17.066667-17.066667-42.666667-17.066667-59.733333 0-17.066667 17.066667-17.066667 42.666667 0 59.733333l362.666666 362.666667c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866667-12.8l362.666666-362.666667c17.066667-17.066667 17.066667-42.666667 0-59.733333z"  ></path></symbol><symbol id="zj-minus-bold" viewBox="0 0 1024 1024"><path d="M853.333333 554.666667H170.666667c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666667h682.666666c23.466667 0 42.666667 19.2 42.666667 42.666667s-19.2 42.666667-42.666667 42.666667z"  ></path></symbol><symbol id="zj-arrow-right-bold" viewBox="0 0 1024 1024"><path d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"  ></path></symbol><symbol id="zj-select-bold" viewBox="0 0 1024 1024"><path d="M883.2 247.466667c-17.066667-17.066667-44.8-17.066667-59.733333 0L409.6 665.6l-209.066667-204.8c-17.066667-17.066667-44.8-17.066667-59.733333 0-17.066667 17.066667-17.066667 44.8 0 59.733333l238.933333 234.666667c8.533333 8.533333 19.2 12.8 29.866667 12.8 10.666667 0 21.333333-4.266667 29.866667-12.8l443.733333-448c17.066667-17.066667 17.066667-42.666667 0-59.733333z"  ></path></symbol><symbol id="zj-arrow-up-filling" viewBox="0 0 1024 1024"><path d="M541.866667 285.866667l345.6 345.6c17.066667 17.066667 17.066667 42.666667 0 59.733333-8.533333 8.533333-19.2 12.8-29.866667 12.8H168.533333c-23.466667 0-42.666667-19.2-42.666666-42.666667 0-10.666667 4.266667-21.333333 12.8-29.866666l343.466666-345.6c17.066667-17.066667 42.666667-17.066667 59.733334 0z"  ></path></symbol><symbol id="zj-arrow-down-filling" viewBox="0 0 1024 1024"><path d="M482.133333 738.133333L136.533333 392.533333c-17.066667-17.066667-17.066667-42.666667 0-59.733333 8.533333-8.533333 19.2-12.8 29.866667-12.8h689.066667c23.466667 0 42.666667 19.2 42.666666 42.666667 0 10.666667-4.266667 21.333333-12.8 29.866666L541.866667 738.133333c-17.066667 17.066667-42.666667 17.066667-59.733334 0z"  ></path></symbol><symbol id="zj-arrow-left-filling" viewBox="0 0 1024 1024"><path d="M268.8 480L633.6 149.333333c17.066667-14.933333 44.8-14.933333 59.733333 2.133334 6.4 8.533333 10.666667 19.2 10.666667 29.866666v661.333334c0 23.466667-19.2 42.666667-42.666667 42.666666-10.666667 0-21.333333-4.266667-27.733333-10.666666l-362.666667-330.666667c-17.066667-14.933333-19.2-42.666667-2.133333-59.733333-2.133333-2.133333 0-2.133333 0-4.266667z"  ></path></symbol><symbol id="zj-arrow-right-filling" viewBox="0 0 1024 1024"><path d="M755.2 544L390.4 874.666667c-17.066667 14.933333-44.8 14.933333-59.733333-2.133334-6.4-8.533333-10.666667-19.2-10.666667-29.866666v-661.333334c0-23.466667 19.2-42.666667 42.666667-42.666666 10.666667 0 21.333333 4.266667 27.733333 10.666666l362.666667 330.666667c17.066667 14.933333 19.2 42.666667 2.133333 59.733333 2.133333 2.133333 0 2.133333 0 4.266667z"  ></path></symbol><symbol id="zj-caps-unlock-filling" viewBox="0 0 1024 1024"><path d="M170.666667 928c-40.533333 0-74.666667-34.133333-74.666667-74.666667V170.666667c0-40.533333 34.133333-74.666667 74.666667-74.666667h682.666666c40.533333 0 74.666667 34.133333 74.666667 74.666667v682.666666c0 40.533333-34.133333 74.666667-74.666667 74.666667H170.666667zM439.466667 725.333333h147.2c12.8 0 21.333333-6.4 21.333333-19.2v-204.8h89.6c6.4 0 14.933333-6.4 17.066667-12.8 2.133333-6.4 0-14.933333-6.4-19.2l-183.466667-145.066666c-6.4-6.4-17.066667-6.4-23.466667 0L315.733333 469.333333c-4.266667 4.266667-6.4 8.533333-6.4 14.933334 0 2.133333 0 4.266667 2.133334 6.4 2.133333 6.4 8.533333 12.8 17.066666 12.8h91.733334v204.8c0 10.666667 6.4 17.066667 19.2 17.066666z"  ></path></symbol><symbol id="zj-comment-filling" viewBox="0 0 1024 1024"><path d="M853.333333 138.666667H170.666667c-40.533333 0-74.666667 34.133333-74.666667 74.666666v516.266667c2.133333 38.4 34.133333 70.4 74.666667 70.4h151.466666v119.466667c2.133333 27.733333 36.266667 38.4 55.466667 19.2l136.533333-138.666667H853.333333c40.533333 0 74.666667-34.133333 74.666667-74.666667V213.333333c0-40.533333-34.133333-74.666667-74.666667-74.666666zM514.133333 554.666667H298.666667c-17.066667 0-32-14.933333-32-32s12.8-29.866667 29.866666-32H512c17.066667 0 32 14.933333 32 32s-12.8 29.866667-29.866667 32z m160-149.333334H298.666667c-17.066667 0-32-14.933333-32-32s12.8-29.866667 29.866666-32h375.466667c17.066667 0 32 14.933333 32 32s-12.8 29.866667-29.866667 32z"  ></path></symbol><symbol id="zj-check-item-filling" viewBox="0 0 1024 1024"><path d="M853.333333 96c40.533333 0 74.666667 34.133333 74.666667 74.666667v682.666666c0 40.533333-34.133333 74.666667-74.666667 74.666667H170.666667c-40.533333 0-74.666667-34.133333-74.666667-74.666667V170.666667c0-40.533333 34.133333-74.666667 74.666667-74.666667h682.666666zM748.8 384c-12.8-12.8-32-12.8-44.8 0L460.8 616.533333 343.466667 490.666667l-2.133334-2.133334c-12.8-10.666667-29.866667-10.666667-42.666666 0-12.8 12.8-12.8 32-2.133334 44.8l140.8 149.333334 2.133334 2.133333c12.8 10.666667 32 10.666667 42.666666-2.133333L746.666667 426.666667l2.133333-2.133334c10.666667-10.666667 10.666667-29.866667 0-40.533333z"  ></path></symbol><symbol id="zj-clock-filling" viewBox="0 0 1024 1024"><path d="M512 74.666667c241.066667 0 437.333333 196.266667 437.333333 437.333333S753.066667 949.333333 512 949.333333 74.666667 753.066667 74.666667 512 270.933333 74.666667 512 74.666667z m0 170.666666c-17.066667 0-32 14.933333-32 32V518.4c2.133333 10.666667 8.533333 21.333333 19.2 25.6l170.666667 81.066667 2.133333 2.133333c14.933333 6.4 32-2.133333 40.533333-17.066667l2.133334-2.133333c6.4-14.933333-2.133333-32-17.066667-40.533333l-151.466667-70.4V275.2c-4.266667-17.066667-17.066667-29.866667-34.133333-29.866667z"  ></path></symbol><symbol id="zj-delete-filling" viewBox="0 0 1024 1024"><path d="M512 949.333333C270.933333 949.333333 74.666667 753.066667 74.666667 512S270.933333 74.666667 512 74.666667 949.333333 270.933333 949.333333 512 753.066667 949.333333 512 949.333333z m-151.466667-292.266666c10.666667 10.666667 29.866667 12.8 42.666667 2.133333l2.133333-2.133333 104.533334-102.4 102.4 102.4 2.133333 2.133333c12.8 10.666667 32 8.533333 42.666667-2.133333 12.8-12.8 12.8-32 0-44.8L554.666667 509.866667l102.4-102.4 2.133333-2.133334c10.666667-12.8 8.533333-32-2.133333-42.666666s-29.866667-12.8-42.666667-2.133334l-2.133333 2.133334-102.4 102.4-102.4-102.4-2.133334-2.133334c-12.8-10.666667-32-8.533333-42.666666 2.133334-12.8 12.8-12.8 32 0 44.8l102.4 102.4-102.4 102.4-2.133334 2.133333c-10.666667 12.8-10.666667 32 0 42.666667z"  ></path></symbol><symbol id="zj-decline-filling" viewBox="0 0 1024 1024"><path d="M635.733333 341.333333c19.2 0 32 12.8 32 29.866667v236.8h155.733334c12.8 0 25.6 8.533333 27.733333 21.333333 2.133333 4.266667 2.133333 6.4 2.133333 10.666667 0 8.533333-6.4 19.2-12.8 25.6L529.066667 910.933333c-12.8 8.533333-27.733333 8.533333-40.533334 0L181.333333 663.466667c-8.533333-8.533333-12.8-21.333333-8.533333-34.133334 2.133333-12.8 14.933333-21.333333 27.733333-21.333333h151.466667V371.2c0-19.2 12.8-29.866667 34.133333-29.866667h249.6z m-6.4-128c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32h-234.666666c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32h234.666666z m0-106.666666c17.066667 0 32 14.933333 32 32S646.4 170.666667 629.333333 170.666667h-234.666666c-17.066667 0-32-14.933333-32-32S377.6 106.666667 394.666667 106.666667h234.666666z"  ></path></symbol><symbol id="zj-dynamic-filling" viewBox="0 0 1024 1024"><path d="M456.533333 55.466667c-12.8-4.266667-27.733333 2.133333-36.266666 12.8l-234.666667 362.666666c-6.4 10.666667-6.4 21.333333-2.133333 32 6.4 10.666667 17.066667 17.066667 27.733333 17.066667h234.666667c17.066667 0 32-14.933333 32-32V85.333333c2.133333-14.933333-6.4-27.733333-21.333334-29.866666zM810.666667 544H576c-17.066667 0-32 14.933333-32 32v362.666667c0 14.933333 8.533333 25.6 23.466667 29.866666 2.133333 0 6.4 2.133333 8.533333 2.133334 10.666667 0 21.333333-4.266667 27.733333-14.933334l234.666667-362.666666c6.4-10.666667 6.4-21.333333 2.133333-32s-19.2-17.066667-29.866666-17.066667zM448 544H85.333333c-14.933333 0-27.733333 8.533333-29.866666 23.466667-4.266667 12.8 2.133333 27.733333 12.8 36.266666l362.666666 234.666667c4.266667 4.266667 10.666667 4.266667 17.066667 4.266667 4.266667 0 10.666667-2.133333 14.933333-4.266667 10.666667-6.4 17.066667-17.066667 17.066667-27.733333V576c0-17.066667-14.933333-32-32-32zM955.733333 420.266667l-362.666666-234.666667c-10.666667-6.4-21.333333-6.4-32-2.133333-10.666667 6.4-17.066667 17.066667-17.066667 27.733333v234.666667c0 17.066667 14.933333 32 32 32h362.666667c14.933333 0 25.6-8.533333 29.866666-23.466667s0-25.6-12.8-34.133333z"  ></path></symbol><symbol id="zj-intermediate-filling" viewBox="0 0 1024 1024"><path d="M853.333333 96H170.666667C130.133333 96 96 130.133333 96 170.666667v682.666666c0 40.533333 34.133333 74.666667 74.666667 74.666667h682.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667V170.666667c0-40.533333-34.133333-74.666667-74.666667-74.666667z m-128 448H298.666667c-17.066667 0-32-14.933333-32-32s14.933333-32 32-32h426.666666c17.066667 0 32 14.933333 32 32s-14.933333 32-32 32z"  ></path></symbol><symbol id="zj-favorite-filling" viewBox="0 0 1024 1024"><path d="M465.066667 89.6l-104.533334 213.333333-234.666666 34.133334c-10.666667 2.133333-21.333333 6.4-29.866667 14.933333l-2.133333 2.133333c-17.066667 21.333333-17.066667 53.333333 4.266666 72.533334l170.666667 166.4-40.533333 234.666666c-2.133333 10.666667 0 23.466667 6.4 34.133334l2.133333 2.133333c14.933333 23.466667 44.8 32 70.4 19.2l211.2-110.933333 211.2 110.933333c10.666667 6.4 21.333333 6.4 34.133333 6.4h4.266667c27.733333-6.4 44.8-32 40.533333-61.866667l-40.533333-234.666666 170.666667-166.4c8.533333-8.533333 12.8-19.2 14.933333-29.866667v-4.266667c2.133333-27.733333-17.066667-53.333333-44.8-57.6l-234.666667-34.133333-104.533333-213.333333c-14.933333-8.533333-23.466667-17.066667-34.133333-23.466667-25.6-12.8-57.6-2.133333-70.4 25.6z"  ></path></symbol><symbol id="zj-layout-filling" viewBox="0 0 1024 1024"><path d="M928 853.333333c0 40.533333-34.133333 74.666667-74.666667 74.666667H405.333333v-490.666667h522.666667V853.333333zM341.333333 437.333333v490.666667H170.666667c-40.533333 0-74.666667-34.133333-74.666667-74.666667V437.333333H341.333333zM96 170.666667c0-40.533333 34.133333-74.666667 74.666667-74.666667h682.666666c40.533333 0 74.666667 34.133333 74.666667 74.666667v202.666666h-832V170.666667z"  ></path></symbol><symbol id="zj-help-filling" viewBox="0 0 1024 1024"><path d="M512 74.666667c241.066667 0 437.333333 196.266667 437.333333 437.333333S753.066667 949.333333 512 949.333333 74.666667 753.066667 74.666667 512 270.933333 74.666667 512 74.666667zM512 704c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666666 42.666667-19.2 42.666667-42.666666-19.2-42.666667-42.666667-42.666667z m0-458.666667c-76.8 0-138.666667 61.866667-138.666667 138.666667 0 17.066667 14.933333 32 32 32s32-14.933333 32-32c0-40.533333 34.133333-74.666667 74.666667-74.666667s74.666667 34.133333 74.666667 74.666667c0 2.133333 0 6.4-2.133334 10.666667-6.4 14.933333-19.2 32-40.533333 51.2-10.666667 10.666667-21.333333 19.2-34.133333 27.733333-2.133333 2.133333-6.4 4.266667-8.533334 6.4l-6.4 4.266667c-8.533333 6.4-14.933333 17.066667-14.933333 27.733333v108.8c2.133333 17.066667 14.933333 29.866667 32 29.866667h2.133333c17.066667-2.133333 29.866667-14.933333 29.866667-32v-89.6l12.8-10.666667c10.666667-8.533333 19.2-17.066667 29.866667-25.6 27.733333-25.6 46.933333-49.066667 57.6-74.666667 4.266667-10.666667 6.4-23.466667 6.4-34.133333 0-76.8-61.866667-138.666667-138.666667-138.666667z"  ></path></symbol><symbol id="zj-history-filling" viewBox="0 0 1024 1024"><path d="M768 74.666667c40.533333 0 72.533333 32 74.666667 70.4v294.4c-40.533333-21.333333-89.6-34.133333-138.666667-34.133334-164.266667 0-298.666667 134.4-298.666667 298.666667 0 102.4 51.2 192 128 245.333333H192c-40.533333 0-72.533333-32-74.666667-70.4V149.333333c0-40.533333 32-72.533333 70.4-74.666666H768z m-405.333333 362.666666h-108.8c-17.066667 2.133333-29.866667 14.933333-29.866667 32s12.8 29.866667 29.866667 32H364.8c17.066667-2.133333 29.866667-14.933333 29.866667-32s-14.933333-32-32-32z m320-170.666666H253.866667c-17.066667 2.133333-29.866667 14.933333-29.866667 32s12.8 29.866667 29.866667 32H684.8c17.066667-2.133333 29.866667-14.933333 29.866667-32s-14.933333-32-32-32z"  ></path><path d="M714.666667 469.333333C851.2 469.333333 960 578.133333 960 714.666667S851.2 960 714.666667 960 469.333333 851.2 469.333333 714.666667 578.133333 469.333333 714.666667 469.333333z m0 106.666667c-17.066667 0-32 14.933333-32 32v113.066667c2.133333 10.666667 8.533333 21.333333 19.2 25.6l85.333333 38.4 2.133333 2.133333c14.933333 4.266667 32-2.133333 38.4-17.066667l2.133334-2.133333c4.266667-14.933333-2.133333-32-17.066667-38.4L746.666667 699.733333V605.866667c-2.133333-17.066667-14.933333-29.866667-32-29.866667z"  ></path></symbol><symbol id="zj-filter-filling" viewBox="0 0 1024 1024"><path d="M825.6 117.333333H198.4C157.866667 117.333333 123.733333 151.466667 123.733333 192v4.266667c0 14.933333 6.4 32 17.066667 42.666666l256 302.933334v251.733333c0 12.8 6.4 23.466667 17.066667 27.733333l162.133333 81.066667 2.133333 2.133333c21.333333 8.533333 42.666667-6.4 42.666667-29.866666V541.866667l256-302.933334c27.733333-32 23.466667-78.933333-8.533333-104.533333-8.533333-10.666667-25.6-17.066667-42.666667-17.066667z"  ></path></symbol><symbol id="zj-file-common-filling" viewBox="0 0 1024 1024"><path d="M832 85.333333c17.066667 0 32 14.933333 32 32v768c0 29.866667-23.466667 53.333333-53.333333 53.333334-12.8 0-23.466667-4.266667-34.133334-12.8L512 712.533333l-264.533333 213.333334c-21.333333 17.066667-53.333333 14.933333-72.533334-4.266667l-2.133333-2.133333c-8.533333-8.533333-12.8-21.333333-12.8-34.133334v-768C160 100.266667 174.933333 85.333333 192 85.333333h640zM554.666667 448H339.2c-17.066667 2.133333-29.866667 14.933333-29.866667 32S324.266667 512 341.333333 512h215.466667c17.066667-2.133333 29.866667-14.933333 29.866667-32S571.733333 448 554.666667 448z m106.666666-170.666667H339.2c-17.066667 2.133333-29.866667 14.933333-29.866667 32S324.266667 341.333333 341.333333 341.333333h322.133334c17.066667-2.133333 29.866667-14.933333 29.866666-32S678.4 277.333333 661.333333 277.333333z"  ></path></symbol><symbol id="zj-news-filling" viewBox="0 0 1024 1024"><path d="M512 516.266667l388.266667-245.333334 49.066666-32c-6.4-34.133333-36.266667-59.733333-72.533333-59.733333H149.333333c-36.266667 0-66.133333 25.6-72.533333 57.6l46.933333 32L512 516.266667z"  ></path><path d="M949.333333 315.733333l-14.933333 10.666667-405.333333 256c-8.533333 6.4-21.333333 6.4-32 2.133333l-2.133334-2.133333-405.333333-256-14.933333-8.533333v452.266666c0 40.533333 34.133333 74.666667 74.666666 74.666667h725.333334c40.533333 0 74.666667-34.133333 74.666666-74.666667V315.733333z"  ></path></symbol><symbol id="zj-edit-filling" viewBox="0 0 1024 1024"><path d="M603.733333 181.333333L386.133333 401.066667c-6.4 6.4-10.666667 14.933333-12.8 25.6l-51.2 211.2c-8.533333 38.4 23.466667 74.666667 61.866667 64l200.533333-53.333334c8.533333-2.133333 17.066667-6.4 23.466667-14.933333l234.666667-236.8V853.333333c0 40.533333-32 72.533333-70.4 74.666667H170.666667c-40.533333 0-74.666667-34.133333-74.666667-74.666667V256c0-40.533333 34.133333-74.666667 74.666667-74.666667h433.066666z"  ></path><path d="M738.133333 147.2L435.2 448c-4.266667 4.266667-6.4 8.533333-8.533333 14.933333l-32 125.866667c-6.4 23.466667 14.933333 44.8 38.4 38.4l128-29.866667c6.4-2.133333 10.666667-4.266667 14.933333-8.533333l300.8-302.933333c38.4-38.4 38.4-102.4 0-140.8s-100.266667-38.4-138.666667 2.133333z"  ></path></symbol><symbol id="zj-fullscreen-expand-filling" viewBox="0 0 1024 1024"><path d="M396.8 140.8c-12.8-4.266667-25.6-2.133333-34.133333 6.4l-76.8 76.8-128-125.866667c-17.066667-17.066667-42.666667-17.066667-59.733334 0-17.066667 17.066667-17.066667 42.666667 0 59.733334l125.866667 125.866666-76.8 76.8c-8.533333 8.533333-12.8 23.466667-6.4 34.133334 4.266667 12.8 17.066667 19.2 29.866667 19.2h213.333333c17.066667 0 32-14.933333 32-32V170.666667c0-12.8-8.533333-25.6-19.2-29.866667zM800 738.133333l76.8-76.8c8.533333-8.533333 12.8-23.466667 6.4-34.133333s-17.066667-19.2-29.866667-19.2H640c-17.066667 0-32 14.933333-32 32v213.333333c0 12.8 8.533333 25.6 19.2 29.866667 4.266667 2.133333 8.533333 2.133333 12.8 2.133333 8.533333 0 17.066667-4.266667 23.466667-8.533333l76.8-76.8 125.866666 125.866667c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866667-12.8c17.066667-17.066667 17.066667-42.666667 0-59.733334l-125.866667-128zM384 608H170.666667c-12.8 0-25.6 8.533333-29.866667 19.2-4.266667 12.8-2.133333 25.6 6.4 34.133333l76.8 76.8-125.866667 125.866667c-17.066667 17.066667-17.066667 42.666667 0 59.733333 8.533333 10.666667 19.2 14.933333 29.866667 14.933334s21.333333-4.266667 29.866667-12.8l125.866666-125.866667 76.8 76.8c6.4 6.4 14.933333 8.533333 23.466667 8.533333 4.266667 0 8.533333 0 12.8-2.133333 12.8-4.266667 19.2-17.066667 19.2-29.866667V640c0-17.066667-14.933333-32-32-32zM640 416h213.333333c12.8 0 25.6-8.533333 29.866667-19.2s2.133333-25.6-6.4-34.133333l-76.8-76.8 125.866667-125.866667c17.066667-17.066667 17.066667-42.666667 0-59.733333-17.066667-17.066667-42.666667-17.066667-59.733334 0l-125.866666 125.866666L663.466667 149.333333c-8.533333-8.533333-23.466667-12.8-34.133334-6.4-12.8 4.266667-19.2 17.066667-19.2 29.866667v213.333333c-2.133333 14.933333 12.8 29.866667 29.866667 29.866667z"  ></path></symbol><symbol id="zj-smile-filling" viewBox="0 0 1024 1024"><path d="M512 74.666667c241.066667 0 437.333333 196.266667 437.333333 437.333333S753.066667 949.333333 512 949.333333 74.666667 753.066667 74.666667 512 270.933333 74.666667 512 74.666667z m206.933333 529.066666c-12.8-10.666667-34.133333-8.533333-44.8 4.266667-46.933333 57.6-100.266667 85.333333-162.133333 85.333333s-115.2-27.733333-162.133333-85.333333c-10.666667-12.8-32-14.933333-44.8-4.266667s-14.933333 32-4.266667 44.8c59.733333 70.4 130.133333 106.666667 211.2 106.666667s151.466667-36.266667 211.2-106.666667c10.666667-12.8 8.533333-32-4.266667-44.8zM362.666667 362.666667c-23.466667 0-42.666667 19.2-42.666667 42.666666v66.133334c2.133333 21.333333 19.2 40.533333 42.666667 40.533333s42.666667-19.2 42.666666-42.666667v-66.133333c-2.133333-23.466667-19.2-40.533333-42.666666-40.533333z m298.666666 0c-23.466667 0-42.666667 19.2-42.666666 42.666666v66.133334c2.133333 21.333333 19.2 40.533333 42.666666 40.533333s42.666667-19.2 42.666667-42.666667v-66.133333c-2.133333-23.466667-19.2-40.533333-42.666667-40.533333z"  ></path></symbol><symbol id="zj-rise-filling" viewBox="0 0 1024 1024"><path d="M629.333333 853.333333h-234.666666c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h234.666666c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM842.666667 360.533333L535.466667 113.066667c-12.8-8.533333-27.733333-8.533333-40.533334 0L183.466667 360.533333c-6.4 6.4-12.8 14.933333-12.8 23.466667 0 2.133333 0 6.4 2.133333 8.533333 2.133333 12.8 14.933333 21.333333 27.733333 21.333334h155.733334v236.8c0 19.2 12.8 29.866667 32 29.866666h249.6c21.333333 0 34.133333-12.8 34.133333-29.866666v-234.666667h151.466667c12.8 0 25.6-8.533333 27.733333-21.333333s0-25.6-8.533333-34.133334zM629.333333 746.666667h-234.666666c-17.066667 0-32 14.933333-32 32s14.933333 32 32 32h234.666666c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-picture-filling" viewBox="0 0 1024 1024"><path d="M853.333333 96c40.533333 0 74.666667 34.133333 74.666667 74.666667v682.666666c0 40.533333-34.133333 74.666667-74.666667 74.666667H170.666667c-40.533333 0-74.666667-34.133333-74.666667-74.666667V170.666667c0-40.533333 34.133333-74.666667 74.666667-74.666667h682.666666zM746.666667 469.333333c-10.666667-12.8-32-14.933333-44.8-2.133333L320 808.533333l-2.133333 2.133334c-19.2 19.2-4.266667 53.333333 23.466666 53.333333h492.8c17.066667-2.133333 29.866667-14.933333 29.866667-32v-196.266667c0-6.4-2.133333-10.666667-6.4-14.933333l-108.8-149.333333-2.133333-2.133334z m-394.666667-202.666666c-46.933333 0-85.333333 38.4-85.333333 85.333333s38.4 85.333333 85.333333 85.333333 85.333333-38.4 85.333333-85.333333-38.4-85.333333-85.333333-85.333333z"  ></path></symbol><symbol id="zj-notification-filling" viewBox="0 0 1024 1024"><path d="M388.266667 874.666667c23.466667 44.8 70.4 74.666667 123.733333 74.666666s100.266667-29.866667 123.733333-74.666666H388.266667zM885.333333 780.8c-2.133333-70.4-29.866667-128-81.066666-172.8l-4.266667-4.266667V448c0-117.333333-70.4-217.6-170.666667-262.4-4.266667-61.866667-55.466667-110.933333-117.333333-110.933333s-113.066667 49.066667-117.333333 110.933333c-100.266667 44.8-170.666667 145.066667-170.666667 262.4v155.733333l-4.266667 4.266667c-53.333333 46.933333-81.066667 108.8-81.066666 181.333333 0 17.066667 14.933333 32 32 32h682.666666c17.066667 0 32-14.933333 32-32v-8.533333z"  ></path></symbol><symbol id="zj-user-filling" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m0 160c70.4 0 128 57.6 128 128s-57.6 128-128 128-128-57.6-128-128 57.6-128 128-128z m236.8 507.733333c-23.466667 32-117.333333 100.266667-236.8 100.266667s-213.333333-68.266667-236.8-100.266667c-8.533333-10.666667-10.666667-21.333333-8.533333-32 29.866667-110.933333 130.133333-187.733333 245.333333-187.733333s215.466667 76.8 245.333333 187.733333c2.133333 10.666667 0 21.333333-8.533333 32z"  ></path></symbol><symbol id="zj-setting-filling" viewBox="0 0 1024 1024"><path d="M550.4 74.666667c25.6 0 46.933333 19.2 53.333333 44.8l14.933334 85.333333 38.4 17.066667L727.466667 170.666667c19.2-14.933333 46.933333-12.8 66.133333 4.266666l2.133333 2.133334 53.333334 53.333333c19.2 19.2 21.333333 46.933333 6.4 68.266667l-49.066667 70.4 17.066667 38.4 85.333333 14.933333c23.466667 4.266667 42.666667 25.6 44.8 49.066667v78.933333c0 25.6-19.2 46.933333-44.8 53.333333l-85.333333 14.933334-17.066667 38.4 49.066667 70.4c14.933333 19.2 12.8 46.933333-4.266667 66.133333l-2.133333 2.133333-53.333334 53.333334c-19.2 19.2-46.933333 21.333333-68.266666 6.4l-70.4-49.066667-38.4 17.066667-14.933334 85.333333c-4.266667 23.466667-25.6 42.666667-49.066666 44.8h-78.933334c-25.6 0-46.933333-19.2-53.333333-44.8l-14.933333-85.333333-38.4-17.066667-72.533334 46.933333c-19.2 14.933333-46.933333 12.8-66.133333-4.266666l-2.133333-2.133334-53.333334-53.333333c-19.2-19.2-21.333333-46.933333-6.4-68.266667l49.066667-70.4-17.066667-38.4-85.333333-14.933333c-23.466667-4.266667-42.666667-25.6-44.8-49.066667v-78.933333c0-25.6 19.2-46.933333 44.8-53.333333l85.333333-14.933334 17.066667-38.4L170.666667 296.533333c-14.933333-19.2-12.8-46.933333 2.133333-64l2.133333-2.133333 53.333334-53.333333c19.2-19.2 46.933333-21.333333 68.266666-6.4l70.4 49.066666 38.4-17.066666 14.933334-85.333334c4.266667-23.466667 25.6-42.666667 49.066666-44.8H550.4z m-38.4 320c-64 0-117.333333 53.333333-117.333333 117.333333s53.333333 117.333333 117.333333 117.333333 117.333333-53.333333 117.333333-117.333333-53.333333-117.333333-117.333333-117.333333z"  ></path></symbol><symbol id="zj-switch-filling" viewBox="0 0 1024 1024"><path d="M934.4 659.2l-174.933333-224c-4.266667-4.266667-10.666667-8.533333-17.066667-8.533333-2.133333 0-4.266667 0-6.4 2.133333-8.533333 2.133333-14.933333 10.666667-14.933333 19.2v110.933333H405.333333c-12.8 0-21.333333 8.533333-21.333333 21.333334v179.2c0 14.933333 8.533333 25.6 21.333333 25.6h313.6V896c0 8.533333 6.4 17.066667 14.933334 19.2 8.533333 2.133333 17.066667 0 23.466666-6.4l174.933334-221.866667c8.533333-8.533333 8.533333-19.2 2.133333-27.733333zM640 441.6v-179.2c0-14.933333-8.533333-25.6-21.333333-25.6H305.066667V128c0-8.533333-6.4-17.066667-14.933334-19.2s-17.066667 0-23.466666 6.4L89.6 334.933333c-6.4 8.533333-6.4 19.2 0 29.866667l174.933333 224c4.266667 4.266667 10.666667 8.533333 17.066667 8.533333 2.133333 0 4.266667 0 6.4-2.133333 8.533333-2.133333 14.933333-10.666667 14.933333-19.2v-110.933333H618.666667c12.8-2.133333 21.333333-10.666667 21.333333-23.466667z"  ></path></symbol><symbol id="zj-work-filling" viewBox="0 0 1024 1024"><path d="M885.333333 256H725.333333V198.4C723.2 157.866667 689.066667 128 648.533333 128h-298.666666c-40.533333 2.133333-72.533333 34.133333-72.533334 74.666667V256H138.666667C98.133333 256 64 290.133333 64 330.666667V448h896v-117.333333c0-40.533333-34.133333-74.666667-74.666667-74.666667zM341.333333 202.666667c2.133333-6.4 6.4-10.666667 12.8-10.666667h296.533334c6.4 0 10.666667 6.4 10.666666 10.666667V256H341.333333V202.666667zM672 576c0 40.533333-34.133333 74.666667-74.666667 74.666667h-170.666666c-40.533333 0-74.666667-34.133333-74.666667-74.666667v-64H64v309.333333C64 861.866667 98.133333 896 138.666667 896h746.666666c40.533333 0 74.666667-34.133333 74.666667-74.666667V512H672v64z"  ></path></symbol><symbol id="zj-task-filling" viewBox="0 0 1024 1024"><path d="M808.533333 138.666667l-2.133333 2.133333-2.133333 2.133333c-4.266667 2.133333-10.666667 6.4-19.2 8.533334-23.466667 10.666667-57.6 14.933333-102.4 14.933333-38.4 0-72.533333-8.533333-149.333334-32L509.866667 128c-74.666667-23.466667-113.066667-32-157.866667-32-51.2 0-93.866667 8.533333-125.866667 21.333333-21.333333 8.533333-34.133333 17.066667-42.666666 25.6-4.266667 4.266667-8.533333 12.8-8.533334 21.333334V896c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V616.533333c4.266667-2.133333 6.4-4.266667 10.666667-6.4 23.466667-10.666667 57.6-14.933333 102.4-14.933333h8.533333c36.266667 2.133333 70.4 8.533333 140.8 32l34.133334 10.666667c70.4 21.333333 106.666667 29.866667 151.466666 29.866666 51.2 0 93.866667-8.533333 125.866667-21.333333 21.333333-8.533333 34.133333-17.066667 42.666667-25.6 6.4-6.4 8.533333-14.933333 8.533333-23.466667V164.266667c-2.133333-27.733333-34.133333-42.666667-55.466667-25.6z"  ></path></symbol><symbol id="zj-success-filling" viewBox="0 0 1024 1024"><path d="M512 74.666667C270.933333 74.666667 74.666667 270.933333 74.666667 512S270.933333 949.333333 512 949.333333 949.333333 753.066667 949.333333 512 753.066667 74.666667 512 74.666667z m238.933333 349.866666l-2.133333 2.133334-277.333333 277.333333c-10.666667 10.666667-29.866667 12.8-42.666667 2.133333L426.666667 704l-149.333334-149.333333c-12.8-12.8-12.8-32 0-44.8 10.666667-10.666667 29.866667-12.8 42.666667-2.133334l2.133333 2.133334 125.866667 125.866666 253.866667-253.866666c10.666667-10.666667 29.866667-12.8 42.666666-2.133334l2.133334 2.133334c12.8 12.8 12.8 32 4.266666 42.666666z"  ></path></symbol><symbol id="zj-warning-filling" viewBox="0 0 1024 1024"><path d="M934.4 770.133333L605.866667 181.333333C586.666667 147.2 550.4 128 512 128s-74.666667 21.333333-93.866667 53.333333L89.6 770.133333c-19.2 34.133333-19.2 76.8 0 110.933334S145.066667 938.666667 183.466667 938.666667h657.066666c40.533333 0 74.666667-21.333333 93.866667-57.6 19.2-34.133333 19.2-76.8 0-110.933334zM480 362.666667c0-17.066667 14.933333-32 32-32s29.866667 12.8 32 29.866666V640c0 17.066667-14.933333 32-32 32s-29.866667-12.8-32-29.866667V362.666667zM512 832c-23.466667 0-42.666667-19.2-42.666667-42.666667s19.2-42.666667 42.666667-42.666666 42.666667 19.2 42.666667 42.666666-19.2 42.666667-42.666667 42.666667z"  ></path></symbol><symbol id="zj-folder-filling" viewBox="0 0 1024 1024"><path d="M403.2 160c25.6 0 51.2 12.8 64 36.266667l38.4 66.133333c2.133333 4.266667 6.4 4.266667 8.533333 4.266667H853.333333c40.533333 0 74.666667 34.133333 74.666667 74.666666v448c0 40.533333-34.133333 74.666667-74.666667 74.666667H170.666667c-40.533333 0-74.666667-34.133333-74.666667-74.666667V234.666667c0-40.533333 34.133333-74.666667 74.666667-74.666667h232.533333z m87.466667 256H253.866667c-17.066667 2.133333-29.866667 14.933333-29.866667 32s14.933333 32 32 32h236.8c17.066667-2.133333 29.866667-14.933333 29.866667-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-map-filling" viewBox="0 0 1024 1024"><path d="M512 74.666667c194.133333 0 352 160 352 354.133333 0 119.466667-64 236.8-168.533333 349.866667-36.266667 38.4-74.666667 72.533333-113.066667 104.533333-12.8 10.666667-25.6 21.333333-38.4 27.733333l-6.4 4.266667-8.533333 6.4c-10.666667 6.4-25.6 6.4-36.266667 0-2.133333-2.133333-4.266667-4.266667-8.533333-6.4l-12.8-8.533333c-8.533333-6.4-19.2-14.933333-29.866667-23.466667-38.4-32-76.8-66.133333-113.066667-104.533333-104.533333-110.933333-168.533333-230.4-168.533333-349.866667C160 234.666667 317.866667 74.666667 512 74.666667zM512 298.666667c-64 0-117.333333 53.333333-117.333333 117.333333S448 533.333333 512 533.333333s117.333333-53.333333 117.333333-117.333333S576 298.666667 512 298.666667z"  ></path></symbol><symbol id="zj-prompt-filling" viewBox="0 0 1024 1024"><path d="M512 74.666667c241.066667 0 437.333333 196.266667 437.333333 437.333333S753.066667 949.333333 512 949.333333 74.666667 753.066667 74.666667 512 270.933333 74.666667 512 74.666667z m0 341.333333c-17.066667 0-32 14.933333-32 32v300.8c2.133333 17.066667 14.933333 29.866667 32 29.866667s32-14.933333 32-32V445.866667c-2.133333-17.066667-14.933333-29.866667-32-29.866667z m0-160c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666666 42.666667-19.2 42.666667-42.666666-19.2-42.666667-42.666667-42.666667z"  ></path></symbol><symbol id="zj-meh-filling" viewBox="0 0 1024 1024"><path d="M512 74.666667c241.066667 0 437.333333 196.266667 437.333333 437.333333S753.066667 949.333333 512 949.333333 74.666667 753.066667 74.666667 512 270.933333 74.666667 512 74.666667z m-187.733333 576h-2.133334c-17.066667 2.133333-29.866667 14.933333-29.866666 32s14.933333 32 32 32h375.466666c17.066667-2.133333 29.866667-14.933333 29.866667-32s-14.933333-32-32-32H324.266667zM362.666667 362.666667c-23.466667 0-42.666667 19.2-42.666667 42.666666v66.133334c2.133333 21.333333 19.2 40.533333 42.666667 40.533333s42.666667-19.2 42.666666-42.666667v-66.133333c-2.133333-23.466667-19.2-40.533333-42.666666-40.533333z m298.666666 0c-23.466667 0-42.666667 19.2-42.666666 42.666666v66.133334c2.133333 21.333333 19.2 40.533333 42.666666 40.533333s42.666667-19.2 42.666667-42.666667v-66.133333c-2.133333-23.466667-19.2-40.533333-42.666667-40.533333z"  ></path></symbol><symbol id="zj-cry-filling" viewBox="0 0 1024 1024"><path d="M512 74.666667c241.066667 0 437.333333 196.266667 437.333333 437.333333S753.066667 949.333333 512 949.333333 74.666667 753.066667 74.666667 512 270.933333 74.666667 512 74.666667zM512 597.333333c-81.066667 0-151.466667 36.266667-211.2 106.666667-10.666667 12.8-8.533333 34.133333 4.266667 44.8s34.133333 8.533333 44.8-4.266667c46.933333-57.6 100.266667-85.333333 162.133333-85.333333s115.2 27.733333 162.133333 85.333333c10.666667 12.8 32 14.933333 44.8 4.266667 12.8-10.666667 14.933333-32 4.266667-44.8-59.733333-70.4-130.133333-106.666667-211.2-106.666667z m-149.333333-234.666666c-23.466667 0-42.666667 19.2-42.666667 42.666666v66.133334c2.133333 21.333333 19.2 40.533333 42.666667 40.533333s42.666667-19.2 42.666666-42.666667v-66.133333c-2.133333-23.466667-19.2-40.533333-42.666666-40.533333z m298.666666 0c-23.466667 0-42.666667 19.2-42.666666 42.666666v66.133334c2.133333 21.333333 19.2 40.533333 42.666666 40.533333s42.666667-19.2 42.666667-42.666667v-66.133333c-2.133333-23.466667-19.2-40.533333-42.666667-40.533333z"  ></path></symbol><symbol id="zj-top-filling" viewBox="0 0 1024 1024"><path d="M535.466667 241.066667c-12.8-8.533333-27.733333-8.533333-40.533334 0L183.466667 488.533333c-6.4 6.4-12.8 14.933333-12.8 23.466667 0 2.133333 0 6.4 2.133333 8.533333 2.133333 12.8 14.933333 21.333333 27.733333 21.333334h155.733334v322.133333c0 19.2 12.8 29.866667 32 29.866667h249.6c21.333333 0 34.133333-12.8 34.133333-29.866667v-320h151.466667c12.8 0 25.6-8.533333 27.733333-21.333333s0-25.6-8.533333-34.133334L535.466667 241.066667zM864 96h-704C142.933333 96 128 110.933333 128 128s14.933333 32 32 32h704c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"  ></path></symbol><symbol id="zj-home-filling" viewBox="0 0 1024 1024"><path d="M925.866667 396.8l-32-27.733333c-78.933333-66.133333-185.6-157.866667-320-273.066667l-12.8-10.666667C533.333333 61.866667 490.666667 61.866667 462.933333 85.333333l-151.466666 130.133334c-85.333333 72.533333-155.733333 132.266667-211.2 179.2-17.066667 12.8-25.6 32-25.6 53.333333v4.266667c2.133333 38.4 34.133333 66.133333 70.4 66.133333H192v358.4c0 29.866667 23.466667 53.333333 53.333333 53.333333h164.266667c27.733333-2.133333 49.066667-25.6 49.066667-53.333333v-185.6c0-12.8 8.533333-21.333333 21.333333-21.333333h64c12.8 0 21.333333 8.533333 21.333333 21.333333v185.6c0 29.866667 23.466667 53.333333 53.333334 53.333333h164.266666c27.733333-2.133333 49.066667-25.6 49.066667-53.333333V518.4h46.933333c38.4 0 70.4-32 70.4-70.4 0-21.333333-8.533333-38.4-23.466666-51.2z"  ></path></symbol><symbol id="zj-sorting" viewBox="0 0 1024 1024"><path d="M273.066667 405.333333h475.733333c10.666667 0 21.333333-4.266667 29.866667-12.8 17.066667-17.066667 17.066667-42.666667 0-59.733333L541.866667 93.866667c-17.066667-17.066667-42.666667-17.066667-59.733334 0L243.2 332.8c-8.533333 8.533333-12.8 19.2-12.8 29.866667 0 23.466667 19.2 42.666667 42.666667 42.666666zM750.933333 618.666667H273.066667c-10.666667 0-21.333333 4.266667-29.866667 12.8-17.066667 17.066667-17.066667 42.666667 0 59.733333l238.933333 238.933333c17.066667 17.066667 42.666667 17.066667 59.733334 0l238.933333-238.933333c8.533333-8.533333 12.8-19.2 12.8-29.866667 0-23.466667-19.2-42.666667-42.666667-42.666666z"  ></path></symbol></svg>', function(t) {
  var c = (c = document.getElementsByTagName("script"))[c.length - 1], e = c.getAttribute("data-injectcss"), c = c.getAttribute("data-disable-injectsvg");
  if (!c) {
    var l, s, i, a, h, o = function(d, v) {
      v.parentNode.insertBefore(d, v);
    };
    if (e && !t.__iconfont__svg__cssinject__) {
      t.__iconfont__svg__cssinject__ = true;
      try {
        document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
      } catch (d) {
        console && console.log(d);
      }
    }
    l = function() {
      var d, v = document.createElement("div");
      v.innerHTML = t._iconfont_svg_string_3983158, (v = v.getElementsByTagName("svg")[0]) && (v.setAttribute("aria-hidden", "true"), v.style.position = "absolute", v.style.width = 0, v.style.height = 0, v.style.overflow = "hidden", v = v, (d = document.body).firstChild ? o(v, d.firstChild) : d.appendChild(v));
    }, document.addEventListener ? ~["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(l, 0) : (s = function() {
      document.removeEventListener("DOMContentLoaded", s, false), l();
    }, document.addEventListener("DOMContentLoaded", s, false)) : document.attachEvent && (i = l, a = t.document, h = false, r(), a.onreadystatechange = function() {
      a.readyState == "complete" && (a.onreadystatechange = null, n());
    });
  }
  function n() {
    h || (h = true, i());
  }
  function r() {
    try {
      a.documentElement.doScroll("left");
    } catch {
      return void setTimeout(r, 50);
    }
    n();
  }
}(window);
var l6 = {
  __name: "icon",
  props: {
    color: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  },
  emits: [],
  setup(t, { emit: e }) {
    return (c, l) => (openBlock(), createElementBlock("i", {
      class: normalizeClass(["zijid-ui", "zj-" + t.name]),
      style: normalizeStyle({ color: t.color })
    }, null, 6));
  }
};
var s6 = b(l6, [["__scopeId", "data-v-937b308b"]]);
var o6 = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: s6
}, Symbol.toStringTag, { value: "Module" }));
var E = (t) => (pushScopeId("data-v-84dfa010"), t = t(), popScopeId(), t);
var i6 = ["data-text"];
var a6 = E(() => createBaseVNode("div", { class: "show1" }, null, -1));
var h6 = E(() => createBaseVNode("div", { class: "show2" }, null, -1));
var n6 = E(() => createBaseVNode("div", { class: "show3" }, null, -1));
var d6 = E(() => createBaseVNode("div", { class: "show4" }, null, -1));
var r6 = [
  a6,
  h6,
  n6,
  d6
];
var v6 = {
  __name: "loading",
  props: {
    title: {
      type: String,
      default: "加载中..."
    },
    color1: {
      type: String,
      default: "#2979ff"
    },
    color2: {
      type: String,
      default: "#ff1744"
    },
    color3: {
      type: String,
      default: "#ffff8d"
    },
    color4: {
      type: String,
      default: "#b2ff59"
    },
    bg: {
      type: String,
      default: "#000"
    },
    isLoading: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  setup(t) {
    return (e, c) => withDirectives((openBlock(), createElementBlock("div", {
      class: normalizeClass(["loading", { fixed: t.fixed }]),
      style: normalizeStyle({ "--bg": t.bg, "--color1": t.color1, "--color2": t.color2, "--color3": t.color3, "--color4": t.color4 })
    }, [
      createBaseVNode("div", {
        class: "content",
        "data-text": t.title
      }, r6, 8, i6)
    ], 6)), [
      [vShow, t.isLoading === true]
    ]);
  }
};
var m6 = b(v6, [["__scopeId", "data-v-84dfa010"]]);
var z6 = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: m6
}, Symbol.toStringTag, { value: "Module" }));
var p6 = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: Y3
}, Symbol.toStringTag, { value: "Module" }));
var q = {};
for (const [t, e] of Object.entries(Object.assign({ "./button/index.js": S3, "./dir/index.js": I3, "./file-dir/index.js": U3, "./header/index.js": e6, "./icon/index.js": o6, "./loading/index.js": z6, "./zoom/index.js": p6 })))
  q[t.split("/")[1]] = e;
var y6 = {
  install(t) {
  }
};
var f6 = {
  install(t) {
    t.use(y6), Object.keys(q).forEach((c) => {
      t.component(V3 + c, q[c].default);
    });
  }
};
export {
  M6 as IndexedDB,
  M3 as Message,
  f6 as default
};
//# sourceMappingURL=zijid-ui.js.map
