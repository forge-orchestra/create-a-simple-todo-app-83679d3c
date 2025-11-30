import { FC } from 'react';
import { LucideIcon, LucideProps } from 'lucide-react';

interface IconProps extends LucideProps {
  icon: LucideIcon;
  label: string;
}

const Icon: FC<IconProps> = ({ icon: IconComponent, label, className, ...props }) => {
  return (
    <span role="img" aria-label={label} className={`inline-flex items-center ${className}`}>
      <IconComponent {...props} />
    </span>
  );
};

export default Icon;