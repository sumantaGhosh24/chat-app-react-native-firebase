import {createContext, useContext, useEffect, useState, ReactNode} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {onSnapshot, doc} from "firebase/firestore";

import {auth, db} from "@/lib/firebase";

interface GlobalContextProps {
  user: any;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const useGlobalContext = (): GlobalContextProps => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({children}) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(doc(db, "user", user.uid), (doc) => {
          setUser({...doc.data(), uid: doc.id});
        });

        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <GlobalContext.Provider value={{user}}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
