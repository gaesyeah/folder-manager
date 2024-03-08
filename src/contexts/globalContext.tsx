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

type FolderState = FolderType[] | null;
type GlobalContextType = {
  folders: FolderState;
  setFolders: Dispatch<SetStateAction<FolderState>>;
  fetchFolders: () => Promise<void>;
  paths: FolderState;
  setPaths: Dispatch<SetStateAction<FolderState>>;
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

  const [folders, setFolders] = useState<FolderState>(null);
  const [paths, setPaths] = useState<FolderState>([]);
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
      paths,
      setPaths,
      userData,
      config,
      isLoading,
      baseUrl,
    };
  }, [folders, setFolders, navigate, isLoading, paths]);

  return (
    <GlobalContext.Provider value={memoValues}>
      {children}
    </GlobalContext.Provider>
  );
};
