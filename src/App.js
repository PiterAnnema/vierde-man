import React from 'react';
import { Client } from 'boardgame.io/react';
import { KlaverJassen } from 'GameLogic/Game';
import PlaceBid from 'App/PlaceBid';
import { playerIsAllowedToPlayCard } from 'GameLogic/Phases/PlayTricks';
import './App.css';
import styled from 'styled-components';
import { SuitStringToComponent } from 'Components/Suits';
import Header from 'App/Header';
import Notes from 'App/ScoreBoard';
import Card from 'Components/Card';

const isSans = event => event.value === 'sans';

const bids = event =>
  isSans(event)
    ? [70, 80, 90, 100, 110, 120, 130, 'pit', 'pitje met roem']
    : [80, 90, 100, 110, 120, 130, 140, 150, 160, 'pit', 'pitje met roem'];

const PlayerGrid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'player-0 player-1'
    'player-3 player-2';
`;

const PlayerContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
  border: thin solid #dddddd;
  grid-area: ${props => 'player-' + props.id};
  background-color: ${props =>
    props.id === 1 || props.id === 3 ? '#fafafa' : '#fafefa'};
`;

const PlayerHand = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(1, 1fr);
  li {
    background: white;
    margin: 0rem 0.25rem;
  }
`;

const Player = ({
  id,
  name,
  cards = [],
  selectedSuit = id === 1 ? 'sans' : 'hearts',
  selectedBid = 90,
  moves,
  game,
  phase,
  currentPlayer
}) => {
  const playerHand = game.hands[id];

  // if (currentPlayer !== id) {
  //   return (
  //     <PlayerContainer id={id + 1} className="p-5">
  //       <h1>
  //         {name}

  //         <small>{phase}</small>
  //       </h1>
  //       Waiting for turn...
  //     </PlayerContainer>
  //   );
  // }

  const playerIsActive = currentPlayer === id;

  return (
    <PlayerContainer id={id}>
      <Header
        game={game}
        phase={phase}
        currentBids={game.bids}
        currentPlayer={currentPlayer}
      />
      <div className="p-3 flex-grow-1 d-flex flex-column justify-content-between">
        <header className="d-flex justify-content-between w-100">
          <h1 className="h5">{name}</h1>
          <small>
            {playerIsActive
              ? phase
              : `Waiting for ${currentPlayer} to make its turn...`}
          </small>
        </header>

        {playerIsActive && phase === 'PlaceBids' && (
          <PlaceBid
            placeBid={moves.PlaceBid}
            pass={moves.Pass}
            currentBids={game.bids}
            currentPlayer={currentPlayer}
          />
        )}
      </div>
    </PlayerContainer>
  );
};

const App = props => {
  const { G, moves, ctx } = props;
  const { phase } = ctx;

  return (
    <div className="App">
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-column">
          <PlayerGrid>
            <Player
              id={0}
              name="Mark"
              game={G}
              moves={moves}
              phase={phase}
              currentPlayer={parseInt(ctx.currentPlayer, 10)}
            />
            <Player
              id={1}
              name="Anna"
              game={G}
              moves={moves}
              phase={phase}
              currentPlayer={parseInt(ctx.currentPlayer, 10)}
            />
            <Player
              id={2}
              name="Arjen"
              game={G}
              moves={moves}
              phase={phase}
              currentPlayer={parseInt(ctx.currentPlayer, 10)}
            />
            <Player
              id={3}
              name="Su"
              game={G}
              moves={moves}
              phase={phase}
              currentPlayer={parseInt(ctx.currentPlayer, 10)}
            />
          </PlayerGrid>
        </div>
        <Notes {...G} />
      </div>
    </div>
  );
};

const KlaverJasApp = Client({
  game: KlaverJassen,
  numPlayers: 4,
  debug: false,
  board: App,
  loading: props => {
    return 'Loading component';
  }
});

export default KlaverJasApp;
// export default App
