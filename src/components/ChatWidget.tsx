import React, { useState } from "react";
import Chat from "./Chat";

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  return <div className="fixed right-4 bottom-4 z-50">
      {open && <div className="mb-3 w-[320px] h-[420px] sm:w-[380px] sm:h-[520px] drop-shadow-xl">
          <Chat onClose={() => setOpen(false)} />
        </div>}
    </div>;
};

export default ChatWidget;