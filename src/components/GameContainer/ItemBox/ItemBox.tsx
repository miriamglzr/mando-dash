import { useState } from "react";
import { motion } from "framer-motion";

const itemVariants = {
	hidden: {
		opacity: 0,
		scale: 0,
		transition: {
			ease: "easeIn",
		},
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			mass: 3,
		},
	},
};

type ItemBoxProps = {
	item: { id: number; name: string; icon: string };
	constraintsRef: any; //reference to the dropzone
	blackHole: DOMRect;
	setRemovedItem: (item: any) => void;
	status: string;
};

export default function ItemBox({
	item,
	constraintsRef,
	blackHole,
	setRemovedItem,
	status,
}: ItemBoxProps) {
	const [eaten, setEaten] = useState(false);

	return (
		<motion.div
			drag={status === "waiting"}
			animate={eaten ? "hidden" : "visible"}
			dragConstraints={constraintsRef}
			variants={itemVariants}
			whileTap={{ backgroundColor: "rgba(247, 210, 82, 0.7)" }}
			dragTransition={{
				power: 0,
				bounceDamping: 5,
			}}
			style={{
				width: "40px",
				height: "40px",
				backgroundColor: "#E6DDCA",
				borderRadius: "5%",
				zIndex: 1,
			}}
			onDragEnd={(event, info) => {
				// blackhole area
				if (
					info.point.y > blackHole.y + 20 &&
					info.point.y < blackHole.y + 150 &&
					info.point.x > blackHole.left &&
					info.point.x < blackHole.left + 150
				) {
					setEaten(true);
					setRemovedItem(item);
				}
			}}
		>
			<div>{item.icon}</div>
		</motion.div>
	);
}
