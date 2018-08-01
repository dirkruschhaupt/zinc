'use strict';

/* eslint-env browser */

//part 1
// (() => {
//   function populateList(results) {
//     console.log(results); // eslint-disable-line no-console
//
//     let userList = document.getElementById("z-user-list");
//
//     for (let i = 0; i < results.length; i++){
//
//       let user = document.createElement("li");
//       user.classList.add("user");
//       //photo
//       let userPhoto= document.createElement("img");
//       userPhoto.classList.add("user-photo");
//       userPhoto.setAttribute("src", results[i].picture.large);
//       //name
//       let userName = document.createElement("div");
//       userName.classList.add("user-name");
//       userName.innerHTML = `${results[i].name.first.charAt(0).toUpperCase() + results[i].name.first.slice(1)} ${results[i].name.last.charAt(0).toUpperCase() + results[i].name.last.slice(1)}`;
//       //location
//       let userLocation = document.createElement("div");
//       userLocation.classList.add("user-location");
//       userLocation.innerHTML = `${results[i].location.city.charAt(0).toUpperCase() + results[i].location.city.slice(1)},  ${results[i].location.state.charAt(0).toUpperCase() + results[i].location.state.slice(1)}`;
//       //email
//       let userEmail = document.createElement("div");
//       userEmail.classList.add("user-email");
//       userEmail.innerHTML = `${results[i].email}`;
//
//       user.append(userPhoto);
//       user.append(userName);
//       user.append(userLocation);
//       user.append(userEmail);
//       userList.append(user);
//     }
//   }
//
//   function init() {
//     fetch('https://randomuser.me/api/?results=5')
//       .then(res => res.json())
//       .then(json => populateList(json.results));
//   }
//
//   document.addEventListener('DOMContentLoaded', init);
//
// })();

//part 2
(() => {
  function renderTemplate(userTemplate, data) {
    let userList = document.getElementById("z-user-list");

    let string = /{{\s*([A-Za-z0-9-]+)\s*}}/gm;

    let dataMap = data.map(user => {
      const userData = {
        photo: user.picture.thumbnail,
        firstName: user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1),
        lastName: user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1),
        city: user.location.city.charAt(0).toUpperCase() + user.location.city.slice(1),
        state: user.location.state.charAt(0).toUpperCase() + user.location.state.slice(1),
        email: user.email
      };
      return userData;
    })

    dataMap.forEach(user => {
      let userString = userTemplate.replace(string, (match, captured) => {
        return user[captured];
      })
      userList.insertAdjacentHTML('afterend', userString);
    })
  }

  function init() {
    fetch('https://randomuser.me/api/?results=5')
      .then(res => res.json())
      .then(json => {

        let userTemplate =
          `<li class="user">
            <img class="user-photo" src="{{ photo }}" alt="Photo of {{ firstName }} {{ lastName }}">
            <div class="user-name">{{ firstName }} {{ lastName }}</div>
            <div class="user-location">{{ city }}, {{ state }}</div>
            <div class="user-email">{{ email }}</div>
          </li>`;

        renderTemplate(userTemplate, json.results);
      })
    }
    document.addEventListener('DOMContentLoaded', init);
})();
