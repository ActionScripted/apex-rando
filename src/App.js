import { useReducer, useEffect } from 'react';

import {
  PLAYERS_MAX,
  PLAYERS_MIN,
  NAME_MAX,
} from './constants';

import {
  getCharacters,
  getDefaultPlayers,
} from './utils';

import './App.scss';


function PlayerList(props) {
  return (
    <div className="players-list">
      {props.children}
    </div>
  )
}

function Player(props) {
  function onFocus(e) {
    e.target.select();
    if ('onFocus' in props) props.onFocus(e);
  }

  if (!props.isVisible) return null;

  return (
    <div className="players-list-item">
      {props.showName &&
        <span className="players-list-item-name">
          <input
            maxLength={NAME_MAX}
            onChange={props.onChange}
            onFocus={onFocus}
            type="text"
            value={props.value}
          />
        </span>
      }
      <span className="players-list-item-character">
        {props.character}
      </span>
    </div>
  );
}


function HistoryPlayer(props) {
  return (
    <div className="history-player">
      <span className="history-player-name">
        {props.player}
      </span>
      <span className="history-player-character">
        {props.character}
      </span>
    </div>
  )
}


/**
 * TODO: indicate "current" or hide "current"
 */
function HistoryItem(props) {
  const displayCount = Array.from(Array(props.state.count).keys());
  return (
    <div className="history-item">
      {displayCount.map((i) => {
        return (
          <HistoryPlayer
            character={props.state.characters[i]}
            player={props.state.players[i]}
          />
        );
      })}
    </div>
  )
}


const initialState = {
  characters: getCharacters(PLAYERS_MAX),
  count: PLAYERS_MAX,
  history: [],
  players: getDefaultPlayers(PLAYERS_MAX),
};


function init(initialState) {
  const storageState = JSON.parse(localStorage.getItem('state'));
  const initState = storageState || initialState;
  return {...initState, history: [initState]};
}


function reducer(state, action) {
  let characters = [...state.characters];
  let history = [...state.history];
  let players = [...state.players];

  switch (action.type) {
    case 'clearHistory':
      return {...state, history: [state]};

    case 'count':
      const count = parseInt(action.payload);
      history[history.length - 1].count = count;
      return {...state, history, count}

    case 'player':
      players[action.id] = action.payload;
      history[history.length - 1].players = players;
      return {...state, history, players}

    case 'rando':
      const randoState = {...state,
        characters: getCharacters(PLAYERS_MAX)
      };
      return {...randoState,
        history: [...randoState.history, {...randoState, history: []}],
      };

    case 'reset':
      const resetState = {...initialState, characters};
      return {...resetState, history: [{...resetState}] }

    default:
      throw new Error();
  }
}


function App(props) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state));
  });

  function onChangePlayerCount(e) {
    dispatch({
      payload: e.target.value,
      type: 'count',
    });
  }

  function onChangePlayerName(e, i) {
    dispatch({
      id: i,
      payload: e.target.value,
      type: 'player'
    });
  }

  function onClickRandom(e) { dispatch({type: 'rando'}); }
  function onClickReset(e) { dispatch({type: 'reset'}); }

  return (
    <div className="App">

      <p>
        <label htmlFor="idPlayerCount">Players:</label>
        <input
          id="idPlayerCount"
          max={PLAYERS_MAX}
          min={PLAYERS_MIN}
          onChange={onChangePlayerCount}
          type="number"
          value={state.count}
        />
      </p>

      <p>
        <button onClick={onClickRandom}>Randomize</button>
        <button onClick={onClickReset}>Reset</button>
      </p>

      <PlayerList>
        {state.players.map((player, i) => {
          return (
            <Player
              key={i}
              onChange={(e) => {onChangePlayerName(e, i)}}
              character={state.characters[i]}
              isVisible={i <= state.count - 1}
              showName={true}
              value={player}
            />
          )
        })}
      </PlayerList>

      <h3>History</h3>
      <button onClick={(e) => dispatch({type: 'clearHistory'})}>
        Clear History
      </button>

      <div className="history">
        {state.history.slice().reverse().map((historyState, i) => {
          return <HistoryItem key={i} state={historyState} />
        })}
      </div>
    </div>
  );
}


export default App;
