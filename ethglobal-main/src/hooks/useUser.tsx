import axios from "axios";
import { useEffect, useState } from "react";

export function useUser(address: string | null) {
  const base_url = "http://127.0.0.1:5000";
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    async function getUser() {
      const response = await axios.get(
        `${base_url}/user/${address}`
      );
      console.log(response.data);
      setUser(response.data);
    }
    getUser()
  }, [address])
  return user
}