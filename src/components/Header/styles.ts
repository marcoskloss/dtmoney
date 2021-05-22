import styled from 'styled-components';

export const Container = styled.header`
  background: var(--blue);
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 2rem 1rem 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;

  button {
    font-size: 1rem;
    color: #fff;
    background: var(--blue-light);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem; 
    transition: filter .2s;

    &:hover {
      filter: brightness(0.9);
    }
  }

  @media screen and (max-width: 850px) {
    margin-top: 1rem;
  }

  @media screen and (max-width: 450px) {
    flex-direction: column;
    width: 100%;
  }
`;