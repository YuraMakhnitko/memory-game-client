import React from 'react';
// Types
import { PlanetsType } from '../../settings/setup';
// Styles
import { Wrapper, FrontImg, BackImg } from './Planet.styles';

type Props = {
  planet: PlanetsType;
  callback: (card: PlanetsType) => void;
};

export const Planet: React.FC<Props> = ({ planet, callback }) => {
  const handleClick = () => {
    if (planet.clickable) callback(planet);
  };

  return (
    <Wrapper onClick={handleClick}>
      <FrontImg
        flipped={planet.flipped}
        src={planet.frontImage}
        alt="card-front"
      />
      <BackImg
        flipped={planet.flipped}
        src={planet.backImage}
        alt="card-back"
      />
    </Wrapper>
  );
};
