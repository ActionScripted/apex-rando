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
      <p>
        <label htmlFor="idPlayerCount">Players:</label>
        <select
          id="idPlayerCount"
          onChange={props.onChangePlayerCount}
          defaultValue={props.count}
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
      </p>

      <p>
        <button onClick={props.onClickRandom}>Randomize</button>
        <button onClick={props.onClickReset}>Reset</button>
      </p>

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
    </div>
  )
}
