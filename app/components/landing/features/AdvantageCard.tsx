import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { H3, Paragraph } from '@/app/components/typography';

interface AdvantageCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
  isEven: boolean;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const AdvantageCard: React.FC<AdvantageCardProps> = ({ icon: Icon, title, description, index, isEven }) => (
  <motion.div
    variants={itemVariants}
    custom={index}
    className={`flex items-center mb-12 ${isEven ? 'flex-row-reverse' : ''}`}
  >
    <div className={`w-1/2 ${isEven ? 'pl-8' : 'pr-8'}`}>
      <H3 className={`text-2xl font-semibold mb-2 ${isEven ? 'text-right' : 'text-left'} text-[#4FD1C5]`}>{title}</H3>
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
        <Paragraph className="text-gray-300 text-left text-lg mb-0">{description}</Paragraph>
      </div>
    </div>
    <motion.div
      className="w-16 h-16 rounded-full bg-gray-800 border-4 border-[#4FD1C5] z-10 flex items-center justify-center flex-shrink-0"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index === 0 ? 0.5 : index + 1, duration: 0.3 }}
    >
      <Icon className="w-8 h-8 text-[#4FD1C5]" />
    </motion.div>
    <div className="w-1/2"></div>
  </motion.div>
);
