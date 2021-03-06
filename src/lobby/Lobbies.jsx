import React, { useState } from 'react';
import LobbyRoomInstance from './room-instance';
import LobbyCreateRoomForm from './create-room-form';
import { subDays, fromUnixTime } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTrophy } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

const joinableRoom = (playerName) => ({ roundsPlayed, players, ...rest }) => {
  if (roundsPlayed === 16) {
    return false;
  }

  return _.some(
    players,
    (player) => !player.name || player.name === playerName
  );
};
const showOldRoomsFilter = (showOldRooms) => ({ createdAt }) => {
  if (showOldRooms) {
    return true;
  }
  if (!createdAt) {
    return false;
  }

  const twoDaysAgo = subDays(Date.now(), 2);

  return twoDaysAgo < fromUnixTime(createdAt / 1000);
};

const SpectatableRooms = ({
  spectatableRooms,
  playerName,
  onClickJoin,
  onClickLeave,
}) => {
  if (spectatableRooms.length === 0) {
    return null;
  }

  return (
    <tbody>
      <tr className="bg-light text-muted">
        <td colSpan="7">
          <FontAwesomeIcon icon={faEye} className="mx-2" />
          Spectate games
        </td>
      </tr>
      {spectatableRooms.map((room) => (
        <LobbyRoomInstance
          key={'spectatable-' + room.gameID}
          room={room}
          playerName={playerName}
          onClickJoin={onClickJoin}
          onClickLeave={onClickLeave}
        />
      ))}
    </tbody>
  );
};

const JoinableRooms = ({
  joinableRooms,
  playerName,
  onClickJoin,
  onClickLeave,
}) => {
  return (
    <tbody>
      {joinableRooms.length === 0 ? (
        <tr className="bg-white text-muted">
          <td colSpan="7" className="p-3">
            Open a new room to start a game, or spectate in one of the games
            below.
          </td>
        </tr>
      ) : (
        joinableRooms.map((room) => (
          <LobbyRoomInstance
            key={'joinable-' + room.gameID}
            room={room}
            playerName={playerName}
            onClickJoin={onClickJoin}
            onClickLeave={onClickLeave}
          />
        ))
      )}
    </tbody>
  );
};

const Lobbies = ({
  playerName,
  gameComponents,
  errorMsg,
  createRoom,
  joinRoom,
  leaveRoom,
  rooms,
}) => {
  const [showOldRooms, setShowOldRooms] = useState(false);
  const toggleShowOldRooms = () => setShowOldRooms(!showOldRooms);

  const [joinableRooms, spectatableRooms] = _.partition(
    rooms.filter(showOldRoomsFilter(showOldRooms)),
    joinableRoom(playerName)
  );
  return (
    <>
      <div className="container-fluid">
        <div className="alert alert-primary mb-4 bg-light">
          <FontAwesomeIcon
            icon={faTrophy}
            className="mr-2 text-muted"
            fixedWidth
          />
          Join <em>T.F.V. 'Professor Francken'</em>s{' '}
          <strong>Klaverjas tournament</strong> next Friday 29th of May from
          19:00 to 22:00!{' '}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdanM-ZTWq1s19el0dQG8z8IL5nBGg73mTR7HkktWluFG8E1A/viewform"
            className="font-weight-bold"
          >
            Sign up here
          </a>
          .
        </div>
        <h1>Vierdeman?</h1>
        <div className="d-flex align-items-start justify-content-between my-2 mt-3">
          <LobbyCreateRoomForm games={gameComponents} createGame={createRoom} />

          <button
            className="mr-3 btn btn-text bg-light"
            onClick={toggleShowOldRooms}
          >
            <FontAwesomeIcon
              icon={showOldRooms ? faEyeSlash : faEye}
              className="mr-2 text-muted"
            />
            {showOldRooms ? 'Hide old rooms' : 'Show old rooms'}
          </button>
        </div>

        <div className="border bg-white mt-3">
          <div>
            <table className="table mb-0">
              <thead>
                <tr>
                  <th colSpan="2" className="text-center">
                    Wij
                  </th>
                  <th colSpan="2" className="text-center bg-light">
                    Zij
                  </th>
                  <th className="text-center">Rounds</th>
                  <th className="text-center">Created</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <JoinableRooms
                joinableRooms={joinableRooms}
                playerName={playerName}
                onClickJoin={joinRoom}
                onClickLeave={leaveRoom}
              />
              <SpectatableRooms
                spectatableRooms={spectatableRooms}
                playerName={playerName}
                onClickJoin={joinRoom}
                onClickLeave={leaveRoom}
              />
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lobbies;
