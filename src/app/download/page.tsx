import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function DownloadPage() {
  return (
    <main className="flex min-h-screen flex-col hero-gradient">
      <Header />

      <section className="py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Get Wishes Now
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Download the Wishes App and start your wishlist instantly—no sign-ups,
            no delays. Capture your wishes the moment inspiration strikes.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link href="https://wishes.app/ios">
              <Image
                src="/images/app-store.png"
                alt="Download on the App Store"
                width={180}
                height={60}
                className="h-auto"
              />
            </Link>

            <Link href="https://wishes.app/android">
              <Image
                src="/images/play-store.png"
                alt="Get it on Google Play"
                width={180}
                height={60}
                className="h-auto"
              />
            </Link>
          </div>

          <div className="relative max-w-4xl mx-auto mt-8">
            <Image
              src="/images/app-preview.png"
              alt="App Preview"
              width={1000}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm flex flex-col items-center">
              <Image
                src="/images/ios-qr.png"
                alt="iOS QR Code"
                width={200}
                height={200}
                className="mb-6"
              />
              <h3 className="text-xl font-semibold mb-2">
                Download Wishes for iOS
              </h3>
              <p className="text-muted-foreground text-center">
                on the App Store
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm flex flex-col items-center">
              <Image
                src="/images/android-qr.png"
                alt="Android QR Code"
                width={200}
                height={200}
                className="mb-6"
              />
              <h3 className="text-xl font-semibold mb-2">
                Download Wishes for Android
              </h3>
              <p className="text-muted-foreground text-center">
                on Google Play
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
