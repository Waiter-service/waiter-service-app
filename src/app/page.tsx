import HomeContent from "@/components/home-content";
import UserHydration from "@/features/hydration/UserHydration";

export default function Home() {
  return (
    <UserHydration>
      <HomeContent />
    </UserHydration>
  );
}
