import { ScoreStyle } from "./styles";
import { useEffect, useState } from "react";
import Instructions from "../Instructions/Instructions";

type Props = {
	state: any;
};

export default function Score({ state }: Props) {
	const [secondsFormat, setSecondsFormat] = useState("");
	const { seconds, successNumber, failedNumber, level, highScore } =
		state.context;

	useEffect(() => {
		const sec = new Date(seconds).toISOString().substring(20, 23);
		setSecondsFormat(sec);
	}, [seconds]);

	return (
		<div className="d-flex justify-content-end w-100">
			<div className="d-flex w-25 flex-column">
				<ScoreStyle style={{ fontSize: "24px", fontWeight: 700 }}>
					{secondsFormat}
				</ScoreStyle>
				<ScoreStyle className="d-flex justify-content-end">
					Level: {level}
				</ScoreStyle>
				<ScoreStyle className="d-flex justify-content-end">
					Highest Score: {highScore}
				</ScoreStyle>
				<ScoreStyle className="d-flex justify-content-end">
					success: {successNumber}
				</ScoreStyle>
				<ScoreStyle>fails: {failedNumber}</ScoreStyle>
				<Instructions />
			</div>
		</div>
	);
}
