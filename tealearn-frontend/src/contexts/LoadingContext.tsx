import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface LoadingContextData {
  loading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

const LoadingContext =
  createContext<LoadingContextData>(
    {} as LoadingContextData
  );

export function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [loading,
    setLoading] =
    useState(false);

  function showLoader() {
    setLoading(true);
  }

  function hideLoader() {
    setLoading(false);
  }

  useEffect(() => {

    window.addEventListener(
      "show-loader",
      showLoader
    );

    window.addEventListener(
      "hide-loader",
      hideLoader
    );

    return () => {

      window.removeEventListener(
        "show-loader",
        showLoader
      );

      window.removeEventListener(
        "hide-loader",
        hideLoader
      );

    };

  }, []);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        showLoader,
        hideLoader,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(
    LoadingContext
  );
}