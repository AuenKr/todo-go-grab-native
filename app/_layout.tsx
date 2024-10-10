import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { RecoilRoot } from "recoil";

export default function Layout() {
  return (
    <>
      <RecoilRoot>
        <SafeAreaView>
          <Slot />
        </SafeAreaView>
      </RecoilRoot>
    </>
  );
}
