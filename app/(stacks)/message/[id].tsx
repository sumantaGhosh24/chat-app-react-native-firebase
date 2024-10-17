import {useState, useEffect} from "react";
import {View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {doc, onSnapshot} from "firebase/firestore";
import {Link, useLocalSearchParams} from "expo-router";

import ChatHeader from "@/components/chat-header";
import ChatInput from "@/components/chat-input";
import ChatMessage from "@/components/chat-message";
import {useGlobalContext} from "@/context/global-provider";
import {db} from "@/lib/firebase";

interface ChatProps {
  id: string;
  timestamp: any;
  users: string[];
}

const Message = () => {
  const {id} = useLocalSearchParams();

  const {user} = useGlobalContext();

  const [chat, setChat] = useState<ChatProps>();

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "chat", `${id}`), (docSnap) => {
      if (docSnap.exists()) {
        setChat({
          id: docSnap.id,
          timestamp: docSnap.data().timestamp,
          users: docSnap.data().users,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [db, id, user.uid]);

  if (typeof chat?.users === "undefined")
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );

  if (typeof id === "undefined")
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );

  if (chat?.users[0] !== user.uid && chat?.users[1] !== user.uid) {
    return (
      <SafeAreaView className="flex h-screen items-center justify-center bg-gray-100">
        <View className="w-4/6 rounded-lg bg-white p-8 text-center shadow-md">
          <Text className="mb-4 text-4xl font-semibold">
            Invalid Authentication!
          </Text>
          <Text className="mb-8 text-lg text-gray-600">
            Only participants of this chat can access this page.
          </Text>
          <Link href="/">
            <Text className="text-blue-500">Go back to the homepage</Text>
          </Link>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-white dark:bg-black">
      <ChatHeader messageId={String(id)} currentUser={user.uid} />
      <ChatMessage
        messageId={String(id)}
        currentUser={user.uid}
        currentUserAvatar={user.avatar}
        chatId={chat!.id}
      />
      <ChatInput chat={String(id)} user={user.uid} />
    </SafeAreaView>
  );
};

export default Message;
