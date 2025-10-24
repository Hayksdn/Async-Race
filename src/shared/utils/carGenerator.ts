import type { NewCar } from '../types/car';

const carBrands = [
  'Tesla',
  'Ford',
  'Chevy',
  'BMW',
  'Audi',
  'Honda',
  'Toyota',
  'Nissan',
  'Mazda',
  'Kia',
];
const carModels = [
  'Model S',
  'Mustang',
  'Camaro',
  'X5',
  'A4',
  'Civic',
  'Corolla',
  'Altima',
  'MX-5',
  'Sportage',
];

export function getRandomCar(): NewCar {
  const brand = carBrands[Math.floor(Math.random() * carBrands.length)];
  const model = carModels[Math.floor(Math.random() * carModels.length)];
  const name = `${brand} ${model}`;
  const color =
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
  return { name, color };
}

export function generateRandomCars(count: number = 100): NewCar[] {
  const cars: NewCar[] = [];
  for (let i = 0; i < count; i++) {
    cars.push(getRandomCar());
  }
  return cars;
}
