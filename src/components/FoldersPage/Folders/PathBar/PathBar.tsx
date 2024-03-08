import { useContext } from "react";
import { StyledPathBar } from "./styles";
import GlobalContext from "../../../../contexts/globalContext";
import PathComponent from "./PathComponent/PathComponent";
import { route } from "../../../../utils/routes";

const PathBar = () => {
  const { paths } = useContext(GlobalContext) ?? {};

  return (
    <StyledPathBar>
      <PathComponent path={{ name: route.params.root }} />
      {paths?.map((path) => {
        return <PathComponent key={path.id} path={path} />;
      })}
    </StyledPathBar>
  );
};

export default PathBar;
