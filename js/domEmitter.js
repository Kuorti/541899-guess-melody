const throwDomEl = (domString) => {
  const template = document.createElement(`template`);
  const mainBlock = document.querySelector(`.main`);
  template.innerHTML = domString;
  mainBlock.innerHTML = ``;
  mainBlock.appendChild(template.content.cloneNode(true));
  return mainBlock;
};

export default throwDomEl;
