import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {Dimensions, PixelRatio, StyleSheet, ToastAndroid, View, Text} from 'react-native';
import HMSMap, {HMSMarker, MapTypes} from "@hmscore/react-native-hms-map";

let mapView;
let markerView;
let position = {
    latitude: 19.419,
    longitude: -98.993
};
const logMessage = (message) => {
    console.log(message);
    ToastAndroid.show(JSON.stringify(message), ToastAndroid.LONG);
};

const getLayerOptionsInfo = () =>
    mapView &&
    markerView &&
    mapView
        .getLayerOptionsInfo(markerView)
        .then((a) => logMessage(a))
        .catch((e) => logMessage(a));

const getLayerInfo = () =>
    mapView &&
    markerView &&
    mapView
        .getLayerInfo(markerView)
        .then((a) => logMessage(`${a.position.latitude}, ${a.position.longitude}`))
        .catch((a) => logMessage(a));

const onMoveCamera = (e) => {
    mapView
        .getCoordinateFromPoint({
            x: (Dimensions.get('screen').width * PixelRatio.get()) / 2,
            y: (Dimensions.get('screen').height * PixelRatio.get()) / 2,
        })
        .then((a) => {
            logMessage(`${a.latitude.toFixed(3)}, ${a.longitude.toFixed(3)}`)
        })
        .catch((a) => console.log(a))
}

export default function App() {
    return (
        <View style={styles.container}>
            <HMSMap
                ref={(e) => {mapView = e}}
                onCameraIdle={onMoveCamera}
                camera={{
                    target: {
                        latitude: position.latitude,
                        longitude: position.longitude,
                    },
                    zoom: 5,
                }}
                mapType={MapTypes.NORMAL}
                minZoomPreference={5}
                maxZoomPreference={20}
                style={{...StyleSheet.absoluteFillObject}}
                rotateGesturesEnabled={true}
                scrollGesturesEnabled={true}
                tiltGesturesEnabled={true}
                zoomControlsEnabled={true}
                zoomGesturesEnabled={true}
                gestureScaleByMapCenter={false}
                scrollGesturesEnabledDuringRotateOrZoom={true}>
                    <HMSMarker
                        coordinate={{latitude: 19.412, longitude: -98.993}}
                        title="Hello Huawei Map"
                        snippet="This is a snippet!"
                        draggable={true}
                        clusterable={true}
                        onDragEnd={getLayerInfo}
                        ref={ (e) => {markerView = e} }/>
            </HMSMap>

            {/*<View*/}
            {/*    style={{*/}
            {/*        flex: 1,*/}
            {/*        position: 'absolute',*/}
            {/*        zIndex: 99,*/}
            {/*        alignItems: 'center',*/}
            {/*    }}>*/}
            {/*    <View */}
            {/*        style={{*/}
            {/*            height: 20,*/}
            {/*            width: 20,*/}
            {/*            backgroundColor: '#ff0000',*/}
            {/*            borderTopStartRadius: 10,*/}
            {/*            borderTopEndRadius: 10,*/}
            {/*            borderBottomStartRadius: 10,*/}
            {/*            transform: [{ rotate: "45deg" }]*/}
            {/*        }}/>*/}
            {/*</View>*/}

            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
