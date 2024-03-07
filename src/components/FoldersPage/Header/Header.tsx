import Swal from "sweetalert2";
import { key } from "../../../utils/localStorage";
import { UserData } from "../../../vite-env";
import { LogOutIcon, StyledHeader } from "./styles";
import { color } from "../../../utils/colors";

const Header = () => {
  const userDataString = localStorage.getItem(key.userData);
  const userData: UserData | null = userDataString
    ? JSON.parse(userDataString)
    : null;

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
