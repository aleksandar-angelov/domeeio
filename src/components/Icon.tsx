import React from 'react';
import Svg, { Path, Rect, Circle, G, Text as SvgText } from 'react-native-svg';

interface IconProps {
  color?: string;
  size?: number;
}

export const HomeIcon = ({ color = '#2a241c', size = 22 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V10.5z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
  </Svg>
);

export const CasesIcon = ({ color = '#2a241c', size = 22 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x={3} y={6} width={18} height={14} rx={2.5} stroke={color} strokeWidth={1.8} />
    <Path d="M8 6V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" stroke={color} strokeWidth={1.8} />
    <Path d="M3 12h18" stroke={color} strokeWidth={1.8} />
  </Svg>
);

export const ChatIcon = ({ color = '#2a241c', size = 22 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M21 12c0 4.4-4 8-9 8-1.3 0-2.5-.2-3.6-.6L3 21l1.3-4.2C3.5 15.4 3 13.7 3 12c0-4.4 4-8 9-8s9 3.6 9 8z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
  </Svg>
);

export const PollsIcon = ({ color = '#2a241c', size = 22 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 20V10M12 20V4M18 20v-7" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const CalendarIcon = ({ color = '#2a241c', size = 22 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x={3} y={5} width={18} height={16} rx={2.5} stroke={color} strokeWidth={1.8} />
    <Path d="M3 10h18M8 3v4M16 3v4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

export const DocsIcon = ({ color = '#2a241c', size = 22 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
    <Path d="M14 3v6h6M8 14h8M8 18h5" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

export const PlusIcon = ({ color = '#2a241c', size = 20 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 5v14M5 12h14" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
  </Svg>
);

export const BackIcon = ({ color = '#2a241c', size = 22 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15 5l-7 7 7 7" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BellIcon = ({ color = '#2a241c', size = 22 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2.5h-15L6 16zM10 19a2 2 0 0 0 4 0" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
  </Svg>
);

export const MoreIcon = ({ color = '#2a241c', size = 22 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx={5} cy={12} r={1.6} fill={color} />
    <Circle cx={12} cy={12} r={1.6} fill={color} />
    <Circle cx={19} cy={12} r={1.6} fill={color} />
  </Svg>
);

export const PinIcon = ({ color = '#2a241c', size = 16 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 17v5M9 3h6l-1 5 3 3H7l3-3-1-5z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
  </Svg>
);

export const SendIcon = ({ color = '#2a241c', size = 20 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 12l18-9-6 18-3-8-9-1z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
  </Svg>
);

export const CameraIcon = ({ color = '#2a241c', size = 20 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x={3} y={7} width={18} height={13} rx={2.5} stroke={color} strokeWidth={1.8} />
    <Circle cx={12} cy={13.5} r={3.5} stroke={color} strokeWidth={1.8} />
    <Path d="M8 7l1.5-3h5L16 7" stroke={color} strokeWidth={1.8} />
  </Svg>
);

export const CheckIcon = ({ color = '#2a241c', size = 16 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 13l4 4 10-10" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const BoltIcon = ({ color = '#2a241c', size = 18 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
  </Svg>
);

export const DropIcon = ({ color = '#2a241c', size = 18 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
  </Svg>
);

export const WrenchIcon = ({ color = '#2a241c', size = 18 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 6a4 4 0 0 1 5 5l-8 8-4 1 1-4 6-6-1-2 1-2z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
  </Svg>
);

export const PdfIcon = ({ color = '#2a241c', size = 22 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
    <Path d="M14 3v6h6" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <SvgText x={8} y={17} fontSize={6} fontWeight="700" fill={color}>PDF</SvgText>
  </Svg>
);

export const GavelIcon = ({ color = '#2a241c', size = 18 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M13 3l8 8-3 3-8-8 3-3zM10 6L3 13l3 3 7-7M4 21h12" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
  </Svg>
);

export const ClockIcon = ({ color = '#2a241c', size = 14 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.8} />
    <Path d="M12 7v5l3 2" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

export const MenuIcon = ({ color = '#2a241c', size = 22 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 6h18M3 12h18M3 18h18" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

export const GlobeIcon = ({ color = '#2a241c', size = 18 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.8} />
    <Path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke={color} strokeWidth={1.8} />
  </Svg>
);

export const StarIcon = ({ color = '#b88a4a', size = 14 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7L12 17.8 5.7 21.2l1.7-7L2 9.5l7.1-.6L12 2z" fill={color} />
  </Svg>
);

export const VerifiedIcon = ({ color = '#7a9a6e', size = 14 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 2l2.5 2 3.5-.5.5 3.5L21 9.5 19 12l2 2.5-2.5 2.5.5 3.5-3.5-.5L12 22l-2.5-2-3.5.5-.5-3.5L3 14.5 5 12l-2-2.5 2.5-2.5-.5-3.5 3.5.5L12 2z" fill={color} />
    <Path d="M8 12l3 3 5-5" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const ElevatorIcon = ({ color = '#2a241c', size = 18 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x={4} y={3} width={16} height={18} rx={1.5} stroke={color} strokeWidth={1.8} />
    <Path d="M12 3v18" stroke={color} strokeWidth={1.8} />
    <Path d="M9 9l-1.5 2h3L9 9z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" fill={color} />
    <Path d="M15 15l1.5-2h-3L15 15z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" fill={color} />
  </Svg>
);
