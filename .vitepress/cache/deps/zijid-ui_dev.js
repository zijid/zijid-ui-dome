import {
  __publicField
} from "./chunk-F3FYYIAV.js";

// C:/Users/Administrator/AppData/Roaming/nvm/v22.2.0/node_modules/zijid-ui/utils/message/index.js
import "C:/Users/Administrator/AppData/Roaming/nvm/v22.2.0/node_modules/zijid-ui/utils/message/index.css";
var messageList;
var isLoad = false;
var loadList = [];
window.addEventListener("load", init);
function Message(info) {
  asyncCreateMessage(info);
}
function asyncCreateMessage(info) {
  const param = getInfo(info);
  if (isLoad) {
    createMessage(param);
  } else {
    loadList.push(param);
  }
}
var defaultTime = 2e3;
function getInfo(info) {
  const infoObj = {
    title: "",
    html: false,
    type: "info",
    time: defaultTime,
    close: false
  };
  if (typeof info === "string" || typeof info === "number") {
    infoObj.title = info;
  } else {
    Object.assign(infoObj, info);
  }
  return infoObj;
}
var funs = [
  "info",
  "error",
  "warn",
  "succeed",
  "success"
];
funs.forEach((key) => {
  Message[key] = function(str) {
    asyncCreateMessage({
      title: str,
      type: key,
      time: defaultTime,
      close: false
    });
  };
});
function createMessage(info) {
  const time = info.time;
  try {
    let mouseover = function() {
      clearTimeout(t);
      t = null;
    }, mouseout = function() {
      t = setTimeout(() => {
        messageDiv.classList.add("zijid_message_stop");
        setTimeout(rome, 300);
      }, time);
    }, rome = function() {
      if (t) {
        clearTimeout(t);
        t = null;
      }
      messageList.removeChild(messageDivBox);
    };
    const messageDiv = document.createElement("div");
    const messageDivBox = document.createElement("div");
    if (info.html) {
      messageDiv.innerHTML = info.title;
    } else {
      messageDiv.textContent = info.title || info.message;
    }
    messageDiv.classList.add("zijid_message");
    messageDiv.classList.add("zijid_message_" + info.type);
    messageDivBox.className = "zijid_message_div";
    if (info.close) {
      const messageDivXBox = document.createElement("div");
      const x = document.createElement("div");
      x.className = "zijid_x";
      messageDivXBox.className = "zijid_x_box";
      messageDivXBox.append();
      messageDivXBox.append(x);
      messageDiv.append(messageDivXBox);
      x.onclick = rome;
    }
    messageDivBox.append(messageDiv);
    messageList.append(messageDivBox);
    let t = setTimeout(() => {
      messageDiv.classList.add("zijid_message_stop");
      setTimeout(rome, 300);
    }, time);
    messageDiv.onmouseover = mouseover;
    messageDiv.onmouseout = mouseout;
  } catch (err) {
    console.error("err:", err);
  }
}
function init() {
  isLoad = true;
  if (!messageList) {
    getList();
  }
  loadList.forEach((i) => {
    createMessage(i);
  });
}
function getList() {
  const list = document.querySelector(".zijid_messageList");
  if (list) {
    messageList = list;
  } else {
    messageList = document.createElement("div");
    messageList.className = "zijid_messageList";
    document.body.append(messageList);
  }
}

