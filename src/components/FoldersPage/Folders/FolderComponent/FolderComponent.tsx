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
  const { id, name, status } = folder;

  const { setPaths, paths, folders, setFolders, baseUrl, config } =
    useContext(GlobalContext) ?? {};

  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState<number>(0);

  const isSelected =
    clickCount > 0 &&
    selectedFolderId === id &&
    (status === "default" || !status);
  const handleClick = () => {
    setSelectedFolderId(id);
    setClickCount((previous) => previous + 1);

    if (isSelected) {
      setClickCount(0);
      navigate(`${route.folders}/${id}`);
      if (paths && setPaths) setPaths([...paths, folder]);
    }
  };

  const isFoldersNotLoaded = !setFolders || !folders;

  const handleOnChange = (value: string) => {
    if (isFoldersNotLoaded) return;
    setFolders(
      folders?.map((folder) => {
        if (folder.id === id) {
          return { ...folder, name: value };
        }
        return folder;
      })
    );
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (isFoldersNotLoaded) return;

    const stopEditing = () => {
      setFolders(
        folders.map((folder) => {
          if (folder.id === selectedFolderId) {
            return { ...folder, status: "default" };
          } else {
            return folder;
          }
        })
      );
    };

    const defaultFolders = folders.filter(
      ({ status }) => !status || status === "default"
    );

    if (e.key === "Enter") {
      try {
        if (status === "creating") {
          const { data } = await axios.post(
            `${baseUrl}/${route.api.directories}`,
            folder,
            config
          );
          setFolders([...defaultFolders, data]);
        } else if (status === "editing") {
          await axios.patch(
            `${baseUrl}/${route.api.directory}/${id}`,
            folder,
            config
          );
          stopEditing();
        }
      } catch (err: unknown) {
        const { message, code } = err as AxiosError;
        genericSwalError(message, code);
      }
    } else if (e.key === "Escape") {
      if (status === "creating") {
        setFolders(defaultFolders);
      } else if (status === "editing") {
        stopEditing();
      }
    }
  };

  const handleDelete = async () => {
    if (isFoldersNotLoaded) return;

    try {
      await axios.delete(`${baseUrl}/${route.api.directory}/${id}`, config);
      setFolders(folders?.filter(({ id: actualId }) => actualId !== id));
    } catch (err: unknown) {
      const { message, code } = err as AxiosError;
      genericSwalError(message, code);
    }
  };

  const handleEdit = () => {
    if (isFoldersNotLoaded) return;

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
    <StyledFolderComponent isSelected={isSelected}>
      {isSelected && (
        <>
          <DeleteFolderIcon onClick={handleDelete} />
          <EditFolderIcon onClick={handleEdit} />
        </>
      )}

      <FolderIcon onClick={handleClick} />
      <div>
        {status && status !== "default" ? (
          <input
            onChange={(e) => handleOnChange(e.target.value)}
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
