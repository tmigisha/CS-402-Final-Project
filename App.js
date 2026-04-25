import React, { useState, useEffect } from 'react';
import HomePage from './HomePage';
import GameScreen from './GameScreen';


const App = () => {
  const [numOfSymbols, setNumOfSymbols] = useState(6);
  const [numOfTries, setNumOfTries] = useState(8);
  const [positionEnabled, setPositionEnabled] = useState(false);
  const [noDuplicates, setNoDuplicates] = useState(false);
  const [start, setStart] = useState(false);

  return (
    <>
      {start ? (
        <GameScreen 
          numOfSymbols={numOfSymbols}
          numOfTries={numOfTries}
          setStart={setStart}
          positionEnabled={positionEnabled}
          noDuplicates={noDuplicates}
        />
      ) : (
        <HomePage 
          numOfSymbols={numOfSymbols}
          setNumOfSymbols={setNumOfSymbols}
          numOfTries={numOfTries}
          setNumOfTries={setNumOfTries}
          positionEnabled={positionEnabled}
          setPositionEnabled={setPositionEnabled}
          noDuplicates={noDuplicates}
          setNoDuplicates={setNoDuplicates}
          start={start}
          setStart={setStart}
        />
      )}
    </>
  );
}

export default App;

