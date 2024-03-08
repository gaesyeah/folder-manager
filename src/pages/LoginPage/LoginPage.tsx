import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { LoginContainer, StyledLoginPage } from "./styles";
import axios, { AxiosError } from "axios";
import { key } from "../../utils/localStorage";
import { Token } from "../../vite-env";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../contexts/globalContext";
import { genericSwalError } from "../../utils/swalErrors";
import { route } from "../../utils/routes";

const LoginPage = () => {
  const navigate = useNavigate();

  const { baseUrl } = useContext(GlobalContext) ?? {};

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
      const {
        data: { access },
      } = await axios.post<Token>(`${baseUrl}/${route.api.token}`, loginInputs);

      localStorage.setItem(
        key.userData,
        JSON.stringify({ token: access, username: loginInputs.username })
      );

      navigate("/");
    } catch (err: unknown) {
      const { message, code } = err as AxiosError;
      setIsLoading(false);
      genericSwalError(message, code);
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
