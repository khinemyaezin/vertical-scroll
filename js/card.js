const card = ({ image, name, type }) => {
  const template = `
       <div class="image__container">
           <img class="image" src="${image}" loading="lazy">
       </div>`;

  return createElement(template);
};

function createElement(template) {
  const element = document.createElement("div");
  element.className = "item";
  element.innerHTML = template;
  return element;
}

export { card };
