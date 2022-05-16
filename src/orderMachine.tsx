import { createMachine, assign } from "xstate";
import { getRandomItems, Item } from "./utils/getItems";

interface Context {
	status: string;
	seconds: number;
	waitingLength: number;
	orderItems: Item[];
	successNumber: number;
	failedNumber: number;
	quantity: number;
	level: number;
	highScore: number;
}

export const tableOrderMachine = createMachine<Context>({
	id: "Table Order",
	initial: "start",
	context: {
		status: "start",
		seconds: 10,
		waitingLength: 180,
		orderItems: [],
		successNumber: 0,
		failedNumber: 0,
		quantity: 3,
		level: 24,
		highScore: 0,
	},
	states: {
		start: {
			on: {
				START: "waiting",
			},
		},
		failed: {
			entry: assign({
				status: (context) => "failed",
				failedNumber: (context) => context.failedNumber + 1,
				orderItems: (context) => [],
				level: (context) => 1,
				quantity: (context) => 3,
				highScore: (context) =>
					context.level > context.highScore ? context.level : context.highScore,
			}),
			on: {
				START: {
					target: "waiting",
				},
			},
		},
		waiting: {
			entry: assign({
				// set seconds
				seconds: (context) => (context.level > 1 ? 10 + context.level : 10),
				status: (context) => "waiting",
				quantity: (context) => 3 + context.level,
				orderItems: (context) => getRandomItems(context.quantity),
			}),
			invoke: {
				id: "tickInterval",
				src: (context, event) => (callback, onReceive) => {
					const id = setInterval(() => callback("TICK"), 1000);
					return () => clearInterval(id);
				},
			},
			on: {
				TICK: [
					{
						cond: (context) => context.seconds === 0,
						target: "failed",
					},
					{
						actions: assign({
							seconds: (context) => context.seconds - 1,
						}),
					},
				],
				MISTAKE: "failed",
				SUCCESS: [
					{
						cond: (context) => context.level === 24,
						target: "winner",
					},
					{
						target: "start",
						actions: [
							assign({
								status: (context) => "success",
								orderItems: (context) => [],
								successNumber: (context) => context.successNumber + 1,
								level: (context) => context.level + 1,
							}),
						],
					},
				],
			},
		},
		winner: {
			entry: assign({
				status: (context) => "winner",
			}),
			on: {
				START: "start",
			},
		},
	},
});
