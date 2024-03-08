import { useContext, useEffect, useState } from "react";
import { StyledFolders } from "./styles";
import { useParams } from "react-router-dom";
import GlobalContext from "../../../contexts/globalContext";
import Loading from "../../Loading/Loading";
import Folder from "./Folder/Folder";
import { key } from "../../../utils/localStorage";
import { FolderId } from "../../../vite-env";

const Folders = () => {
  const { folders, isLoading, fetchFolders } = useContext(GlobalContext) ?? {};
  const [selectedFolderId, setSelectedFolderId] = useState<FolderId>(undefined);

  const { identifier } = useParams();

  useEffect(() => {
    if (localStorage.getItem(key.userData) && fetchFolders) {
      fetchFolders();
    }
  }, []);

  return (
    <StyledFolders>
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          {folders?.map((folder) => {
            const { id, parent } = folder;
            if (identifier === "root" && parent === null) {
              return (
                <Folder
                  key={id}
                  folder={folder}
                  selectedFolderId={{ selectedFolderId, setSelectedFolderId }}
                />
              );
            }

            const parentId = folders.find(
              ({ name }) => name === identifier
            )?.id;

            if (parentId === parent) {
              return (
                <Folder
                  key={id}
                  folder={folder}
                  selectedFolderId={{ selectedFolderId, setSelectedFolderId }}
                />
              );
            }
          })}
        </ul>
      )}
    </StyledFolders>
  );
};

export default Folders;
