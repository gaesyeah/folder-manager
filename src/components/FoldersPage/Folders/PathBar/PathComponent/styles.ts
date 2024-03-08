import styled from "styled-components";
import { color } from "../../../../../utils/colors";

export const StyledPathComponent = styled.li`
  cursor: pointer;
  color: ${color.black};
  transition: 200ms;
  &:hover {
    color: ${color.blueBright};
  }
`;
