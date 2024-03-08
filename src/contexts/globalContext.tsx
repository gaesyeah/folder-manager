import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";
import { FolderType, UserData } from "../vite-env";
import { key } from "../utils/localStorage";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { route } from "../utils/routes";

type GlobalContextType = {
  folders: FolderType[] | null;
  setFolders: Dispatch<SetStateAction<FolderType[] | null>>;
  fetchFolders: () => Promise<void>;
  userData: UserData | null;
  config: {
    headers: {
      Authorization: string;
    };
  };
  isLoading: boolean;
  baseUrl: string;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
export default GlobalContext;

export const GlobalContextProvider: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const navigate = useNavigate();

  const [folders, setFolders] = useState<FolderType[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const memoValues = useMemo(() => {
    const userDataString = localStorage.getItem(key.userData);
    const userData: UserData | null = userDataString
      ? JSON.parse(userDataString)
      : null;
    const config = {
      headers: {
        Authorization: `Bearer ${userData?.token}`,
      },
    };

    const baseUrl = import.meta.env.VITE_API_URL;
    const fetchFolders = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get<FolderType[]>(
          `${baseUrl}/directories`,
          config
        );
        setIsLoading(false);
        setFolders(data);
      } catch (err: unknown) {
        const { message, code } = err as AxiosError;
        console.log(message, code);
        navigate(route.login);
      }
    };

    return {
      folders,
      setFolders,
      fetchFolders,
      userData,
      config,
      isLoading,
      baseUrl,
    };
  }, [folders, setFolders, navigate, isLoading]);

  return (
    <GlobalContext.Provider value={memoValues}>
      {children}
    </GlobalContext.Provider>
  );
};
