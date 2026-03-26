import React, {useState} from 'react';
import './Counter.scss'

export const Counter: React.ComponentType = () => {

    const [counterValue, setCounterValue] = useState<number>(0);

    const handleClick = () => {
        setCounterValue(counterValue+1);
    }

    return (
        <div>
            <h1>{counterValue}</h1>
           <button onClick={handleClick}>Add</button>
        </div>
    );
};
