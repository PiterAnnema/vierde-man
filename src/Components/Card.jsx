import React, { useState } from 'react';
import { SuitStringToComponent } from 'Components/Suits';
import styled, { css } from 'styled-components';
import { SUITES } from 'GameLogic/Card';
import francken from 'assets/francken-white-logo.png';
const { SPADES, HEARTS, CLUBS, DIAMONDS } = SUITES;

// TODO: if player name is Sven or sbte, then shake cards

const suitIcon = {
  [SPADES]: '♠',
  [HEARTS]: '♥',
  [CLUBS]: '♣',
  [DIAMONDS]: '♦',
  APRIL: '🐸'
};
const suitColor = {
  [SPADES]: '#252525',
  [HEARTS]: '#e44145',
  [CLUBS]: '#252525',
  [DIAMONDS]: '#e44145',
  APRIL: '#8f8500'
};
const CardLi = styled.li.attrs(props => ({
  cardScale: props.cardScale || 2.5
}))`
  border-width: 2px !important;
  transition: all 0.3s ease-out;
  transform: rotate(${props => props.rotate}deg);
  background-color: ${({ disabled }) => (disabled ? '#e6e6e6' : '#fafafa')};

  width: ${({ cardScale }) => 58 * cardScale}px;
  height: ${({ cardScale }) => 88 * cardScale}px;
  color: ${props => suitColor[props.suit]} !important;

  ${props =>
    !props.disabled &&
    !props.flippedToBack &&
    css`
      :hover {
        transform: scale(1) rotate(${props => props.rotate}deg)
          translate(0, -20%);
        cursor: pointer;
        background: white !important;
      }
    `}

  &:before,
  &:after {
    content: '${props => props.face}  ${props => suitIcon[props.suit]}';
    position: absolute;
    width: 12px;
    text-align: center;
    letter-spacing: -2px;
  }

  &:before {
    top: 4px;
    left: 4px;
  }

  &:after {
    bottom: 4px;
    right: 4px;
    transform: rotate(180deg);
  }


  ${props =>
    props.flippedToBack &&
    css`
      background: no-repeat center center url(${() => francken}),
        repeating-linear-gradient(
          -45deg,
          #173249,
          #173249 20px,
          #881838 20px,
          #881838 40px
        );
      background-blend-mode: soft-light;

      background-size: 70%, cover;

      &:before,
      &:after {
        content: '';
      }
    `}
`;

const Card = props => {
  const { disabled = false, visible = true, card, onClick } = props;
  const { face, suit } = card;

  // Rotate each card a little bit to make the cards feel less static
  const baseRotate = 3;
  const [rotate] = useState(Math.floor(baseRotate * (Math.random() * 2 - 1)));

  let className =
    'border p-4 px-4 shadow rounded-lg font-weight-bold d-flex align-items-center justify-content-between flex-column text-center';
  if (disabled) {
    className += ' text-muted font-weight-light';
  }

  return (
    <CardLi
      className={className}
      onClick={onClick}
      rotate={rotate}
      face={face}
      suit={suit}
      flippedToBack={!visible}
      disabled={disabled}
    >
      {visible && (
        <>
          <SuitStringToComponent suit={suit} />
          <span>{face}</span>
        </>
      )}
    </CardLi>
  );
};

export default Card;
