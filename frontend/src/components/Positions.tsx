
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';

type Position = {
    id: number;
    title: string;
    applicationDeadline?: string;
    status?: string;
    // Puedes agregar más campos según tu modelo
};


const Positions: React.FC = () => {
    const navigate = useNavigate();
    const [positions, setPositions] = useState<Position[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                setLoading(true);
                setError('');
                console.log('Fetching positions from backend directly');
                const res = await fetch('http://localhost:8080/positions');
                console.log('Response status:', res.status);
                console.log('Response headers:', res.headers);
                if (!res.ok) throw new Error('Error al cargar posiciones');
                const contentType = res.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await res.json();
                    setPositions(data);
                } else {
                    const text = await res.text();
                    console.error('Respuesta inesperada:', text);
                    throw new Error('Respuesta inesperada del servidor: ' + text);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPositions();
    }, []);

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Posiciones</h2>
            {loading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : error ? (
                <div className="text-danger text-center">{error}</div>
            ) : (
                <Row>
                    {positions.length === 0 ? (
                        <div className="text-center">No hay posiciones registradas.</div>
                    ) : positions.map((position) => (
                        <Col md={4} key={position.id} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title>{position.title}</Card.Title>
                                    <Card.Text>
                                        <strong>Deadline:</strong> {position.applicationDeadline ? new Date(position.applicationDeadline).toLocaleDateString() : 'N/A'}
                                    </Card.Text>
                                    <span className={`badge bg-info text-white`}>
                                        {position.status || 'Sin estado'}
                                    </span>
                                    <div className="d-flex justify-content-between mt-3">
                                        <Button variant="primary" onClick={() => {
                                            console.log('Navigating to kanban for position:', position.id);
                                            navigate(`/positions/${position.id}/kanban`);
                                        }}>Ver proceso</Button>
                                        <Button variant="secondary">Editar</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default Positions;