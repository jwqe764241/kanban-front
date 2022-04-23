import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const ContextMenuPortal = ({ id, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    const contextRoot = document.getElementById(id);
    return ReactDOM.createPortal(children, contextRoot);
  }

  return null;
};

export default ContextMenuPortal;
