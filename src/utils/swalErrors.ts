import Swal from "sweetalert2";

export const genericSwalError = (message: string, code: string | undefined) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Ocorreu algum erro, tente novamente por favor",
  });
  console.log(message, code);
};
