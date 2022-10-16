import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRef, useState } from 'react';
import gruszka from 'assets/mealsPictures/gruszkaSzejk.jpg';

type Meal = {
    name: string;
    ingredients: { name: string; amount: number }[];
    totalGrams: number;
    totalCalories: number;
};

interface MealCardProps {
    meal: Meal;
}

const MealCard = ({ meal }: MealCardProps) => {
    const [precent, setPrecent] = useState(0);
    const [mealDetails, setMealDetails] = useState(meal);
    const kcalRef = useRef<HTMLInputElement | null>(null);

    const handleModifyMeal = () => {
        if (kcalRef.current) {
            if (mealDetails.totalCalories === +kcalRef.current?.value) return;

            const precentDiff = +(
                (+kcalRef.current?.value * 100) /
                meal.totalCalories
            ).toFixed(0);

            setPrecent(precentDiff);

            const modifiedIngredients = [
                ...meal.ingredients.map((ingredient) => {
                    return {
                        name: ingredient.name,
                        amount: (ingredient.amount * precentDiff) / 100,
                    };
                }),
            ];

            setMealDetails((prev) => {
                if (kcalRef.current) {
                    return {
                        ...prev,
                        totalGrams: (meal.totalGrams * precentDiff) / 100,
                        totalCalories: +kcalRef.current.value,
                        ingredients: modifiedIngredients,
                    };
                }
                return { ...prev };
            });
        }
    };

    return (
        <Card style={{ width: '300px', height: '500px' }}>
            <Card.Body>
                <Card.Img
                    className='mb-3'
                    src={gruszka}
                    style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                    }}
                />
                <Card.Header>{mealDetails.name}</Card.Header>
                <Card.Text>
                    {mealDetails.ingredients.map((ingredient, index) => (
                        <span key={index}>
                            {ingredient.name} {ingredient.amount}g <br />
                        </span>
                    ))}
                    {mealDetails.totalGrams}g <br />
                    {mealDetails.totalCalories} kcal
                </Card.Text>
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
                    {precent}
                </Stack>
            </Card.Body>
        </Card>
    );
};

export default MealCard;
