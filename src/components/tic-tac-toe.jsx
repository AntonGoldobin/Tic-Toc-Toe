import "../App.css";
import React, { useState, useEffect } from "react";
import IconO from "../icons/o.svg";
import IconX from "../icons/x.svg";
import AlertWinIcon from "../icons/message.svg";
import AlertLoseIcon from "../icons/cry.svg";

const player = "player";
const bot = "bot";

const combo = [
	[ 0, 1, 2 ],
	[ 3, 4, 5 ],
	[ 6, 7, 8 ],
	[ 0, 3, 6 ],
	[ 1, 4, 7 ],
	[ 2, 5, 8 ],
	[ 0, 4, 8 ],
	[ 2, 4, 6 ],
];

const TicTacToe = () => {
	const [ winner, setWinner ] = useState(null);
	const [ ticToeItems, setTicToeItems ] = useState([]);

	useEffect(() => {
		resetTicToeState();
	}, []);

	const resetTicToeState = () => {
		let state = [];
		for (let i = 0; i < 9; i++) {
			state.push({
				id: i,
				checked: null,
			});
		}
		setTicToeItems(state);
	};

	const restart = () => {
		resetTicToeState();
		setWinner(null);
	};

	function check(picker) {
		return combo.some((item) => {
			if (
				ticToeItems[item[0]].checked === picker &&
				ticToeItems[item[1]].checked === picker &&
				ticToeItems[item[2]].checked === picker
			) {
				return true;
			} else {
				return false;
			}
		});
	}

	const chooseItem = (index, picker) => {
		if (winner) return;
		let tictoe = [ ...ticToeItems ];
		tictoe[index].checked = picker;
		setTicToeItems(tictoe);
		if (check(picker)) {
			setWinner(picker);
		} else if (picker === player) {
			chooseItemForBot(index);
		}
	};

	// Do not give the bot to win!
	const isTurnWinnable = (index) => {
		let isWinnable = false;

		// Check all combinations with current square
		const combosWithCurrentIndex = combo.filter((comboItem) => comboItem.find((item) => item === index));

		combosWithCurrentIndex.forEach((combo) => {
			// If we will find any dangerous combos, we will choose another one
			if (combo.filter((item) => ticToeItems[item].checked).length === 2) {
				isWinnable = true;
			}
		});
		return isWinnable;
	};

	const chooseItemForBot = () => {
		let comboDublicate = [ ...combo ];

		let worstCombo = {
			id: null,
			filledCount: null,
		};

		comboDublicate.forEach((comboItem) => {
			const filledCombo = comboItem.filter((item) => ticToeItems[item].checked);

			const currentId = comboItem.filter((item) => !ticToeItems[item].checked)[0];

			if (
				worstCombo.filledCount == null ||
				(worstCombo.filledCount > filledCombo.length && !isTurnWinnable(currentId))
			) {
				worstCombo = {
					id: currentId,
					filledCount: filledCombo.length,
				};
			}
		});

		// If we find any worst steps, we will chose them
		if (worstCombo.id) {
			chooseItem(ticToeItems[worstCombo.id].id, bot);
		} else {
			chooseItem(ticToeItems.filter((item) => item.checked == null)[0].id, bot);
		}
	};

	return (
		<div>
			{winner && (
				<div className={`alert ${winner === player ? "yellow" : "red"}`}>
					{winner === player ? <img src={AlertWinIcon} alt="alert" /> : <img src={AlertLoseIcon} alt="alert" />}

					{`YOU ${winner === player ? "WIN!!!" : "LOSE"}`}
					<button className="button" onClick={() => restart()}>
						{" "}
						Play again
					</button>
				</div>
			)}
			<div className="grid">
				{ticToeItems.map((item, i) => {
					return (
						<div
							key={item.id}
							onClick={() => {
								if (!item.checked) {
									chooseItem(i, player);
								}
							}}
							className="grid-item"
						>
							{item.checked === player && <img src={IconO} alt="bot's" />}
							{item.checked === bot && <img src={IconX} alt="player's" />}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TicTacToe;
