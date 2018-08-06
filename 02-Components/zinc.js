'use strict';

/* eslint-env browser */

const Zinc = {};

(() => {

  function hilite() {
    this.firstElementChild.classList.toggle('hilight');
    console.log(hilight);
  };

  function renderComponent(element, content, data, controller) {
    let regex = /{{\s*([\w.]+)\s*}}/g;
    let elements = Array.from(document.getElementsByTagName(element));

    fetch(`${content}.html`)
      .then(content => content.text())
      .then((content) => {
        elements.forEach(element => {
          let HTML = content.replace(regex, (match, templateValue) => {
            let templateValueArr = templateValue.split('.');
            return templateValueArr.reduce((acc, curr) => acc[curr], data)
          })
          element.addEventListener('click', controller);
          element.insertAdjacentHTML('beforeend', HTML);
        })
      })
    }

    // passing components = Zinc.components
    function renderComponents(components) {
      // looping through the keys and values of components object
      for(let component in components) {
        //passing content in object to function to render components (put content in html)
        renderComponent(
          components[component].elementName,
          components[component].templateFile,
          components[component].dataObject,
          components[component].controller)
      }
    }

    Zinc.registerComponent = function(elementName, templateFile, dataObject, controller) {
        if (!Zinc.components) {
          Zinc.components = {};
        }
        Zinc.components[elementName] = {
          elementName,
          templateFile,
          dataObject,
          controller
        }
    }

    function init() {
      //removes Jack form the list
      // Zinc.registerComponent('user-item', 'user', Zinc.userData, controller);
      // renderComponents(Zinc.components);

      fetch('https://randomuser.me/api/?results=1')
      .then(res => res.json())
      .then(data => {
        data.results.forEach(user => {
          Zinc.registerComponent('user-item', 'user', user, hilite);
          renderComponents(Zinc.components);
        })
      })
    }
    document.addEventListener('DOMContentLoaded', init);

})();
