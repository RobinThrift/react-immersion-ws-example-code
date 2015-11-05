import React from 'react-native';
import {assign, inRange} from 'lodash';

let {PropTypes, ScrollView, PixelRatio, Dimensions} = React;

let deviceSize = Dimensions.get('window');

let styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        flexWrap: 'nowrap'
    },
    elements: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: deviceSize.width
    }
};

export class Slider extends React.Component {
    onScroll({nativeEvent}) {
        this.props.onScroll(nativeEvent);
        let size = (this.props.horizontal) ? nativeEvent.layoutMeasurement.width : nativeEvent.layoutMeasurement.height;
        let end = (this.props.horizontal) ? nativeEvent.contentSize.width : nativeEvent.contentSize.height;
        let offset = (this.props.horizontal) ? nativeEvent.contentOffset.x : nativeEvent.contentOffset.y;
        if (inRange(offset + size, end - size/4, end + size/2)) {
            this.props.onReachedEnd();
        }
    }

    render() {
        let style = assign({}, styles.container, this.props.style);
        let elements = this.props.children.map((c, i) => {
            return React.cloneElement(c, {style: styles.elements, key: i});
        });

        return (
            <ScrollView
                accessibilityLabel="slider"
                scrollEventThrottle={200}
                contentContainerStyle={style}
                horizontal={this.props.horizontal}
                alwaysBounceHorizontal={this.props.horizontal}
                alwaysBounceVertical={!this.props.horizontal}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                onScroll={this.onScroll.bind(this)}
            >
                {elements}
            </ScrollView>
        );
    }
}

Slider.propTypes = {
    horizontal: PropTypes.bool,
    style: PropTypes.object,
    onScroll: PropTypes.func,
    onReachedEnd: PropTypes.func
};

Slider.defaultProps = {
    horizontal: true,
    style: {},
    onScroll: () => {},
    onReachedEnd: () => {}
};
