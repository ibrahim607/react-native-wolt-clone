import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    Easing,
    cancelAnimation,
    scrollTo,
    useAnimatedReaction,
    useAnimatedRef,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

const iconDataSets = {
    set1: [
        { emoji: '🍕', color: '#FFE5CC' },
        { emoji: '🍔', color: '#F4D03F' },
        { emoji: '🍟', color: '#F8D7DA' },
        { emoji: '🌮', color: '#D5EDDA' },
        { emoji: '🍗', color: '#FADBD8' },
    ],
    set2: [
        { emoji: '🎮', color: '#D1ECF1' },
        { emoji: '🎧', color: '#E2E3E5' },
        { emoji: '☕', color: '#F4D03F' },
        { emoji: '🍿', color: '#FFE5CC' },
        { emoji: '🥤', color: '#F8D7DA' },
    ],
    set3: [
        { emoji: '🍰', color: '#FADBD8' },
        { emoji: '🍦', color: '#D1ECF1' },
        { emoji: '🍪', color: '#FFE5CC' },
        { emoji: '🎲', color: '#D5EDDA' },
        { emoji: '🕹️', color: '#E2E3E5' },
    ],
};

const ITEM_HEIGHT = 160;
const GAP = 10;

interface SmoothInfiniteScrollProps {
    scrollDirection?: 'up' | 'down';
    iconSet?: 'set1' | 'set2' | 'set3';
}

const SmoothInfiniteScroll = ({ scrollDirection = 'down', iconSet = 'set1' }: SmoothInfiniteScrollProps) => {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const iconData = iconDataSets[iconSet];
    const items = [...iconData, ...iconData, ...iconData];

    // Calculate the height of one set of items (for seamless loop)
    const singleSetHeight = iconData.length * (ITEM_HEIGHT + GAP);
    const scrollY = useSharedValue(scrollDirection === 'down' ? 0 : singleSetHeight);

    useEffect(() => {
        // Cancel any existing animation
        cancelAnimation(scrollY);

        // Duration for one complete cycle (in milliseconds)
        // Adjust this to control speed - lower = faster, higher = slower
        const duration = singleSetHeight * 50; // 50ms per pixel for faster motion

        if (scrollDirection === 'down') {
            // Start from 0 and animate to singleSetHeight
            scrollY.value = 0;
            scrollY.value = withRepeat(
                withTiming(singleSetHeight, {
                    duration: duration,
                    easing: Easing.linear,
                }),
                -1, // infinite repeat
                false // don't reverse
            );
        } else {
            // Start from singleSetHeight and animate to 0
            scrollY.value = singleSetHeight;
            scrollY.value = withRepeat(
                withTiming(0, {
                    duration: duration,
                    easing: Easing.linear,
                }),
                -1, // infinite repeat
                false // don't reverse
            );
        }

        return () => {
            cancelAnimation(scrollY);
        };
    }, [scrollDirection, iconSet]);

    useAnimatedReaction(
        () => scrollY.value,
        (value) => {
            // Seamlessly loop by using modulo
            const scrollPosition = value % singleSetHeight;
            scrollTo(scrollRef, 0, scrollPosition, false);
        }
    );

    return (
        <Animated.ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.contentContainer}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
        >
            {items.map((item, index) => (
                <Animated.View key={index} style={[styles.iconContainer, { backgroundColor: item.color }]} >
                    <Animated.Text style={{ fontSize: 40 }}>{item.emoji}</Animated.Text>
                </Animated.View>
            ))}
        </Animated.ScrollView>
    )
}

const styles = StyleSheet.create({

    contentContainer: {
        gap: 10,
        paddingVertical: 20,
    },
    iconContainer: {
        width: 160,
        height: ITEM_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal: 5,
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
    }
})

export default SmoothInfiniteScroll