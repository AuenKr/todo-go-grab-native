// import { SafeAreaView } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Drawer from "expo-router/drawer";
import CustomDrawer from "@/components/CustomDrawer";

export default function Layout() {
  return (
    <RecoilRoot>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          drawerContent={CustomDrawer}
          screenOptions={{
            title: "Todo",
          }}
        />
      </GestureHandlerRootView>
    </RecoilRoot>
  );
}
