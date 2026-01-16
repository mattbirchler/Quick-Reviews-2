import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e]">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: 'bg-blue-500 hover:bg-blue-600',
            card: 'bg-[#1e1e2e] border border-white/10',
            headerTitle: 'text-white',
            headerSubtitle: 'text-white/60',
            socialButtonsBlockButton: 'bg-white/5 border-white/10 text-white hover:bg-white/10',
            formFieldLabel: 'text-white/80',
            formFieldInput: 'bg-white/5 border-white/10 text-white',
            footerActionLink: 'text-blue-400 hover:text-blue-300',
          },
        }}
      />
    </div>
  );
}
