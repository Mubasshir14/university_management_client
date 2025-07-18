import Footer from "@/components/Shared/Footer";


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>

      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
