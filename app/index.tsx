// app/index.js
import { View, Text, Image, Pressable } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { Link, router, useRouter } from "expo-router";
import ThemedButton from "@/components/ThemedButton";

export default function HomeScreen() {
  const { company, selectCompany } = useTheme();
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: company.theme.primary,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image source={company.logo} style={{ width: 100, height: 100 }} />
      <Text style={{ color: company.theme.darkGray, fontSize: 24 }}>
        {company.name}
      </Text>

      <View style={{ marginTop: 20 }}>
        <Pressable
          onPress={() => selectCompany("alpha")}
          style={{
            backgroundColor: company.theme.primary,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Switch to Alfa
          </Text>
        </Pressable>
        <Pressable
          onPress={() => selectCompany("beta")}
          style={{
            backgroundColor: company.theme.primary,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Switch to Beta
          </Text>
        </Pressable>
        {/* Go to Onboarding page */}
        <Link href="/onboarding" asChild>
          <Pressable>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Go to Onboarding
            </Text>
          </Pressable>
        </Link>

        <ThemedButton
          title="Go to Activity Page"
          onPress={() => {
            router.push("/feedback");
          }}
        />
        <ThemedButton
          title="Go to Mapprogress"
          onPress={() => router.push("/mapprogress")}
        />
        
      </View>
    </View>
  );
}
