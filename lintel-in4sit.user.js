// ==UserScript==
// @name         Lintel for in4SIT
// @namespace    sit-lintel
// @version      1.0.1.202611150258
// @description  Unofficial Lintel bar and theme for SIT's in4SIT student portal. Runs in your own session and never submits a form. Not affiliated with SIT.
// @author       Lintel
// @match        https://in4sit.singaporetech.edu.sg/*
// @updateURL    https://lintel.leeguanfeng.com/lintel-in4sit.meta.js
// @downloadURL  https://lintel.leeguanfeng.com/lintel-in4sit.user.js
// @run-at       document-idle
// @grant        none
// @noframes
// ==/UserScript==

/* --- chrome.storage.local shim (localStorage-backed) --- */


(function () {
  var g = (typeof window !== 'undefined' ? window : globalThis);
  if (g.chrome && g.chrome.storage && g.chrome.storage.local) return; // real extension: leave it
  var PREFIX = 'rbslintel:'; // namespace in localStorage so we never clash with RBS's own keys
  var listeners = [];
  function ls() {
    try { return g.localStorage; } catch (e) { return null; }
  }
  function readKey(k) {
    var store = ls();
    if (!store) return undefined;
    var raw = store.getItem(PREFIX + k);
    if (raw == null) return undefined;
    try { return JSON.parse(raw); } catch (e) { return raw; }
  }
  function writeKey(k, v) {
    var store = ls();
    if (!store) return;
    try { store.setItem(PREFIX + k, JSON.stringify(v)); } catch (e) { /* quota/full: ignore */ }
  }
  function removeKey(k) {
    var store = ls();
    if (store) { try { store.removeItem(PREFIX + k); } catch (e) {} }
  }
  function collect(keys) {
    // keys: string | string[] | object(defaults) | null/undefined(all)
    var out = {};
    var names = [];
    if (keys == null) {
      var store = ls();
      if (store) {
        for (var i = 0; i < store.length; i++) {
          var full = store.key(i);
          if (full && full.indexOf(PREFIX) === 0) names.push(full.slice(PREFIX.length));
        }
      }
    } else if (typeof keys === 'string') {
      names = [keys];
    } else if (Array.isArray(keys)) {
      names = keys.slice();
    } else if (typeof keys === 'object') {
      names = Object.keys(keys);
      for (var k in keys) out[k] = keys[k]; // seed defaults
    }
    for (var j = 0; j < names.length; j++) {
      var val = readKey(names[j]);
      if (val !== undefined) out[names[j]] = val;
    }
    return out;
  }
  function fireChanged(changes) {
    for (var i = 0; i < listeners.length; i++) {
      try { listeners[i](changes, 'local'); } catch (e) {}
    }
  }
  var local = {
    get: function (keys, cb) {
      var out = collect(keys);
      if (typeof cb === 'function') { cb(out); return; }      // callback form
      return Promise.resolve(out);                             // promise form
    },
    set: function (items, cb) {
      var changes = {};
      for (var k in items) {
        if (!Object.prototype.hasOwnProperty.call(items, k)) continue;
        var oldVal = readKey(k);
        writeKey(k, items[k]);
        changes[k] = { oldValue: oldVal, newValue: items[k] };
      }
      fireChanged(changes);
      if (typeof cb === 'function') { cb(); return; }
      return Promise.resolve();
    },
    remove: function (keys, cb) {
      var names = typeof keys === 'string' ? [keys] : (keys || []);
      var changes = {};
      for (var i = 0; i < names.length; i++) {
        var oldVal = readKey(names[i]);
        removeKey(names[i]);
        changes[names[i]] = { oldValue: oldVal, newValue: undefined };
      }
      fireChanged(changes);
      if (typeof cb === 'function') { cb(); return; }
      return Promise.resolve();
    }
  };
  var onChanged = {
    addListener: function (fn) { if (typeof fn === 'function') listeners.push(fn); },
    removeListener: function (fn) { listeners = listeners.filter(function (l) { return l !== fn; }); },
    hasListener: function (fn) { return listeners.indexOf(fn) !== -1; }
  };
  g.chrome = g.chrome || {};
  g.chrome.storage = g.chrome.storage || {};
  g.chrome.storage.local = local;
  g.chrome.storage.onChanged = onChanged;
  // Logout saves 'native' mode, and only the extension's toolbar popup can undo
  // that. Phones have no popup, so every page load starts back in Lintel.
  removeKey('lintel:uiMode');
})();


/* --- content/in4sit.bundle.js (the Lintel in4SIT app) --- */

"use strict";(()=>{})();

