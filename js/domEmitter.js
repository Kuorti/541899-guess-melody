const throwDomEl = (domString, noClear = false) => {
  const template = document.createElement(`template`);
  const mainBlock = document.querySelector(`.main`);
  template.innerHTML = domString;
  if (!noClear) {
    mainBlock.innerHTML = ``;
  }
  const element = template.content.cloneNode(true);
  if (mainBlock.querySelector(`.` + element.firstElementChild.classList[1])) {
    mainBlock.querySelector(`.` + element.firstElementChild.classList[1]).remove();
  }
  mainBlock.appendChild(element);
  return mainBlock;
};

export default throwDomEl;
