import './ProgressBar.css';
export interface ProgressBarProps { value:number; label:string; className?:string }
export function ProgressBar({value,label,className}:ProgressBarProps) {
  const safeValue=Number.isFinite(value)?Math.min(100,Math.max(0,value)):0;
  return <div className={['progress-bar',className].filter(Boolean).join(' ')} role="progressbar" aria-label={label} aria-valuenow={safeValue} aria-valuemin={0} aria-valuemax={100}>
    <span className="progress-bar__fill" style={{width:String(safeValue)+'%'}} />
  </div>;
}
