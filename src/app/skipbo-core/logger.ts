let enabled = false;

const enable = () => {
  enabled = true;
};
const info = (...messages) => {
  if (enabled) {
    console.log(...messages);
  }
};

const group = (...messages) => {
  if (enabled) {
    console.group(...messages);
  }
};

const groupCollapsed = (...messages) => {
  if (enabled) {
    console.groupCollapsed(...messages);
  }
};

const groupEnd = (...messages) => {
  if (enabled) {
    console.groupEnd();
  }
};

export const logger = { enable, info, groupCollapsed, group, groupEnd };
