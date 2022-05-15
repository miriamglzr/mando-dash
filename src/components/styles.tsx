import { Button } from "antd";
import styled from "styled-components";

export const Dropzone = styled.div`
	position: absolute;
	background-color: rgba(241, 240, 240, 0.3);
	border: dashed 4px transparent;
	border-radius: 4px;
	padding: 10px;
	color: rgb(211, 209, 209);
	transition: background-color 0.3s;
	height: 450px;
	min-width: 594px;
	max-width: 655px;
	margin: 38px;
	left: 5%;
	top: 5%;
	overflow: hidden;
`;

export const OrderPosition = styled.div`
	position: absolute;
	left: 58%;
	top: 53%;
`;

export const BlackHolePosition = styled.div`
	position: absolute;
	left: 38%;
	top: 50%;
`;

export const Poligon = styled.div`
	margin-top: 15px;
	width: 8px;
	height: 15px;
	--path: 50% 0, 100% 100%, 0 100%;
	background: #ffffff;
	transform: rotate(-89.44deg);
	clip-path: polygon(var(--path));
`;

export const OrderWrapper = styled.div`
	margin-left: -5px;
	border-radius: 5px;
	z-index: 1;
	width: fit-content;
	background-color: #ffffff;
`;
export const ScoreStyle = styled.span`
	margin-buttom: 3px;
	margin-right: 10px;
	justify-content: flex-end;
	display: flex;
	font-size: 16px;
`;

export const StartButton = styled(Button)`
	background-color: #ffffff;
	border: 3px solid #ffffff;
	height: fit-content;
	color: #282c34;
	border-radius: 3px;
	font-weight: bold;
	font-size: 16px;
	margin: 10px;
	&:hover {
		background-color: transparent;
		color: #ffffff;
		border-color: #ffffff;
	}
	&:focus {
		background-color: #ffffff;
		color: #282c34;
		border-color: #ffffff;
	}
`;
