import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import SingleProduct12 from "@/components/singleProduct/SingleProduct12";

interface Props {
  params?: { id?: number };
}

export default function ProductDetailsPage1(props: Props) {
  const { params } = props;
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <div className="mb-md-1 pb-md-3"></div>
        <SingleProduct12 id={params?.id} />
        {/* <RelatedSlider /> */}
      </main>
      <Footer1 />
    </>
  );
}
