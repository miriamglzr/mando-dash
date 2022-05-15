import { ScoreStyle } from "./styles";
import { useEffect, useState } from "react";

type Props = {
	state: any;
};

export default function Score({ state }: Props) {
	const [secondsFormat, setSecondsFormat] = useState("");
	const { seconds, successNumber, failedNumber } = state.context;

	useEffect(() => {
		const sec = new Date(seconds).toISOString().substring(20, 23);
		setSecondsFormat(sec);
	}, [seconds]);

	return (
		<div className="d-flex justify-content-end w-100">
			<div className="d-flex w-25 flex-column">
				<ScoreStyle> {secondsFormat}</ScoreStyle>
				<ScoreStyle className="d-flex justify-content-end">
					success: {successNumber}
				</ScoreStyle>
				<ScoreStyle>fails: {failedNumber}</ScoreStyle>
			</div>
		</div>
	);
}