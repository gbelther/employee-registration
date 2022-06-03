import styled, { keyframes } from "styled-components";
import colors from "../../../styles/colors";

const keyFrame = keyframes`
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  width: 24px;
  height: 24px;
  display: inline-block;
  overflow: hidden;
  background: transparent;
`;

export const Content = styled.div`
  div {
    box-sizing: border-box !important;
  }

  & > div {
    position: absolute;
    width: 69px;
    height: 69px;
    top: 15.5px;
    left: 15.5px;
    border-radius: 50%;
    border: 15px solid #000;
    border-color: ${colors.darkBlue} transparent ${colors.darkBlue} transparent;
    animation: ${keyFrame} 1s linear infinite;
  }

  & > div:nth-child(2),
  & > div:nth-child(4) {
    width: 37px;
    height: 37px;
    top: 31.5px;
    left: 31.5px;
    animation: ${keyFrame} 1s linear infinite reverse;
  }

  & > div:nth-child(2) {
    border-color: transparent ${colors.verySoftViolet} transparent
      ${colors.verySoftViolet};
  }

  & > div:nth-child(3) {
    border-color: transparent;
  }

  > div:nth-child(3) div {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
  }

  & > div:nth-child(3) div:before,
  & > div:nth-child(3) div:after {
    content: "";
    display: block;
    position: absolute;
    width: 15px;
    height: 15px;
    top: -15px;
    left: 12px;
    background: ${colors.darkBlue};
    border-radius: 50%;
    box-shadow: 0 54px 0 0 ${colors.darkBlue};
  }

  & > div:nth-child(3) div:after {
    left: -15px;
    top: 12px;
    box-shadow: 54px 0 0 0 ${colors.darkBlue};
  }

  & > div:nth-child(4) {
    border-color: transparent;
  }

  & > div:nth-child(4) div {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
  }
  & > div:nth-child(4) div:before,
  & > div:nth-child(4) div:after {
    content: "";
    display: block;
    position: absolute;
    width: 15px;
    height: 15px;
    top: -15px;
    left: -4px;
    background: ${colors.verySoftViolet};
    border-radius: 50%;
    box-shadow: 0 22px 0 0 ${colors.verySoftViolet};
  }

  & > div:nth-child(4) div:after {
    left: -15px;
    top: -4px;
    box-shadow: 22px 0 0 ${colors.verySoftViolet};
  }

  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(0.24);
  backface-visibility: hidden;
  transform-origin: 0 0;

  div {
    box-sizing: content-box;
  }
`;
