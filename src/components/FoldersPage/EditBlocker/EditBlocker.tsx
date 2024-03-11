import { useContext, useEffect, useState } from "react";
import { StyledEditBlocker } from "./styles";
import GlobalContext from "../../../contexts/globalContext";

const EditBlocker = () => {
  const { folders, setFolders, selectedFolderId } =
    useContext(GlobalContext) ?? {};

  const [nameBackup, setNameBackup] = useState("");
  useEffect(() => {
    setNameBackup(
      folders?.find(({ id }) => id === selectedFolderId)?.name ?? ""
    );
  }, [selectedFolderId]);

  const stopEditing = () => {
    if (!setFolders || !folders) return;

    setFolders(
      folders.map((folder) => {
        if (folder.status === "editing") {
          return {
            ...folder,
            status: "default",
            name: nameBackup,
          };
        }
        return folder;
      })
    );
  };

  //renderiza uma div para ficar por cima de tudo e não permitir clicar em outras pastas
  return (
    <>
      {folders?.find(({ status }) => status === "editing") && (
        <StyledEditBlocker onClick={stopEditing}></StyledEditBlocker>
      )}
    </>
  );
};

export default EditBlocker;
