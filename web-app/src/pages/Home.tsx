import {Button, Col, Container, Row} from "react-bootstrap";
import {IEvent} from "node-strategy-pitwall";
import {EventCard} from "../components/EventCard.tsx";
import {useModal} from "../providers/ModalProvider.tsx";
import {RaceEventForm} from "../components/RaceEventForm.tsx";
import {FormikSubmit} from "../components/formik/FormikSubmit.tsx";
import {Envoy} from "../utils/envoy.ts";

function Home() {
    const cardData: IEvent[] = [
        {
            name: 'Mock Event',
            series: 'Mock Series',
            duration: 120,
            sessionStart: new Date('2022-01-01T10:00:00Z'),
            sessionEnd: new Date('2022-01-01T12:00:00Z'),
            greenFlagOffset: 30,
            raceStart: new Date('2022-01-01T10:30:00Z'),
            raceEnd: new Date('2022-01-01T12:30:00Z'),
            raceStartSim: new Date('2022-01-01T10:30:00Z'),
            raceEndSim: new Date('2022-01-01T12:30:00Z'),
            todOffset: 0,
            track: {
                name: 'Mock Track',
                length: 5000,
            },
            team: {
                name: 'Mock Team',
                drivers: [],
                car: {
                    name: 'Mock Car',
                    // @ts-expect-error - This is a mock object
                    class: "gt3",
                    fuelTankSize: 80,
                },
                targetStintInfos: {},
                avgRating: 0,
                avgDriver: {
                    availability: null,
                    name: 'Mock Driver',
                    rating: 0,
                    stintPreference: 0,
                    stintsInfos: {},
                    utcOffset: 0,
                }
            },
        },
    ];

    const {showModal} = useModal();
    const submitFormEnvoy = new Envoy();

    const openCreateEventModal = () => {
        showModal({
            body: <RaceEventForm><FormikSubmit submitFormEnvoy={submitFormEnvoy} /></RaceEventForm>,
            buttons: [{title: "Add", onClickEvent: "Ok", variant: "success"}],
            onClose(event: string): void {
                console.log(event);
                submitFormEnvoy.call();
            },
            title: "Valami"
        })
    }

    return (
        <Container className="w-100">
            <h1>Events</h1>
            <Container className="d-flex flex-row justify-content-end">
                <Button variant="primary" onClick={openCreateEventModal}>Create Event</Button>
            </Container>
            <Row className="d-flex flex-row my-2">
                {cardData.map((card, index) => (
                    <Col key={index} sm={12} md={6} lg={4}>
                        <EventCard event={card} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Home;
