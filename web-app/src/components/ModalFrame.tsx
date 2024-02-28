import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from "react";
import {ButtonVariant} from "react-bootstrap/types";
import {useModal} from "../providers/ModalProvider.tsx";

export interface IModalButton {
    title: string;
    onClickEvent: string;
    variant: ButtonVariant;
}

export interface IModalFrameProps {
    title: string;
    onClose: (event: string) => void;
    body: React.ReactNode;
    buttons: IModalButton[];
}

export function ModalFrame({ props, show }: {props: IModalFrameProps, show: boolean}) {
    const {closeModal} = useModal();

    const handleOnClose = (event: string) => () => {
        props.onClose(event);
        closeModal();
    }

    return (
        <Modal show={show} onHide={handleOnClose("default")}>
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
