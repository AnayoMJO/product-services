import Hero from "@/components/hero";
import InfoBoxes from "../components/infoBoxes";
import HomePageProperties from "@/components/homeProperties";
import FeaturedProperties from "@/components/featuredProperties";

export default function Home() {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomePageProperties />
    </>
  );
}
