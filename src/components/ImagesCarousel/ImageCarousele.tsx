import * as React from 'react';
import { Dimensions, StyleSheet, Image, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const ImagesCarousele = ({ images }: { images: string[] }) => {
  const width = Dimensions.get('window').width;
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop={true}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        width={width}
        height={width}
        autoPlay={false}
        data={images}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ item }) => {


          return (
            <View style={styles.imagContainer}>
              <Image style={styles.placeImg} source={{ uri: item }} resizeMode="cover" resizeMethod="resize" />
            </View>
          )

        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  imagContainer: {
    height: 400,
    width: '100%'
  },

  placeImg: {
    flex: 1,
  },
});

export default ImagesCarousele;



