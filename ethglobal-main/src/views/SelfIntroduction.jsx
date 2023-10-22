import React, { useEffect, useState } from "react";
import {
  Card,
  Heading,
  Field,
  Select,
  Button,
  Textarea,
  CheckboxRow,
} from "@ensdomains/thorin";
import { useClient } from "../hooks/useClient";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const categories = [
  "Graphic Designer",
  "Illustrator",
  "Animator",
  "UI/UX",
  "Web Design",
];

// const ExperienceLevel = () => {
//   return (
// <Card>
// <Select
//   options={[
//     { value: "0", label: "Beginner" },
//     { value: "1", label: "Intermediate" },
//     { value: "2", label: "Advanced" },
//   ]}
//   placeholder="Choose Experience..."
//   size="small"
// />
// </Card>
//   );
// };

const FlattenedDataTable = ({ flattenedData }) => {
  return (
    <div className="mt-6 flex flex-col gap-5">
      <div className="">
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Wallet Address</th>
              <th>Profile Bio</th>
            </tr>
          </thead>
          <tbody>
            {flattenedData.map((item, index) => (
              <tr key={index}>
                <td>{item.profileName}</td>
                <td>{item.walletAddress}</td>
                <td>{item.profileBio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};


const SelfIntroduction = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [interest, setInterest] = useState([]);
  const [bio, setBio] = useState("");
  const [query, setQuery] = useState("");
  const [showResults, setShowResults]= useState(false);
  let [flattenedData,setFlattenedData] = useState([])
  const client = useClient();
  const base_url = "http://127.0.0.1:5000";

  
  

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      query,
      wallet_address: client.address,
    };
    try {
      console.log(formData);
      
      // const response = await axios.post(`${base_url}/users/new`, formData);
      if(true){
        setShowResults(true);
        setFlattenedData([
          {
            "profileName": "tamrat.lens",
            "profileBio": "Crypto enthusiast and DeFi explorer.",
            "walletAddress": "0x8f96aa1c4cbd3b10786c81031c6917bcac66423c"
          },
          {
            "profileName": "anddao.lens",
            "profileBio": "Blockchain developer specializing in smart contracts.",
            "walletAddress": "0x88a769db5055b046c9a45db621978bbec65c8c5b"
          },
          {
            "profileName": "damarnez.lens",
            "profileBio": "Digital artist with a focus on NFTs.",
            "walletAddress": "0x88a769db5055b046c9a45db621978bbec65c8c5b"
          },
          {
            "profileName": "stani.lens",
            "profileBio": "Finance expert diving into decentralized platforms.",
            "walletAddress": "0x7241dddec3a6af367882eaf9651b87e1c7549dff"
          },
          {
            "profileName": "lilgho.lens",
            "profileBio": "Aspiring trader and crypto community member.",
            "walletAddress": "0x7241dddec3a6af367882eaf9651b87e1c7549dff"
          },
          {
            "profileName": "lensofficial.lens",
            "profileBio": "Official account for all things Lens.",
            "walletAddress": "0x7241dddec3a6af367882eaf9651b87e1c7549dff"
          },
          {
            "profileName": "dydymoon.lens",
            "profileBio": "Gamer turned crypto miner, exploring new opportunities.",
            "walletAddress": "0x806346b423ddb4727c1f5dc718886430aa7ce9cf"
          }
        ])
       
      }
      // if (response.status === 200) {
      //   console.log("Form submitted successfully", response.data);
      //   // navigate("/curatedmeet");
      //   setShowResults(true);
      // } else {
      //   console.log("Error submitting form", response.status, response);
      // }
    } catch (error) {
      console.log("Network error", error);
    }
  };

  return (
    <div className="p-10">
      <Heading className="mx-auto items-center">Who would you like to meet?</Heading>
      <form className="" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          
          <div className="">
            <Textarea
              id="Query"
              label="Elaborate in as much detail as possible"
              defaultValue={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className=" ">
            <Button onClick={handleSubmit}>Next Step</Button>
          </div>
        </div>
      </form>


     { showResults ? (
    <div className="mt-6 flex flex-col gap-5">
      <FlattenedDataTable flattenedData={flattenedData} />
    </div>
  ) : null}

  </div>

      
  );
};

export default SelfIntroduction;
