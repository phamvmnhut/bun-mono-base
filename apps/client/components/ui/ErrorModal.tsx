import { TouchableOpacity, View, Modal, Text } from 'react-native';
import { X } from 'lucide-react-native';
import { getTestProps } from '@/lib/testHelper';

type ErrorModalProps = {
  visible: boolean;
  onClose: () => void;
  errors: string[];
};

export const ErrorModal = ({ visible, onClose, errors }: ErrorModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent={false}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        activeOpacity={1}
        onPress={onClose}
        {...getTestProps('error-modal')}
      >
        <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            width: '90%',
            maxWidth: 400,
            maxHeight: '80%',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#E2E8F0',
              backgroundColor: '#8B0000',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#D4AF37',
              }}
            >
              Lỗi
            </Text>
            <TouchableOpacity onPress={onClose} style={{ padding: 4 }}>
              <X size={24} color="#D4AF37" />
            </TouchableOpacity>
          </View>
          <View style={{ padding: 16 }}>
            {errors.map((error, index) => (
              <View
                key={error}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#E53E3E',
                    marginRight: 8,
                  }}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: '#333333',
                    flex: 1,
                  }}
                >
                  {error}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#D4AF37',
              borderRadius: 8,
              padding: 12,
              alignItems: 'center',
              margin: 16,
            }}
            onPress={onClose}
          >
            <Text
              style={{
                color: '#8B0000',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Đóng
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
