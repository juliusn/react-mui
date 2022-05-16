import React from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";

export const UserProfileContext = createContext({ userProfile: null, loadingUserProfile: true });

export const useUserProfileContext = () => {
  const context = useContext(UserProfileContext);
  if (!context) throw new Error("useUserContext must be used within a UserContextProvider.");
  return context;
};

const UserProfileContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loadingUserProfile, setLoadingUserProfile] = useState(true);
  const [error, setError] = useState(null);
  const [authUser, loadingAuthState] = useAuthState(auth);
  const userProfileContext = { userProfile, loadingUserProfile, error };

  useEffect(() => {
    if (loadingAuthState) return;

    if (!authUser) {
      setUserProfile();
      setLoadingUserProfile(false);
      return;
    }

    function handleNext(snapshot) {
      setUserProfile({
        id: snapshot.id,
        ...snapshot.data(),
      });
      setLoadingUserProfile(false);
    }

    function handleError(error) {
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
