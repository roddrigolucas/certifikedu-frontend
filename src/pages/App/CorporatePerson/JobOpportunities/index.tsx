import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { PuffLoader } from 'react-spinners';

import {
  CourseSchemaNaturalPerson,
  CourseSchemaNaturalPersonType,
} from '@/pages/App/NaturalPerson/Courses/View/validation/schema';

import useProfile from '@/hooks/core/useProfile';

import CardsSectionJob from './Cards';

export default function JobOppurtinityCards() {
  const { jobsOpportunity } = useProfile();

  const form = useForm<CourseSchemaNaturalPersonType>({
    resolver: zodResolver(CourseSchemaNaturalPerson),
    mode: 'onChange',
  });

  return (
    <div className="z-90 flex  flex-col rounded-lg  bg-white ">
      <div className="w-full text-center">
        <PuffLoader loading={jobsOpportunity.isFetching} />
      </div>
      {!jobsOpportunity.isFetching && <CardsSectionJob form={form} />}
    </div>
  );
}
