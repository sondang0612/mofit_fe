import FadeInWrapper from "@/components/animations/FadeInWrapper";
import LoginFormPopup from "@/components/common/LoginFormPopup";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import HeroV1 from "@/components/homes/home-1/HeroV1";
import MainCategories from "@/components/homes/home-1/MainCategories";
import NewArrivals from "@/components/homes/home-1/NewArrivals";
import TryNow from "@/components/homes/home-1/TryNow";

export const metadata = {
  title: "Home 1 || Uomo eCommerce React Nextjs Template",
  description: "Uomo eCommerce React Nextjs Template",
};

export default function HomePage1() {
  return (
    <>
      <div>
        <Header1 />

        <main className="page-wrapper">
          <div className="scroll-section">
            <HeroV1 />
          </div>
          <div className="mb-4 pb-4 mb-xl-5 pb-xl-5"></div>

          <FadeInWrapper>
            <div className="scroll-section">
              <MainCategories />
            </div>
          </FadeInWrapper>
          <div className="mb-4 pb-4 mb-xl-5 pb-xl-5"></div>

          <FadeInWrapper>
            <div className="scroll-section">
              <TryNow />
            </div>
          </FadeInWrapper>
          <div className="mb-4 pb-4 mb-xl-5 pb-xl-5"></div>

          <FadeInWrapper>
            <div className="scroll-section">
              <NewArrivals />
            </div>
          </FadeInWrapper>
          <div className="mb-4 pb-4 mb-xl-5 pb-xl-5"></div>
        </main>
        <Footer1 />
        <LoginFormPopup />
      </div>
    </>
  );
}
