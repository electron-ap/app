import ReactDOM from "react-dom";
import { Drawer, Modal } from "antd";

var createLoginLayer = function (fn) {
  var instance;
  return function (DrawerComponent, props) {
    if (!instance) {
      instance = drawerJsx(DrawerComponent, props);
    }
    instance.style.display = "block";
  };
};

const drawerJsx = (DrawerComponent, props) => {
  const container = document.createElement("div");
  container.className = "12";
  document.body.appendChild(container);

  function render() {
    ReactDOM.render(
      <DrawerComponent destroyDialog={destroyDialog} {...props.restsProps} />,
      container
    );
  }

  function destroyDialog() {
    // Allow calling chain to roll up, and then destroy component
    setTimeout(() => {
      container.style.display = "none";
      // ReactDOM.unmountComponentAtNode(container);
      // document.body.removeChild(container);
    }, 10);
  }

  render();
  return container;
};

export default createLoginLayer(drawerJsx);
