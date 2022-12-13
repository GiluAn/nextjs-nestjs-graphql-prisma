import styled from 'styled-components';
import { buttonColors, ButtonColorType } from 'styles/palette';
import tw from 'twin.macro';

export const ButtonWrapper = styled.button<{
  color: ButtonColorType;
}>`
  background: ${(props) => buttonColors[props.color].background};
  color: ${(props) => buttonColors[props.color].color};
  &:hover {
    background: ${(props) => buttonColors[props.color].hover};
  }
  &:focus {
    background: ${(props) => buttonColors[props.color].focus};
  }
  ${tw`  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none`}
`;
