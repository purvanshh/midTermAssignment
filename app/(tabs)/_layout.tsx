import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { borderRadius, colors } from '../../styles/theme';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.backgroundSecondary,
                    borderTopColor: colors.divider,
                    borderTopWidth: 1,
                    height: 85,
                    paddingTop: 12,
                    paddingBottom: 25,
                    paddingHorizontal: 10,
                },
                tabBarActiveTintColor: colors.accent,
                tabBarInactiveTintColor: colors.textMuted,
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                    marginTop: 4,
                },
                tabBarItemStyle: {
                    borderRadius: borderRadius.md,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'News',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name="newspaper" color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="bookmarks"
                options={{
                    title: 'Bookmarks',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name="bookmark" color={color} focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="alerts"
                options={{
                    title: 'Alerts',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name="warning" color={color} focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
}

function TabBarIcon({ name, color, focused }: { name: string; color: string; focused: boolean }) {
    return (
        <View style={styles.iconContainer}>
            {focused && (
                <LinearGradient
                    colors={[colors.accentGlow, 'transparent']}
                    style={styles.iconGlow}
                />
            )}
            <Ionicons name={name as any} size={22} color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        width: 44,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    iconGlow: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
        opacity: 0.8,
    },
});
