import { ReactElement, useState } from "react";
import { Message } from "../model/db";
import { useReplies } from "../hooks/useReplies";
import ReplyComposer from "./ReplyComposer";
import { MessageContent } from "./MessageCellView";
import { shortAddress } from "../util/shortAddress";
import { Tag } from '@ensdomains/thorin'
import { useMyENSResolver } from "../hooks/ensResolving";

export default function MessageRepliesView({
  message,
}: {
  message: Message;
}): ReactElement {
  const replies = useReplies(message);

  const [ensName, ensAvatar] = useMyENSResolver(message.senderAddress);
  const [isShowingReplies, setIsShowingReplies] = useState(false);

  return isShowingReplies ? (
    <div className="py-2">
      {replies.length > 0 && (
        <div className="mb-2 flex flex-col gap-1">
          {replies.map((message) => (
            <div className="flex text-xs space-x-1 items-center gap-1" key={message.xmtpID}>
              <Tag colorStyle={message.sentByMe ? "greenSecondary" : "bluePrimary"}>{ensName || shortAddress(message.senderAddress)}</Tag>
              <MessageContent message={message} />
            </div>
          ))}
        </div>
      )}

      <ReplyComposer
        inReplyToMessage={message}
        dismiss={() => setIsShowingReplies(false)}
      />
    </div>
  ) : (
    <div>
      <button
        className="text-blue-600 text-xs"
        onClick={() => setIsShowingReplies(true)}
      >
        {replies.length == 0
          ? "Reply"
          : `${replies.length} repl${replies.length == 1 ? "y" : "ies"}`}
      </button>
    </div>
  );
}
