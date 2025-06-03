import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut, signIn } from "@/auth"

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
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Create
            </Link>
          </li>
          {session?.user ? (
            <>
              <li>
                <Image
                    src={session.user.image ?? "/default-avatar.png"}
                    alt="User Avatar"
                    className="card-image rounded-lg mt-3"
                    width={30}
                    height={30}
                    style={{ objectFit: "cover", height: "30px" }}
                />
              </li>
              <li>
                <Link href={`/user/${session.user.id ?? ''}`} className="text-gray-700 hover:text-blue-600 font-medium transition">
                  {session.user.name || "Guest User"}
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-700 hover:text-blue-600 font-medium transition">
                  Profile
                </Link>
              </li>
              <li>
                <form action={async () => {
                  'use server'
                  await signOut({ redirectTo: "/" })
                }}>
                  <button type="submit" className="rounded-2xl border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100 transition font-semibold">
                    Logout
                  </button>
                </form>
              </li>
            </>
          ) : (
            <li>
              <form action={async () => {
                'use server'
                await signIn('github')
              }}>
                <button type="submit" className="rounded-2xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition font-semibold shadow-sm">
                  Login
                </button>
              </form>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
