import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authClient } from '@/lib/auth-client';
import { LoginModal } from '@/components/LoginModal';
import { useState } from 'react';

export default function HomeScreen() {
  const { data: session } = authClient.useSession();
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Hello World</Text>
      <View style={{ flexDirection: 'column', gap: 10, marginTop: 10 }}>
        <Button
          title="Login"
          onPress={() => {
            setLoginModalVisible(true);
          }}
        />
        <Button
          title="Logout"
          onPress={() => {
            authClient.signOut();
          }}
        />
      </View>
      {session?.user && <Text>{session.user.email}</Text>}
      <LoginModal
        visible={loginModalVisible}
        onClose={() => {
          setLoginModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}
