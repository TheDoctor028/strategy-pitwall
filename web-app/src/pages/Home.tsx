import { Button, Col, Container, Row } from 'react-bootstrap';
import { EventCard } from '../components/EventCard.tsx';
import { useModal } from '../providers/ModalProvider.tsx';
import { RaceEventForm } from '../components/RaceEventForm.tsx';
import { FormikSubmit } from '../components/formik/FormikSubmit.tsx';
import { Envoy } from '../utils/envoy.ts';
import { ModalCloseEvent } from '../models/modal.ts';
import { useGetEventsQuery } from '../graphql/types/generated-types.ts';

function Home() {
    const { data } = useGetEventsQuery();
    const { showModal, closeModal } = useModal();
    const submitFormEnvoy = new Envoy();

    const openCreateEventModal = () => {
        showModal({
            body: (
                <RaceEventForm
                    onSubmit={() => {
                        closeModal();
                    }}
                >
                    <FormikSubmit submitFormEnvoy={submitFormEnvoy} />
                </RaceEventForm>
            ),
            buttons: [{ title: 'Add', onClickEvent: ModalCloseEvent.Ok, variant: 'success' }],
            onClose(event) {
                switch (event) {
                    case ModalCloseEvent.Ok:
                        submitFormEnvoy.call();
                        return false;
                    default:
                        return true;
                }
            },
            title: 'Create New Event',
        });
    };

    return (
        <Container className="w-100">
            <h1>Events</h1>
            <Container className="d-flex flex-row justify-content-end">
                <Button variant="primary" onClick={openCreateEventModal}>
                    Create Event
                </Button>
            </Container>
            <Row className="d-flex flex-row my-2">
                {data?.events.map((event, index) => (
                    <Col key={index} sm={12} md={6} lg={4}>
                        <EventCard key={`event-card-${index}`} event={event} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Home;
