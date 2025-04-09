import Breadcrumb from "@/components/Breadcrumb";
import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import SingleProduct12 from "@/components/singleProduct/SingleProduct12";

interface Props {
  params?: { slug?: string };
}

export default function Product(props: Props) {
  const { params } = props;

  return (
    <>
      <Header1 />
      <main className="page-wrapper" style={{ paddingBottom: 64 }}>
        <Breadcrumb />
        <div className="mb-md-1 pb-md-3"></div>
        <SingleProduct12 slug={params?.slug} />
      </main>
      <Footer1 />
    </>
  );
}
