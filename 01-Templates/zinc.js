'use strict';

/* eslint-env browser */

//part 4
(() => {
  function renderTemplate(template, users) {
    fetch(`${template}.html`)
    .then(template => template.text())
    .then((template) => {
      let matchString = /{{\s*([\w.]+)\s*}}/g;

      users.forEach((user) => {
        let renderTemplate = template.replace(matchString, (match, matches) => {
          let arr = matches.split('.');
          return arr.reduce((acc, curr) => acc[curr], user);
        });
        document.getElementById("z-user-list").insertAdjacentHTML('beforeend', renderTemplate);
      });
    });
  };

  function init() {
    fetch('https://randomuser.me/api/?results=5')
      .then(res => res.json())
      .then(data => renderTemplate('user', data.results));
    }
    document.addEventListener('DOMContentLoaded', init);
})();
