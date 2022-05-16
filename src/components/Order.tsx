import { Howl } from "howler";
import { useEffect, useCallback, useState } from "react";
import { OrderPosition, OrderWrapper, Poligon } from "./styles";

type Item = {
	id: number;
	name: string;
	icon: string;
};

type Props = {
	state: any;
	send: (action: string) => void;
	removedItem: { id: number; name: string; icon: string } | null;
	setRemovedItem: (item: any) => void; //set to any because it would complain for Item | null
};

export default function Order({
	state,
	send,
	removedItem,
	setRemovedItem,
}: Props) {
	const { orderItems } = state.context;
	const [order, setOrder] = useState([]);

	useEffect(() => {
		setOrder(orderItems);
	}, [orderItems]);

	useEffect(() => {
		checkItem(removedItem);
		setRemovedItem(null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [removedItem]);

	const playSound = (sound: any) => {
		const audio = new Howl({
			src: [sound],
		});

		audio.play();
	};

	const removeItem = useCallback(
		(itemToRemove: Item) => {
			setOrder((items) => items.filter((item) => item !== itemToRemove));
		},
		[setOrder]
	);

	const checkItem = async (removedItem: any) => {
		if (removedItem) {
			let removedIndex = order.findIndex((item: any) => {
				return item.id === removedItem.id;
			});

			if (removedIndex === -1) {
				await playSound("/assets/shrimp.mp3");
				await send("MISTAKE");
			} else if (removedIndex !== -1) {
				await playSound("/assets/bite.mp3");
				await removeItem(removedItem);
				//while using callback & last item is removed , order.length === 1
				if (order.length === (1 || 0)) {
					await send("SUCCESS");
				}
			}
		}
	};

	return (
		orderItems.length && (
			<OrderPosition className="row">
				<Poligon />
				<OrderWrapper className="row">
					{order?.map((item: any) => {
						return (
							<div
								key={item.id}
								style={{
									width: "40px",
									height: "40px",
									borderRadius: "5%",
									zIndex: 1,
								}}
							>
								{item.icon}
							</div>
						);
					})}
				</OrderWrapper>
			</OrderPosition>
		)
	);
}
