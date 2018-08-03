'use strict';

/* eslint-env browser */

const Zinc = {};

(() => {

  function renderComponent(element, content, data) {
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
          components[component].dataObject);
      }
    }

    Zinc.registerComponent = function(elementName, templateFile, dataObject) {
        if (!Zinc.components) {
          Zinc.components = {};
        }
        Zinc.components[elementName] = {
          elementName,
          templateFile,
          dataObject
        };
    }

    function init() {
      Zinc.registerComponent('user-item', 'user', Zinc.userData);
      console.log(Zinc.components);
      renderComponents(Zinc.components);

      fetch('https://randomuser.me/api/?results=5')
      .then(res => res.json())
      .then(data => {
        data.results.forEach(user => {
          Zinc.registerComponent('user-item', 'user', user);
          renderComponents(Zinc.components);
        })
    })
}
    document.addEventListener('DOMContentLoaded', init);

})();
