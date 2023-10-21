import { useClient, useSetClient } from "../hooks/useClient";
import LoggedInProfile from "./LoggedInProfile";
import LoggedOutProfile from "./LoggedOutProfile";

import { Link } from "react-router-dom";

export default function LoggedInNavbar({
  children,
}: PropsWithChildren<unknown>): ReactElement {
  const client = useClient();
  return (
    <nav className="fixed w-full z-20 top-0 left-0 border-b backdrop-blur-md bg-opacity-30 bg-white shadow-sm dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            MakerMeet
          </span>
        </Link>
        <div className="flex md:order-2">
          {client ? (
            <LoggedInProfile></LoggedInProfile>
          ) : (
            <LoggedOutProfile></LoggedOutProfile>
          )}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link className="text-gray-900" to="curatedmeet">
                Matchmaker ✨
              </Link>
            </li>
            <li>
              <Link className="text-gray-900" to="/messages">
                Messages
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    // <Header>
    //   <div className="flex justify-between">
    //     <div>MakerMeet</div>
    //     <div>
    //       <div style={{ maxWidth: '50px' }}>
    //         <Profile
    //           address={client.address}
    //           avatar={ensAvatar?.data || undefined}
    //           ensName={ensName?.data || undefined}
    //           dropdownItems={[
    //             {
    //               label: 'Copy Address',
    //               color: 'text',
    //               onClick: () => copyToClipBoard(client.address),
    //             }
    //           ]}
    //         />
    //       </div>
    //     </div>
    //     <div>
    //       <Button onClick={logout}>Logout</Button>
    //     </div>
    //   </div>
    // </Header>
  );
}
