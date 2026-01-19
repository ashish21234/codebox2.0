'use client'

import * as SignUp from '@clerk/elements/sign-up'
import { GlobalError, Field, Label, Input, FieldError, Link } from '@clerk/elements/common'
import Image from 'next/image'

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid w-full items-center bg-zinc-900 px-4 font-mono text-sm text-white">
      <SignUp.Root>

        {/* ================= START STEP ================= */}
        <SignUp.Step
          name="start"
          className="mx-auto w-full sm:w-96 space-y-6 bg-zinc-800 px-4 py-8 border-4 border-black shadow-[8px_8px_0_#000]"
        >
           <header className="text-center flex flex-col items-center justify-center">
            <Image src={'/logo.png'} alt='logo' width={40} height={40} />
            <h1 className="mt-3 text-base font-bold tracking-wide text-white uppercase font-game">
             Create Account
            </h1>
          </header>

          <GlobalError className="block text-sm text-red-500" />

          <div className="space-y-4">
            <Field name="emailAddress" className="space-y-1">
              <Label className="font-bold text-yellow-400 uppercase">
                Email
              </Label>
              <Input
                type="email"
                required
                className="w-full px-3 py-2 bg-zinc-900 border-2 border-black shadow-[3px_3px_0_#000] outline-none focus:border-yellow-400 text-white"
              />
              <FieldError className="text-sm text-red-500" />
            </Field>

            <Field name="password" className="space-y-1">
              <Label className="font-bold text-yellow-400 uppercase">
                Password
              </Label>
              <Input
                type="password"
                required
                className="w-full px-3 py-2 bg-zinc-900 border-2 border-black shadow-[3px_3px_0_#000] outline-none focus:border-yellow-400 text-white"
              />
              <FieldError className="text-sm text-red-500" />
            </Field>
          </div>

          <SignUp.Action
            submit
            className="w-full px-4 py-2 bg-yellow-400 border-2 border-black shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-none text-black font-bold uppercase"
          >
            Sign Up
          </SignUp.Action>

          <p className="text-center text-xs text-yellow-400">
            Already have an account?{' '}
            <Link
              navigate="sign-in"
              className="font-bold underline underline-offset-2 hover:text-yellow-300"
            >
              Sign in
            </Link>
          </p>
        </SignUp.Step>

        {/* ================= VERIFICATION STEP ================= */}
        <SignUp.Step
          name="verifications"
          className="mx-auto w-full sm:w-96 space-y-6 bg-zinc-800 px-4 py-8 border-4 border-black shadow-[8px_8px_0_#000]"
        >
          <header className="text-center">
            <h1 className="mt-3 text-base font-bold tracking-wide text-yellow-400 uppercase font-game">
              Verify Email
            </h1>
          </header>

          <GlobalError className="block text-sm text-red-500" />

          <Field name="code" className="space-y-1">
            <Label className="font-bold text-yellow-400 uppercase">
              Email Code
            </Label>
            <Input
              type="otp"
              required
              className="w-full px-3 py-2 bg-zinc-900 border-2 border-black shadow-[3px_3px_0_#000] outline-none focus:border-yellow-400 text-white"
            />
            <FieldError className="text-sm text-red-500" />
          </Field>

          <SignUp.Action
            submit
            className="w-full px-4 py-2 bg-yellow-400 border-2 border-black shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-none text-black font-bold uppercase"
          >
            Verify
          </SignUp.Action>

          <p className="text-center text-xs text-yellow-400">
            Already have an account?{' '}
            <Link
              navigate="sign-in"
              className="font-bold underline underline-offset-2 hover:text-yellow-300"
            >
              Sign in
            </Link>
          </p>
        </SignUp.Step>

        {/* ================= CONTINUE STEP ================= */}
        <SignUp.Step
          name="continue"
          className="mx-auto w-full sm:w-96 space-y-6 bg-zinc-800 px-4 py-8 border-4 border-black shadow-[8px_8px_0_#000]"
        >
          <header className="text-center">
            <h1 className="mt-3 text-base font-bold tracking-wide text-yellow-400 uppercase font-game ">
              Continue Registration
            </h1>
          </header>

          <GlobalError className="block text-sm text-red-500" />

          <Field name="username" className="space-y-1">
            <Label className="font-bold text-yellow-400 uppercase">
              Username
            </Label>
            <Input
              type="text"
              required
              className="w-full px-3 py-2 bg-zinc-900 border-2 border-black shadow-[3px_3px_0_#000] outline-none focus:border-yellow-400 text-white"
            />
            <FieldError className="text-sm text-red-500" />
          </Field>

          <SignUp.Action
            submit
            className="w-full px-4 py-2 bg-yellow-400 border-2 border-black shadow-[4px_4px_0_#000] active:translate-y-[2px] active:shadow-none text-black font-bold uppercase"
          >
            Continue
          </SignUp.Action>

          <p className="text-center text-xs text-yellow-400">
            Already have an account?{' '}
            <Link
              navigate="sign-in"
              className="font-bold underline underline-offset-2 hover:text-yellow-300"
            >
              Sign in
            </Link>
          </p>
        </SignUp.Step>

      </SignUp.Root>
    </div>
  )
}
