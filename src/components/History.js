/**
 * History
 *
 * Todo:
 *   - Unhide and style current
 */


function HistoryItem(props) {
  // We have all in history but we only show N based on count.
  // Example: `3 => [1, 2, 3]`
  const displayCount = Array.from(Array(props.state.count).keys());

  return (
    <div className={`history-item ${props.isCurrent ? 'is-current' : ''}`}>
      <div className="history-number">
        <span className="history-number-text">{props.number}</span>
      </div>

      {displayCount.map((i) => {
        return (
          <div className="history-player" key={i}>
            <span className="history-player-name">
              {props.state.players[i]}
            </span>
            <span className="history-player-character">
              {props.state.characters[i]}
            </span>
          </div>
        );
      })}
    </div>
  )
}


export default function History(props) {
  return (
    <div className="history">
      <div className="history-title">
        <h3 className="history-title-text">History</h3>
        <button
          className="history-title-clear"
          onClick={props.onClearHistory}
        >
          Clear History
        </button>
      </div>

      {props.history.slice().reverse().map((historyState, i) => {
        return (
          <HistoryItem
            number={props.history.length - i}
            isCurrent={i === 0}
            key={i}
            state={historyState}
          />
        )
      })}
    </div>
  )
}
