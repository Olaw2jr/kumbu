import React, {useState, useEffect, useMemo} from 'react';
import Svg, {Path, Line, Circle} from 'react-native-svg';
import {useTheme} from '@/theme/ThemeProvider';

interface WavelineProps {
  active: boolean;
  width?: number;
}

export function Waveline({active, width = 320}: WavelineProps) {
  const {colors, reducedMotion} = useTheme();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!active || reducedMotion) return;
    const interval = setInterval(() => setTick(x => x + 1), 90);
    return () => clearInterval(interval);
  }, [active, reducedMotion]);

  const points = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i <= 40; i++) {
      const energy = active
        ? Math.sin((i + tick) * 0.62) * 0.6 +
          Math.sin((i + tick) * 0.31 + 1.7) * 0.4
        : 0;
      const amp = active
        ? 8 + Math.abs(Math.sin((i + tick) * 0.18)) * 16
        : 1;
      pts.push(24 + energy * amp);
    }
    return pts;
  }, [tick, active]);

  const path = useMemo(() => {
    const step = width / (points.length - 1);
    let d = `M 0 ${points[0]}`;
    for (let i = 1; i < points.length; i++) {
      const cx = (i - 0.5) * step;
      d += ` Q ${cx} ${points[i - 1]} ${i * step} ${points[i]}`;
    }
    return d;
  }, [points, width]);

  return (
    <Svg width={width} height={48} viewBox={`0 0 ${width} 48`}>
      <Line
        x1={0}
        y1={24}
        x2={width}
        y2={24}
        stroke={colors.line}
        strokeWidth={1}
      />
      <Path
        d={path}
        stroke={colors.ink}
        strokeWidth={1.4}
        fill="none"
        strokeLinecap="round"
        opacity={active ? 0.9 : 0.35}
      />
      <Circle
        cx={width}
        cy={points[points.length - 1]}
        r={3}
        fill={colors.hanko}
        opacity={active ? 1 : 0.4}
      />
    </Svg>
  );
}
