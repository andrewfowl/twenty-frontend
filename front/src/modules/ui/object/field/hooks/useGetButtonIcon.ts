import { useContext } from 'react';

import { IconPencil } from '@/ui/display/icon';
import { IconComponent } from '@/ui/display/icon/types/IconComponent';
import { isFieldRelation } from '@/ui/object/field/types/guards/isFieldRelation';

import { FieldContext } from '../contexts/FieldContext';
import { isFieldEmail } from '../types/guards/isFieldEmail';
import { isFieldLink } from '../types/guards/isFieldLink';
import { isFieldPhone } from '../types/guards/isFieldPhone';

export const useGetButtonIcon = (): IconComponent | undefined => {
  const { fieldDefinition } = useContext(FieldContext);

  if (!fieldDefinition) return undefined;

  if (
    isFieldLink(fieldDefinition) ||
    isFieldEmail(fieldDefinition) ||
    isFieldPhone(fieldDefinition)
  ) {
    return IconPencil;
  }

  if (isFieldRelation(fieldDefinition)) {
    if (
      fieldDefinition.metadata.relationObjectMetadataNameSingular !==
      'workspaceMember'
    ) {
      return IconPencil;
    }
  }
};
