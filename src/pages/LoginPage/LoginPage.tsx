import { ChangeEvent, FormEvent, useState } from "react";
import { LoginContainer, StyledLoginPage } from "./styles";
import axios, { AxiosError } from "axios";
import { key } from "../../utils/localStorage";
import { token } from "../../vite-env";
import { useNavigate } from "react-router-dom";
import { route } from "../../utils/routes";
import Swal from "sweetalert2";

const LoginPage = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [loginInputs, setLoginInputs] = useState({
    username: "",
    password: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInputs((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const {
        data: { access },
      } = await axios.post<token>(`${baseUrl}/token`, loginInputs);

      localStorage.setItem(
        key.userData,
        JSON.stringify({ token: access, username: loginInputs.username })
      );

      navigate(route.folders);
    } catch (err: unknown) {
      const { message, code } = err as AxiosError;
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocorreu algum erro, tente novamente por favor",
      });
      console.log(message, code);
    }
  };

  return (
    <StyledLoginPage>
      <LoginContainer onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">nome</label>
          <input
            id="username"
            type="text"
            placeholder="digite seu nome"
            required
            disabled={isLoading}
            name="username"
            value={loginInputs.username}
            onChange={handleOnChange}
          ></input>
        </div>

        <div>
          <label htmlFor="password">senha</label>
          <input
            id="password"
            type="password"
            placeholder="digite sua senha"
            required
            disabled={isLoading}
            name="password"
            value={loginInputs.password}
            onChange={handleOnChange}
          ></input>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Entrar"}
        </button>
      </LoginContainer>
    </StyledLoginPage>
  );
};

export default LoginPage;
