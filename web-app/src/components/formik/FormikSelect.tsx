import { Form, FormControlProps } from 'react-bootstrap';
import { useField } from 'formik';
import { JSX } from 'react';
import { FormFieldProps } from '../../models/formik.ts';

export type SelectOption = { value: string | number; text: string };

export type FormSelectFieldProps = { options: SelectOption[] } & FormControlProps &
    JSX.IntrinsicElements['select'] &
    FormFieldProps;

export function FormikSelect({ options, label, helpText, ...props }: FormSelectFieldProps) {
    const [{ name, value, onBlur, onChange }, { error }] = useField(props.name);

    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Select
                {...props}
                name={name}
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
                isInvalid={!!error}
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.text}
                    </option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
            <Form.Text>{helpText}</Form.Text>
        </Form.Group>
    );
}
