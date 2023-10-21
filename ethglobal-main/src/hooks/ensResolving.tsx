import axios from "axios";
import { useEffect, useState } from "react";


export function useMyENSResolver(address: string) {
  const [ensName, setEnsName] = useState("");
  const [ensAvatar, setEnsAvatar] = useState("");
  useEffect(() => {
    async function getEnsData() {
      const response = await axios.get(
        `https://api.ensideas.com/ens/resolve/${address}`
      )
      const displayName = response.data.displayName
      setEnsName(displayName.includes(".eth") ? displayName : null)
      setEnsAvatar(response.data.avatar)
    }
    if (address) {
      getEnsData()
    }
  }, [address]);
  return [ensName, ensAvatar];
}