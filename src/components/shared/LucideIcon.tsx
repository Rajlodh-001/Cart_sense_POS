import React from 'react';
import * as LucideIcons from 'lucide-react';

interface LucideIconProps extends LucideIcons.LucideProps {
  name: string;
}

const LucideIcon: React.FC<LucideIconProps> = ({ name, ...props }) => {
  const IconComponent = (LucideIcons as any)[name];

  if (!IconComponent) {
    // Return a default icon if the name doesn't match
    return <LucideIcons.HelpCircle {...props} />;
  }

  return <IconComponent {...props} />;
};

export default LucideIcon;
