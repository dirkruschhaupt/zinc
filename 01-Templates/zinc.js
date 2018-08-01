'use strict';

/* eslint-env browser */

//Note!! all parts are in the same file, each section needs to be commented out except what you are running

//part 3
(() => {
  function renderTemplate(userTemplate, data) {
    let userList = document.getElementById('z-user-list');
    let regex = /{{\s*([\w.]+)\s*}}/gm;

    data.forEach(user =>
      userList.insertAdjacentHTML('beforeend', userTemplate.replace(regex, (match, captured) =>
        captured.split('.').reduce((acc, curr) =>
          acc[curr], user)))
    );
  }

  function init() {
    fetch('https://randomuser.me/api/?results=5')
      .then(res => res.json())
      .then(json => {

      let userTemplate = `
        <li class="user">
          <img class="user-photo" src="{{ picture.thumbnail }}" alt="Photo of {{ name.first }} {{ name.last }}">
          <div class="user-name">{{ name.first }} {{ name.last }}</div>
          <div class="user-location">{{ location.city }}, {{ location.state }}</div>
          <div class="user-email">{{ email }}</div>
        </li>`;

        renderTemplate(userTemplate, json.results);
      })
  }
  document.addEventListener('DOMContentLoaded', init);
})();
