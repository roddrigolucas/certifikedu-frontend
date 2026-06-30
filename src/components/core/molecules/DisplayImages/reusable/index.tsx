import { UseFormReturn } from 'react-hook-form';

import { FormTypePermission } from '@/pages/App/LegalPerson/Users/View/Dialogs/PermissioningDialog/models';
import { Checkbox } from '@/components/shared/ui/checkbox';
import { FormControl, FormField, FormItem } from '@/components/shared/ui/form';

import { cn } from '@/utils';
import { getImageUrl } from '@/utils/image';

interface IProps {
  backgroundId: string;
  backgroundUrl: string;
  isPublic: string;
}

interface ImageComponentProps {
  image: IProps;
  form: UseFormReturn<FormTypePermission>;
  isVerso: boolean;
}

const ImageComponentReusable: React.FC<ImageComponentProps> = ({ image, form, isVerso }) => {
  return (
    <>
      {!isVerso && (
        <>
          <FormField
            control={form.control}
            name="items"
            render={({ field }) => (
              <FormItem key={image.backgroundId}>
                <FormControl>
                  <div className="relative p-1">
                    <div
                      onClick={() => field.onChange([image.backgroundId])}
                      className="cursor-pointer"
                    >
                      <img
                        src={getImageUrl(image.backgroundUrl)}
                        alt="Visa"
                        className={cn('rounded-xl border-2 transition-all ease duration-500', {
                          'opacity-40 hover:opacity-100': !field.value?.includes(
                            image.backgroundId,
                          ),
                        })}
                      />
                    </div>
                    <Checkbox
                      checked={field.value?.includes(image.backgroundId)}
                      onCheckedChange={() => {
                        return field.onChange([image.backgroundId]);
                      }}
                      className="absolute bottom-4 left-4 size-5 bg-white"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </>
      )}
      {isVerso && (
        <>
          <FormField
            control={form.control}
            name="itemsInverse"
            render={({ field }) => (
              <FormItem key={image.backgroundId}>
                <FormControl>
                  <div className="relative p-1">
                    <div
                      onClick={() => field.onChange([image.backgroundId])}
                      className="cursor-pointer"
                    >
                      <img
                        src={getImageUrl(image.backgroundUrl)}
                        alt="Visa"
                        className={cn('rounded-xl border-2 transition-all ease duration-500', {
                          'opacity-40 hover:opacity-100': !field.value?.includes(
                            image.backgroundId,
                          ),
                        })}
                      />
                    </div>
                    <Checkbox
                      checked={field.value?.includes(image.backgroundId)}
                      onCheckedChange={() => {
                        return field.onChange([image.backgroundId]);
                      }}
                      className="absolute bottom-4 left-4 size-5 bg-white"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </>
      )}
    </>
  );
};

export default ImageComponentReusable;
