import {useState, useEffect} from "react";
import {Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {FontAwesome} from "@expo/vector-icons";
import {router} from "expo-router";

import {useGlobalContext} from "@/context/global-provider";
import {db} from "@/lib/firebase";
import IconButton from "@/components/icon-button";
import Chat from "@/components/chat";

const Home = () => {
  const {user} = useGlobalContext();

  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    const userQuery = query(
      collection(db, "chat"),
      where("users", "array-contains", user?.uid)
    );
    const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
      const foundChats: any[] = [];
      querySnapshot.forEach((doc) => {
        foundChats.push({id: doc.id, ...doc.data()});
      });
      setChats(foundChats);
    });
    return () => {
      unsubscribe();
    };
  }, [user.uid, db]);

  return (
    <SafeAreaView className="min-h-screen bg-white dark:bg-black">
      <View className="absolute bottom-24 right-10">
        <IconButton
          icon={<FontAwesome name="plus-circle" color="white" size={36} />}
          containerStyles="bg-blue-700"
          handlePress={() => router.push("/search")}
        />
      </View>
      <Text className="text-xl font-bold text-black dark:text-white mb-5 p-3">
        All Chats
      </Text>
      {chats.length === 0 ? (
        <Text className="text-center font-bold text-red-800 mt-5">
          No chat found.
        </Text>
      ) : (
        chats.map((chat) => (
          <Chat key={chat.id} chat={chat} currentUser={user.uid} />
        ))
      )}
    </SafeAreaView>
  );
};

export default Home;
