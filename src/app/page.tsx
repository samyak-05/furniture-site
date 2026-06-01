import OurProjects from "@/components/OurProjects";
import OurStoryTeaser from "@/components/OurStoryTeaser";
import Welcome from "@/components/Welcome";
import MainFooter from "@/components/MainFooter";

export default async function Home() {
  return (
    <div>
     <Welcome />
     <OurProjects />
     <OurStoryTeaser />
      <MainFooter />
    </div>
  );
}
