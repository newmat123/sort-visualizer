import React, { useState, useEffect, useReducer } from "react";

const ARR_LEN = 100;
const MAX_H = 200;
const MIN_H = 20;
const ANIM_SPEED = 25; // ms

function randomVal(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function SortingAlgorithms() {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const [sorting, setSorting] = useState(false);
    const [animationSpeed, setAnimationSpeed] = useState(ANIM_SPEED);
    const [arr, setArr] = useState<(number)[]>([]);

    const newArray = () => {
        setArr([]);
        for (let i = 0; i < ARR_LEN; i++) {
            setArr(arr => [...arr, randomVal(MAX_H, MIN_H)]);
        }
        for (let i = 0; i < arr.length; i++) {
            let bar = document.getElementById(i as unknown as string) as HTMLDivElement | null;
            bar && (bar.style.backgroundColor = '#f97316');
        }
    }
    useEffect(() => {
        setSorting(false);
        newArray();
    }, []);

    const sleep = (milliSeconds: number) => {
        return new Promise((resolve) => setTimeout(resolve, milliSeconds))
    }

    const finishedAnimation = async () => {
        for (let i = 0; i < arr.length; i++) {
            let bar = document.getElementById(i as unknown as string) as HTMLDivElement | null;
            bar && (bar.style.backgroundColor = '#22c55e');
            forceUpdate();
            await sleep(animationSpeed / 2);
        }
        setSorting(false);
    }

    //algorithms--------------------------------------------------------------------

    const mergeSort = async () => {

        const merge = async (array: number[], LeftI: number, mid: number, rightI: number) => {
            let i = LeftI;
            let j = mid + 1;
            let tempArrI = 0;
            let tempArr = [];

            while (i <= mid && j <= rightI) {
                if (array[i] <= array[j]) {
                    tempArr[tempArrI] = array[i];
                    i++;
                } else {
                    tempArr[tempArrI] = array[j];
                    j++;
                }
                tempArrI++;
                setArr([...arr, tempArr.length]);

                //quic fix--------------------------------------------------------------------------------------------------------------
                let ekstraBar = document.getElementById(ARR_LEN as unknown as string) as HTMLDivElement | null;
                ekstraBar && (ekstraBar.style.display = "none");

                let bar1 = document.getElementById(i as unknown as string) as HTMLDivElement | null;
                let bar2 = document.getElementById(j as unknown as string) as HTMLDivElement | null;
                bar1 && (bar1.style.backgroundColor = '#DC143C');
                bar2 && (bar2.style.backgroundColor = '#6A5ACD');

                await sleep(animationSpeed);
                bar1 && (bar1.style.backgroundColor = '#f97316');
                bar2 && (bar2.style.backgroundColor = '#f97316');
            }

            while (i <= mid) {
                tempArr[tempArrI] = array[i];

                setArr([...arr, tempArr.length]);

                let bar1 = document.getElementById(i as unknown as string) as HTMLDivElement | null;
                let bar2 = document.getElementById(j as unknown as string) as HTMLDivElement | null;
                bar1 && (bar1.style.backgroundColor = '#DC143C');
                bar2 && (bar2.style.backgroundColor = '#6A5ACD');

                await sleep(animationSpeed);
                bar1 && (bar1.style.backgroundColor = '#f97316');
                bar2 && (bar2.style.backgroundColor = '#f97316');

                i++;
                tempArrI++;
            }

            while (j <= rightI) {
                tempArr[tempArrI] = array[j]

                setArr([...arr, tempArr.length]);

                let bar1 = document.getElementById(i as unknown as string) as HTMLDivElement | null;
                let bar2 = document.getElementById(j as unknown as string) as HTMLDivElement | null;
                bar1 && (bar1.style.backgroundColor = '#DC143C');
                bar2 && (bar2.style.backgroundColor = '#6A5ACD');

                await sleep(animationSpeed);
                bar1 && (bar1.style.backgroundColor = '#f97316');
                bar2 && (bar2.style.backgroundColor = '#f97316');
                j++;
                tempArrI++;
            }

            for (let i = LeftI; i <= rightI; i++) {
                array[i] = tempArr[i - LeftI];
                setArr([...arr, array.length]);
            }
        }

        const sort = async (array: number[], leftI: number, rightI: number) => {
            if (leftI >= rightI) {
                return;
            }
            let mid = Math.floor((leftI + (rightI)) / 2);
            await sort(array, leftI, mid);
            await sort(array, mid + 1, rightI);
            await merge(array, leftI, mid, rightI);
        }

        setSorting(true);
        await sort(arr, 0, arr.length - 1);

        finishedAnimation();
    }

    const bubbleSort = async () => {
        setSorting(true);
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (arr[j] > arr[j + 1]) {
                    var temp = arr[j];
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp;

                    let bar1 = document.getElementById(j as unknown as string) as HTMLDivElement | null;
                    let bar2 = document.getElementById((j + 1) as unknown as string) as HTMLDivElement | null;
                    bar1 && (bar1.style.backgroundColor = '#DC143C');
                    bar2 && (bar2.style.backgroundColor = '#6A5ACD');

                    await sleep(animationSpeed);

                    bar1 && (bar1.style.backgroundColor = '#f97316');
                    bar2 && (bar2.style.backgroundColor = '#f97316');

                    forceUpdate();
                }
            }
        }
        finishedAnimation();
    }

    const selection = async () => {
        setSorting(true);
        for (let i = 0; i < arr.length; i++) {
            let bar1 = document.getElementById(i as unknown as string) as HTMLDivElement | null;
            bar1 && (bar1.style.backgroundColor = '#DC143C');
            //await sleep(animationSpeed);

            var minIndex = i;
            for (let j = minIndex + 1; j < arr.length; j++) {
                if (arr[minIndex] > arr[j]) {
                    minIndex = j;
                }
            }

            let bar2 = document.getElementById(minIndex as unknown as string) as HTMLDivElement | null;
            bar2 && (bar2.style.backgroundColor = '#6A5ACD');

            await sleep(animationSpeed);

            var temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;

            bar1 && (bar1.style.backgroundColor = '#f97316');
            bar2 && (bar2.style.backgroundColor = '#f97316');
            forceUpdate();
        }
        finishedAnimation();
    }

    return (
        <div className="relative flex flex-col justify-center bg-slate-800 bg-opacity-20 rounded-md shadow-lg">
            <div className="flex flex-col">
                <div className="flex justify-between mt-auto min-w-[300px] sm:min-w-[400px] h-[210px]" >
                    {arr &&
                        arr.map((barHeight, index) => (
                            <div
                                className=" bg-orange-500 w-full p-[1px] sm:p-[2px] xl:p-[3px] rounded-b" //#f97316
                                style={{
                                    height: `${barHeight}px`
                                }}
                                id={"" + index}
                                key={index}
                            ></div>
                        ))}
                </div>
                <div className="flex justify-between m-2 py-0 px-2 2xl:p-2 2xl:mx-10 relative">
                    <button className=" hover:text-slate-300 hover:shadow-md text-xs sm:text-base" onClick={newArray}>
                        New array
                    </button>
                    <button className=" hover:text-slate-300 hover:shadow-md text-xs sm:text-base" onClick={mergeSort}>
                        Merge sort
                    </button>
                    <button className=" hover:text-slate-300 hover:shadow-md text-xs sm:text-base" onClick={bubbleSort}>
                        Bubble sort
                    </button>
                    <button className=" hover:text-slate-300 hover:shadow-md text-xs sm:text-base" onClick={selection}>
                        Selection sort
                    </button>
                    {
                        sorting == true &&
                        <div className="absolute inset-0 w-full h-full bg-red-500 bg-opacity-25 rounded"></div>
                    }
                </div>
            </div>
        </div>

    )
}













