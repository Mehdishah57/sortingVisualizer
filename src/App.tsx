import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Bar from './components/Bar';

import "./app.scss";

function App() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [length, setLength] = useState<number>(20);
  const [progress, setProgress] = useState(-100);
  const [algo, setAlgo] = useState("");
  const progressRef = useRef<HTMLDivElement>(null);
  const sort = useRef<any>({});

  const generateRandomNumber = useRef<any>(null);
  generateRandomNumber.current = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const generateRandomArray = useRef<any>(null);
  generateRandomArray.current = () => {
    let tempArr: number[] = [];
    let i = 0;
    while (i < length) {
      tempArr.push(generateRandomNumber.current(20, 200));
      i++;
    }
    setNumbers(tempArr);
  }

  sort.current.quickSort = () => { }

  sort.current.heapSort = () => { }

  sort.current.mergeSort = () => { }

  sort.current.bubbleSort = () => {
    let temp = [...numbers];
    let i = 0;
    let x = temp.length
    while (i < x) {
      if (temp[i] > temp[i + 1]) {
        let holder = temp[i];
        temp[i] = temp[i + 1];
        temp[i + 1] = holder;
        setNumbers(temp)
        setTimeout(sort.current.bubbleSort, 10);
        break;
      }
      if (i === x - 1) {
        i = 0;
        x--;
      } else {
        i++
      }
    }
  }

  useEffect(() => {
    generateRandomArray.current();
  }, [length])

  const handleReduce = () => {
    if (progressRef.current)
      progressRef.current.style.transform =
        `translateX(${progress > -100 ? progress - 10 : progress}%)`;
    setProgress((prevProg: number) => prevProg > -100 ? prevProg - 10 : prevProg)
    if (numbers.length <= 20) return;
    setLength(length - 20)
  }

  const handleIncrease = () => {
    if (progressRef.current)
      progressRef.current.style.transform =
        `translateX(${progress < 0 ? progress + 10 : progress}%)`;
    setProgress((prevProg: number) => prevProg < 0 ? prevProg + 10 : prevProg)
    setLength(length + 20)
  }

  return (
    <div className='app'>
      <Navbar />
      <div className='slider'>
        <button className='genArr' onClick={handleReduce}>Reduce</button>
        <div style={{ width: "100%", overflow: "hidden" }}>
          <div ref={progressRef} className='progress'></div>
        </div>
        <button className='genArr' onClick={handleIncrease}>Increase</button>
      </div>
      <div className='numbers'>
        {numbers.map(num => <div className='number'><Bar num={num} /></div>)}
      </div>
      <div className='actions'>
        <select onChange={e => setAlgo(e.currentTarget.value)}>
          <option value="">Select an algorithm</option>
          <option value="bubbleSort">Bubble Sort</option>
        </select>
        <button className='genArr' onClick={() => sort.current[algo]()}>Begin!</button>
        <button className='genArr' onClick={() => generateRandomArray.current()}>Regenerate Array</button>
      </div>
    </div>
  );
}

export default App;
