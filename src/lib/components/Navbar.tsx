


import Link from "next/link";
import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import UserAccountNav from "./UserAccountNav";
import NavItems from "./NavItems";
// import Cart from "./Cart";
import { getServerSession } from "next-auth";
import MobileNav from "./MobileNav";

export default async function Navbar() {
  const session = await getServerSession();

  return (
    <div className="sticky inset-x-0 top-0 z-50 h-16 bg-white">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <MobileNav />
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Image
                    src="/logo.png"
                    alt="strathmall logo"
                    width={150}
                    height={150}
                    className="h-22 w-22"
                  />
                </Link>
              </div>

              <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {!session && (
                    <>
                      <Link
                        href="/sign-in"
                        className={buttonVariants({
                          variant: "ghost",
                        })}
                      >
                        Sign in
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <Link
                        href="sign-in"
                        className={buttonVariants({
                          variant: "ghost",
                        })}
                      >
                        Create account
                      </Link>
                    </>
                  )}

                  {session && (
                    <>
                      {/* <UserAccountNav
                        user={{ ...session.user, hasShop: true }}
                      /> */}
                    </>
                  )}
                  <div className="ml-4 flow-root lg:ml-6">
                    {/* <Cart /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
