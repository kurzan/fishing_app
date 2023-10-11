import { Alert } from "react-native";

export const generateColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `#${randomColor}`;
};


export const deleteHandler = (callback: any) => {
  Alert.alert('Подтвердите удаление', 'Вы дейсвтильно хотите удалить?', [
    {
      text: 'Отмена',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'Удалить', onPress: () => {
        callback();
      }
    },
  ]);
};
