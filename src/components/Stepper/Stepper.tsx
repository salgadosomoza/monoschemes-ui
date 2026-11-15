import { Icon } from '../Icon';
import './Stepper.css';

export type StepState = 'completed' | 'current' | 'upcoming' | 'error';
export interface StepperStep { label: string; description?: string; state?: StepState; href?: string; onClick?: () => void }
export interface StepperProps { steps: StepperStep[]; current: number; orientation?: 'horizontal' | 'vertical' }

export function Stepper({ steps, current, orientation = 'horizontal' }: StepperProps) {
  return <div className="stepper-container"><ol className="stepper" data-orientation={orientation}>
    {steps.map((step, index) => {
      const state = step.state ?? (index < current ? 'completed' : index === current ? 'current' : 'upcoming');
      const previousState = index > 0 ? steps[index - 1].state ?? (index - 1 < current ? 'completed' : index - 1 === current ? 'current' : 'upcoming') : undefined;
      const actionable = state === 'completed' && (!!step.href || !!step.onClick);
      const marker = <span className="stepper__marker" aria-hidden="true">{state === 'completed' ? <Icon name="check" size={16} /> : index + 1}</span>;
      const title = <span className="stepper__label">{step.label}</span>;
      return <li className="stepper__step" key={`${step.label}-${index}`} data-state={state} aria-current={state === 'current' ? 'step' : undefined}>
        {index > 0 && <span className="stepper__connector" aria-hidden="true" data-completed={previousState === 'completed' || undefined} />}
        <div className="stepper__content">
          {actionable && step.href ? <a className="stepper__action" href={step.href}>{marker}{title}</a> : actionable ? <button className="stepper__action" type="button" onClick={step.onClick}>{marker}{title}</button> : <div className="stepper__text">{marker}{title}</div>}
          {step.description && <span className="stepper__description">{step.description}</span>}
        </div>
      </li>;
    })}
  </ol></div>;
}
