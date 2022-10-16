import meals from './meals/meals.json';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { useRef } from 'react';
import MealCard from './components/MealCard/MealCard';

function App() {
    const kcalRef = useRef<HTMLInputElement | null>(null);

    return (
        <div className='App'>
            <Container fluid='md'>
                <Row>
                    <Col>
                        <Stack direction='horizontal' gap={3}>
                            {meals.map((meal, index) => (
                                <MealCard meal={meal} key={index} />
                            ))}
                        </Stack>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
