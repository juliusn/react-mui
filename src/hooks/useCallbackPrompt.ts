import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useBlocker } from "./useBlocker";
import type { Transition } from "history";

export function useCallbackPrompt(when: boolean) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  //eslint-disable-next-line
  const [lastLocation, setLastLocation] = useState<any>(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const cancelNavigation: () => void = useCallback(() => {
    setShowPrompt(false);
  }, []);

  // handle blocking when user click on another route prompt will be shown
  const handleBlockedNavigation = useCallback(
    (nextLocation: Transition) => {
      // in if condition we are checking next location and current location are equals or not
      if (
        !confirmedNavigation &&
        //eslint-disable-next-line
        nextLocation.location.pathname !== location.pathname
      ) {
        setShowPrompt(true);
        setLastLocation(nextLocation);
        return false;
      }
      return true;
    },
    [confirmedNavigation, location],
  );
  const confirmNavigation = useCallback(() => {
    setShowPrompt(false);
    setConfirmedNavigation(true);
  }, []);

  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      //eslint-disable-next-line
      navigate(lastLocation.location.pathname);

      // Clean-up state on confirmed navigation
      setConfirmedNavigation(false);
    }
  }, [navigate, confirmedNavigation, lastLocation]);

  useBlocker(handleBlockedNavigation, when);

  return { showPrompt, confirmNavigation, cancelNavigation };
}
