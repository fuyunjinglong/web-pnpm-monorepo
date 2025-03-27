export const componentsInstall = (components) => {
  components.install = (app) => {
    app.component(components.name, components);
  };

  return components;
};
