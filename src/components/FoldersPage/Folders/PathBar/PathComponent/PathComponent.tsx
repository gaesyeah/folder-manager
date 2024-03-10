import { useNavigate } from "react-router-dom";
import { FolderType } from "../../../../../vite-env";
import { StyledPathComponent } from "./styles";
import { route } from "../../../../../utils/routes";

const PathComponent = ({ path: { name, id } }: { path: FolderType }) => {
  const navigate = useNavigate();

  return (
    <StyledPathComponent
      onClick={() => navigate(`${route.folders}/${id ?? route.params.root}`)}
    >
      {name}/
    </StyledPathComponent>
  );
};

export default PathComponent;
