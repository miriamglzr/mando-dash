export type Item = {
	id: number;
	name: string;
	icon: string;
};

export const foodItems = [
	{ id: 1, name: "burger", icon: "🍔" },
	{ id: 2, name: "soda", icon: "🥤" },
	{ id: 3, name: "fries", icon: "🍟" },
	{ id: 4, name: "hotdog", icon: "🌭" },
	{ id: 5, name: "pizza", icon: "🍕" },
	{ id: 6, name: "sandwich", icon: "🥪" },
	{ id: 7, name: "beer", icon: "🍺" },
	{ id: 8, name: "cake", icon: "🍰" },
	{ id: 9, name: "icecream", icon: "🍦" },
	{ id: 10, name: "taco", icon: "🌮" },
	{ id: 11, name: "salad", icon: "🥗" },
	{ id: 12, name: "soup", icon: "🥣" },
	{ id: 13, name: "chicken", icon: "🍗" },
	{ id: 14, name: "steak", icon: "🥩" },
	{ id: 15, name: "fish", icon: "🐟" },
	{ id: 16, name: "egg", icon: "🥚" },
	{ id: 17, name: "milk", icon: "🥛" },
	{ id: 18, name: "cheese", icon: "🧀" },
	{ id: 19, name: "bread", icon: "🍞" },
	{ id: 20, name: "pasta", icon: "🍝" },
	{ id: 21, name: "rice", icon: "🍚" },
	{ id: 22, name: "chocolate", icon: "🍫" },
	{ id: 23, name: "donut", icon: "🍩" },
	{ id: 24, name: "cookie", icon: "🍪" },
	{ id: 25, name: "pancake", icon: "🥞" },
	{ id: 26, name: "coffee", icon: "☕" },
	{ id: 27, name: "tea", icon: "🍵" },
];

export const getRandomItems = (quantity: number) => {
	const order = [];
	const ids: number[] = [];
	//get different items
	while (ids.length < quantity) {
		const randomNumber = Math.floor(Math.random() * foodItems.length);
		if (!ids.includes(randomNumber)) {
			ids.push(randomNumber);
			order.push(foodItems[randomNumber]);
		}
	}
	return order;
};
