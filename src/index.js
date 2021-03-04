const cookieConsent = (config) => {
  if (config === null || config === undefined) {
    return;
  }
  let cookieAvailable = getCookie(config?.cookieName);
  let acceptAllKeysArray = [];
  let box = document.createElement("div");
  let mainTextBox = createMainTextBox(config?.message, config?.learnMore);
  let toggleBoxInner = createMainToggleBox(config);
  box.setAttribute("id", "js-cookie-consent-box");

  if (cookieAvailable !== null) {
    box.style.display = "none";
    return;
  } else {
    for (let i = 0; i < config?.options.length; i++) {
      acceptAllKeysArray.push(config?.options[i].key);
    }

    box.appendChild(mainTextBox);
    box.appendChild(toggleBoxInner);
    let actionBtns = createActionButtonBox(config, acceptAllKeysArray, box);
    box.appendChild(actionBtns);

    document.body.appendChild(box);
  }
};

const createMainTextBox = (text, link) => {
  let textBox = document.createElement("div");
  let message = createMessage(text, link);
  textBox.classList.add("js-cookie-consent-main-text-box");
  textBox.appendChild(message);

  return textBox;
};

const createMessage = (text, link) => {
  let message = document.createElement("div");
  message.classList.add("title");

  let textSpan = document.createElement("span");
  textSpan.innerHTML = text;
  message.appendChild(textSpan);

  let linkBtn = createLearnMoreLink(link);
  message.appendChild(linkBtn);

  return message;
};

const createLearnMoreLink = (link) => {
  let emptyLink = document.createElement("a");
  let learnMore = document.createElement("a");
  learnMore.innerHTML = "Learn More";
  learnMore.setAttribute("href", link);
  learnMore.classList.add("cookie-consent-learn-more");

  if (link === undefined || link === null || link?.length === 0) {
    return emptyLink;
  } else {
    return learnMore;
  }
};

const createMainToggleBox = (config) => {
  let box = document.createElement("div");

  let keysArray = [];
  let acceptAllKeysArray = [];

  box.classList.add("js-cookie-consent-toggle-box");

  if (config?.options.length > 0) {
    for (let i = 0; i < config?.options.length; i++) {
      createToggleBtns(box, config?.options[i], config?.color);
      if (config.options[i].checked) {
        keysArray.push(config?.options[i].key);
      }

      acceptAllKeysArray.push(config?.options[i].key);
    }

    sessionStorage.setItem("categories", JSON.stringify(keysArray));
  }

  return box;
};

const createToggleBtns = (elem, options, color) => {
  let innerBox = crateToggleContainerElement();
  let title = createTitleElement(options?.title);
  let description = createDescriptionElement(options?.description);
  let label = createLabelElement(options?.key);
  let input = createInputElement(options?.checked);
  let slider = createSliderElement(options, color);

  label.appendChild(input);
  label.appendChild(slider);
  innerBox.appendChild(title);
  innerBox.appendChild(label);
  innerBox.appendChild(description);

  elem.appendChild(innerBox);

  return innerBox;
};

const crateToggleContainerElement = () => {
  let innerBox = document.createElement("div");
  innerBox.classList.add("js-cookie-consent-toggle-box-inner");

  return innerBox;
};

const createTitleElement = (title) => {
  let titleContainer = document.createElement("p");
  titleContainer.classList.add("cookie-consent-settings-title");
  titleContainer.innerHTML = title;

  return titleContainer;
};

const createDescriptionElement = (description) => {
  let descriptionContainer = document.createElement("span");
  descriptionContainer.classList.add("settings-subtitle");
  descriptionContainer.innerHTML = description;

  return descriptionContainer;
};

const createActionButtonBox = (config, keys, box) => {
  let btnBox = document.createElement("div");
  let accept = createAcceptBtn(config, box, config?.color, keys);
  btnBox.classList.add("cookie-consent-btn-box");

  let saveBtn = createSaveCookieBtn(
    box,
    config?.expiration,
    config?.color,
    config?.cookieName
  );

  btnBox.appendChild(saveBtn);
  btnBox.appendChild(accept);

  return btnBox;
};

const createAcceptBtn = (config, box, color, keys) => {
  let acceptAllCookies = document.createElement("button");
  acceptAllCookies.innerHTML = "Accept all";
  acceptAllCookies.setAttribute("id", "acceptAllCookies");
  acceptAllCookies.classList.add("cookie-consent-button", "accept");

  if (color) {
    acceptAllCookies.style.backgroundColor = color;
  }

  acceptAllCookies.addEventListener("click", () =>
    acceptCookies(config, box, keys)
  );

  return acceptAllCookies;
};

const createSaveCookieBtn = (box, expiration, color, cookieName) => {
  let saveCookie = document.createElement("button");
  saveCookie.innerHTML = "Save cookie settings";
  saveCookie.setAttribute("id", "saveCookieSettings");
  saveCookie.classList.add("cookie-consent-button", "save-cookies");

  if (color) {
    saveCookie.style.backgroundColor = color;
  }

  saveCookie.addEventListener("click", () => {
    let savedCookies = sessionStorage.getItem("categories");

    setCookie(cookieName, savedCookies, expiration);
    box.style.display = "none";
  });

  return saveCookie;
};

const createSliderElement = (options) => {
  let span = document.createElement("span");
  span.classList.add("slider", "round", options?.key);

  if (options?.disabled) {
    span.classList.add("disabled");
  }

  if (options?.checked) {
    span.classList.add("checked");
  }

  span.addEventListener("click", (e) => {
    if (e.target.className.includes("disabled")) {
      e.preventDefault();
    } else {
      if (e.target.className.includes("checked")) {
        e.target.classList.remove("checked");
      } else {
        e.target.classList.add("checked");
      }
      e.stopPropagation();
      toggleValueInArray(options?.key);
    }
  });

  return span;
};

const createLabelElement = () => {
  let label = document.createElement("label");
  label.classList.add("switch");

  return label;
};

const createInputElement = (checked) => {
  let input = document.createElement("input");
  input.setAttribute("type", "checkbox");

  if (checked) {
    input.setAttribute("checked", "");
  } else {
    input.removeAttribute("checked");
  }

  return input;
};

const toggleValueInArray = (value) => {
  let categories = sessionStorage.getItem("categories");
  let categoriesGDPR = JSON.parse(categories);
  let idx = categoriesGDPR.indexOf(value);

  if (idx !== -1) {
    categoriesGDPR.splice(idx, 1);
  } else {
    categoriesGDPR.push(value);
  }

  sessionStorage.setItem("categories", JSON.stringify(categoriesGDPR));
};

const acceptCookies = (config, box, keys) => {
  setCookie(config?.cookieName, JSON.stringify(keys), config?.expiration);
  box.style.display = "none";
};

const getCookie = (name) => {
  if (document.cookie.length) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];

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

const setCookie = (name, value, exdays, path) => {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();

  document.cookie =
    name + "=" + value + ";" + expires + ";path=" + (path ? path : "/");
};

export default cookieConsent;
