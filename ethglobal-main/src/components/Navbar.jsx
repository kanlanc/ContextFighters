import React from "react";
import { Button, Input, Heading, Typography } from '@ensdomains/thorin'

export default function Navbar() {
  return (
    <nav className="p-8">
      <div className="flex justify-between">
        <div
          className="font-bold flex flex-col items-left"
          style={{
            fontFamily: "DM Sans",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
            letterSpacing: "0.4px",
            background: "gradient-text",
            backgroundClip: "text",
          }}
        >
          <div
            className="text-xl mb-2 text-blue-500"
            style={{
              background: "gradient-text",
              fontSize: "40px",
            }}
          >
            MakerMeet
          </div>
          <div
            className="text-l"
            style={{
              background: "gradient-text",
              fontSize: "16px",
            }}
          >
            Connecting Creative Professionals
          </div>
        </div>
        <div className="flex w-80 space-x-3">
          <a href="#" className="text-black">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
          </svg>
            Messages
          </a>
          <a href="#" className="text-black">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
            My profile
          </a>
          <Button as="a" href="#" colorStyle="accentSecondary">Match Me</Button>
        </div>
      </div>
    </nav>
  );
}
