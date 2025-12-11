import AppleAuthButton from "@/components/auth/AppleAuthButton";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import { Fonts } from "@/constants/theme";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.infiniteScrollContainer}></View>
      <View style={styles.contentContainer}>
        <Image source={require('@/assets/images/wolt-logo.png')} style={styles.brandLogo} />
        <Animated.Text entering={FadeInDown} style={styles.tagLine} > Almost EveryThing Delivered</Animated.Text>

        {/* Login and Signup */}
        <View style={styles.buttonContainer}>
          <Animated.View entering={FadeInDown.delay(100)} >
            <GoogleAuthButton />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200)} >
            <AppleAuthButton />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(300)} >
            <TouchableOpacity style={styles.otherButton}>
              <Text style={styles.otherButtonText}>Other options</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Animated.View style={styles.privacyContainer} entering={FadeInDown.delay(400)}>
          <Text style={styles.privacyText}>
            By continuing, you agree to our{' '}
            <Text style={styles.privacyLink} onPress={() => { }}>Terms of Service and Privacy Policy.</Text>
          </Text>
        </Animated.View>


      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  infiniteScrollContainer: {
    flex: 0.8,
  },
  brandLogo: {
    width: '100%',
    height: 48,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  tagLine: {
    fontSize: 32,
    fontFamily: Fonts.brandBlack,
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 36,
  },
  buttonContainer: {
    gap: 12,
    width: "100%",
  },
  otherButton: {
    backgroundColor: '#cfcfcfff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
    borderRadius: 12,
    gap: 4,
  },
  otherButtonText: {
    color: '#666',
    fontSize: 18,
    fontWeight: '600',
  },
  privacyContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  privacyText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
  privacyLink: {
    color: '#4285f4',
    textDecorationLine: 'underline',
  },

});