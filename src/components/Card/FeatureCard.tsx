import { Icon, type IconName } from '../Icon';
import { Text } from '../Text';
import './Card.css';

export interface FeatureCardProps {
  icon: IconName;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <article className="feature-card">
      <Icon className="feature-card__icon" name={icon} size={24} />
      <Text className="feature-card__title" style="h6" color="var(--color-text-primary)">{title}</Text>
      <Text className="feature-card__description" style="body-2" color="var(--color-text-secondary)">
        {description}
      </Text>
    </article>
  );
}
