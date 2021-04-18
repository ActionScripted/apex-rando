import { useReducer, useEffect } from 'react';

import {
  PLAYERS_MAX,
  PLAYERS_MIN,
} from './constants';

import {
  getCharacters,
  getDefaultPlayers,
} from './utils';

import History from './components/History';
import Players from './components/Players';
import Stats from './components/Stats';

import './App.scss';


const initialState = {
  characters: getCharacters(PLAYERS_MAX),
  count: PLAYERS_MAX,
  history: [],
  players: getDefaultPlayers(PLAYERS_MAX),
};


function init(initialState) {
  const storageState = JSON.parse(localStorage.getItem('state'));
  const initState = storageState || initialState;
  return {...initState};
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

  console.log(state);

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

  function onClearHistory(e) { dispatch({type: 'clearHistory'}) }
  function onClickRandom(e) { dispatch({type: 'rando'}) }
  function onClickReset(e) { dispatch({type: 'reset'}) }

  return (
    <div className="App">
      <Players
        characters={state.characters}
        count={state.count}
        max={PLAYERS_MAX}
        min={PLAYERS_MIN}
        onChangePlayerCount={onChangePlayerCount}
        onChangePlayerName={onChangePlayerName}
        onClickRandom={onClickRandom}
        onClickReset={onClickReset}
        players={state.players}
      />

      <Stats state={state} />

      <History
        history={state.history}
        onClearHistory={onClearHistory}
      />
    </div>
  );
}


export default App;
