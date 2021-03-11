"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var consent = function consent(config) {
  if (config === null || config === undefined) {
    return;
  }

  var cookieAvailable = getCookie(config === null || config === void 0 ? void 0 : config.cookieName);
  var acceptAllKeysArray = [];
  var box = document.createElement("div");
  var mainTextBox = createMainTextBox(config === null || config === void 0 ? void 0 : config.message, config === null || config === void 0 ? void 0 : config.learnMore);
  var toggleBoxInner = createMainToggleBox(config);
  box.setAttribute("id", "js-consent-box");

  if (cookieAvailable !== null) {
    box.style.display = "none";
    return;
  } else {
    for (var i = 0; i < (config === null || config === void 0 ? void 0 : config.options.length); i++) {
      acceptAllKeysArray.push(config === null || config === void 0 ? void 0 : config.options[i].key);
    }

    box.appendChild(mainTextBox);
    box.appendChild(toggleBoxInner);
    var actionBtns = createActionButtonBox(config, acceptAllKeysArray, box);
    box.appendChild(actionBtns);
    document.body.appendChild(box);
  }
};

var createMainTextBox = function createMainTextBox(text, link) {
  var textBox = document.createElement("div");
  var message = createMessage(text, link);
  textBox.classList.add("js-consent-main-text-box");
  textBox.appendChild(message);
  return textBox;
};

var createMessage = function createMessage(text, link) {
  var message = document.createElement("div");
  message.classList.add("title");
  var textSpan = document.createElement("span");
  textSpan.innerHTML = text;
  message.appendChild(textSpan);
  var linkBtn = createLearnMoreLink(link);
  message.appendChild(linkBtn);
  return message;
};

var createLearnMoreLink = function createLearnMoreLink(link) {
  var emptyLink = document.createElement("a");
  var learnMore = document.createElement("a");
  learnMore.innerHTML = "Learn More";
  learnMore.setAttribute("href", link);
  learnMore.classList.add("consent-learn-more");

  if (link === undefined || link === null || (link === null || link === void 0 ? void 0 : link.length) === 0) {
    return emptyLink;
  } else {
    return learnMore;
  }
};

var createMainToggleBox = function createMainToggleBox(config) {
  var box = document.createElement("div");
  var keysArray = [];
  var acceptAllKeysArray = [];
  box.classList.add("js-consent-toggle-box");

  if ((config === null || config === void 0 ? void 0 : config.options.length) > 0) {
    for (var i = 0; i < (config === null || config === void 0 ? void 0 : config.options.length); i++) {
      createToggleBtns(box, config === null || config === void 0 ? void 0 : config.options[i], config === null || config === void 0 ? void 0 : config.color);

      if (config.options[i].checked) {
        keysArray.push(config === null || config === void 0 ? void 0 : config.options[i].key);
      }

      acceptAllKeysArray.push(config === null || config === void 0 ? void 0 : config.options[i].key);
    }

    sessionStorage.setItem("categories", JSON.stringify(keysArray));
  }

  return box;
};

var createToggleBtns = function createToggleBtns(elem, options, color) {
  var innerBox = crateToggleContainerElement();
  var title = createTitleElement(options === null || options === void 0 ? void 0 : options.title);
  var description = createDescriptionElement(options === null || options === void 0 ? void 0 : options.description);
  var label = createLabelElement(options === null || options === void 0 ? void 0 : options.key);
  var input = createInputElement(options === null || options === void 0 ? void 0 : options.checked);
  var slider = createSliderElement(options, color);
  label.appendChild(input);
  label.appendChild(slider);
  innerBox.appendChild(title);
  innerBox.appendChild(label);
  innerBox.appendChild(description);
  elem.appendChild(innerBox);
  return innerBox;
};

var crateToggleContainerElement = function crateToggleContainerElement() {
  var innerBox = document.createElement("div");
  innerBox.classList.add("js-consent-toggle-box-inner");
  return innerBox;
};

var createTitleElement = function createTitleElement(title) {
  var titleContainer = document.createElement("p");
  titleContainer.classList.add("consent-settings-title");
  titleContainer.innerHTML = title;
  return titleContainer;
};

