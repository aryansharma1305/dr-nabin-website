import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import FloatingSocial from "../components/FloatingSocial.jsx";
import CustomCursor from "../components/CustomCursor.jsx";
import { books, profile } from "./pageContent.js";
import { submitBookOrder } from "../api/book-orders.js";
import book1 from "../assets/book-1.jpeg";
import book2 from "../assets/book-2.jpeg";
import book3 from "../assets/book-3.jpeg";

const bookImages = {
  "book-1.jpeg": book1,
  "book-2.jpeg": book2,
  "book-3.jpeg": book3,
};

const schema = z.object({
  bookId: z.string().min(1, "Select a book"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1").max(20, "Please contact directly for bulk orders"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(5, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
});

export default function Books() {
  const [selectedBookId, setSelectedBookId] = useState(books[0]?.id || "");
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      bookId: selectedBookId,
      quantity: 1,
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const selectedBook = useMemo(() => books.find((book) => book.id === selectedBookId) || books[0], [selectedBookId]);

  function chooseBook(bookId) {
    setSelectedBookId(bookId);
    setValue("bookId", bookId, { shouldValidate: true });
    setSubmitted(false);
  }

  async function onSubmit(data) {
    const book = books.find((item) => item.id === data.bookId);
    await submitBookOrder({
      ...data,
      bookTitle: book?.title || data.bookId,
    });
    setSubmitted(true);
  }

  return (
    <div className="bg-background text-on-background min-h-screen overflow-x-hidden">
      <div className="grain-overlay"></div>
      <div className="fixed inset-0 z-0 pointer-events-none aurora-bg opacity-60"></div>
      <FloatingSocial />
      <Navbar />

      <main className="relative z-10 pt-32 md:pt-40 pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <section className="mb-20">
          <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase block mb-5">Published Books</span>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-end">
            <div className="md:col-span-8">
              <h1 className="font-display-sm text-display-sm md:text-[72px] md:leading-[80px] text-on-surface mb-6">
                Books by <span className="text-gradient-gold">Dr. Nabin Kumar Yadav</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                Radiology books for practical reporting, imaging interpretation, and structured learning across XRAY, CT, and USG.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-primary/30 bg-surface-container-low/60 backdrop-blur-xl font-mono-technical text-mono-technical text-primary">
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                Book order system enabled
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-section-gap">
          {books.map((book) => (
            <article className="glass-panel rounded-2xl overflow-hidden border border-primary/20 group hover:border-primary/60 transition-all duration-500" key={book.id}>
              <div className="aspect-[3/4] bg-surface-container-low overflow-hidden">
                <img alt={book.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" src={bookImages[book.image]} />
              </div>
              <div className="p-6">
                <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">{book.category}</span>
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-3 mb-2">{book.title}</h2>
                <p className="font-mono-technical text-mono-technical text-on-surface-variant mb-4">{book.subtitle}</p>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6">{book.description}</p>
                <button
                  className="w-full bg-primary text-on-primary font-label-caps text-label-caps px-6 py-3 rounded-full hover:bg-primary-fixed transition-colors"
                  onClick={() => chooseBook(book.id)}
                  type="button"
                >
                  Order This Book
                </button>
              </div>
            </article>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          <div className="lg:col-span-5 glass-panel rounded-2xl p-8 sticky top-28">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Selected Book</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-4 mb-3">{selectedBook.title}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">{selectedBook.description}</p>
            <div className="mt-6 aspect-[3/4] rounded-xl overflow-hidden bg-surface-container-low">
              <img alt={selectedBook.title} className="w-full h-full object-cover" src={bookImages[selectedBook.image]} />
            </div>
          </div>

          <form className="lg:col-span-7 glass-panel rounded-2xl p-8 md:p-10 space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Book Order Form</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-3">Place an Order Request</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                The order will be sent to {profile.name}&apos;s team for availability and delivery confirmation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField error={errors.bookId?.message} label="Book">
                <select className="form-input w-full py-3 font-body-md text-body-md bg-transparent" {...register("bookId")} onChange={(event) => chooseBook(event.target.value)}>
                  {books.map((book) => (
                    <option className="bg-surface text-on-surface" key={book.id} value={book.id}>
                      {book.title}
                    </option>
                  ))}
                </select>
              </FormField>
              <FormField error={errors.quantity?.message} label="Quantity">
                <input className="form-input w-full py-3 font-body-md text-body-md" min="1" type="number" {...register("quantity")} />
              </FormField>
              <FormField error={errors.name?.message} label="Full Name">
                <input className="form-input w-full py-3 font-body-md text-body-md" type="text" {...register("name")} />
              </FormField>
              <FormField error={errors.email?.message} label="Email">
                <input className="form-input w-full py-3 font-body-md text-body-md" type="email" {...register("email")} />
              </FormField>
              <FormField error={errors.phone?.message} label="Phone">
                <input className="form-input w-full py-3 font-body-md text-body-md" type="tel" {...register("phone")} />
              </FormField>
              <FormField className="md:col-span-2" error={errors.address?.message} label="Delivery Address">
                <textarea className="form-input w-full py-3 font-body-md text-body-md resize-none" rows="4" {...register("address")}></textarea>
              </FormField>
            </div>

            {submitted && (
              <div className="rounded-xl border border-primary/20 bg-primary/10 p-4 font-body-md text-body-md text-on-surface">
                Book order request received. The team will contact you for confirmation.
              </div>
            )}

            <button className="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded-full inline-flex items-center gap-3 magnetic-btn" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Submitting" : "Submit Book Order"}
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>
        </section>
      </main>

      <Footer />
      <CustomCursor />
    </div>
  );
}

function FormField({ children, className = "", error, label }) {
  return (
    <label className={`block ${className}`}>
      <span className="font-label-caps text-label-caps text-primary block mb-3">{label}</span>
      {children}
      {error && <p className="mt-2 text-error font-mono-technical text-mono-technical">{error}</p>}
    </label>
  );
}
