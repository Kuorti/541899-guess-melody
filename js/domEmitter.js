const throwDomEl = (domString, noClear = false, deletePrevious = false) => {
  const template = document.createElement(`template`);
  const mainBlock = document.querySelector(`.main`);
  template.innerHTML = domString;
  if (!noClear) {
    mainBlock.innerHTML = ``;
  }
  if (deletePrevious) {
    mainBlock.removeChild(mainBlock.lastElementChild);
  }
  mainBlock.appendChild(template.content.cloneNode(true));
  return mainBlock;
};

export default throwDomEl;