var createDescriptionElement = function createDescriptionElement(description) {
  var descriptionContainer = document.createElement("span");
  descriptionContainer.classList.add("settings-subtitle");
  descriptionContainer.innerHTML = description;
  return descriptionContainer;
};

var createActionButtonBox = function createActionButtonBox(config, keys, box) {
  var btnBox = document.createElement("div");
  var accept = createAcceptBtn(config, box, config === null || config === void 0 ? void 0 : config.color, keys);
  btnBox.classList.add("consent-btn-box");
  var saveBtn = createSaveBtn(box, config === null || config === void 0 ? void 0 : config.expiration, config === null || config === void 0 ? void 0 : config.color, config === null || config === void 0 ? void 0 : config.cookieName, config === null || config === void 0 ? void 0 : config.changed);
  btnBox.appendChild(saveBtn);
  btnBox.appendChild(accept);
  return btnBox;
};

var createAcceptBtn = function createAcceptBtn(config, box, color, keys) {
  var acceptAll = document.createElement("button");
  acceptAll.innerHTML = "Accept all";
  acceptAll.setAttribute("id", "acceptAll");
  acceptAll.classList.add("consent-button", "accept");

  if (color) {
    acceptAll.style.backgroundColor = color;
  }

  acceptAll.addEventListener("click", function () {
    return accept(config, box, keys);
  });
  return acceptAll;
};

var createSaveBtn = function createSaveBtn(box, expiration, color, cookieName, changed) {
  var saveBtn = document.createElement("button");
  saveBtn.innerHTML = "Save cookie settings";
  saveBtn.setAttribute("id", "saveSettings");
  saveBtn.classList.add("consent-button", "save-settings");

  if (color) {
    saveBtn.style.backgroundColor = color;
  }

  saveBtn.addEventListener("click", function () {
    var savedCookies = sessionStorage.getItem("categories");
    setCookie(cookieName, savedCookies, expiration);
    box.style.display = "none";

    if (changed) {
      changed();
    }
  });
  return saveBtn;
};

var createSliderElement = function createSliderElement(options) {
  var span = document.createElement("span");
  span.classList.add("slider", "round", options === null || options === void 0 ? void 0 : options.key);

  if (options !== null && options !== void 0 && options.disabled) {
    span.classList.add("disabled");
  }

  if (options !== null && options !== void 0 && options.checked) {
    span.classList.add("checked");
  }

  span.addEventListener("click", function (e) {
    if (e.target.className.includes("disabled")) {
      e.preventDefault();
    } else {
      if (e.target.className.includes("checked")) {
        e.target.classList.remove("checked");
      } else {
        e.target.classList.add("checked");
      }

      e.stopPropagation();
      toggleValueInArray(options === null || options === void 0 ? void 0 : options.key);
    }
  });
  return span;
};

var createLabelElement = function createLabelElement() {
  var label = document.createElement("label");
  label.classList.add("switch");
  return label;
};

var createInputElement = function createInputElement(checked) {
  var input = document.createElement("input");
  input.setAttribute("type", "checkbox");

  if (checked) {
    input.setAttribute("checked", "");
  } else {
    input.removeAttribute("checked");
  }

  return input;
};

var toggleValueInArray = function toggleValueInArray(value) {
  var categories = sessionStorage.getItem("categories");
  var categoriesGDPR = JSON.parse(categories);
  var idx = categoriesGDPR.indexOf(value);

  if (idx !== -1) {
    categoriesGDPR.splice(idx, 1);
  } else {
    categoriesGDPR.push(value);
  }

  sessionStorage.setItem("categories", JSON.stringify(categoriesGDPR));
};

var accept = function accept(config, box, keys) {
  setCookie(config === null || config === void 0 ? void 0 : config.cookieName, JSON.stringify(keys), config === null || config === void 0 ? void 0 : config.expiration);
  box.style.display = "none";
  config === null || config === void 0 ? void 0 : config.changed();
};

var getCookie = function getCookie(name) {
  if (document.cookie.length) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length);
      }

      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
  }

  return null;
};

var setCookie = function setCookie(name, value, exdays, path) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=" + (path ? path : "/");
};

var _default = consent;
exports["default"] = _default;