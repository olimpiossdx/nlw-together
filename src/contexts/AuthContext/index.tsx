import { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';
import { auth, firebase } from '../../Services/firebase';

export const AuthContext = createContext({} as AuthContextType);

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  SignInWithGoogleAsync: () => Promise<void>;
};

type AuthContextProps = {
  children: ReactNode;
};

const AuthContextProvider = (props: AuthContextProps) => {
  const [user, setUser] = useState<User>();

  const FillUser = (user: firebase.User | null) => {
    if (user) {
      const { displayName, photoURL, uid } = user;

      if (!displayName || !photoURL) {
        throw new Error('Missing informaotion from Google Account.');
      };

      setUser({ id: uid, name: displayName, avatar: photoURL });
    };
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      FillUser(user)
    });

    return () => {
      unsubscribe()
    };
  }, []);

  const SignInWithGoogleAsync = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await firebase.auth().signInWithPopup(provider);

    FillUser(result.user);
  };


  return (<AuthContext.Provider value={{ user, SignInWithGoogleAsync: SignInWithGoogleAsync }}>
    {props.children}
  </AuthContext.Provider>);
};

export { AuthContextProvider };