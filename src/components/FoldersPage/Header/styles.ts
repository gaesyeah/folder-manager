import styled from "styled-components";
import { color } from "../../../utils/colors";
import { TbLogout2 } from "react-icons/tb";
import { media } from "../../../utils/media";

export const StyledHeader = styled.header`
  @media (max-width: ${media.mobile}) {
    height: 60px;
  }
  z-index: 1;
  height: 70px;
  width: 100%;
  background-color: ${color.blueBright};
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  transition: 400ms;
  * {
    transition: 400ms;
  }
  div {
    height: 100%;
    display: flex;
    align-items: center;
    align-self: flex-start;
    margin-left: 10px;
    gap: 10px;
    @media (max-width: ${media.mobile}) {
      gap: 8px;
    }
    h1 {
      @media (max-width: ${media.mobile}) {
        font-size: 23px;
      }
      font-size: 25px;
      font-weight: 600;
    }
  }
`;

export const LogOutIcon = styled(TbLogout2)`
  @media (max-width: ${media.mobile}) {
    height: 30px;
  }
  font-size: 32px;
  color: ${color.white};
  cursor: pointer;
  transition: 400ms;
  &:hover {
    color: ${color.black};
  }
`;
