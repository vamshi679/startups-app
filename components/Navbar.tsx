import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut, signIn } from "@/auth"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {Button} from "@/components/ui/button";

const Navbar = async () => {
  const session = await auth()
  console.log("Navbar session:", session)
  return (
    <nav className="bg-white shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          <Link href="/">
            Startups App
          </Link>
        </h1>
        <ul className="flex items-center space-x-4">
          <li>
            <Button variant="outline" asChild>
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Create
              </Link>
            </Button>
          </li>
          {session?.user ? (
              <>
                <li>
                  <Popover>
                    <PopoverTrigger>
                      <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
                        <Image
                            src={session.user.image ?? "/default-avatar.png"}
                            alt="User Avatar"
                            className="rounded-full"
                            width={35}
                            height={35}
                            style={{ objectFit: "cover" }}
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 mt-2 p-2">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-3 px-3 py-2">
                          <Image
                              src={session.user.image ?? "/default-avatar.png"}
                              alt="User Avatar"
                              className="rounded-full"
                              width={40}
                              height={40}
                              style={{ objectFit: "cover" }}
                          />
                          <div className="flex flex-col">
                            <span className="font-medium">{session.user.name || "Guest User"}</span>
                            <span className="text-sm text-gray-500 truncate">{session.user.email}</span>
                          </div>
                        </div>

                        <div className="border-t border-gray-200">
                          <Link
                              href={`/user/${session.user.id ?? ''}`}
                              className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-md transition"
                          >
                            <span>Your Profile</span>
                          </Link>

                          <Link
                              href="/profile"
                              className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-md transition"
                          >
                            <span>Settings</span>
                          </Link>

                          <form action={async () => {
                            'use server'
                            await signOut({ redirectTo: "/" })
                          }}>
                            <button
                                type="submit"
                                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition"
                            >
                              Sign out
                            </button>
                          </form>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </li>
              </>
          ) : (
            <li>
              <form action={async () => {
                'use server'
                await signIn('github')
              }}>
                <Button variant="secondary" type="submit" className="bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition font-semibold shadow-sm">
                  Login
                </Button>
              </form>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