// C:/Users/Administrator/AppData/Roaming/nvm/v22.2.0/node_modules/zijid-ui/utils/IndexedDB.js
function openDB(name, versions) {
  const request = window.indexedDB.open(name, versions);
  return new Promise((r, j) => {
    request.onerror = (event) => {
      j(event);
    };
    request.onsuccess = () => {
      r(request);
    };
  });
}
var IndexedDB = class {
  constructor(name = "zijid") {
    __publicField(this, "db", null);
    __publicField(this, "name", "");
    this.name = name || "zijid";
  }
  async getDB() {
    if (!this.db) {
      this.db = (await openDB(this.name)).result;
      this.db.onclose = () => {
        console.log("关闭");
      };
    }
    return this.db;
  }
  createTable(table, config, indexs) {
    return this.setKey(table, config, indexs);
  }
  isCreate(key) {
    return this.getDB().then((db) => {
      return db.objectStoreNames.contains(key);
    });
  }
  /**
   * 
   * @param {String} table 
   * @param {String} config.name - 数据表的名称
   * @param {String} config.key - 主键的名称
   * @param {Object} config.config - 数据表的配置对象
   * @param {String} indexs[].name - 索引的名称
   * @param {String} indexs[].key - 索引的键路径
   * @param {Object} indexs[].config - 索引的配置
   */
  async setKey(table, config, indexs) {
    console.log(`table, config, indexs:`, table, config, indexs);
    const db = await this.getDB();
    db.close();
    return new Promise(async (resolve, reject) => {
      const upgradeDB = window.indexedDB.open(db.name, db.version + 1);
      upgradeDB.onupgradeneeded = (event) => {
        const newDB = event.target.result;
        this.db = newDB;
        try {
          if (newDB.objectStoreNames.contains(table)) {
            newDB.deleteObjectStore(table);
          }
          let objectStore = newDB.createObjectStore(table, config);
          if (Array.isArray(indexs)) {
            indexs.forEach((index) => {
              if (!objectStore.indexNames.contains(index.name)) {
                console.log(`index.config:`, index.config);
                objectStore.createIndex(index.name, index.key || index.name, index.config || { ...index });
              }
            });
          }
          objectStore.transaction.oncomplete = () => {
            this.close();
            resolve(true);
          };
        } catch (err) {
          console.error(`err:`, err);
          this.close();
          reject(err);
        }
      };
    });
  }
  push(table, customerData, isUpdate = false) {
    return new Promise(async (r) => {
      const db = await this.getDB();
      const transaction = db.transaction([table], "readwrite");
      const objectStore = transaction.objectStore(table);
      const errors = [];
      const promiseArr = [];
      customerData.forEach(async (customer) => {
        let value, key;
        if (typeof customer === "object" && customer.value !== void 0) {
          value = customer.value;
          key = customer.key;
        } else {
          value = customer;
        }
        let request;
        let fun;
        if (isUpdate) {
          fun = (value2, key2) => {
            return this.put(table, value2, key2);
          };
        } else {
          fun = (...p) => {
            return objectStore.add(...p);
          };
        }
        if (typeof value === "object" && objectStore.keyPath in value) {
          request = await fun(value);
        } else {
          request = fun(value, key);
        }
        promiseArr.push(new Promise(async (r2, j) => {
          console.log("request:", request);
          if (typeof request === "boolean") {
            r2(request);
          } else {
            request.onsuccess = () => {
              r2(true);
            };
            request.onerror = (err) => {
              const target = err.currentTarget || err.target;
              console.log("key||customerData:", key || customerData);
              errors.push("push(" + (key || JSON.stringify(customerData)) + ")\n err:" + (target.error || target.error));
              j(err);
            };
          }
        }));
      });
      Promise.allSettled(promiseArr).then((res) => {
        console.log("res:", res);
        if (errors.length) {
          console.error(errors.join("\n\n"));
        }
        this.close();
        r(true);
      });
    });
  }
  add(table, value, key, isCreate = false) {
    return new Promise(async (r) => {
      const db = await this.getDB();
      const transaction = db.transaction([table], "readwrite");
      const objectStore = transaction.objectStore(table);
      let request;
      console.log(`value,objectStore.keyPath:`, value, objectStore.keyPath);
      console.log(`typeof value==="object":`, typeof value === "object");
      if (typeof value === "object" && objectStore.keyPath) {
        if (!(objectStore.keyPath in value) && key) {
          value[objectStore.keyPath] = key;
        }
        console.log("----value:", value);
        request = objectStore.add(value);
      } else {
        console.log("value:", value);
        request = objectStore.add(value, key);
      }
      request.onsuccess = () => {
        this.close();
        r(true);
      };
      request.onerror = (err) => {
        if (isCreate) {
          this.put(table, value, key).then(r);
        } else {
          this.close();
          console.error("add(", key || value, ") err:", err.currentTarget.error);
          r(false);
        }
      };
    });
  }
  put(table, value, key) {
    return new Promise(async (r) => {
      const db = await this.getDB();
      const transaction = db.transaction([table], "readwrite");
      const objectStore = transaction.objectStore(table);
      if (typeof value === "object") {
        if (!(objectStore.keyPath in value) && key) {
          value[objectStore.keyPath] = key;
        }
        objectStore.put(value);
      } else {
        console.log("value:", value);
        objectStore.put(value, key);
      }
      this.close();
      r(true);
    });
  }
  delete(table, value) {
    return new Promise(async (r) => {
      const db = await this.getDB();
      const objectStore = db.transaction([table], "readwrite").objectStore(table);
      let pArr = [];
      let errors = [];
      if (Array.isArray(value)) {
        value.forEach((i) => {
          pArr.push(new Promise((r2, j) => {
            const request = objectStore.delete(i);
            request.onsuccess = () => {
              r2(true);
            };
            request.onerror = (err) => {
              console.error("delete(", table || value, ") err:", err.currentTarget.error);
              j(false);
            };
          }));
        });
      } else {
        pArr.push(new Promise((r2, j) => {
          const request = objectStore.delete(value);
          request.onsuccess = () => {
            r2(true);
          };
          request.onerror = (err) => {
            errors.push("delete(" + (table || value) + ") err:" + err.currentTarget.error);
            j(false);
          };
        }));
      }
      Promise.allSettled(pArr).then((res) => {
        this.close();
        if (errors.length) {
          console.error(errors.join("\n\n"));
        }
        r(true);
      });
    });
  }
  async deleteIndex(key, index) {
    const temp_db = await this.getDB();
    return new Promise(async (r) => {
      let db = temp_db;
      if (db.objectStoreNames.contains(key)) {
        db.close();
        db = window.indexedDB.open(db.name, db.version + 1);
        db.onupgradeneeded = (event) => {
          this.db = db.result;
          try {
            console.log("11:", 11);
            const transaction = this.db.transaction;
            const objectStore = transaction.objectStore(key);
            if (Array.isArray(index)) {
              index.forEach((i) => {
                console.log("objectStore.deleteIndex(i):", objectStore.deleteIndex(i));
              });
            } else {
              objectStore.deleteIndex(index);
            }
            transaction.oncomplete = () => {
              this.close();
              r(true);
            };
          } catch (err) {
            this.close();
            r(false);
          }
        };
      } else {
        this.close();
        r(true);
      }
    });
  }
  async createIndex(table, indexs) {
    const temp_db = await this.getDB();
    return new Promise(async (r, j) => {
      let db = temp_db;
      db.close();
      db = window.indexedDB.open(db.name, db.version + 1);
      db.onupgradeneeded = (event) => {
        const newDB = event.target.result;
        this.db = newDB;
        try {
          let objectStore;
          if (newDB.objectStoreNames.contains(table)) {
            objectStore = db.transaction.objectStore(table);
          } else {
            objectStore = newDB.createObjectStore(table);
          }
          console.log("objectStore:", objectStore);
          if (Array.isArray(indexs)) {
            indexs.forEach((index) => {
              if (!objectStore.indexNames.contains(index.name)) {
                objectStore.createIndex(index.name, index.key || index.name, index.config || { ...index });
              }
            });
          }
          objectStore.transaction.oncomplete = () => {
            this.close();
            r(true);
          };
        } catch (err) {
          this.close();
          j(err);
        }
      };
    });
  }
  find(key, value) {
    return new Promise(async (r) => {
      const db = await this.getDB();
      const request = db.transaction([key], "readwrite").objectStore(key).get(value);
      request.onsuccess = (event) => {
        this.close();
        r(request.result);
      };
    });
  }
  clear(key) {
    return new Promise(async (r) => {
      const db = await this.getDB();
      const request = db.transaction([key], "readwrite").objectStore(key).clear();
      request.onsuccess = () => {
        this.close();
        r(true);
      };
      request.onerror = (err) => {
        this.close();
        console.error("clear() err:", err.currentTarget.error);
        r(false);
      };
    });
  }
  count(key) {
    return new Promise(async (r) => {
      const db = await this.getDB();
      const request = db.transaction([key], "readwrite").objectStore(key).count();
      request.onsuccess = () => {
        this.close();
        r(request.result);
      };
      request.onerror = (err) => {
        this.close();
        console.error("count() err:", err.currentTarget.error);
        r(false);
      };
    });
  }
  findIndex(key, index, value) {
    return new Promise(async (r) => {
      const db = await this.getDB();
      const request = db.transaction([key], "readwrite").objectStore(key).index(index).get(value);
      request.onsuccess = (event) => {
        this.close();
        r(request.result);
      };
    });
  }
  findAll(key) {
    return new Promise(async (r) => {
      const db = await this.getDB();
      const request = db.transaction([key], "readwrite").objectStore(key).getAll();
      request.onsuccess = (event) => {
        this.close();
        r(request.result);
      };
    });
  }
  close() {
    return new Promise((r) => {
      console.log(`this.db:`, this.db);
      if (this.db) {
        this.db.close();
        this.db = null;
        r();
      } else {
        r();
      }
    });
  }
};
(async () => {
})();

