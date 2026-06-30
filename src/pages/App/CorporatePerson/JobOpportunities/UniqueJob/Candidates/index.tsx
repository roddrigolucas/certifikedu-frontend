import { columns } from '@/components/pages/App/CorporatePerson/JobOpportunity/Candidates/columns';
import { DataTable } from '@/components/shared/DataTable';

import { Candidate } from '@/services/entities/app/corporatePerson/jobOpportunity/types';

interface ICandidate {
  candidates: Candidate[];
}

export default function RecommendedCandidates({ candidates }: ICandidate) {
  return (
    <div className="flex flex-col gap-4">
      <DataTable
        filterColumn="name"
        columns={columns}
        data={candidates}
        headerOptions={{
          filter: true,
          toolbar: true,
        }}
      />
    </div>
  );
}
