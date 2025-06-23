import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import {
  Controller,
  type Control,
  type FieldError,
  type Path,
  type FieldValues,
} from 'react-hook-form';

type SelectFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  type: string;
  placeholder?: string;
  error?: FieldError;
  setActiveSheet: (sheet: string) => void;
  getDisplayValue: (type: string, value: string) => string;
};

export function SelectField<T extends FieldValues>({
  label,
  name,
  control,
  type,
  placeholder = 'Chọn',
  error,
  setActiveSheet,
  getDisplayValue,
  ...testProps
}: SelectFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#D4AF37',
              marginBottom: 8,
            }}
          >
            {label}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: error ? '#E53E3E' : '#E2E8F0',
              padding: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={() => {
              setActiveSheet(type);
            }}
            {...testProps}
          >
            <Text
              style={{
                fontSize: 16,
                color: '#333333',
              }}
            >
              {value ? getDisplayValue(type, value.toString()) : placeholder}
            </Text>
            <ChevronDown size={20} color="#D4AF37" />
          </TouchableOpacity>
          {error ? (
            <Text
              style={{
                color: '#E53E3E',
                fontSize: 12,
                marginTop: 4,
              }}
            >
              {error.message}
            </Text>
          ) : null}
        </View>
      )}
    />
  );
}
