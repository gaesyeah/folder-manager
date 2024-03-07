import styled from "styled-components";
import { color } from "../../utils/colors";
import { media } from "../../utils/media";

export const StyledFoldersPage = styled.div`
  @media (max-width: ${media.mobile}) {
    padding-top: 60px;
  }
  width: 100dvw;
  height: 100dvh;
  background-color: ${color.white};
  display: flex;
  padding-top: 70px;
  transition: 400ms;
`;
