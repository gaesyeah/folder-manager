import styled from "styled-components";
import { FaFolderPlus } from "react-icons/fa6";
import { color } from "../../../../utils/colors";

export const StyledAddFolder = styled.div`
  border-radius: 100%;
  position: fixed;
  bottom: 10px;
  z-index: 2;
  left: 10px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${color.grayLight};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  cursor: pointer;
`;

export const AddFolderIcon = styled(FaFolderPlus)`
  font-size: 32px;
  color: ${color.blueBright};
  transition: 400ms;
  &:hover {
    color: ${color.blue};
  }
`;
