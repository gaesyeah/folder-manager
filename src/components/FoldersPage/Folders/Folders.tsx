import { useContext, useEffect, useState } from "react";
import { FoldersContainer, StyledFolders } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import GlobalContext from "../../../contexts/globalContext";
import Loading from "../../Loading/Loading";
import FolderComponent from "./FolderComponent/FolderComponent";
import { key } from "../../../utils/localStorage";
import { FolderId } from "../../../vite-env";
import PathBar from "./PathBar/PathBar";
import { route } from "../../../utils/routes";
import AddFolder from "./AddFolder/AddFolder";

const Folders = () => {
  const { folders, isLoading, fetchFolders, paths, setPaths } =
    useContext(GlobalContext) ?? {};
  const [selectedFolderId, setSelectedFolderId] = useState<FolderId>(undefined);

  const navigate = useNavigate();
  const { identifier } = useParams();

  useEffect(() => {
    if (localStorage.getItem(key.userData) && fetchFolders) {
      fetchFolders();
    }
    //para voltar ao root se o usuário reiniciar a pagina
    if (identifier !== route.params.root) {
      navigate(`${route.folders}/${route.params.root}`);
    }
  }, []);

  useEffect(() => {
    const updatePaths = () => {
      if (!paths || !setPaths) return;

      const actualPathIndex = paths.findIndex(
        ({ name }) => name === identifier
      );

      //se for -1 não foi encontrado, e se o identificador for "root" o path clicado foi o root
      if (actualPathIndex === -1 && identifier === route.params.root) {
        setPaths([]);
      } else {
        const newPaths = paths.filter((_, i) => i <= actualPathIndex);
        setPaths(newPaths);
      }
    };
    updatePaths();
  }, [identifier]);

  return (
    <StyledFolders>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <PathBar />
          <FoldersContainer>
            {folders?.map((folder) => {
              const { id, parent } = folder;
              if (identifier === route.params.root && parent === null) {
                return (
                  <FolderComponent
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
                  <FolderComponent
                    key={id}
                    folder={folder}
                    selectedFolderId={{ selectedFolderId, setSelectedFolderId }}
                  />
                );
              }
            })}
          </FoldersContainer>
          <AddFolder />
        </>
      )}
    </StyledFolders>
  );
};

export default Folders;
