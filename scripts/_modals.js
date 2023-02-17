const trapFocus = (modal) => {
  const childElements = Array.prototype.filter.call(
    modal.childNodes, node => node instanceof Element
  );
  const [preContent, content, postContent] = childElements;
  preContent.addEventListener('focus', () => focusLast(content));
  postContent.addEventListener('focus', () => focusFirst(content));
}

const focusFirst = (element) => {
  const childNodes = element.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    const child = childNodes[i];
    if (focus(child) || focusFirst(child)) {
      return true;
    }
  }
  return false;
};

const focusLast = (element) => {
  const childNodes = element.childNodes;
  for (let i = childNodes.length - 1; i >= 0; i--) {
    const child = childNodes[i];
    if (focus(child) || focusLast(child)) {
      return true;
    }
  }
  return false;
};

const focus = (element) => {
  return element.tabIndex === 0 && (element.focus() || true);
};

export { trapFocus };
