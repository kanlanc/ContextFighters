
import { Profile, Button } from '@ensdomains/thorin'
import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function LoggedInProfile({
  children,
}: PropsWithChildren<unknown>): ReactElement {

  return (
    <div>
      <ConnectButton></ConnectButton>
    </div>
  )
}