import { getTestProps } from '@/lib/testHelper';
import { X } from 'lucide-react-native';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  title: string;
  data: string[];
  onSelect: (item: string) => void;
  selectedValue: string;
  getLabel: (item: string) => string;
};

export const BottomSheet = ({
  visible,
  onClose,
  title,
  data,
  onSelect,
  selectedValue,
  getLabel,
}: BottomSheetProps) => {
  const windowWidth = Dimensions.get('window').width;
  const isLargeScreen = windowWidth > 525;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent={false}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: isLargeScreen ? 'center' : 'flex-end',
          alignItems: isLargeScreen ? 'center' : 'stretch',
        }}
        onPress={onClose}
      >
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: isLargeScreen ? 20 : undefined,
            borderTopLeftRadius: isLargeScreen ? undefined : 20,
            borderTopRightRadius: isLargeScreen ? undefined : 20,
            paddingBottom: 20,
            maxHeight: '70%',
            width: isLargeScreen ? '90%' : '100%',
            maxWidth: isLargeScreen ? 500 : undefined,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: isLargeScreen ? 2 : -3,
            },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 10,
          }}
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
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#D4AF37',
              }}
            >
              {title}
            </Text>
            <TouchableOpacity onPress={onClose} style={{ padding: 4 }}>
              <X size={24} color="#D4AF37" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  paddingVertical: 14,
                  marginVertical: 4,
                  borderRadius: 10,
                  backgroundColor:
                    selectedValue === item ? 'rgba(139, 0, 0, 0.1)' : '#F8F9FA',
                  borderWidth: selectedValue === item ? 1 : 0,
                  borderColor:
                    selectedValue === item
                      ? 'rgba(212, 175, 55, 0.3)'
                      : undefined,
                }}
                onPress={() => onSelect(item)}
                {...getTestProps(`modal-list-item-${item}`)}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                  }}
                >
                  {selectedValue === item && (
                    <View
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: '#D4AF37',
                        marginRight: 10,
                      }}
                    />
                  )}
                  <Text
                    style={{
                      fontSize: 16,
                      color: selectedValue === item ? '#8B0000' : '#4A5568',
                      fontWeight: selectedValue === item ? 'bold' : 'normal',
                    }}
                  >
                    {getLabel(item)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            style={{ paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 8 }}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
