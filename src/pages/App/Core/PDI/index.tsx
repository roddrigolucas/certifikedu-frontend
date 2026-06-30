import { zodResolver } from '@hookform/resolvers/zod';
import { AirplayIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import {
  CourseSchemaNaturalPerson,
  CourseSchemaNaturalPersonType,
} from '@/pages/App/NaturalPerson/Courses/View/validation/schema';
import { ApplicationLayout } from '@/components/layouts/app';

import CardsSectionJob from './Cards';

export default function PDICards() {
  const form = useForm<CourseSchemaNaturalPersonType>({
    resolver: zodResolver(CourseSchemaNaturalPerson),
    mode: 'onChange',
  });

  return (
    <ApplicationLayout icon={AirplayIcon} title="Planos de Desenvolvimento Individual" hideCredits>
      <div className="z-90 flex  flex-col rounded-lg  bg-white ">
        {<CardsSectionJob form={form} />}
      </div>
    </ApplicationLayout>
  );
}
