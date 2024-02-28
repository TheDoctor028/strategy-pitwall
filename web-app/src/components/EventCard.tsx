import {Button, Card} from "react-bootstrap";
import {IEvent} from "node-strategy-pitwall";

interface IEventCardProps {
    event: IEvent;
}

export function EventCard({ event }: IEventCardProps) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Body className="text-left">
                    <Card.Text>
                        <strong>Series:</strong> {event.series}
                    </Card.Text>
                    <Card.Text>
                        <strong>Track Name:</strong> {event.track.name}
                    </Card.Text>
                    <Card.Text>
                        <strong>Duration:</strong> {event.duration}
                    </Card.Text>
                    <Card.Text>
                        <strong>Session Start:</strong> {event.sessionStart.toString()}
                    </Card.Text>
                    <Card.Text>
                        <strong>Race Start Sim Time:</strong> {event.raceStartSim.toString()}
                    </Card.Text>
                    <Card.Text>
                        <strong>Team Name:</strong> {event.team.name} ({event.team.car.name}, {event.team.car.class})
                    </Card.Text>
                </Card.Body>
                <Button variant="primary">Open</Button>
            </Card.Body>
        </Card>
    );
}