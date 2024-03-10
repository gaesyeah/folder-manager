import { useParams } from "react-router-dom";
import { AddFolderIcon, StyledAddFolder } from "./styles";
import { Dispatch, SetStateAction, useContext } from "react";
import GlobalContext from "../../../../contexts/globalContext";
import { FolderId } from "../../../../vite-env";

const AddFolder = ({
  setSelectedFolderId,
}: {
  setSelectedFolderId: Dispatch<SetStateAction<FolderId>>;
}) => {
  const { identifier } = useParams();
  const { setFolders, folders } = useContext(GlobalContext) ?? {};

  const isBeingCreated = folders?.some(({ status }) => status === "creating");
  const handleClick = () => {
    if (isBeingCreated) return;
    if (!setFolders || !folders) return;

    setSelectedFolderId(undefined);
    //adiciona uma pasta nova temporária com status de "creating" para depois ser criada
    setFolders([
      ...folders,
      {
        name: "",
        parent:
          folders?.find(({ id }) => id === Number(identifier))?.id ?? null,
        status: "creating",
      },
    ]);
  };

  return (
    <StyledAddFolder isBeingCreated={isBeingCreated} onClick={handleClick}>
      <AddFolderIcon />
    </StyledAddFolder>
  );
};

export default AddFolder;
