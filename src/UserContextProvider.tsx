import { doc, onSnapshot, FirestoreError, DocumentSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";

interface UserProfileContextFields{
  userProfile: UserProfileData | null
  loadingUserProfile: boolean
  error?: FirestoreError
}
export const UserProfileContext = createContext<UserProfileContextFields>({ userProfile: null, loadingUserProfile: true });

export const useUserProfileContext = () => {
  const context = useContext(UserProfileContext);
  if (!context) throw new Error("useUserContext must be used within a UserContextProvider.");
  return context;
};
interface UserProfileFields {
  email: string
  name: string
}
export interface UserProfileData extends UserProfileFields {
  id: string
}
interface UserProfileContextProviderProps {
  children: React.ReactNode
}
const UserProfileContextProvider = ( { children }: UserProfileContextProviderProps) => {
  const [userProfile, setUserProfile] = useState<UserProfileData|null>(null);
  const [loadingUserProfile, setLoadingUserProfile] = useState(true);
  const [error, setError] = useState<FirestoreError|undefined>();
  const [authUser, loadingAuthState] = useAuthState(auth);
  const userProfileContext = { userProfile, loadingUserProfile, error };

  useEffect(() => {
    if (loadingAuthState) return;

    if (!authUser) {
      setUserProfile(null);
      setLoadingUserProfile(false);
      return;
    }

    function handleNext( snapshot : DocumentSnapshot<UserProfileFields>) {
      const data = snapshot.data();
      if(!data) return;
      setUserProfile({
        id: snapshot.id,
        name: data.email,
        email: data.name,
      });
      setLoadingUserProfile(false);
    }

    function handleError(error: FirestoreError) {
      setLoadingUserProfile(false);
      setError(error);
    }

    setLoadingUserProfile(true);
    const unsub = onSnapshot(doc(db, "users", authUser?.uid), handleNext, handleError);
    return () => {
      unsub();
    };
  }, [authUser, loadingAuthState]);

  return (
    <UserProfileContext.Provider value={userProfileContext}>{children}</UserProfileContext.Provider>
  );
};

export default UserProfileContextProvider;
