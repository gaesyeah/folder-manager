import { Dispatch, SetStateAction, useState } from "react";
import { FolderId, FolderType } from "../../../../vite-env";
import {
  DeleteFolderIcon,
  EditFolderIcon,
  FolderIcon,
  StyledFolder,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { route } from "../../../../utils/routes";

type SelectedFolderId = {
  selectedFolderId: FolderId;
  setSelectedFolderId: Dispatch<SetStateAction<FolderId>>;
};

const Folder = ({
  folder: { name, id },
  selectedFolderId: { selectedFolderId, setSelectedFolderId },
}: {
  folder: FolderType;
  selectedFolderId: SelectedFolderId;
}) => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState<number>(0);

  const isSelected = clickCount > 0 && selectedFolderId === id;
  const handleClick = () => {
    setSelectedFolderId(id);
    setClickCount((previous) => previous + 1);

    if (isSelected) {
      setClickCount(0);
      navigate(`${route.folders}/${name}`);
    }
  };

  return (
    <StyledFolder isSelected={isSelected} onClick={handleClick}>
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
    </StyledFolder>
  );
};

export default Folder;
