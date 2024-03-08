import { useNavigate } from "react-router-dom";
import { FolderType } from "../../../../../vite-env";
import { StyledPathComponent } from "./styles";
import { route } from "../../../../../utils/routes";

const PathComponent = ({ path: { name } }: { path: FolderType }) => {
  const navigate = useNavigate();

  return (
    <StyledPathComponent onClick={() => navigate(`${route.folders}/${name}`)}>
      {name}/
    </StyledPathComponent>
  );
};

export default PathComponent;
