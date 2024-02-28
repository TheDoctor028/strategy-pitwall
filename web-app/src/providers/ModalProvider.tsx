import React, {useCallback, useContext, useState} from "react";
import {WithChildren} from "../models/common.ts";
import {IModalFrameProps, ModalFrame} from "../components/ModalFrame.tsx";

export interface IModalContext {
    props: IModalFrameProps;
    show: boolean;
    showModal: (props: IModalFrameProps) => void;
    closeModal: () => void;
}

const modalContextDefault: IModalContext = {
    props: {} as IModalFrameProps,
    show: false,
    showModal: () => {},
    closeModal: () => {},
};

const ModalContext = React.createContext(modalContextDefault);
ModalContext.displayName = 'ModalContext';

export function ModalProvider({children}: WithChildren) {
    const [show, setShow] = useState(false);
    const [props, setProps] = useState<IModalFrameProps>({} as IModalFrameProps);
    const showModal = useCallback((props: IModalFrameProps) => {
        setProps(props);
        setShow(true);
    }, [setShow, setProps]);
    const closeModal = useCallback(() => {
        setShow(false);
    }, [setShow]);

    return (
        <ModalContext.Provider value={{props, show, showModal, closeModal}}>
            {children}
            <ModalFrame props={props} show={show}/>
        </ModalContext.Provider>
    );
}

export function useModal() {
    return useContext(ModalContext);
}
