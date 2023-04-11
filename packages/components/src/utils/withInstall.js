export default (componentName) => {
  componentName.install = (app) => {
    // 当组件是 script setup 的形式时，会自动以为文件名注册，会挂载到组件的__name 属性上
    const name = componentName.name || componentName._name;
    // 注册组件
    app.component(name, componentName);
  };

  return componentName;
};
