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

const RoleSelectComponent = (props) => {
  const { selectedRole, setSelectedRole } = props;
  const navigate = useNavigate();
  const client = useClient();
  const base_url = "http://127.0.0.1:5000";

  useEffect(() => {
    const getMatch = async () => {
      try {
        const response = await axios.get(`${base_url}/user/${client.address}`);
        console.log(response.data);
        navigate("/curatedmeet");
      } catch (e) {
        console.log(e);
      }
    };
    getMatch();
  }, []);
  const handleCardClick = (role) => {
    console.log(selectedRole);
    setSelectedRole(role);
  };

  return (
    <div className="flex flex-wrap justify-between p-10 items-center rounded-lg border border-gray-300 ">
      {[
        {
          title: "Graphic Designer",
          image: "./graphic-design.png",
        },
        {
          title: "Illustrator",
          image: "./flag-garland.svg",
        },
        {
          title: "Animator",
          image: "./flash-circle-1.svg",
        },
        {
          title: "UI/UX",
          image: "./interface-ui-layout-app.svg",
        },
        {
          title: "Web Design",
          image: "./page.svg",
        },
      ].map((object, index) => (
        <div
          key={index}
          onClick={() => handleCardClick(object.title)}
          className={`transition-all duration-500 cursor-pointer ease-out bg-white bg-opacity-0 flex flex-col w-30 h-34 items-center ml-5 rounded-lg card p-3 ${
            selectedRole === object.title ? "bg-opacity-100 shadow-md " : ""
          }`}
        >
          <img
            src={`./${object.image}`}
            alt={object.title}
            className="w-24 h-24 mb-2"
          />
          <div className="text-center">{object.title}</div>
        </div>
      ))}
    </div>
  );
};

const SelfIntroduction = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [interest, setInterest] = useState([]);
  const [bio, setBio] = useState("");
  const [query, setQuery] = useState("");
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
      const response = await axios.post(`${base_url}/users/new`, formData);
      if (response.status === 200) {
        console.log("Form submitted successfully", response.data);
        navigate("/curatedmeet");
      } else {
        console.log("Error submitting form", response.status, response);
      }
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
    </div>
  );
};

export default SelfIntroduction;
