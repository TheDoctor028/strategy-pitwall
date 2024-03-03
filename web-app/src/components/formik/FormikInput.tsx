import { Form, FormControlProps } from 'react-bootstrap';
import { useField } from 'formik';
import { JSX } from 'react';
import { FormFieldProps } from '../../models/formik.ts';

export type FormInputFieldProps = FormControlProps &
    JSX.IntrinsicElements['input'] &
    FormFieldProps;

export function FormikInput({ label, helpText, ...props }: FormInputFieldProps) {
    const [{ name, value, onBlur, onChange }, { error }] = useField(props.name);

    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                {...props}
                name={name}
                value={value?.toString()}
                onChange={onChange}
                onBlur={onBlur}
                isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            <Form.Text>{helpText}</Form.Text>
        </Form.Group>
    );
}
