const throwDomEl = (domString) => {
  const template = document.createElement(`template`);
  template.innerHTML = domString;
  return template;
};

export default throwDomEl;
