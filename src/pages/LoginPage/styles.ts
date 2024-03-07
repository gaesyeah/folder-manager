import styled from "styled-components";
import { media } from "../../utils/media";
import { color } from "../../utils/colors";

export const StyledLoginPage = styled.div`
  width: 100dvw;
  height: 100dvh;
  background-color: ${color.white};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginContainer = styled.form`
  @media (max-width: ${media.mobile}) {
    min-width: 90%;
  }
  min-width: 40%;
  height: 60%;
  border-radius: 12px;
  background: ${color.gray};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  * {
    font-size: 18px;
    font-weight: 500;
    transition: 400ms;
  }
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    label {
      color: ${color.white};
      align-self: flex-start;
      margin-left: 5%;
    }
    input {
      color: ${color.black};
      height: 40px;
      padding-left: 10px;
      width: 90%;
      border-radius: 5px;
      border: none;
      background: ${color.white};
      &:disabled {
        cursor: wait;
        opacity: 0.7;
      }
    }
  }
  button {
    margin-top: 6px;
    height: 40px;
    width: 90%;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background: ${color.blueBright};
    color: ${color.white};
    &:disabled {
      cursor: wait;
      background: ${color.blueGray};
    }
  }
`;
