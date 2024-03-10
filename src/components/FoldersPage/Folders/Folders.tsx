import { useContext, useEffect } from "react";
import { FoldersContainer, StyledFolders } from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import GlobalContext from "../../../contexts/globalContext";
import Loading from "../../Loading/Loading";
import FolderComponent from "./FolderComponent/FolderComponent";
import { key } from "../../../utils/localStorage";
import PathBar from "./PathBar/PathBar";
import { route } from "../../../utils/routes";
import AddFolder from "./AddFolder/AddFolder";

const Folders = () => {
  const { folders, isLoading, fetchFolders, paths, setPaths } =
    useContext(GlobalContext) ?? {};

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
    //função para atualizar o caminho atual do diretório, e ela é executada sempre que o diretório atual é alterado(identifier)
    const updatePaths = () => {
      if (!paths || !setPaths) return;

      const actualPathIndex = paths.findIndex(
        ({ id }) => id === Number(identifier)
      );

      //se for -1 não foi encontrado, e se o identificador for "root" o path clicado foi o root
      if (actualPathIndex === -1 && identifier === route.params.root) {
        setPaths([]);
      } else {
        //remove todos os paths que estão depois do clicado
        setPaths(paths.filter((_, i) => i <= actualPathIndex));
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
              //renderiza somente as pastas que não tem pai
              if (identifier === route.params.root && parent === null) {
                return <FolderComponent key={id} folder={folder} />;
              }
              //renderiza todas as pastas que tem o pai igual ao identificador
              if (parent === Number(identifier)) {
                return <FolderComponent key={id} folder={folder} />;
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
