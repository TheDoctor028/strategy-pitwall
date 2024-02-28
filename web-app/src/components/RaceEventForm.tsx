import * as Formik from "formik";
import * as yup from "yup";
import {FormikInput} from "./formik/FormikInput.tsx";
import {FormikSelect} from "./formik/FormikSelect.tsx";
import {WithChildren} from "../models/common.ts";

interface RaceEventForm {
    name: string;
    series: string;
    duration: number;
    greenFlagOffset: number;
    sessionStart: Date | null;
    raceStartSim: Date | null;
    track: string;
    team: string;
}

export function RaceEventForm({children, onSubmit }: WithChildren & { onSubmit: (values: RaceEventForm) => void }) {

    const initialValues: RaceEventForm = {
        name: '',
        series: '',
        duration: 0,
        greenFlagOffset: 0,
        sessionStart: null,
        raceStartSim: null,
        track: '',
        team: '',
    };

    const validationSchema = yup.object({
        name: yup
            .string()
            .required('Name is required'),
        series: yup.string(),
        duration: yup
            .number()
            .required('Duration is required'),
        greenFlagOffset: yup
            .number()
            .required('Green flag offset is required'),
        sessionStart: yup
            .date()
            .required('Session start is required'),
        raceStartSim: yup
            .date()
            .required('Race Start is required'),
        track: yup
            .string()
            .required('Track is required'),
        team: yup
            .string()
            .required('Team is required'),
    });

    const formik = {
        validationSchema,
        initialValues,
        onSubmit: onSubmit
    };

    return (
        <Formik.Formik {...formik}>
            <Formik.Form>
                <FormikInput
                    name="name"
                    label="Event Name"
                    type="text"
                    placeholder="Name of the event"
                />
                <FormikInput
                    name="series"
                    label="Series"
                    type="text"
                    placeholder="Name of the series"
                />
                <FormikInput
                    name="duration"
                    label="Duration"
                    type="number"
                    placeholder="Duration of the race in minutes"
                />
                <FormikInput
                    name="greenFlagOffset"
                    label="Green Flag Offset"
                    type="number"
                    placeholder="Green flag offset in minutes"
                    helpText="From session start time to pass until the actual race starts"
                />
                <FormikInput
                    name="sessionStart"
                    label="Session Start"
                    type="datetime-local"
                />
                <FormikInput
                    name="raceStartSim"
                    label="Race Start Sim"
                    type="datetime-local"
                />

                <FormikSelect
                    options={[{value: 0, text: 'Create new Track...'}]}
                    name="track"
                    label="Track"
                />
                {
                    // TODO add TrackForm here
                }
                <FormikSelect
                    options={[{value: 0, text: 'Create new Team...'}]}
                    name="team"
                    label="Team"
                />

                {
                    // TODO add TeamForm here
                }
                {children}
            </Formik.Form>
        </Formik.Formik>
    );
}
