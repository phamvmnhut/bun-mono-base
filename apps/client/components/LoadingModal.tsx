import { getTestProps } from '@/lib/testHelper';
import { Modal, View, Text, ActivityIndicator } from 'react-native';

export const LoadingModal = ({ visible }: { visible: boolean }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        {...getTestProps('loading-modal')}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <ActivityIndicator size="large" color="#8B0000" />
          <Text
            style={{
              marginTop: 15,
              fontSize: 16,
              fontWeight: '500',
              color: '#333',
            }}
          >
            Đang xử lý...
          </Text>
        </View>
      </View>
    </Modal>
  );
};
