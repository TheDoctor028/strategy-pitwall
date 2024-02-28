import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import {ButtonVariant} from "react-bootstrap/types";
import {useModal} from "../providers/ModalProvider.tsx";
import {ModalCloseEvent} from "../models/modal.ts";

export interface IModalButton {
    title: string;
    onClickEvent: string;
    variant: ButtonVariant;
}

export interface IModalFrameProps {
    title: string;
    /**
     * Function to call when the modal is closed.
     * If the function returns false, the modal will not close.
     * @param event - The event that caused the modal to close.
     */
    onClose: (event: string | ModalCloseEvent) => boolean;
    body: React.ReactNode;
    buttons: IModalButton[];
}

export function ModalFrame({ props, show }: {props: IModalFrameProps, show: boolean}) {
    const {closeModal} = useModal();

    const handleOnClose = (event: string) => () => {
        if(props.onClose(event)) closeModal();
    }

    return (
        <Modal show={show} onHide={handleOnClose(ModalCloseEvent.Default)}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.body}
            </Modal.Body>
            <Modal.Footer>
                {props.buttons?.map((button, index) => (
                    <Button key={index} variant={button.variant} onClick={handleOnClose(button.onClickEvent)}>
                        {button.title}
                    </Button>)
                )}
            </Modal.Footer>
        </Modal>
    );
}
