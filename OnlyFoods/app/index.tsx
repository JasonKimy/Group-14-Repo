import { Redirect } from "expo-router";

export default function Index() {
  // on app launch, redirect to create-account
  return <Redirect href="/create-account" />;
}
