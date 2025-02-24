// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Swal from "sweetalert2";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Hardcoded credentials for admin (replace with secure method later)
//     if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
//       localStorage.setItem("isLoggedIn", "true"); // Store login status
//       router.push("admin/dashboard"); // Redirect to dashboard
//     } else {
//     Swal.fire({
//       title: "Error",
//       text: "Invalid credentials",
//       icon: "error",
//     })
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
//         <h2 className="text-xl font-bold mb-4">Admin Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="block w-full mb-3 p-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="block w-full mb-4 p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded w-full"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";

import { useRouter } from "next/navigation";

const Admin = () => {
  const { user } = useUser();
  const router = useRouter();
  if (
    user &&
    user.primaryEmailAddress?.emailAddress ===
      process.env.NEXT_PUBLIC_ADMIN_EMAIL
  ) {
    router.push("/admin/dashboard");
  }
  return (
    <div>
      <h1>admin login</h1>
      <SignedOut>
        <SignInButton>
          <button>login with clerk</button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <SignOutButton>
          <button>sign out with clerk</button>
        </SignOutButton>
      </SignedIn>
    </div>
  );
};

export default Admin;
