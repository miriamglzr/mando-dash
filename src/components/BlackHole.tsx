import { Image } from "antd";
import { motion } from "framer-motion";
import blackHole from "../assets/black-hole.png";
import { useRef, useEffect } from "react";
import { BlackHolePosition } from "./styles";

type Props = {
	setBlackHole: (area: any) => void;
};

export default function BlackHole({ setBlackHole }: Props) {
	const blackHoleRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		//send blackhole area to parent
		const area = blackHoleRef.current?.getBoundingClientRect();
		setBlackHole(area);
	}, []);

	return (
		<div>
			<BlackHolePosition ref={blackHoleRef}>
				<motion.div
					animate={{ rotate: 720 }}
					transition={{ repeat: Infinity, type: "tween", duration: 0.2 }}
				>
					<Image src={blackHole} alt="black hole" preview={false} width={150} />
				</motion.div>
			</BlackHolePosition>
		</div>
	);
}
