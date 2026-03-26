import { useState, useCallback } from "react";

export function useToast() {
  const [toasts, setToasts] = useState<any[]>([]);

  const toast = useCallback(({ title, description, variant }: any) => {
    setToasts((t) => [...t, { title, description, variant }]);
    console.log("Toast:", title, description);
    alert(`${title}: ${description}`);
  }, []);

  return { toast, toasts };
}
