import React, { useEffect } from "react";
import { Button, Heading, Typography } from "@ensdomains/thorin";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useClient } from "../hooks/useClient";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const client = useClient();

  const navigate = useNavigate();
  useEffect(() => {
    if (client) {
      navigate("/selfintroduction");
    }
  }, [client]);
  return (
    <div className="h-screen ">
      {/* Navbar */}

      {/* Hero Section */}
      <div className="grid grid-cols-1 place-items-center mb-5">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-newsreader mt-12 mb-4">
            <span>Meet and collaborate with other designers. </span>{" "}
            <span className="text-blue-500">Grow your brand.</span>
          </h1>
          <div className="mb-8 text-center">
            {client ? <div>dsds</div> : <ConnectButton></ConnectButton>}
          </div>
        </div>

        {/* About */}
        <div className="grid grid-cols-1 place-items-left">
          <div className="mb-4">
            <Heading level="2" color="blue">
              Powerful Match Recommendations
            </Heading>
            <Typography fontVariant="base" color="inherit">
              Powered by Airstack and our custom match quiz to get you in touch
              with the right people.
            </Typography>
          </div>
          <div className="mb-4">
            <Heading level="2" color="blue">
              Secure image messaging
            </Heading>
            <Typography fontVariant="base" color="inherit">
              Send proofs and edits back and forth without worry. XMTP has your
              back.
            </Typography>
          </div>
          <div className="mb-4">
            <Heading level="2" color="blue">
              Integrated Socials
            </Heading>
            <Typography fontVariant="base" color="inherit">
              Share across your different platforms, saving your chats with
              every person you meet.
            </Typography>
          </div>
        </div>

        {/* Image at the bottom */}
        <div className="mb-10">
          <img
            src="https://xmtp.org/assets/images/secure-web3-messaging-post-dac3c5bbeae5d9b68db780841b4c85d3.png"
            alt="xmtp-img"
            className=""
          ></img>
        </div>

        {/* About */}
        <div className="grid grid-cols-1 place-items-left ml-10">
          <div className="mb-4">
            <div className="w-50 mb-5">
              <Typography fontVariant="large" weight="bold" color="inherit">
                WHAT WE BELIEVE
              </Typography>
            </div>
            <span className="w-50 mb-5">
              <Typography fontVariant="heading3" color="inherit">
                At MakerMeet, we believe in making the experience intuitive,
                painless, and meeting other interesting people in the design
                space fun.{" "}
              </Typography>
            </span>
            <div className="w-50 mb-10">
              <Typography fontVariant="heading3" color="inherit">
                Built by creatives who want to get more out of meeting people,
                MakerMeet is the solution to chatting and sharing more easily in
                Web3 than ever before.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
