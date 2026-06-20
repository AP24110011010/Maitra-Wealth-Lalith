import React from 'react';
import { hashString } from '@/lib/mock-data/stocks';

/**
 * Circular badge with stylized initials and a per‑company gradient.
 * Gradient hue is derived from a hash of the symbol to give subtle variations.
 */
interface Props {
  symbol: string;
}

const CompanyBadge: React.FC<Props> = ({ symbol }) => {
  const initials = symbol.slice(0, 2).toUpperCase();
  const hue = hashString(symbol) % 360; // 0‑359
  const gradient = `linear-gradient(135deg, hsl(${hue}, 70%, 55%), hsl(${(hue + 30) % 360}, 70%, 45%))`;
  return (
    <div
      className="flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-lg shadow-md"
      style={{ background: gradient }}
    >
      {initials}
    </div>
  );
};

export default CompanyBadge;
