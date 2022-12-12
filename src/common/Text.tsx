import React, {FC} from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

type CustomTextProps = {
    children?: React.ReactNode
}

const Font: FC<CustomTextProps> = ({ children }) => {
    return (
      <Text>
        {children}
      </Text>
    )
  }
export default Font