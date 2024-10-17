import {useState} from "react";
import {View, Text, ToastAndroid, ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Link} from "expo-router";

import FormField from "@/components/form-field";
import CustomButton from "@/components/custom-button";
import {signIn} from "@/lib/firebase-functions";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (form.email === "" || form.password === "") {
      return ToastAndroid.showWithGravityAndOffset(
        "Fill all fields!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }

    setLoading(true);

    try {
      await signIn(form);

      ToastAndroid.showWithGravityAndOffset(
        "User login successfully.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        "Something went wrong, try again later.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-screen">
      <ScrollView>
        <View className="w-full flex justify-center h-screen px-4 bg-white dark:bg-black">
          <Text className="text-2xl font-bold my-5 text-black dark:text-white">
            User Login
          </Text>
          <FormField
            title="Email address"
            placeholder="Enter your email address"
            value={form.email}
            handleChangeText={(text: any) => setForm({...form, email: text})}
            otherStyles="mb-3"
          />
          <FormField
            title="Password"
            placeholder="Enter your password"
            value={form.password}
            handleChangeText={(text: any) => setForm({...form, password: text})}
            type="password"
            otherStyles="mb-3"
          />
          <CustomButton
            title="Login"
            handlePress={handleSubmit}
            containerStyles="bg-blue-700 disabled:bg-blue-300"
            isLoading={loading}
          />
          <View className="flex justify-center pt-5 flex-row gap-2 mb-5">
            <Text className="text-lg text-black dark:text-white">
              Don&apos;t have an account?
            </Text>
            <Link
              href="/register"
              className="text-lg font-semibold text-blue-700"
            >
              Register
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
