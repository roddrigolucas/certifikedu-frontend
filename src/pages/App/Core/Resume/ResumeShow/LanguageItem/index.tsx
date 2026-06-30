import {
  getResumeLabel,
  IResumeLanguage,
  resumeLanguageLevelOptions,
} from '@/services/entities/app/core/resume/model';

import { LanguageType } from '../../CreateOrUpdate/validation/schema';

export function LanguageItem({ language }: { language: IResumeLanguage | LanguageType }) {
  const { language: langName, level } = language;

  return (
    <div className="flex items-center gap-4">
      <p className="text-lg font-medium">{langName}</p>
      <p className="text-sm text-gray-600">{getResumeLabel(level, resumeLanguageLevelOptions)}</p>
    </div>
  );
}
