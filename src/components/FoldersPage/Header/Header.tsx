import Swal from "sweetalert2";
import { key } from "../../../utils/localStorage";
import { LogOutIcon, StyledHeader } from "./styles";
import { color } from "../../../utils/colors";
import { useContext } from "react";
import GlobalContext from "../../../contexts/globalContext";

const Header = () => {
  const { userData } = useContext(GlobalContext) ?? {};

  const handleLogOut = () => {
    Swal.fire({
      title: "Deseja realmente sair?",
      icon: "question",
      confirmButtonText: "Sair",
      confirmButtonColor: `${color.red}`,
      showCancelButton: true,
      cancelButtonText: "Não sair",
      cancelButtonColor: `${color.blueBright}`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(key.userData);
        window.location.reload();
      }
    });
  };

  return (
    <StyledHeader>
      <div>
        <LogOutIcon onClick={handleLogOut} />
        <h1>Olá {userData?.username}</h1>
      </div>
    </StyledHeader>
  );
};

export default Header;