// C:/Users/Administrator/AppData/Roaming/nvm/v22.2.0/node_modules/zijid-ui/utils/index.js
var prefix = "zi-";

// C:/Users/Administrator/AppData/Roaming/nvm/v22.2.0/node_modules/zijid-ui/components/components.js
var components = {};
for (const [key, component] of Object.entries(import.meta.glob("./*/index.js", { eager: true }))) {
  components[key.split("/")[1]] = component;
}
var components_default = components;

// C:/Users/Administrator/AppData/Roaming/nvm/v22.2.0/node_modules/zijid-ui/index.js
import "C:/Users/Administrator/AppData/Roaming/nvm/v22.2.0/node_modules/zijid-ui/style/index.css";

// C:/Users/Administrator/AppData/Roaming/nvm/v22.2.0/node_modules/zijid-ui/directive/index.js
var directive_default = {
  install(app) {
  }
};

// C:/Users/Administrator/AppData/Roaming/nvm/v22.2.0/node_modules/zijid-ui/index.js
var zijid_ui_default = {
  install(vue) {
    vue.use(directive_default);
    const keys = Object.keys(components_default);
    keys.forEach((name) => {
      vue.component(prefix + name, components_default[name].default);
    });
  }
};
export {
  IndexedDB,
  Message,
  zijid_ui_default as default
};
//# sourceMappingURL=zijid-ui_dev.js.map
