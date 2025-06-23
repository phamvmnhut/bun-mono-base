import { getTestProps } from '@/lib/testHelper';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import * as Progress from 'react-native-progress';

interface ProgressWithInfoProps {
  countdownTime: number;
  onComplete?: () => void;
}

const ProgressWithInfo = ({ countdownTime }: ProgressWithInfoProps) => {
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(countdownTime);

  useEffect(() => {
    // Reset khi countdownTime thay đổi
    setProgress(0);
    setRemainingTime(countdownTime);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        // Tăng dần đến 99%
        const newProgress = prev + (1 / countdownTime) * 0.99;
        return newProgress > 0.99 ? 0.99 : newProgress;
      });
    }, 1000);

    const timeInterval = setInterval(() => {
      setRemainingTime((prev: number) => {
        if (prev <= 1) {
          clearInterval(timeInterval);
          clearInterval(progressInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(timeInterval);
    };
  }, [countdownTime]);

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return 'ít giây nữa';
    if (seconds < 60) return `${seconds}s`;
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min} phút ${sec} giây`;
  };

  return (
    <View style={styles.container} {...getTestProps('progress-bar')}>
      <Progress.Bar
        borderRadius={8}
        borderWidth={1}
        progress={progress}
        height={8}
        color="#D4AF37"
        width={null}
        style={styles.progressBar}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.timeText}>
          {`Còn lại: ${formatTime(remainingTime)}`}
        </Text>
        <Text style={styles.percentText}>
          {`${Math.round(progress * 100)}%`}
        </Text>
      </View>
      <Text
        style={{
          marginTop: 16,
          textAlign: 'center',
          color: '#FFFFFF',
          fontSize: 14,
        }}
      >
        Hệ thống đang phân tích dữ liệu các sao chiếu và cung mệnh của bạn để
        đưa ra luận giải chi tiết nhất.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 0,
  },
  progressBar: {
    marginBottom: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  timeText: {
    color: '#D4AF37',
    fontSize: 14,
    fontStyle: 'italic',
  },
  percentText: {
    color: '#D4AF37',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProgressWithInfo;
