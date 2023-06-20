import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(80px, 1fr));
  grid-gap: 0.5rem;
  max-width: 550px;
`;

// grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
