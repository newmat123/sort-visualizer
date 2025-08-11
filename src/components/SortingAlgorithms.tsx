import React, { useState, useEffect, useReducer } from "react";

const ARR_LEN = 100;
const MAX_H = 200; //px
const MIN_H = 20;
const ANIM_SPEED = 25; // ms
const DELAY_MIN = 1; // ms
const DELAY_MAX = 250; // ms

function randomVal(max: number, min: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function SortingAlgorithms() {
	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
	const [sorting, setSorting] = useState(false);
	const [animationSpeed, setAnimationSpeed] = useState(ANIM_SPEED);
	const [arr, setArr] = useState<number[]>([]);

	// Handles the delay input
	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		let value = Math.max(
			DELAY_MIN,
			Math.min(DELAY_MAX, Number(event.currentTarget.value))
		);
		setAnimationSpeed(value);
	};

	const newArray = () => {
		setArr([]);
		for (let i = 0; i < ARR_LEN; i++) {
			setArr((arr) => [...arr, randomVal(MAX_H, MIN_H)]);
		}
		for (let i = 0; i < arr.length; i++) {
			let bar = document.getElementById(
				i as unknown as string
			) as HTMLDivElement | null;
			bar && (bar.style.backgroundColor = "#f97316");
		}
	};
	useEffect(() => {
		setSorting(false);
		newArray();
	}, []);

	const sleep = (milliSeconds: number) => {
		return new Promise((resolve) => setTimeout(resolve, milliSeconds));
	};

	const finishedAnimation = async () => {
		for (let i = 0; i < arr.length; i++) {
			let bar = document.getElementById(
				i as unknown as string
			) as HTMLDivElement | null;
			bar && (bar.style.backgroundColor = "#22c55e");
			forceUpdate();
			await sleep(animationSpeed / 2);
		}
		setSorting(false);
	};

	//algorithms--------------------------------------------------------------------

	const mergeSort = async () => {
		const merge = async (
			array: number[],
			LeftI: number,
			mid: number,
			rightI: number
		) => {
			let i = LeftI;
			let j = mid + 1;
			let tempArrI = 0;
			let tempArr: number[] = [];

			while (i <= mid && j <= rightI) {
				if (array[i] <= array[j]) {
					tempArr[tempArrI] = array[i];
					i++;
				} else {
					tempArr[tempArrI] = array[j];
					j++;
				}
				tempArrI++;

				let bar1 = document.getElementById(
					i as unknown as string
				) as HTMLDivElement | null;
				let bar2 = document.getElementById(
					j as unknown as string
				) as HTMLDivElement | null;
				bar1 && (bar1.style.backgroundColor = "#DC143C");
				bar2 && (bar2.style.backgroundColor = "#6A5ACD");

				await sleep(animationSpeed);
				bar1 && (bar1.style.backgroundColor = "#f97316");
				bar2 && (bar2.style.backgroundColor = "#f97316");
			}

			while (i <= mid) {
				tempArr[tempArrI] = array[i];

				let bar1 = document.getElementById(
					i as unknown as string
				) as HTMLDivElement | null;
				let bar2 = document.getElementById(
					j as unknown as string
				) as HTMLDivElement | null;
				bar1 && (bar1.style.backgroundColor = "#DC143C");
				bar2 && (bar2.style.backgroundColor = "#6A5ACD");

				await sleep(animationSpeed);
				bar1 && (bar1.style.backgroundColor = "#f97316");
				bar2 && (bar2.style.backgroundColor = "#f97316");

				i++;
				tempArrI++;
			}

			while (j <= rightI) {
				tempArr[tempArrI] = array[j];

				let bar1 = document.getElementById(
					i as unknown as string
				) as HTMLDivElement | null;
				let bar2 = document.getElementById(
					j as unknown as string
				) as HTMLDivElement | null;
				bar1 && (bar1.style.backgroundColor = "#DC143C");
				bar2 && (bar2.style.backgroundColor = "#6A5ACD");

				await sleep(animationSpeed);
				bar1 && (bar1.style.backgroundColor = "#f97316");
				bar2 && (bar2.style.backgroundColor = "#f97316");
				j++;
				tempArrI++;
			}

			// Updating arr and display
			for (let i = LeftI; i <= rightI; i++) {
				array[i] = tempArr[i - LeftI];
				setArr([...array]);
			}
		};

		const sort = async (array: number[], leftI: number, rightI: number) => {
			if (leftI >= rightI) {
				return;
			}
			let mid = Math.floor((leftI + rightI) / 2);
			await sort(array, leftI, mid);
			await sort(array, mid + 1, rightI);
			await merge(array, leftI, mid, rightI);
		};

		setSorting(true);
		await sort(arr, 0, arr.length - 1);

		finishedAnimation();
	};

	const bubbleSort = async () => {
		setSorting(true);
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr.length; j++) {
				if (arr[j] > arr[j + 1]) {
					var temp = arr[j];
					arr[j] = arr[j + 1];
					arr[j + 1] = temp;

					let bar1 = document.getElementById(
						j as unknown as string
					) as HTMLDivElement | null;
					let bar2 = document.getElementById(
						(j + 1) as unknown as string
					) as HTMLDivElement | null;
					bar1 && (bar1.style.backgroundColor = "#DC143C");
					bar2 && (bar2.style.backgroundColor = "#6A5ACD");

					await sleep(animationSpeed);

					bar1 && (bar1.style.backgroundColor = "#f97316");
					bar2 && (bar2.style.backgroundColor = "#f97316");

					forceUpdate();
				}
			}
		}
		finishedAnimation();
	};

	const selection = async () => {
		setSorting(true);

		for (let i = 0; i < arr.length; i++) {
			let minIndex = i;

			let bar1 = document.getElementById(
				i as unknown as string
			) as HTMLDivElement | null;
			bar1 && (bar1.style.backgroundColor = "#22c55e");
			let bar2 = null;
			let bar3 = null;

			for (let j = minIndex + 1; j < arr.length; j++) {
				bar2 = document.getElementById(
					j as unknown as string
				) as HTMLDivElement | null;
				bar2 && (bar2.style.backgroundColor = "#6A5ACD");

				await sleep(animationSpeed);
				bar2 && (bar2.style.backgroundColor = "#f97316");

				if (arr[minIndex] > arr[j]) {
					bar3 = document.getElementById(
						minIndex as unknown as string
					) as HTMLDivElement | null;
					bar3 && (bar3.style.backgroundColor = "#f97316");

					minIndex = j;
					bar3 = document.getElementById(
						minIndex as unknown as string
					) as HTMLDivElement | null;
					bar3 && (bar3.style.backgroundColor = "#DC143C");

					bar1 && (bar1.style.backgroundColor = "#22c55e"); //#DC143C

					await sleep(animationSpeed);
				}
			}

			var temp = arr[i];
			arr[i] = arr[minIndex];
			arr[minIndex] = temp;

			bar1 && (bar1.style.backgroundColor = "#f97316");
			bar3 && (bar3.style.backgroundColor = "#f97316");
			forceUpdate();
		}
		finishedAnimation();
	};

	return (
		<div className="relative flex flex-col justify-center bg-slate-800 bg-opacity-20 rounded-md shadow-lg">
			<div className="flex flex-col">
				<div className="flex justify-between mt-auto min-w-[300px] sm:min-w-[400px] h-[210px]">
					{arr &&
						arr.map((barHeight, index) => (
							<div
								className=" bg-orange-500 w-full p-[1px] sm:p-[2px] xl:p-[3px] rounded-b" //#f97316
								style={{
									height: `${barHeight}px`,
								}}
								id={"" + index}
								key={index}
							></div>
						))}
				</div>
				<div
					className={`absolute top-1 right-2 pb-5 justify-center text-white ${
						sorting === false ? "opacity-80" : "opacity-30"
					}`}
				>
					<input
						className="border rounded-lg w-12 sm:w-14 p-[2px] bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 text-xs sm:text-base shadow-md"
						onChange={handleChange}
						name="delay"
						id="delay"
						type="number"
						placeholder="5 ms"
						value={animationSpeed}
						disabled={sorting}
					/>
					<span className="-ml-5 text-xs">ms</span>
					<style jsx>{`
						/* Chrome, Safari, Edge, Opera */
						input::-webkit-outer-spin-button,
						input::-webkit-inner-spin-button {
							-webkit-appearance: none;
							margin: 0;
						}

						/* Firefox */
						input[type="number"] {
							-moz-appearance: textfield;
						}
					`}</style>
				</div>
				<div className="flex justify-between m-1 py-0 px-2 2xl:mx-10 relative">
					<button
						className=" hover:text-slate-800 hover:shadow-md text-xs sm:text-base rounded-full p-1"
						onClick={newArray}
					>
						New Array
					</button>
					<button
						className=" hover:text-slate-800 hover:shadow-md text-xs sm:text-base rounded-full p-1"
						onClick={mergeSort}
					>
						Merge Sort
					</button>
					<button
						className=" hover:text-slate-800 hover:shadow-md text-xs sm:text-base rounded-full p-1"
						onClick={bubbleSort}
					>
						Bubble Sort
					</button>
					<button
						className=" hover:text-slate-800 hover:shadow-md text-xs sm:text-base rounded-full p-1"
						onClick={selection}
					>
						Selection Sort
					</button>
					{sorting === true && (
						<div className="absolute inset-0 w-full h-full bg-red-500 bg-opacity-25 rounded-full"></div>
					)}
				</div>
			</div>
		</div>
	);
}
