'use client'

import * as SignIn from '@clerk/elements/sign-in'
import { GlobalError, Connection, Field, Label, Input, FieldError, Link } from '@clerk/elements/common'
import Image from 'next/image'

export default function SignInPage() {
  return (
    <div className="min-h-screen grid w-full items-center bg-zinc-100 px-4 font-mono text-sm">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="mx-auto w-full sm:w-96 space-y-6 bg-white px-4 py-8 border-4 border-black shadow-[4px_4px_0_#000]"
        >
          <header className="text-center flex flex-col items-center justify-center">
            <Image src={'/logo.png'} alt='logo' width={40} height={40} />
            <h1 className="mt-3 text-base font-bold tracking-wide text-black uppercase font-game">
              Sign in to Clover
            </h1>
          </header>

          <GlobalError className="block text-sm text-red-500" />

          {/* GOOGLE LOGIN */}
          <Connection
            name="google"
            className="flex w-full items-center justify-center gap-3 px-4 py-2 bg-yellow-400 border-2 border-black shadow-[4px_4px_0_#000] active:translate-y-0.5 active:shadow-none font-bold"
          >
            <span className="text-black">Login with Google</span>
          </Connection>

          {/* EMAIL & PASSWORD */}
          <div className="space-y-4">
            <Field name="identifier" className="space-y-1">
              <Label className="font-bold text-black uppercase font-game">
                Email
              </Label>
              <Input
                type="email"
                required
                className="w-full px-3 py-2 bg-white border-2 border-black shadow-[3px_3px_0_#000] outline-none focus:border-yellow-500"
              />
              <FieldError className="text-sm text-red-500" />
            </Field>

            <Field name="password" className="space-y-1">
              <Label className="font-bold text-black uppercase font-game  ">
                Password
              </Label>
              <Input
                type="password"
                required
                className="w-full px-3 py-2 bg-white border-2 border-black shadow-[3px_3px_0_#000] outline-none focus:border-yellow-500"
              />
              <FieldError className="text-sm text-red-500" />
            </Field>
          </div>

          {/* SUBMIT BUTTON */}
          <SignIn.Action
            submit
            className="w-full px-4 py-2 bg-yellow-400 border-2 border-black shadow-[4px_4px_0_#000] active:translate-y-0.5 active:shadow-none text-black font-bold uppercase"
          >
            Sign In
          </SignIn.Action>

          <p className="text-center text-xs text-black">
            No account?{' '}
            <Link
              navigate="sign-up"
              className="font-bold underline underline-offset-2 hover:text-yellow-600"
            >
              Create an account
            </Link>
          </p>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  )
}
