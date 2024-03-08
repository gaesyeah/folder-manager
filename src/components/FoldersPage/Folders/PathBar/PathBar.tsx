import { useContext } from "react";
import { StyledPathBar } from "./styles";
import GlobalContext from "../../../../contexts/globalContext";
import PathComponent from "./PathComponent/PathComponent";
import { route } from "../../../../utils/routes";

const PathBar = () => {
  const { paths } = useContext(GlobalContext) ?? {};

  return (
    <StyledPathBar>
      <PathComponent
        path={{ id: 999, name: route.params.root, parent: null, user: 999 }}
      />
      {paths?.map((path) => {
        return <PathComponent key={path.id} path={path} />;
      })}
    </StyledPathBar>
  );
};

export default PathBar;
