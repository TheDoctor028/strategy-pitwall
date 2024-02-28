import {connect} from "formik";
import {Envoy} from "../../utils/envoy.ts";

export const FormikSubmit = connect<{submitFormEnvoy: Envoy}>(({formik, submitFormEnvoy}) => {
    submitFormEnvoy.on(() => formik.submitForm());
    return <></>
});
