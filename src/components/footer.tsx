import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full py-12 border-t border-gray-100">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between gap-8 items-center">
          <div>
            <div className="text-sm text-center md:text-left text-gray-600 mb-4">
              © 2025 Wishes. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-4 mb-6">
              <Link href="https://wishes.app/ios" className="flex items-center">
                <Image
                  src="/images/app-store.png"
                  alt="App Store"
                  width={120}
                  height={36}
                />
              </Link>
              <Link href="https://wishes.app/android" className="flex items-center">
                <Image
                  src="/images/play-store.png"
                  alt="Play Store"
                  width={120}
                  height={36}
                />
              </Link>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
              <Link href="/terms" className="text-gray-600 hover:text-primary">Terms</Link>
              <Link href="/privacy" className="text-gray-600 hover:text-primary">Privacy</Link>
              <Link href="/help" className="text-gray-600 hover:text-primary">Help</Link>
              <Link href="/contact" className="text-gray-600 hover:text-primary">Contact</Link>
            </div>
            <div className="flex space-x-4 justify-center md:justify-end">
              <Link href="https://www.instagram.com/getwishesapp/" aria-label="Instagram">
                <Image
                  src="/images/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </Link>
              <Link href="https://facebook.com/yourwishesapp" aria-label="Facebook">
                <Image
                  src="/images/facebook.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </Link>
              <Link href="https://www.tiktok.com/@wishesapp" aria-label="TikTok">
                <Image
                  src="/images/tiktok.svg"
                  alt="TikTok"
                  width={24}
                  height={24}
                />
              </Link>
              <Link href="https://www.threads.net/@getwishesapp" aria-label="Threads">
                <Image
                  src="/images/threads.svg"
                  alt="Threads"
                  width={24}
                  height={24}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
