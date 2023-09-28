import { OutlineGlyphMapType } from '@ant-design/icons-react-native';
import { FC } from 'react';
import { SvgProps } from "react-native-svg";

export type FooterItemProps = {
  icon: FC<SvgProps> | OutlineGlyphMapType,
  title: string,
  ru_title: string,
}