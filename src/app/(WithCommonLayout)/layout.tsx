import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-blue-600/10 to-purple-600/10">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
