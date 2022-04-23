import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const ModalPortal = ({ children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    const modalRoot = document.getElementById("modal-root");
    return ReactDOM.createPortal(children, modalRoot);
  }

  return null;
};

export default ModalPortal;
