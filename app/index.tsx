import { StyleText } from "@/components/style";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_BACKEND_URL}/api/mobile/todo`
        );
        const result = await response.json();
        setResult(result);
      } catch (error) {}
    };
    fetchData();
  }, [text]);
  return (
    <ScrollView>
      <Text>Some text</Text>
      <View>
        <Text>Some more text</Text>
        <Image
          source={{
            uri: "https://reactnative.dev/docs/assets/p_cat2.png",
          }}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <TextInput
        onChangeText={setText}
        value={text}
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
        placeholder="You can type in me"
      />
      <Text>{text}</Text>
      <Text>{result ? JSON.stringify(result) : "Null value"}</Text>
      <Link href="/todo">Go to Todo</Link>
      <Link href="/label" className="bg-red-500">
        Go to Label
      </Link>
      <StyleText className="text-2xl font-bold">
        this is native wind quirk
      </StyleText>
    </ScrollView>
  );
}
