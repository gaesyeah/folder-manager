import axios, { AxiosError } from "axios";
import { FolderType } from "../../../../vite-env";
import { DeleteFolderIcon, EditFolderIcon } from "./styles";
import { route } from "../../../../utils/routes";
import { useContext } from "react";
import GlobalContext from "../../../../contexts/globalContext";
import { genericSwalError } from "../../../../utils/swalErrors";

const EditWrapper = ({ folder: { id } }: { folder: FolderType }) => {
  const {
    folders,
    setFolders,
    baseUrl,
    config,
    selectedFolderId,
    setSelectedFolderId,
  } = useContext(GlobalContext) ?? {};

  const isFoldersNotLoaded = !setFolders || !folders;

  const handleDelete = async () => {
    if (isFoldersNotLoaded) return;

    try {
      await axios.delete<FolderType>(
        `${baseUrl}/${route.api.directory}/${id}`,
        config
      );
      //remove a pasta selecionada que acabou de ser deletada
      setFolders(folders.filter(({ id: actualId }) => actualId !== id));

      if (!setSelectedFolderId) return;
      setSelectedFolderId(undefined);
    } catch (err: unknown) {
      const { message, code } = err as AxiosError;
      genericSwalError(message, code);
    }
  };

  const handleEdit = () => {
    if (isFoldersNotLoaded) return;

    //muda o status de default para "editing", permitindo assim a edição do mesmo
    setFolders(
      folders.map((folder) => {
        if (folder.id === selectedFolderId) {
          return { ...folder, status: "editing" };
        }
        return folder;
      })
    );
  };

  return (
    <>
      <DeleteFolderIcon onClick={handleDelete} />
      <EditFolderIcon onClick={handleEdit} />
    </>
  );
};

export default EditWrapper;
