import { useRef, useState, useEffect } from "react";
import { foodItems } from "../utils/getItems";
import { motion } from "framer-motion";
import { Dropzone, StartButton } from "./styles";
import Order from "./Order";
import BlackHole from "./BlackHole";
import ItemBox from "./ItemBox";

const listVariants = {
	hidden: {
		opacity: 0,
		transition: {
			when: "afterChildren",
			staggerChildren: 0.05,
		},
	},
	visible: {
		opacity: 1,
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.05,
		},
	},
};

// const itemVariants = {
// 	hidden: {
// 		opacity: 0,
// 		scale: 0,
// 		transition: {
// 			ease: "easeIn",
// 		},
// 	},
// 	visible: {
// 		opacity: 1,
// 		scale: 1,
// 		transition: {
// 			mass: 3,
// 		},
// 	},
// };

type Props = {
	state: any;
	send: (action: string) => void;
};

export default function Room({ state, send }: Props) {
	const constraintsRef = useRef(null);
	const [rendered, setRendered] = useState(false);
	const [items, setItems] = useState(foodItems);
	const { orderItems } = state.context;
	const [removedItem, setRemovedItem] = useState(null);
	const [blackHole, setBlackHole] = useState(new DOMRect());
	const { status, failedNumber, successNumber } = state.context;

	useEffect(() => {
		const rearrangeItems = async () => {
			await setRendered(false);
			if (status === "waiting") {
				let other = [...items];
				const randomItems = other.sort((a, b) => 0.5 - Math.random());

				await setItems(randomItems);
				await setRendered(true);
			}
		};
		rearrangeItems();
	}, [status]);

	return (
		<div className="container table-grid col ">
			<div className="row">
				<Dropzone ref={constraintsRef}>
					{!state.matches("waiting") && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="d-flex h-50 justify-content-center align-items-center"
						>
							<StartButton
								onClick={() => {
									send("START");
								}}
							>
								{successNumber || failedNumber !== 0 ? "PLAY AGAIN" : "START"}
							</StartButton>
						</motion.div>
					)}
					<motion.div
						className="content container row"
						initial="hidden"
						animate={rendered ? "visible" : "hidden"}
						variants={listVariants}
						style={{ maxHeight: "400px" }}
					>
						{state.matches("waiting") &&
							items.length &&
							items.map((item) => (
								<div
									key={item.id}
									className="col mb-1"
									id={item.name}
									style={{ zIndex: 999 }}
								>
									<ItemBox
										item={item}
										constraintsRef={constraintsRef}
										blackHole={blackHole}
										setRemovedItem={setRemovedItem}
										status={status}
									/>
								</div>
							))}
						{orderItems.length !== 0 && (
							<Order
								state={state}
								send={send}
								removedItem={removedItem}
								setRemovedItem={setRemovedItem}
							/>
						)}
						<BlackHole setBlackHole={setBlackHole} />
					</motion.div>
				</Dropzone>
			</div>
		</div>
	);
}
