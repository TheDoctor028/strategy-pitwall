import {Form, FormControlProps} from "react-bootstrap";
import {FormFieldProps} from "../../models/formik.ts";
import {useField} from "formik";

export type FormSelectFieldProps = {options: Array<{value: string | number, text: string}>} & FormControlProps &
    JSX.IntrinsicElements["select"] & FormFieldProps;


export function FormikSelect({options, label, helpText, ...props}: FormSelectFieldProps) {
    const [
        { name, value, onBlur, onChange },
        { error }
    ] = useField(props.name);

    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Select
                {...props}
                name={name}
                value={value || ""}
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
    )
}