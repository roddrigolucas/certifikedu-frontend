import SignUpLayout from '@/components/layouts/authentication/SignUp';

import ProfileTabRaw from './Tab';

export default function ProfilePageRaw() {
  return (
    <SignUpLayout>
      <h1 className="text-xl font-bold">Informações Adicionais</h1>
      <ProfileTabRaw />
      <span className="w-full py-8 text-center text-sm text-slate-600">
        Seus dados serão utilizados de acordo com os termos gerais da LGPD
      </span>
    </SignUpLayout>
  );
}
