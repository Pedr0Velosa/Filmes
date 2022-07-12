import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import '../css/modal.css';

const Modal = ({children}) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal');
    modalRoot.appendChild(elRef.current);

    //Vai ser executada quando o elemente for sair. ComponentDidUnmount
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);

};

export default Modal;



