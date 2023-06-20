import React from 'react';
// Types
import { PlanetsType } from '../../settings/setup';
// Styles
import { Wrapper, FrontImg, BackImg } from './Card.styles';

type Props = {
  card: PlanetsType;
  callback: (card: PlanetsType) => void;
};

export const Card: React.FC<Props> = ({ card, callback }) => {
  const handleClick = () => {
    if (card.clickable) callback(card);
  };

  return (
    <Wrapper onClick={handleClick}>
      <FrontImg flipped={card.flipped} src={card.frontImage} alt="card-front" />
      <BackImg flipped={card.flipped} src={card.backImage} alt="card-back" />
    </Wrapper>
  );
};
