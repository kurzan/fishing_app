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
import LogoWhite from '../../images/logo-white.svg';
import LogoBlack from '../../images/logo-black.svg';
import Account from '../../images/icons/acount.svg';
import Plus from '../../images/icons/plus.svg';
import Minus from '../../images/icons/minus.svg';
import toMap from '../../images/icons/toMap.svg';
import toList from '../../images/icons/toList.svg';
import { View } from 'react-native';

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
export const LogoWhiteIcon = createIcon(LogoWhite);
export const LogoBlackIcon = createIcon(LogoBlack);
export const PlusIcon = createIcon(Plus);
export const MinusIcon = createIcon(Minus);
export const ToMapIcon = createIcon(toMap);
export const ToListIcon = createIcon(toList);


export const ViewWhiteLogo = () => {
  return (
    <View style={{ width: "100%", height: "100%", position: "relative" }}>
      <View
        style={{
          width: 16.48,
          height: 23.67,
          left: 0,
          top: 7.10,
          position: "absolute",
          backgroundColor: "white"
        }}
      />
      <View
        style={{
          width: 17.42,
          height: 15.53,
          left: 17.42,
          top: 7.48,
          position: "absolute",
          backgroundColor: "white"
        }}
      />
      <View
        style={{
          width: 16,
          height: 23.48,
          left: 36.36,
          top: 0,
          position: "absolute",
          backgroundColor: "white"
        }}
      />
      <View
        style={{
          width: 13.92,
          height: 15.53,
          left: 53.31,
          top: 7.48,
          position: "absolute",
          backgroundColor: "white"
        }}
      />
      <View
        style={{
          width: 14.87,
          height: 15.53,
          left: 69.13,
          top: 7.48,
          position: "absolute",
          backgroundColor: "white"
        }}
      />
      <View
        style={{
          width: 14.02,
          height: 15.62,
          left: 86.08,
          top: 7.48,
          position: "absolute",
          backgroundColor: "white"
        }}
      />
    </View>

  )
}