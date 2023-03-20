import { faker } from '@faker-js/faker';
import { CATEGORIES } from '../constants/categories';

const startDate = '2023-01-01T00:00:00.000Z';
const endDate = '2023-03-01T00:00:00.000Z';


export default function getFakeLogs(n) {
    const dates = faker.date.betweens(startDate, endDate, n).sort(
        (a, b) => new Date(a) - new Date(b)
    );
    
    const categoryNames = CATEGORIES.map((category) => category.name);
    
    return dates.map((date, n) => {
        const randomIndex = Math.floor(Math.random() * CATEGORIES.length);
        const category = categoryNames[randomIndex];

        return {
            id: n+1,
            timestamp: date,
            text: faker.lorem.sentence(),
            category: category,
            active: true
        }
    });
}