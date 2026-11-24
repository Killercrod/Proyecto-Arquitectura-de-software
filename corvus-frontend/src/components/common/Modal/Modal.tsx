import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useModalContext } from "../../../context/ModalContext";
import "./Modal.scss";

type ModalProps = {
    children: ReactNode;
};

 const Modal = ({ children }: ModalProps) => {
    const { state, setState } = useModalContext();

    const modalRoot = document.getElementById("modal");

    useEffect(() => {
        if (!state) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setState(false);
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [state, setState]);

    if (!state || !modalRoot) return null;

    return createPortal(
        <div
            className="overlay"
            onClick={() => setState(false)}
        >
            <div
                className="modal"
                onClick={(event) => event.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;
