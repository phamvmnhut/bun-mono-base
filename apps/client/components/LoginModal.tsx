import React from 'react';
import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { authClient, customOnSuccess } from '@/lib/auth-client';
import { getClientUrl } from '@/constant/config';
import { getTestProps } from '@/lib/testHelper';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

export function LoginModal({ visible, onClose }: LoginModalProps) {
  const { refetch } = authClient.useSession();

  const handleGoogleLogin = () => {
    authClient.signIn.social(
      {
        provider: 'google',
        callbackURL:
          Platform.OS === 'web' ? getClientUrl() : 'exp://192.168.1.100:8081',
      },
      {
        onSuccess: customOnSuccess(refetch, onClose),
      }
    );
  };

  const handleFacebookLogin = () => {
    authClient.signIn.social(
      {
        provider: 'facebook',
        callbackURL:
          Platform.OS === 'web' ? getClientUrl() : 'exp://192.168.1.100:8081',
      },
      {
        onSuccess: customOnSuccess(refetch, onClose),
      }
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        {...getTestProps('login-modal')}
      >
        <View
          style={{
            width: '90%',
            maxWidth: 400,
            backgroundColor: '#8B0000',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {/* Header with close button */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(255, 215, 0, 0.2)',
              position: 'relative',
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#FFD700',
              }}
            >
              Đăng nhập
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={{
                position: 'absolute',
                right: 16,
                top: 16,
              }}
              {...getTestProps('login-modal-close-button')}
            >
              <Ionicons name="close" size={24} color="#FFD700" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              padding: 24,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: '#FFD700',
                marginBottom: 16,
                textAlign: 'center',
              }}
            >
              Lưu trữ kết quả lá số của bạn
            </Text>

            <Text
              style={{
                fontSize: 18,
                color: '#FFD700',
                marginBottom: 24,
                textAlign: 'center',
              }}
            >
              Đăng nhập để lưu kết quả
            </Text>

            {/* Login buttons */}
            <TouchableOpacity
              style={{
                backgroundColor: '#4285F4',
                borderRadius: 8,
                paddingVertical: 12,
                paddingHorizontal: 16,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 12,
              }}
              onPress={handleGoogleLogin}
            >
              <FontAwesome name="google" size={20} color="white" />
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '500',
                  marginLeft: 8,
                }}
              >
                Đăng nhập bằng Google
              </Text>
            </TouchableOpacity>

            {/* Commented out buttons from original screen */}
            <TouchableOpacity
              style={{
                backgroundColor: '#3b5998',
                borderRadius: 8,
                paddingVertical: 12,
                paddingHorizontal: 16,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 12,
              }}
              onPress={handleFacebookLogin}
            >
              <FontAwesome name="facebook" size={20} color="white" />
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '500',
                  marginLeft: 8,
                }}
              >
                Đăng nhập với Facebook
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={{
                backgroundColor: '#333333',
                borderRadius: 8,
                paddingVertical: 12,
                paddingHorizontal: 16,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 12,
              }}
            >
              <FontAwesome name="apple" size={20} color="white" />
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '500',
                  marginLeft: 8,
                }}
              >
                Đăng nhập với iCloud
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderRadius: 8,
                paddingVertical: 12,
                paddingHorizontal: 16,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: '#333',
                  fontSize: 16,
                  fontWeight: '500',
                }}
              >
                Tiếp tục với tư cách khách
              </Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </Modal>
  );
}
