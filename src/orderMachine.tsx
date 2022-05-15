import { createMachine, assign } from "xstate";
import { getRandomItems } from "./utils/getItems";

interface Context {
	status: string;
	seconds: number;
	waitingLength: number;
	orderItems: string[];
	successNumber: number;
	failedNumber: number;
	quantity: number;
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
			}),
			on: {
				START: {
					target: "waiting",
				},
			},
		},
		waiting: {
			entry: assign({
				seconds: (context) => 10, // set seconds
				status: (context) => "waiting",
				orderItems: () =>
					// would like to set acording to the quantity but Xstate had a typescript nasty bug
					getRandomItems(3),
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
				SUCCESS: {
					target: "start",
					actions: [
						assign({
							status: (context) => "success",
							orderItems: (context) => [],
							successNumber: (context) => context.successNumber + 1,
						}),
					],
				},
			},
		},
	},
});