// async function mergeSortT(listToSort: number[]) {
//     if (listToSort.length > 1) {
//         const half = Math.ceil(listToSort.length / 2);
//         const leftHalf = listToSort.slice(0, half);
//         const rightHalf = listToSort.slice(half);

//         mergeSortT(leftHalf);
//         mergeSortT(rightHalf);

//         //variabler, som holder styr på hvor lang vi er nået i vores sortering
//         var leftI = 0;
//         var rightI = 0;
//         var tempI = 0;

//         while (leftHalf.length > leftI && rightHalf.length > rightI) {
//             if (leftHalf[leftI] < rightHalf[rightI]) {
//                 listToSort[tempI] = leftHalf[leftI];
//                 leftI++;
//             } else {
//                 listToSort[tempI] = rightHalf[rightI];
//                 rightI++;
//             }
//             tempI++;
//         }
//         while (rightHalf.length > rightI) {
//             listToSort[tempI] = rightHalf[rightI];
//             rightI++;
//             tempI++;
//         }
//         while (leftHalf.length > leftI) {
//             listToSort[tempI] = leftHalf[leftI];
//             leftI++;
//             tempI++;
//         }
//         setArr(listToSort);

//         let bar1 = document.getElementById(""+leftI) as HTMLDivElement|null;
//         let bar2 = document.getElementById(""+rightI) as HTMLDivElement|null;
//         bar1 && (bar1.style.backgroundColor = '#DC143C');
//         bar2 && (bar2.style.backgroundColor = '#6A5ACD');

//         await sleep(animationSpeed);

//         bar1 && (bar1.style.backgroundColor = '#FF7F50');
//         bar2 && (bar2.style.backgroundColor = '#FF7F50');

//         forceUpdate();

//         return listToSort
//     } else {
//         return listToSort;
//     }
// }
