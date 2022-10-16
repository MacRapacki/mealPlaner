import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRef, useState } from 'react';
import gruszka from 'assets/mealsPictures/gruszkaSzejk.jpg';
import Dropdown from 'react-bootstrap/Dropdown';
import { Meal } from 'meals/types';

interface MealCardProps {
    meal: Meal;
}

const MealCard = ({ meal }: MealCardProps) => {
    const [mealDetails, setMealDetails] = useState(meal);
    const kcalRef = useRef<HTMLInputElement | null>(null);

    const handleModifyMeal = () => {
        if (kcalRef.current) {
            if (mealDetails.totalCalories === +kcalRef.current?.value) return;

            const precentDiff = +(
                (+kcalRef.current?.value * 100) /
                meal.totalCalories
            ).toFixed(0);

            const modifiedIngredients = [
                ...meal.ingredients.map((ingredient) => {
                    return {
                        name: ingredient.name,
                        amount: (ingredient.amount * precentDiff) / 100,
                        description: ingredient.description,
                    };
                }),
            ];

            setMealDetails((prev) => {
                if (kcalRef.current) {
                    return {
                        ...prev,
                        totalCalories: +kcalRef.current.value,
                        ingredients: modifiedIngredients,
                    };
                }
                return { ...prev };
            });
        }
    };

    return (
        <Card style={{ width: '300px' }}>
            <Card.Body>
                <Card.Img
                    className='mb-4'
                    src={gruszka}
                    style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                    }}
                />
                <Card.Header className='mb-3'>{mealDetails.name}</Card.Header>
                <Card.Text>
                    {mealDetails.ingredients.map((ingredient, index) => (
                        <span key={index}>
                            {ingredient.name} {ingredient.amount}g <br />
                        </span>
                    ))}
                    {mealDetails.totalCalories} kcal
                </Card.Text>
                <Dropdown>
                    <Dropdown.Toggle variant='success' id='dropdown-basic'>
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                        <Dropdown.Item href='#/action-2'>
                            Another action
                        </Dropdown.Item>
                        <Dropdown.Item href='#/action-3'>
                            Something else
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Stack direction='horizontal' gap={5}>
                    <Form.Control
                        placeholder='kcal'
                        type='number'
                        ref={kcalRef}
                    />
                    <Button
                        variant='primary'
                        onClick={() => handleModifyMeal()}
                    >
                        Licz
                    </Button>
                </Stack>
                <Button variant='primary'>Dodaj</Button>
            </Card.Body>
        </Card>
    );
};

export default MealCard;
