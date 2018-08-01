'use strict';

/* eslint-env browser */

//Note!! all parts are in the same file, each section needs to be commented out except what you are running

//part 1c
(() => {
  function populateList(results) {
    console.log(results); // eslint-disable-line no-console

    let userList = document.getElementById("z-user-list");

    for (let i = 0; i < results.length; i++){

      userList.insertAdjacentHTML('beforeend', `
        <li class="user">
          <img class="user-photo" src="${results[i].picture.large}" alt="">
          <div class="user-name">${results[i].name.first.charAt(0).toUpperCase() + results[i].name.first.slice(1)} ${results[i].name.last.charAt(0).toUpperCase() + results[i].name.last.slice(1)}</div>
          <div class="user-location">${results[i].location.city.charAt(0).toUpperCase() + results[i].location.city.slice(1)},  ${results[i].location.state.charAt(0).toUpperCase() + results[i].location.state.slice(1)}</div>
          <div class="user-email">${results[i].email}</div>
          </li>`);
    }
  }

  function init() {
    fetch('https://randomuser.me/api/?results=5')
      .then(res => res.json())
      .then(json => populateList(json.results));
  }

  document.addEventListener('DOMContentLoaded', init);

})();
