import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css"
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([])

    const {
        isLoading,
        error,
        sendRequest: fetchMeals
    } = useHttp()

    useEffect(() => {
        const requestConfig = {
            url: 'https://react-http-34d7e-default-rtdb.asia-southeast1.firebasedatabase.app/Meals.json'
        }

        const transformData = (data) => {
            console.log(data)
            const transformedMeals = []

            for (const meal in data) {
                const {name, description, price} = data[meal]
                transformedMeals.push({id: meal, name, description, price})
            }

            setMeals(transformedMeals)
        }

        fetchMeals(requestConfig, transformData)
    }, [fetchMeals])

    if (isLoading) {
        return (
            <section className={classes.loading}>
                <p>LOADING...</p>
            </section>
        )
    }

    if (error) {
        return <section className={classes.error}>
                <p>Something went wrong</p>
            </section>
    }

    const mealsList = meals.map(meal => {
        return <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}/>
    })


    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
}

export default AvailableMeals