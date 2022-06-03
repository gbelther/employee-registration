import styled from "styled-components";
import colors from "../../../styles/colors";

export const Container = styled.aside`
  height: 100%;
  min-width: 150px;
  padding: 1rem 0.5rem;
  background-color: ${colors.darkBlue};

  @media (max-width: 500px) {
    display: none;
  }
`;

export const NavigationWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Anchor = styled.a`
  text-decoration: none;
`;

export const ItemWrapper = styled.div`
  background-color: ${colors.verySoftViolet};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: 0.3s;

  &:hover {
    filter: brightness(0.7);
  }
`;

export const NavItemTitle = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;
