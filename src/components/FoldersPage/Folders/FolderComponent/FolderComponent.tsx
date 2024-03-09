import {
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { FolderId, FolderType } from "../../../../vite-env";
import {
  DeleteFolderIcon,
  EditFolderIcon,
  FolderIcon,
  StyledFolderComponent,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { route } from "../../../../utils/routes";
import GlobalContext from "../../../../contexts/globalContext";
import axios, { AxiosError } from "axios";
import { genericSwalError } from "../../../../utils/swalErrors";

type SelectedFolderId = {
  selectedFolderId: FolderId;
  setSelectedFolderId: Dispatch<SetStateAction<FolderId>>;
};

const FolderComponent = ({
  folder,
  selectedFolderId: { selectedFolderId, setSelectedFolderId },
}: {
  folder: FolderType;
  selectedFolderId: SelectedFolderId;
}) => {
  const { id, name, beingEdited } = folder;

  const { setPaths, paths, folders, setFolders, baseUrl, config } =
    useContext(GlobalContext) ?? {};

  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState<number>(0);

  const isSelected = clickCount > 0 && selectedFolderId === id && !beingEdited;
  const handleClick = () => {
    setSelectedFolderId(id);
    setClickCount((previous) => previous + 1);

    if (isSelected) {
      setClickCount(0);
      navigate(`${route.folders}/${name}`);
      if (paths && setPaths) setPaths([...paths, folder]);
    }
  };

  const handleEdit = (value: string) => {
    if (!setFolders || !folders) return;
    setFolders(
      folders?.map((folder) => {
        const { id: actualId, ...rest } = folder;
        if (actualId === id) {
          return { ...rest, name: value };
        }
        return folder;
      })
    );
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (!setFolders || !folders) return;

    if (e.key === "Enter") {
      try {
        const { data } = await axios.post(
          `${baseUrl}/${route.api.directories}`,
          folder,
          config
        );
        setFolders([...folders.filter(({ id }) => id !== undefined), data]);
      } catch (err: unknown) {
        const { message, code } = err as AxiosError;
        genericSwalError(message, code);
      }
    } else if (e.key === "Escape") {
      setFolders(folders?.filter(({ beingEdited }) => !beingEdited));
    }
  };

  return (
    <StyledFolderComponent isSelected={isSelected} onClick={handleClick}>
      {isSelected && (
        <>
          <DeleteFolderIcon />
          <EditFolderIcon />
        </>
      )}

      <FolderIcon />
      <div>
        {beingEdited ? (
          <input
            onChange={(e) => handleEdit(e.target.value)}
            autoFocus
            value={name}
            type="text"
            onKeyDown={handleKeyDown}
          ></input>
        ) : (
          <p>{name}</p>
        )}
      </div>
    </StyledFolderComponent>
  );
};

export default FolderComponent;
