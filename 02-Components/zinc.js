'use strict';

/* eslint-env browser */

const Zinc = {};

(() => {

  function hilight() {
    this.firstElementChild.classList.toggle('hilight');
    console.log(this);
  };

  Zinc.registerComponent = function(configObj) {
    if (!Zinc.components) {
      Zinc.components = {};
    }
    Zinc.components[element.configObj] = {
      name: configObj.elementName,
      templateFile: configObj.templateFile,
      data: configObj.data,
      controller: configObj.controller
    }
  }

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
          components[component].name,
          components[component].templateFile,
          components[component].data,
          components[component].controller)
      }
    }

    Zinc.registerComponent = function(configObj) {
        if (!Zinc.components) {
          Zinc.components = {};
        }
        Zinc.components[configObj.name] = {
          name: configObj.name,
          templateFile: configObj.templateFile,
          data: configObj.data,
          controller: configObj.controller
        };
    }

    function init() {
      //removes Jack form the list
      // Zinc.registerComponent('user-item', 'user', Zinc.userData, controller);
      // renderComponents(Zinc.components);

      fetch('https://randomuser.me/api/?results=1')
      .then(res => res.json())
      .then(data => {
        data.results.forEach(user => {

          Zinc.registerComponent({
              name: 'user-item',
              templateFile: 'user',
              data: user,
              controller: hilight
          });

          renderComponents(Zinc.components);
        })
      })
    }
    document.addEventListener('DOMContentLoaded', init);

})();
