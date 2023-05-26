import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Themed';

const Circle = ({ fill, nonfill, fillLevel, numberWorkouts, doneWorkouts }: any) => {
    return (
        <View style={[{ backgroundColor: nonfill }, styles.circle]}>
            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: `${fillLevel * (100 / numberWorkouts)}%`,
                backgroundColor: fill,
                shadowColor: fill,
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 22,
            }} />
            <Text style={styles.numberWorkouts}>{fillLevel} / {numberWorkouts}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    circle: {
        width: 300,
        height: 300,
        borderRadius: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Ensure that any overflow is hidden
    },
    numberWorkouts: {
        fontSize: 36,
        fontWeight: "700"
    }
});

export default Circle;
