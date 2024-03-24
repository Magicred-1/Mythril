import ContentLanding from "@/components/landingPage/content-landing";
import TopLanding from "@/components/landingPage/top-landing";
import Redirection from "@/components/redirection";

export default function Home() {
  return (
    <>
      <Redirection />

      <TopLanding />
      <ContentLanding />
    </>
  );
}
