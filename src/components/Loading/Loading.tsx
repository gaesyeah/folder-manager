import { StyledLoading } from "./styles";
import loadingGif from "./../../assets/loading.gif";

const Loading = () => {
  return (
    <StyledLoading>
      <img src={loadingGif} alt="loading" />
    </StyledLoading>
  );
};

export default Loading;
