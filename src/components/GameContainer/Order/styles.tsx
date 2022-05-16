import styled from "styled-components";

export const OrderPosition = styled.div`
	position: absolute;
	left: 58%;
	top: 53%;
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
	max-width: 235px;
`;
