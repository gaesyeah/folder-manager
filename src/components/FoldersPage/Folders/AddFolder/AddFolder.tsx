import { useParams } from "react-router-dom";
import { AddFolderIcon, StyledAddFolder } from "./styles";
import { useContext } from "react";
import GlobalContext from "../../../../contexts/globalContext";

const AddFolder = () => {
  const { identifier } = useParams();
  const { setFolders, folders } = useContext(GlobalContext) ?? {};

  const handleClick = () => {
    if (!setFolders || !folders) return;

    setFolders([
      ...folders,
      {
        name: "",
        parent: folders?.find(({ name }) => name === identifier)?.id,
        beingEdited: true,
      },
    ]);
  };

  return (
    <StyledAddFolder onClick={handleClick}>
      <AddFolderIcon />
    </StyledAddFolder>
  );
};

export default AddFolder;
