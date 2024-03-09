import styled from "styled-components";
import { FaFolder } from "react-icons/fa6";
import { color } from "../../../../utils/colors";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";

export const StyledFolderComponent = styled.li<{ isSelected: boolean }>`
  * {
    font-size: 16px;
    font-weight: 400;
  }
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${({ isSelected }) => (isSelected ? color.grayLight : "unset")};
  padding: 8px;
  div {
    height: 20px;
    width: 50px;
    overflow-x: auto;
    input {
      color: ${color.black};
      height: 20px;
      width: auto;
      border: none;
      margin-top: -4px;
      margin-left: -2px;
    }
  }
`;

export const FolderIcon = styled(FaFolder)`
  font-size: 50px;
  cursor: pointer;
  color: ${color.blueBright};
  transition: 400ms;
  &:hover {
    color: ${color.blue};
  }
`;

export const DeleteFolderIcon = styled(MdDeleteForever)`
  color: ${color.red};
  font-size: 18px;
  position: absolute;
  right: -4px;
  top: 0px;
  cursor: pointer;
  &:hover {
    color: ${color.redBright};
  }
`;

export const EditFolderIcon = styled(MdModeEdit)`
  color: ${color.black};
  font-size: 18px;
  position: absolute;
  left: -1px;
  top: -1px;
  cursor: pointer;
  &:hover {
    color: ${color.green};
  }
`;
