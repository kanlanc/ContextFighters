import { ReactElement, useEffect, useState } from "react";
import { Conversation, Message } from "../model/db";
import { useMessages } from "../hooks/useMessages";
import MessageComposerView from "./MessageComposerView";
import MessageCellView from "./MessageCellView";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { useLiveConversation } from "../hooks/useLiveConversation";
import ConversationSettingsView from "./ConversationSettingsView";
import { ContentTypeId } from "@xmtp/xmtp-js";
import { ContentTypeReaction } from "@xmtp/content-type-reaction";
import { useReadReceipts } from "../hooks/useReadReceipts";
import { Avatar, Tag, Card, Profile, RecordItem, FlameSVG, EnsSVG } from '@ensdomains/thorin'
import { shortAddress } from "../util/shortAddress";
import { useMyENSResolver } from "../hooks/ensResolving";
import { useUser } from "../hooks/useUser";

const appearsInMessageList = (message: Message): boolean => {
  if (ContentTypeReaction.sameAs(message.contentType as ContentTypeId)) {
    return false;
  }

  return true;
};

export default function ConversationView({
  conversation,
}: {
  conversation: Conversation;
}): ReactElement {
  const liveConversation = useLiveConversation(conversation);
  const user = useUser(conversation.peerAddress)

  const messages = useMessages(conversation);

  const showReadReceipt = useReadReceipts(conversation);

  const [isShowingSettings, setIsShowingSettings] = useState(false);
  const [ensName, ensAvatar] = useMyENSResolver(conversation.peerAddress);

  // useEffect(() => {
  //   window.scrollTo({ top: 100000, behavior: "smooth" });
  // }, [messages?.length]);

  return (
    <div className="p-4 pb-20">

      <div className="flex p-4">
        <div className="mt-10 flex flex-col gap-5">
          {messages?.length == 0 && <p>No messages yet.</p>}
          {messages ? (
            messages.reduce((acc: ReactElement[], message: Message, index) => {
              const showRead = showReadReceipt && index === messages.length - 1;
              if (appearsInMessageList(message)) {
                acc.push(
                  <MessageCellView
                    key={message.id}
                    message={message}
                    readReceiptText={showRead ? "Read" : undefined}
                  />
                );
              }

              return acc;
            }, [] as ReactElement[])
          ) : (
            <span>Could not load messages</span>
          )}
        </div>
        <MessageComposerView conversation={conversation} />
        <div className="bg-white rounded-xl  fixed w-64 right-5 shadow-sm flex flex-col content-center items-center text-center gap-5 p-10">
          <div className="w-32">
            <Avatar src={ensAvatar}></Avatar>
          </div>
          <RecordItem icon={<FlameSVG />} inline value={conversation.peerAddress}>
            {shortAddress(conversation.peerAddress)}
          </RecordItem>
          {ensName &&
            <RecordItem icon={<EnsSVG />} inline value={ensName}>
              {ensName}
            </RecordItem>
          }
          {
            user &&
            (
              <Tag>{user?.category}</Tag>
            )
          }
          {
            user &&
            (
              <div>
                {user?.bio}
              </div>
            )
          }

        </div>
      </div>
    </div>
  );
}
