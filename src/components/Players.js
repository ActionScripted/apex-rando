import { NAME_MAX } from '../constants';


function PlayersItem(props) {
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


export default function Players(props) {
  return (
    <div className="players">
      <div className="players-title">
        <h3 className="players-title-text">Players</h3>
        <select
          id="idPlayerCount"
          onChange={props.onChangePlayerCount}
          value={props.count}
        >
          {Array.from(Array(props.max).keys()).map((count, i) => {
            return (
              <option
                key={i}
                value={count+1}
              >
                {count+1}
              </option>
            )
          })}
        </select>
        <button
          className="players-title-reset"
          onClick={props.onClickReset}
        >
          Reset
        </button>
      </div>

      <div className="players-list">
        {props.players.map((player, i) => {
          return (
            <PlayersItem
              key={i}
              onChange={(e) => {props.onChangePlayerName(e, i)}}
              character={props.characters[i]}
              isVisible={i <= props.count - 1}
              showName={true}
              value={player}
            />
          )
        })}
      </div>

      <div className="players-controls">
        <button
          className="players-title-shuffle"
          onClick={props.onClickShuffle}
        >
          Rando
        </button>
      </div>
    </div>
  )
}
