import React from 'react';
import PlaceBid from 'App/PlaceBid';
import { PlayerToStartCurrentTrick } from 'GameLogic/Phases/PlayTricks';
import styled from 'styled-components';
import Header from 'App/Header';
import Card from 'Components/Card';
import PlayerHand from 'Components/PlayerHand';
import PlayedCards from 'App/PlayedCards';
import _ from 'lodash';

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

const KlaverJasTable = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 1fr 5fr 1fr;
  grid-template-columns: 1fr 5fr 1fr;
  grid-template-areas:
    '.  p2 .'
    'p1 a  p3'
    '.  p0 .';
`;

const Action = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: a;
  flex-direction: column;
`;
const PlayerHandArea = styled.div`
  grid-area: ${props => 'p' + props.id};

  ul {
    transform: ${({ id }) =>
      id === 0
        ? ''
        : id === 1
        ? 'rotate(90deg)'
        : id === 2
        ? 'rotate(180deg)'
        : 'rotate(-90deg)'};
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
  const playerIsActive = currentPlayer === id;
  const playerId = id;

  return (
    <PlayerContainer id={id}>
      <Header
        game={game}
        phase={phase}
        currentBids={game.bids}
        currentPlayer={currentPlayer}
      />
      <KlaverJasTable className="p-2 overflow-hidden" flex-grow-1>
        <Action>
          {!playerIsActive && phase === 'PlaceBids' && (
            <div className="d-flex justify-content-center align-items-center flex-grow-1">
              <h3 className="text-center text-muted">
                Waiting for player {currentPlayer} to make their turn
              </h3>
            </div>
          )}
          {phase === 'PlaceBids' && (
            <PlaceBid
              placeBid={moves.PlaceBid}
              pass={moves.Pass}
              currentBids={game.bids}
              currentPlayer={currentPlayer}
            />
          )}
          {phase === 'PlayTricks' && (
            <PlayedCards
              cards={game.currentTrick.playedCards}
              startingPlayer={PlayerToStartCurrentTrick(game, {
                numPlayers: 4
              })}
              playerId={playerId}
            />
          )}
        </Action>

        {[0, 1, 2, 3].map(positionId => {
          const id = (playerId + positionId) % 4;
          return (
            <PlayerHandArea id={positionId}>
              <PlayerHand
                game={game}
                hand={game.hands[id]}
                playerId={id}
                moves={moves}
              />
            </PlayerHandArea>
          );
        })}
      </KlaverJasTable>
    </PlayerContainer>
  );
};

export default Player;
