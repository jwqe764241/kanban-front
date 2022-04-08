import { useEffect } from "react";
import { useRouter } from "next/router";

const useDetectRouteChange = (isOpen, onChange) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => {
      onChange();
    };

    if (isOpen) {
      router.events.on("routeChangeStart", handleRouteChange);
    }

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.asPath]);
};

export default useDetectRouteChange;
