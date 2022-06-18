import { v4 as uuid } from "uuid";
const NOTES = [
	{
		id: uuid(),
		title: "Buy Groceries",
		body: "Milk, Bread, Apple, Olive oil, Fish, Yogurt",
		createdDate: 1654901504510,
		lastModified: 1654901504510,
	},
	{
		id: uuid(),
		title: "Clean Home",
		body: "Monday - Fridge, Tuesday - Basins/Sinks, Wednesday - Bedsheets",
		createdDate: 1654901528228,
		lastModified: 1654901528228,
	},
	{
		id: uuid(),
		title: "Read books",
		body: "1. You matter, 2. Rich Dad and Poor Dad",
		createdDate: 1654901551005,
		lastModified: 1654935583468,
	},
];

export default NOTES;
