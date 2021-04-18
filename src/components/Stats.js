import { useState } from 'react';

import { CHARACTERS } from '../constants';


export default function Stats(props) {
  const [visible, setVisible] = useState(false);

  let playerCounts = {};
  for (const c in CHARACTERS) {
    playerCounts[CHARACTERS[c]] = 0;
  }

  for (let i = 0; i < props.state.history.length; i++) {
    for (const c in props.state.history[i].characters) {
      playerCounts[props.state.history[i].characters[c]]++;
    }
  }

  function onClickStatsToggle(e) {
    setVisible(!visible);
  }

  return (
    <div className="stats">
      <div className="stats-title">
        <h3 className="stats-title-text">Stats</h3>
        <button
          className="stats-title-toggle"
          onClick={onClickStatsToggle}
        >
          Toggle Stats
        </button>
      </div>
      {visible &&
        <ul>
          {Object.keys(playerCounts).map((c, i) => {
            return (
              <li key={i}>{c}: {playerCounts[c]}</li>
            )
          })}
        </ul>
      }
    </div>
  );
}
