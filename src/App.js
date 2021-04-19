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
  hasNagged: false,
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
    case 'count':
      const count = parseInt(action.payload);
      history[history.length - 1].count = count;
      return {...state, history, count}

    case 'history:clear':
      return {...state, history: [state]};

    case 'eggs:nag':
      return {...state, hasNagged: true};

    case 'players:rename':
      players[action.id] = action.payload;
      history[history.length - 1].players = players;
      return {...state, history, players}

    case 'players:reset':
      history[history.length - 1].players = initialState.players;
      return {...initialState, characters, history: [...history] }

    case 'players:shuffle':
      const shuffleState = {...state,
        characters: getCharacters(PLAYERS_MAX)
      };
      return {...shuffleState,
        history: [...shuffleState.history, {...shuffleState, history: []}],
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
    if (state.history.length === 50 && !state.hasNagged) {
      alert('Yo, you should take a break.');
      dispatch({type: 'eggs:nag'})
    }

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
      type: 'players:rename'
    });
  }

  function onClearHistory(e) { dispatch({type: 'history:clear'}) }
  function onClickPlayerReset(e) { dispatch({type: 'players:reset'}) }
  function onClickShuffle(e) { dispatch({type: 'players:shuffle'}) }

  return (
    <div className="App">
      <Players
        characters={state.characters}
        count={state.count}
        max={PLAYERS_MAX}
        min={PLAYERS_MIN}
        onChangePlayerCount={onChangePlayerCount}
        onChangePlayerName={onChangePlayerName}
        onClickShuffle={onClickShuffle}
        onClickReset={onClickPlayerReset}
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
