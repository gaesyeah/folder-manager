import { Dispatch, SetStateAction, useContext, useState } from "react";
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
  const { id, name } = folder;

  const { setPaths, paths } = useContext(GlobalContext) ?? {};

  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState<number>(0);

  const isSelected = clickCount > 0 && selectedFolderId === id;
  const handleClick = () => {
    setSelectedFolderId(id);
    setClickCount((previous) => previous + 1);

    if (isSelected) {
      setClickCount(0);
      navigate(`${route.folders}/${name}`);
      if (paths && setPaths) setPaths([...paths, folder]);
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
        <p>{name}</p>
      </div>
    </StyledFolderComponent>
  );
};

export default FolderComponent;
