import React from 'react-native';
import {Slider} from './Slider';

let {Image, View, Text} = React;

let styles = {
    container: {
        flex: 1,
        top: 20
    }
};

let imageSets = {
    setA: [
        'http://i.giphy.com/3o85xKDARMnMuupyHS.gif',
        'http://i.giphy.com/aQYR1p8saOQla.gif',
        'http://i.giphy.com/4gRfmj3ib3SY8.gif'
    ],
    setB: [
        'https://placehold.it/417x720',
        'https://placehold.it/417x720/bada55',
        'https://placehold.it/417x720/e8117f/000000'
    ]
};

export class ReactNativeTestApp extends React.Component {
    render() {
        let images = imageSets.setB;
        return (
            <View style={styles.container}>
                <Slider>
                    <Image resizeMode='contain' accessibilityLabel="image 1" accessible={true} source={{uri: images[0]}} />
                    <Image resizeMode='contain' accessibilityLabel="image 2" accessible={true} source={{uri: images[1]}} />
                    <Image resizeMode='contain' accessibilityLabel="image 3" accessible={true} source={{uri: images[2]}} />
                </Slider>
            </View>
        );
    }
}
