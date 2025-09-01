import NonDashboardNavBar from "@/components/NonDashboardNavBar";
import Image from "next/image";
import Landing from "./(nondashboard)/landing/page";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNavBar/>
      <main className="nondashboard-layout__main">
        <Landing/>
      </main>
      <Footer/>
      </div>
  );
}
