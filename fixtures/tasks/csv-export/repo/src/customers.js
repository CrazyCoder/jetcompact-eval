import { readFileSync } from 'node:fs';

const data = JSON.parse(readFileSync(new URL('../data/customers.json', import.meta.url), 'utf8'));

export const customers = data.customers;
export const byId = (id) => customers.find((c) => c.id === id);
