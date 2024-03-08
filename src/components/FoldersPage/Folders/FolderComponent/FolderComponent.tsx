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
import Swal from "sweetalert2";

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

  const newFolders = ({
    value,
    finishEdit,
  }: {
    value?: string;
    finishEdit?: boolean;
  }) => {
    return folders?.map((folder) => {
      const { id: actualId, ...rest } = folder;
      if (actualId === id) {
        if (finishEdit) {
          return { ...rest, beingEdited: false };
        } else if (value) {
          return { ...rest, name: value };
        }
      }
      return folder;
    });
  };
  const handleEdit = (value: string) => {
    if (!setFolders || !folders) return;
    setFolders(newFolders({ value }) ?? []);
  };

  const handleEnter: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === "Enter") {
      try {
        await axios.post(`${baseUrl}/directories`, folder, config);
        if (!setFolders) return;
        setFolders(newFolders({ finishEdit: true }) ?? []);
      } catch (err: unknown) {
        const { message, code } = err as AxiosError;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocorreu algum erro, tente novamente por favor",
        });
        console.log(message, code);
      }
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
            onKeyDown={handleEnter}
          ></input>
        ) : (
          <p>{name}</p>
        )}
      </div>
    </StyledFolderComponent>
  );
};

export default FolderComponent;
