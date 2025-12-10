import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { glassStyle, shadows } from '../styles/theme';

interface GlassCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    elevated?: boolean;
}

export default function GlassCard({ children, style, elevated = false }: GlassCardProps) {
    return (
        <View style={[styles.card, elevated && shadows.md, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        ...glassStyle,
        padding: 16,
        overflow: 'hidden',
    },
});
