import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isSignedIn } = useUser();

  const router = useRouter();

  useEffect(() => {
    if (isSignedIn === false) {
      router.replace("login");
    } else {
      setIsLoading(false);
    }
  }, [isSignedIn, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default AuthGuard;
