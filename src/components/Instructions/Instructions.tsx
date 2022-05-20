import { useState } from "react";
import { Modal } from "antd";
import { StartButton } from "../GameContainer/styles";

export default function Instructions() {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	return (
		<div>
			<div className="d-flex justify-content-end">
				<StartButton type="primary" onClick={showModal}>
					Instructions
				</StartButton>
			</div>
			<Modal
				visible={isModalVisible}
				onOk={handleOk}
				cancelButtonProps={{ ghost: true, disabled: true }}
			>
				<h1>Instructions</h1>

				<ul>
					<li>Press start to begin.</li>
					<li>
						Look at the order next to the black hole and find the Items inside
						the group above.
					</li>
					<li>Drag and Drop the correct items inside the black hole.</li>
					<li>Finish the order before the countdown turns to 000!</li>
				</ul>

				<div>Remember, don't make a mistake or you wil loose. 😱</div>
				<br />
				<h5>Enjoy! 🙂</h5>
			</Modal>
		</div>
	);
}
