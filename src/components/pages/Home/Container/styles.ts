import styled from "styled-components";
import colors from "../../../../styles/colors";

export const ContainerFeedback = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
`;

export const ContentContainer = styled.section`
  padding: 1rem;
`;

export const EmployeeCardList = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const FeedbackError = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${colors.error};
`;
