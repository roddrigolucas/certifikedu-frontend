import { UseFormReturn } from 'react-hook-form';

import { ICanvasConfigResponse } from '@/services/entities/app/legalPerson/canvas/types';

import { CanvasSchemaType } from '../../validation/schema';
import CanvasAPIKeyConfigurationForm from '../CanvasAPIKeyConfigurationForm';
import URLForm from '../CanvasInstanceForm';
import LTIConfigurationForm from '../LTIKeyConfigurationForm';

interface Props {
  form: UseFormReturn<CanvasSchemaType>;
  ltiConfigurationData: any;
  canvasConfiguration: ICanvasConfigResponse | undefined;
}

export default function ReviewForm({ form, ltiConfigurationData, canvasConfiguration }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">Instância Canvas</h3>
        <URLForm form={form} />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">Chave LTI</h3>
        <LTIConfigurationForm
          form={form}
          ltiConfigurationData={ltiConfigurationData}
          isReview={true}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-bold">Chave API Canvas</h3>
        <CanvasAPIKeyConfigurationForm
          form={form}
          canvasConfigResponse={canvasConfiguration}
          isReview={true}
        />
      </div>
    </div>
  );
}
