import * as Formik from "formik";
import * as yup from "yup";
import {FormikInput} from "./formik/FormikInput.tsx";
import {FormikSelect, SelectOption} from "./formik/FormikSelect.tsx";
import {WithChildren} from "../models/common.ts";
import {useGetSelectableTeamsQuery, useGetSelectableTracksQuery} from "../graphql/types/generated-types.ts";

const CREATE_NEW = 'CREATE_NEW';

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

const initialValues: RaceEventForm = {
    name: '',
    series: '',
    duration: 120,
    greenFlagOffset: 30,
    sessionStart: null,
    raceStartSim: null,
    track: CREATE_NEW,
    team: CREATE_NEW,
};

const validationSchema = yup.object({
    name: yup
        .string()
        .required('Name is required'),
    series: yup.string(),
    duration: yup
        .number()
        .min(1)
        .required('Duration is required'),
    greenFlagOffset: yup
        .number()
        .min(0)
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

function withCreateNewOption(name: string, options: SelectOption[]): SelectOption[] {
    return [...options, {value: CREATE_NEW, text: `Create new ${name}...`}]
}

export function RaceEventForm({children, onSubmit }: WithChildren & { onSubmit: (values: RaceEventForm) => void }) {
    const teamsQuery = useGetSelectableTeamsQuery();
    const tracksQuery = useGetSelectableTracksQuery();


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
                    options={withCreateNewOption('track',
                    tracksQuery.data?.tracks.map(
                        t => ({value: t.name, text: t.name}))
                        || [])}
                    name="track"
                    label="Track"
                />
                {
                    // TODO add TrackForm here
                }
                <FormikSelect
                    options={withCreateNewOption('team',
                    teamsQuery.data?.teams.map(
                        t => ({value: t.name, text: t.name}
                        )) || [])}
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
