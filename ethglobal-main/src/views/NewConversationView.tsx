import { FormEvent, ReactElement, createRef, useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
// import Button from "../components/Button";
import { startConversation } from "../model/conversations";
import { useClient } from "../hooks/useClient";
import { useEnsAddress } from 'wagmi'
import { Button, Toast, Card, Input, Spinner } from '@ensdomains/thorin'

const addressRegex = /^0x[a-fA-F0-9]{40}$/
function isAddress(address: string): boolean {
  return addressRegex.test(address)
}

export default function NewConversationView(): ReactElement {
  const client = useClient()!;
  const [input, setInput] = useState('')
  const [validAddress, setValidAddress] = useState('' as string | undefined | null)
  const debouncedInput = input

  // We're using an uncontrolled component here because we don't need to update
  // anything as the user is typing.
  //
  // See https://react.dev/learn/manipulating-the-dom-with-refs#best-practices-for-dom-manipulation-with-refs
  const addressInputRef = createRef<HTMLInputElement>();

  const [error, setError] = useState<string | undefined>();
  // const [addresses, setAddresses] = useState<string[]>([]);

  const navigate = useNavigate();

  // const address = addressInputRef.current?.value || "";
  const { data: ensAddress, isLoading: ensAddressIsLoading } = useEnsAddress({
    name: debouncedInput.includes('.') ? debouncedInput : undefined,

  })

  useEffect(() => {
    setValidAddress(input !== debouncedInput
      ? undefined
      : isAddress(debouncedInput)
        ? debouncedInput
        : ensAddress)
  }, [input, debouncedInput, ensAddress])
  function validateAddress(): string | undefined {
    const address = addressInputRef.current?.value || "";

    if (address.trim().length == 0) {
      addressInputRef.current?.classList.add("horizontal-shake");
      setTimeout(() => {
        addressInputRef.current?.classList.remove("horizontal-shake");
      }, 1000);

      addressInputRef.current?.focus();

      return;
    }

    return address;
  }



  async function onSubmit() {
    // const address = validateAddress();
    if (!validAddress) return;

    try {
      const conversation = await startConversation(client, validAddress);
      navigate(`/c/${conversation.topic}`);
    } catch (e) {
      const error = String(e)
      setError(error);
    }
  }

  // function onAdd() { const address = validateAddress();
  // if (!address) {
  //   return;
  // }

  // setAddresses((addresses) => [address, ...addresses]);

  // addressInputRef.current!.value = "";
  // addressInputRef.current?.focus();
  // }

  return (
    <div className="p-4 pt-14">

      <Card title="Who do you want to message?" >
        <Input
          label="Address or ENS Name"
          placeholder="nick.eth"
          suffix={ensAddressIsLoading && <Spinner />}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button disabled={!validAddress} colorStyle="greenPrimary" onClick={onSubmit}>
          Start Conversation
        </Button>
      </Card>
      {/* <div>
        <form onSubmit={onSubmit} className="space-y-4">

          <label className="block">
            <span className="block text-xs my-2">
              Who {addresses.length > 0 && "else "}do you want to message with?
            </span>

            <input
              autoFocus
              ref={addressInputRef}
              type="text"
              className="border p-2 w-full md:w-1/2 rounded shadow-sm dark:bg-black"
              placeholder="Enter an address"
            ></input>
          </label>
          <label className="block space-x-4">
            <Button type="submit">Start Conversation</Button>
          </label>
        </form>
      </div> */}
      <Toast
        description={error}
        open={!!error}
        title=""
        variant="desktop"
        onClose={() => setError(undefined)}
      >
      </Toast>
    </div>
  );
}
