import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="w-full py-4 absolute top-0 left-0 right-0 z-50">
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Wishes Logo" width={46} height={46} className="mr-2" />
          <span className="text-lg font-semibold text-white hidden md:inline-block">Wishes</span>
        </Link>

        {/* Profile Link */}
        <Link href="/download" className="flex items-center gap-2">
          <span className="text-sm font-medium text-white hidden md:inline-block">Create Wishlist</span>
          <Image src="/images/profile.png" alt="Profile" width={36} height={36} className="rounded-full" />
        </Link>
      </div>
    </header>
  );
}
