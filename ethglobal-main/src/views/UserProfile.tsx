import { ReactElement, useEffect, useState } from "react";
import { useClient } from "../hooks/useClient";
import { Field, Tag, Typography, Avatar, RecordItem, EnsSVG, Heading, Textarea, Button, Select, Card, WalletSVG, FlameSVG } from '@ensdomains/thorin'
import { useMyENSResolver } from "../hooks/ensResolving";
import axios from "axios";


export default function UserProfile(): ReactElement {
  const client = useClient();
  const base_url = "http://127.0.0.1:5000";

  const [ensName, ensAvatar] = useMyENSResolver(client?.address);
  const [editingBio, setEditingBio] = useState(false)
  const categoryOptions = ["Web Designer", "Web Developer"].map((c) => ({ value: c, label: c }))
  const [user, setUser] = useState({
    "bio": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam dignissimos saepe facere velit illum commodi, esse praesentium, odio adipisci temporibus laboriosam vitae, magnam rerum! Voluptates beatae repellat et consequuntur. Quia!",
    "category": "Web Designer",
    "preferences": ["Web Designer", "Web Developer"],
  })
  useEffect(() => {
    async function fetchUser() {
      if (client?.address) {
        const response = await axios.get(`${base_url}/user/${client.address}`)
        setUser(response.data)
      }

    }
    fetchUser()
  }, [client?.address])
  return (
    <div className="flex p-10 flex-col gap-5">
      <div>
        <Heading>Profile</Heading>
      </div>
      < div className="flex gap-5">
        <div className="w-32">
          <Avatar src={ensAvatar || undefined} label="userAvatar"></Avatar>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <RecordItem icon={<FlameSVG />} inline value={client?.address}>
              {client?.address}
            </RecordItem>
          </div>
          {ensName &&
            <div>
              <RecordItem icon={<EnsSVG />} inline value={ensName}>
                {ensName}
              </RecordItem>
            </div>

          }
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Textarea label="Bio" disabled={!editingBio} value={user.bio} onChange={(e) => { setUser(u => { return { ...u, bio: e.target.value } }) }} />
        <Button className=" w-10" size="small" onClick={() => setEditingBio(!editingBio)} colorStyle={editingBio ? "greenPrimary" : "bluePrimary"}>{editingBio ? "Save" : "Edit"}</Button>
      </div>
      <div>
        <Select
          label="Category"
          options={categoryOptions}
          value={user.category}
          onChange={(e) => { setUser(u => { return { ...u, category: e.target.value } }) }}
          size="small"
        />
      </div>
      <div>
        <Field label="User preferences">
          <div className="flex gap-2">
            {user.preferences.map((p) => <Tag key={p}>{p}</Tag>)}
          </div>
        </Field>
      </div>
    </div>
  )

}