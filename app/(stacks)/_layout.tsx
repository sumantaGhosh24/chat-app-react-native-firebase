import {Stack} from "expo-router";

import {useGlobalContext} from "@/context/global-provider";

const StackLayout = () => {
  const {user} = useGlobalContext();

  return (
    <>
      <Stack>
        <Stack.Screen
          name="message/[id]"
          options={{headerShown: false}}
          redirect={!user}
        />
        <Stack.Screen
          name="search"
          options={{presentation: "modal"}}
          redirect={!user}
        />
      </Stack>
    </>
  );
};

export default StackLayout;
