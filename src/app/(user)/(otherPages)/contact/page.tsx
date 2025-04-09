import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "@/components/contact/ContactForm";
import Footer1 from "@/components/footers/Footer1";

import Header1 from "@/components/headers/Header1";
import { contacts } from "@/utils/constants";

export const metadata = {
  title:
    "Liên hệ || Double Fish Sport Group,Sport Equipments Manufacturer-doublefish.com.vn",
  description:
    "Double Fish Sport Group,Sport Equipments Manufacturer-doublefish.com.vn",
};
export default function ContactPage() {
  return (
    <>
      <Header1 />
      <main className="page-wrapper">
        <Breadcrumb />

        <div className="mb-2 pb-2"></div>
        <section className="container contact-us">
          <h2 className="page-title">Liên hệ</h2>
          <div className="row g-4">
            <div className="col-lg-6">
              {contacts.map((item, index) => (
                <div key={index}>
                  <h2 className="mb-4">{item.place}</h2>

                  <div className="card shadow-sm mb-4">
                    <div className="card-body">
                      <div className="mb-3">
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-primary">
                            <i className="bi bi-geo-alt fs-4 me-3"></i>
                          </div>
                          <div>
                            <p className="text-muted small mb-0">Địa chỉ</p>
                            <p className="mb-0">{item.address}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-primary">
                            <i className="bi bi-envelope fs-4 me-3"></i>
                          </div>
                          <div>
                            <p className="text-muted small mb-0">Email</p>
                            <a className="text-decoration-none">
                              {item?.email}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="d-flex">
                          <div className="flex-shrink-0 text-primary">
                            <i className="bi bi-telephone fs-4 me-3"></i>
                          </div>
                          <div>
                            <p className="text-muted small mb-0">
                              Số điện thoại
                            </p>
                            <a className="text-decoration-none">
                              {item?.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </section>
      </main>
      <div className="mb-5 pb-xl-5"></div>
      <Footer1 />
    </>
  );
}
