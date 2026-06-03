import React from 'react';
import Svg, {Path, Circle, Rect, Line} from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: object;
}

function Icon({
  children,
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.4,
  style,
}: IconProps & {children: React.ReactNode}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}>
      {children}
    </Svg>
  );
}

export const I = {
  Back: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M15 6l-6 6 6 6" />
    </Icon>
  ),
  Close: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  ),
  More: (p: IconProps) => (
    <Icon {...p}>
      <Circle cx={5} cy={12} r={0.8} fill="currentColor" stroke="none" />
      <Circle cx={12} cy={12} r={0.8} fill="currentColor" stroke="none" />
      <Circle cx={19} cy={12} r={0.8} fill="currentColor" stroke="none" />
    </Icon>
  ),
  Plus: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M12 5v14M5 12h14" />
    </Icon>
  ),
  Search: (p: IconProps) => (
    <Icon {...p}>
      <Circle cx={11} cy={11} r={6} />
      <Path d="M20 20l-4.5-4.5" />
    </Icon>
  ),
  Settings: (p: IconProps) => (
    <Icon {...p}>
      <Circle cx={12} cy={12} r={3} />
      <Path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </Icon>
  ),
  Folder: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </Icon>
  ),
  Mic: (p: IconProps) => (
    <Icon {...p}>
      <Rect x={9} y={3} width={6} height={12} rx={3} />
      <Path d="M5 11a7 7 0 0014 0M12 18v3" />
    </Icon>
  ),
  Play: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M7 5l12 7-12 7V5z" fill="currentColor" stroke="none" />
    </Icon>
  ),
  Pause: (p: IconProps) => (
    <Icon {...p}>
      <Rect x={6} y={5} width={4} height={14} rx={0.5} fill="currentColor" stroke="none" />
      <Rect x={14} y={5} width={4} height={14} rx={0.5} fill="currentColor" stroke="none" />
    </Icon>
  ),
  Stop: (p: IconProps) => (
    <Icon {...p}>
      <Rect x={6} y={6} width={12} height={12} rx={1} fill="currentColor" stroke="none" />
    </Icon>
  ),
  Flag: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M5 21V4M5 4h12l-2 4 2 4H5" />
    </Icon>
  ),
  Trash: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13" />
    </Icon>
  ),
  Edit: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M4 20h4l10-10-4-4L4 16v4z" />
      <Path d="M14 6l4 4" />
    </Icon>
  ),
  Tag: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M3 12V4h8l10 10-8 8-10-10z" />
      <Circle cx={8} cy={8} r={1.4} />
    </Icon>
  ),
  Share: (p: IconProps) => (
    <Icon {...p}>
      <Circle cx={18} cy={5} r={2.5} />
      <Circle cx={6} cy={12} r={2.5} />
      <Circle cx={18} cy={19} r={2.5} />
      <Path d="M8 11l8-5M8 13l8 5" />
    </Icon>
  ),
  Check: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M4 12l5 5L20 6" />
    </Icon>
  ),
  Chevron: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M9 6l6 6-6 6" />
    </Icon>
  ),
  ChevronDown: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M6 9l6 6 6-6" />
    </Icon>
  ),
  Down: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M12 5v14M6 13l6 6 6-6" />
    </Icon>
  ),
  Sparkle: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zM18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14z" />
    </Icon>
  ),
  Md: (p: IconProps) => (
    <Icon {...p} strokeWidth={1.2}>
      <Rect x={3} y={6} width={18} height={12} rx={1} />
      <Path d="M7 14V10l2 2 2-2v4M15 10v4M13 12l2 2 2-2" />
    </Icon>
  ),
  Doc: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9l-6-6z" />
      <Path d="M14 3v6h6M8 13h8M8 17h5" />
    </Icon>
  ),
  Copy: (p: IconProps) => (
    <Icon {...p}>
      <Rect x={8} y={8} width={13} height={13} rx={1.5} />
      <Path d="M16 8V5a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2h3" />
    </Icon>
  ),
  Sun: (p: IconProps) => (
    <Icon {...p}>
      <Circle cx={12} cy={12} r={4} />
      <Path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5.6 5.6L4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4" />
    </Icon>
  ),
  Moon: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
    </Icon>
  ),
  Lock: (p: IconProps) => (
    <Icon {...p}>
      <Rect x={4} y={11} width={16} height={10} rx={2} />
      <Path d="M8 11V7a4 4 0 018 0v4" />
    </Icon>
  ),
  Cloud: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M7 18a5 5 0 01-1-9.9 6 6 0 0111.6 1.5A4 4 0 0117 18H7z" />
    </Icon>
  ),
  ArrowR: (p: IconProps) => (
    <Icon {...p}>
      <Path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  ),
};
