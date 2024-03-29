import { KeyboardEventHandler, useContext, useState, DragEvent } from "react";
import { FolderType } from "../../../../vite-env";
import { FolderIcon, StyledFolderComponent } from "./styles";
import { useNavigate } from "react-router-dom";
import { route } from "../../../../utils/routes";
import GlobalContext from "../../../../contexts/globalContext";
import axios, { AxiosError } from "axios";
import { genericSwalError } from "../../../../utils/swalErrors";
import { dragProperty } from "../../../../utils/dragProperty";
import EditWrapper from "./EditWrapper";

const FolderComponent = ({ folder }: { folder: FolderType }) => {
  const { id, name, status } = folder;
  const [nameBackup] = useState(name);

  const {
    setPaths,
    paths,
    folders,
    setFolders,
    baseUrl,
    config,
    selectedFolderId,
    setSelectedFolderId,
  } = useContext(GlobalContext) ?? {};

  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState<number>(0);

  const isSelected = clickCount > 0 && selectedFolderId === id;

  const handleClick = () => {
    if (!setSelectedFolderId) return;

    setSelectedFolderId(id);
    setClickCount((previous) => previous + 1);

    if (isSelected) {
      setClickCount(0);
      //navega para o diretório clicado e a adiciona no path atual
      navigate(`${route.folders}/${id}`);
      if (paths && setPaths) setPaths([...paths, folder]);
    }
  };

  const isFoldersNotLoaded = !setFolders || !folders;

  const handleOnChange = (value: string) => {
    if (isFoldersNotLoaded) return;
    setFolders(
      folders.map((folder) => {
        if (folder.id === id) {
          //atualiza o nome da pasta com o valor vindo do event do onChange
          return { ...folder, name: value };
        }
        return folder;
      })
    );
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (isFoldersNotLoaded) return;

    //função que altera o status de editing para default
    const stopEditing = (isEsc?: boolean) => {
      setFolders(
        folders.map((folder) => {
          if (folder.id === selectedFolderId) {
            return {
              ...folder,
              status: "default",
              name: isEsc ? nameBackup : name,
            };
          } else {
            return folder;
          }
        })
      );
    };

    //retorna todas as pastas que não estão sendo editadas ou criadas
    const defaultFolders = folders.filter(
      ({ status }) => !status || status === "default"
    );

    if (e.key === "Enter") {
      try {
        if (status === "creating") {
          const { data } = await axios.post<FolderType>(
            `${baseUrl}/${route.api.directories}`,
            folder,
            config
          );
          setFolders([...defaultFolders, data]);
        } else if (status === "editing") {
          await axios.patch<FolderType>(
            `${baseUrl}/${route.api.directory}/${id}`,
            { name },
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
        stopEditing(true);
      }
      if (!setSelectedFolderId) return;
      setSelectedFolderId(undefined);
    }
  };

  const handleOnDrag = (e: DragEvent<HTMLLIElement>) => {
    if (!id) return;
    e.dataTransfer.setData(dragProperty.childrenId, id.toString());
  };

  return (
    <StyledFolderComponent
      isSelected={isSelected}
      draggable
      onDragStart={(e) => handleOnDrag(e)}
    >
      {isSelected && <EditWrapper folder={folder} />}

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
