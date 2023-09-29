import { FC } from 'react';
import { SvgProps } from "react-native-svg";
import Add from '../../images/icons/add_icon.svg';
import Home from '../../images/icons/home.svg';
import Placec from '../../images/icons/places.svg';
import Map from '../../images/icons/location.svg';
import Comment from '../../images/icons/comment_icon.svg';
import Heart from '../../images/icons/heart.svg';
import FullfiledHeart from '../../images/icons/fullfiled_heart.svg';
import More from '../../images/icons/more.svg';
import Logo from '../../images/logo.svg';
import Account from '../../images/icons/acount.svg';
import Plus from '../../images/icons/plus.svg';
import Minus from '../../images/icons/minus.svg';

const createIcon = (Icon: FC<SvgProps>): FC<SvgProps> => (props: SvgProps) => (
  <Icon {...props} />
);

export const AddIcon = createIcon(Add);
export const HomeIcon = createIcon(Home);
export const PlacesIcon = createIcon(Placec);
export const MapIcon = createIcon(Map);
export const LocationIcon = createIcon(Map);
export const CommentIcon = createIcon(Comment);
export const HeartIcon = createIcon(Heart);
export const FullfiledHeartIcon = createIcon(FullfiledHeart);
export const MoreIcon = createIcon(More);
export const AccountIcon = createIcon(Account);
export const LogoIcon = createIcon(Logo);
export const PlusIcon = createIcon(Plus);
export const MinusIcon = createIcon(Minus);