import { useEffect } from "react";

const useDetectOutsideClick = (el, isOpen, onClick) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (isOpen && el.current && !el.current.contains(e.target)) {
        onClick();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isOpen]);
};

export default useDetectOutsideClick;
