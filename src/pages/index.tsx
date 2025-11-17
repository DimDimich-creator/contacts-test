import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ContactsLayout from "@/features/contacts/components/contacts-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const title = "Contact Manager App";
  const description =
    "Manage all your contacts efficiently with our React + Next.js contact manager app. Add, edit, delete, and filter your contacts easily.";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="contacts, contact manager, React, Next.js, CRM"
        />
        <meta name="author" content="Dmitry Kashirin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`${geistSans.variable} ${geistMono.variable} d-flex flex-column min-vh-100`}
      >
        <Header />
        <ContactsLayout />
        <Footer />
      </div>
    </>
  );
}
