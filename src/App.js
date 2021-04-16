import { useEffect, useState } from 'react';

import './App.scss';


const CHARACTERS = [
  'Bangalore',
  'Bloodhound',
  'Caustic',
  'Crypto',
  'Fuse',
  'Gibraltar',
  'Horizon',
  'Lifeline',
  'Loba',
  'Mirage',
  'Octane',
  'Pathfinder',
  'Rampart',
  'Revenant',
  'Wattson',
  'Wraith',
];


function getCharacters(count) {
  let characters = [];
  let pool = [...CHARACTERS];

  if (count > pool.length) count = pool.length;

  for (let i = 0; i < count; i++) {
    const rand = Math.floor(Math.random() * pool.length);
    characters.push(pool.splice(rand, 1));
  }

  return characters;
}


function PlayerInput(props) {
  function handleChange(e) {
    props.handleChange(e.target.value);
  }

  function handleFocus(e) {
    e.target.select();
  }

  return (
    <input
      onChange={handleChange}
      onFocus={handleFocus}
      type="text"
      value={props.value}
    />
  );
}


function ClearHistoryButton(props) {
  return (
    <button onClick={props.handleClick}>
      Clear History
    </button>
  );
}


function RandomButton(props) {
  return (
    <button onClick={props.handleClick}>
      Randomize
    </button>
  );
}

function ResetPlayersButton(props) {
  return (
    <button onClick={props.handleClick}>
      Reset Players
    </button>
  );
}


/**
 * TODO: Safer local storage get/set.
 * TODO: Dynamic player count (1-3?)
 */
function App(props) {
  const playerCount = 3;

  const p1Default = 'Player1';
  const p2Default = 'Player2';
  const p3Default = 'Player3';

  const [p1, setP1] = useState(localStorage.getItem('p1') || p1Default);
  const [p2, setP2] = useState(localStorage.getItem('p2') || p2Default);
  const [p3, setP3] = useState(localStorage.getItem('p3') || p3Default);

  const [
    characters,
    setCharacters
  ]= useState(getCharacters(playerCount));

  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem('history')) || []
  );

  function randomizeCharacters() {
    const newCharacters = getCharacters(playerCount);
    setCharacters(newCharacters);
    setHistory([newCharacters, ...history]);
  }

  function clearHistory() {
    setHistory([characters]);
  }

  function resetPlayers() {
    setP1(p1Default);
    setP2(p2Default);
    setP3(p3Default);
  }

  // Run once! (hack; replace)
  useEffect(() => {
    setHistory([characters, ...history]);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
    localStorage.setItem('p1', p1);
    localStorage.setItem('p2', p2);
    localStorage.setItem('p3', p3);
  }, [history, p1, p2, p3]);

  return (
    <div className="App">
      <ResetPlayersButton handleClick={resetPlayers} />
      <h1>
        <PlayerInput handleChange={setP1} value={p1} />
        <span> : {characters[0]}</span>
      </h1>
      <h1>
        <PlayerInput handleChange={setP2} value={p2} />
        <span> : {characters[1]}</span>
      </h1>
      <h1>
        <PlayerInput handleChange={setP3} value={p3} />
        <span> : {characters[2]}</span>
      </h1>

      <RandomButton handleClick={randomizeCharacters} />

      <h3>History</h3>
      <ClearHistoryButton handleClick={clearHistory} />
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>{p1}</th>
            <th>{p2}</th>
            <th>{p3}</th>
          </tr>
        </thead>
        <tbody>
          {history.map((characters, index) => {
            return (
              <tr key={index}>
                <td>{history.length - index}</td>
                <td>{characters[0]}</td>
                <td>{characters[1]}</td>
                <td>{characters[2]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


export default App;
