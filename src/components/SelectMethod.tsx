import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Box, { BoxProps } from '@material-ui/core/Box';

import { colorExtractionMethods, ColorExtractionMethodsName } from '../helpers/colorExtractionMethods';

export {
  colorExtractionMethods,
  ColorExtractionMethodsName,
};

type Props = {
  method: string;
  handleMethodChange: (methodKey: string) => void;
} & BoxProps;

const SelectMethod = ({ method, handleMethodChange, ...props }: Props) => {
  return (
    <Box flex={1} {...props}>
      <NativeSelect
        value={method}
        input={<Input name="age" id="age-native-label-placeholder" />}
      >
        {Object.entries(ColorExtractionMethodsName).map(([ key, name ]) => (
          <option key={key} value={key}>{name}</option>
        ))}
      </NativeSelect>
    </Box>
  );
};

export default SelectMethod;