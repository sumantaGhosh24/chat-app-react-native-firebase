import {useState, useEffect} from "react";
import {Text, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {collection, limit, query, where, onSnapshot} from "firebase/firestore";

import UserCard from "@/components/user-card";
import {db} from "@/lib/firebase";
import {useGlobalContext} from "@/context/global-provider";
import FormField from "@/components/form-field";

const SearchUser = () => {
  const {user} = useGlobalContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const usersRef = collection(db, "user");
    const userQuery = query(
      usersRef,
      where("username", "!=", user?.username),
      where("username", ">=", searchQuery),
      limit(4)
    );
    const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
      const foundUsers: any[] = [];
      querySnapshot.forEach((doc) => {
        foundUsers.push({id: doc.id, ...doc.data()});
      });
      setSearchResults(foundUsers);
    });
    return () => {
      unsubscribe();
    };
  }, [searchQuery]);

  return (
    <SafeAreaView className="min-h-screen bg-white dark:bg-black p-3">
      <ScrollView>
        <Text className="mb-4 text-2xl font-semibold text-black dark:text-white">
          Search Users
        </Text>
        <FormField
          handleChangeText={(text: any) => setSearchQuery(text)}
          placeholder="Search users"
          title="Search user"
          value={searchQuery}
          otherStyles="mb-5"
        />
        {searchResults.length < 1 ? (
          <Text className="pt-5 text-sm font-bold text-red-700">
            No user found.
          </Text>
        ) : (
          searchResults.map((search) => (
            <UserCard
              key={search.id}
              currentUser={user.uid}
              id={search.id}
              avatar={search.avatar}
              username={search.username}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchUser;
