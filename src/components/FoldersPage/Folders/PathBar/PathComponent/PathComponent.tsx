import { useNavigate } from "react-router-dom";
import { FolderType } from "../../../../../vite-env";
import { StyledPathComponent } from "./styles";
import { route } from "../../../../../utils/routes";
import { DragEvent, useContext } from "react";
import { dragProperty } from "../../../../../utils/dragProperty";
import axios, { AxiosError } from "axios";
import { genericSwalError } from "../../../../../utils/swalErrors";
import GlobalContext from "../../../../../contexts/globalContext";

const PathComponent = ({ path: { name, id } }: { path: FolderType }) => {
  const { baseUrl, config, folders, setFolders } =
    useContext(GlobalContext) ?? {};

  const navigate = useNavigate();

  const handleOndrop = async (e: DragEvent<HTMLLIElement>) => {
    if (!folders || !setFolders) return;

    const childrenId = Number(e.dataTransfer.getData(dragProperty.childrenId));
    try {
      const { data } = await axios.patch<FolderType>(
        `${baseUrl}/${route.api.directory}/${childrenId}`,
        {
          parent: id ?? null,
        },
        config
      );
      setFolders([...folders.filter(({ id }) => id !== childrenId), data]);
    } catch (err: unknown) {
      const { message, code } = err as AxiosError;
      genericSwalError(message, code);
    }
  };

  const handleOnDragOver = (e: DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  return (
    <StyledPathComponent
      onDrop={handleOndrop}
      onDragOver={handleOnDragOver}
      onClick={() => navigate(`${route.folders}/${id ?? route.params.root}`)}
    >
      {name}/
    </StyledPathComponent>
  );
};

export default PathComponent;
