import { Howl, Howler } from "howler";
import GameContainer from "./components/GameContainer/GameContainer";
import Score from "./components/Score/Score";
import { useMachine } from "@xstate/react";
import { tableOrderMachine } from "./orderMachine";
import { useEffect } from "react";
import "./App.css";
import "antd/dist/antd.min.css";

function App() {
	const [state, send] = useMachine(tableOrderMachine);
	const { status } = state.context;

	const playSound = (sound: any) => {
		const audio = new Howl({
			src: [sound],
		});

		audio.play();
	};
	Howler.volume(1.0);

	useEffect(() => {
		if (state.matches("waiting")) {
			playSound("/assets/kitchen-bell.mp3");
		}
		if (state.matches("failed")) {
			playSound("/assets/awe.mp3");
		}
		if (status === "success") {
			playSound("/assets/success.mp3");
		}
	}, [status]);

	Howler.volume(1.0);

	return (
		<div className="App">
			<header className="App-header">
				<Score state={state} />
				<GameContainer state={state} send={send} />
			</header>
		</div>
	);
}

export default App;
