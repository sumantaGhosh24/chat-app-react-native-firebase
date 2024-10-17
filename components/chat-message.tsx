import {useState, useEffect} from "react";
import {Text, ScrollView} from "react-native";
import {collection, doc, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "@/lib/firebase";

import Message from "./message";

interface ChatMessageProps {
  messageId: string;
  currentUser: string;
  currentUserAvatar: string;
  chatId: string;
}

interface ChatUserProps {
  avatar: string;
  username: string;
  firstName: string;
  lastName: string;
}

const ChatMessage = ({
  messageId,
  currentUser,
  currentUserAvatar,
  chatId,
}: ChatMessageProps) => {
  const [message, setMessage] = useState<any[]>([]);
  const [chatUser, setChatUser] = useState<ChatUserProps>();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "chat", `${messageId}`),
      (docSnap) => {
        const users = docSnap.data()?.users;
        if (users) {
          const chatUser = users?.filter((el: string) => el !== currentUser);
          onSnapshot(doc(db, "user", `${chatUser}`), (docSnap) => {
            if (docSnap.exists()) {
              setChatUser({
                avatar: docSnap.data().avatar,
                username: docSnap.data().username,
                firstName: docSnap.data().firstName,
                lastName: docSnap.data().lastName,
              });
            }
          });
        }
      }
    );
    return () => {
      unsubscribe();
    };
  }, [messageId, currentUser, db]);

  useEffect(() => {
    const messageQuery = query(
      collection(db, "chat", `${messageId}`, "messages"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(messageQuery, (querySnapshot) => {
      setMessage(querySnapshot.docs.map((doc) => doc.data()));
    });
    return () => {
      unsubscribe();
    };
  }, [db, messageId]);

  if (typeof chatUser === "undefined") return <Text>Loading...</Text>;

  return (
    <ScrollView className="mt-4 h-[500px] overflow-y-scroll p-5">
      {message.map((message, i) => (
        <Message
          key={i}
          currentUser={currentUser}
          currentUserAvatar={currentUserAvatar}
          chat={chatId}
          chatUserAvatar={chatUser?.avatar}
          type={message.type}
          user={message.user}
          message={message.message}
          timestamp={message.timestamp}
        />
      ))}
    </ScrollView>
  );
};

export default ChatMessage;
