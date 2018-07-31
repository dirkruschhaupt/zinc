'use strict';

/* eslint-env browser */

(() => {
  function populateList(results) {
    console.log(results); // eslint-disable-line no-console

    let userList = document.getElementById("z-user-list");

    for (let i = 0; i < results.length; i++){

      let user = document.createElement("li");
      user.classList.add("user");
      //photo
      let userPhoto= document.createElement("img");
      userPhoto.classList.add("user-photo");
      userPhoto.setAttribute("src", results[i].picture.large);
      //name
      let userName = document.createElement("div");
      userName.classList.add("user-name");
      userName.innerHTML = `${results[i].name.first.charAt(0).toUpperCase() + results[i].name.first.slice(1)} ${results[i].name.last.charAt(0).toUpperCase() + results[i].name.last.slice(1)}`;
      //location
      let userLocation = document.createElement("div");
      userLocation.classList.add("user-location");
      userLocation.innerHTML = `${results[i].location.city.charAt(0).toUpperCase() + results[i].location.city.slice(1)},  ${results[i].location.state.charAt(0).toUpperCase() + results[i].location.state.slice(1)}`;
      //email
      let userEmail = document.createElement("div");
      userEmail.classList.add("user-email");
      userEmail.innerHTML = `${results[i].email}`;

      user.append(userPhoto, userName, userLocation, userEmail);
      userList.append(user);
    }
  }

  function init() {
    fetch('https://randomuser.me/api/?results=5')
      .then(res => res.json())
      .then(json => populateList(json.results));
  }

  document.addEventListener('DOMContentLoaded', init);

})();


// (() => {
//   function renderTemplate(results) {
//     console.log(results); // eslint-disable-line no-console
//
//     let userList = document.getElementById("z-user-list");
//
//
//         let str = document.getElementById("user-name").innerHTML;
//         let txt = str.replace(/{{name.first}} {{name.last}}/i,"W3Schools");
//         document.getElementById("user-name").innerHTML = txt;
//
//
//     const data = {
//         photo: user.picture.thumbnail,
//         firstName: user.name.first,
//         lastName: user.name.last,
//         city: user.location.city,
//         state: user.location.state,
//         email: user.email
//     };
//   }
//
//   function init() {
//     fetch('https://randomuser.me/api/?results=5')
//       .then(res => res.json())
//       .then(json => renderTemplate(json.results));
//   }
//
//   document.addEventListener('DOMContentLoaded', init);
//
// })();
