import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Icon } from '../Icon';
import './Calendar.css';

export interface DateRange { start: Date | null; end: Date | null }
interface CalendarBaseProps { locale?: string; month?: Date; defaultMonth?: Date; defaultFocusDate?: Date; onMonthChange?: (month: Date) => void; minDate?: Date; maxDate?: Date; autoFocus?: boolean; className?: string }
export interface SingleCalendarProps extends CalendarBaseProps { type?: 'date'; value?: Date | null; defaultValue?: Date | null; onChange?: (value: Date | null) => void }
export interface RangeCalendarProps extends CalendarBaseProps { type: 'date-range'; value?: DateRange; defaultValue?: DateRange; onChange?: (value: DateRange) => void }
export type CalendarProps = SingleCalendarProps | RangeCalendarProps;

const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const addMonths = (date: Date, amount: number) => new Date(date.getFullYear(), date.getMonth() + amount, 1);
const dateKey = (date: Date) => date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');
const sameDay = (a: Date | null | undefined, b: Date) => !!a && dateKey(a) === dateKey(b);
const dateOnly = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
function constrainToBounds(date: Date, minDate?: Date, maxDate?: Date) {
  const normalized=dateOnly(date);
  if(minDate&&normalized<dateOnly(minDate)) return dateOnly(minDate);
  if(maxDate&&normalized>dateOnly(maxDate)) return dateOnly(maxDate);
  return normalized;
}
function monthDays(month: Date) {
  const first = startOfMonth(month);
  const mondayOffset = (first.getDay() + 6) % 7;
  const start = new Date(first.getFullYear(), first.getMonth(), 1 - mondayOffset);
  return Array.from({length:42},(_,i)=>new Date(start.getFullYear(),start.getMonth(),start.getDate()+i));
}
function monthLabel(date: Date, locale: string) { return new Intl.DateTimeFormat(locale,{month:'long',year:'numeric'}).format(date); }
function weekdayLabels(locale: string) { const formatter=new Intl.DateTimeFormat(locale,{weekday:'narrow'}); return Array.from({length:7},(_,i)=>formatter.format(new Date(2024,0,1+i))); }

export function Calendar(props: CalendarProps) {
  const {locale='en',className,onMonthChange}=props;
  const rangeMode=props.type==='date-range';
  const controlledMonth=props.month;
  const [internalMonth,setInternalMonth]=useState(()=>startOfMonth(props.defaultMonth ?? props.month ?? new Date()));
  const visibleMonth=startOfMonth(controlledMonth ?? internalMonth);
  const [internalDate,setInternalDate]=useState<Date|null>(()=>props.type==='date-range'?null:(props.defaultValue ?? props.value ?? null));
  const [internalRange,setInternalRange]=useState<DateRange>(()=>props.type==='date-range'?(props.defaultValue ?? props.value ?? {start:null,end:null}):{start:null,end:null});
  const dateValue=props.type==='date' && props.value!==undefined ? props.value : internalDate;
  const rangeValue=props.type==='date-range' && props.value!==undefined ? props.value : internalRange;
  const initialFocus=rangeMode?(rangeValue.start ?? new Date()):(dateValue ?? props.defaultFocusDate ?? new Date());
  const [focusDate,setFocusDate]=useState(()=>dateOnly(initialFocus));
  const dayRefs=useRef(new Map<string,HTMLButtonElement>());
  const focusPending=useRef(false);
  const didAutoFocus=useRef(false);
  const labels=useMemo(()=>weekdayLabels(locale),[locale]);
  const months=rangeMode?[visibleMonth,addMonths(visibleMonth,1)]:[visibleMonth];
  useEffect(()=>{ if(focusPending.current) { dayRefs.current.get(dateKey(focusDate))?.focus(); focusPending.current=false; } },[focusDate]);
  useEffect(()=>{ if(props.autoFocus&&!didAutoFocus.current) { dayRefs.current.get(dateKey(focusDate))?.focus(); didAutoFocus.current=true; } },[props.autoFocus,focusDate]);

  function changeMonth(next: Date) {
    const normalized=startOfMonth(next);
    if(controlledMonth===undefined) setInternalMonth(normalized);
    onMonthChange?.(normalized);
    focusPending.current=true;
    setFocusDate(new Date(normalized.getFullYear(),normalized.getMonth(),Math.min(focusDate.getDate(),new Date(normalized.getFullYear(),normalized.getMonth()+1,0).getDate())));
  }
  function selectDate(date: Date) {
    const selected=dateOnly(date);
    if((props.minDate&&selected<dateOnly(props.minDate))||(props.maxDate&&selected>dateOnly(props.maxDate))) return;
    if(!rangeMode) {
      setInternalDate(selected);
      if(props.type==='date') props.onChange?.(selected);
      return;
    }
    const current=rangeValue;
    let next: DateRange;
    if(!current.start || current.end) next={start:selected,end:null};
    else if(selected<current.start) next={start:selected,end:current.start};
    else next={start:current.start,end:selected};
    setInternalRange(next);
    if(props.type==='date-range') props.onChange?.(next);
  }
  function moveFocus(date: Date) {
    date=constrainToBounds(date,props.minDate,props.maxDate);
    focusPending.current=true;
    setFocusDate(dateOnly(date));
    if(date.getMonth()!==visibleMonth.getMonth() || date.getFullYear()!==visibleMonth.getFullYear()) {
      const nextMonth=startOfMonth(date);
      if(controlledMonth===undefined) setInternalMonth(nextMonth);
      onMonthChange?.(nextMonth);
    }
  }
  function onDayKeyDown(event: KeyboardEvent<HTMLButtonElement>,date:Date) {
    let next:Date|undefined;
    if(event.key==='ArrowRight') next=new Date(date.getFullYear(),date.getMonth(),date.getDate()+1);
    if(event.key==='ArrowLeft') next=new Date(date.getFullYear(),date.getMonth(),date.getDate()-1);
    if(event.key==='ArrowDown') next=new Date(date.getFullYear(),date.getMonth(),date.getDate()+7);
    if(event.key==='ArrowUp') next=new Date(date.getFullYear(),date.getMonth(),date.getDate()-7);
    if(event.key==='Home') next=new Date(date.getFullYear(),date.getMonth(),date.getDate()-((date.getDay()+6)%7));
    if(event.key==='End') next=new Date(date.getFullYear(),date.getMonth(),date.getDate()+(6-((date.getDay()+6)%7)));
    if(event.key==='PageUp') next=new Date(date.getFullYear(),date.getMonth()-(event.shiftKey?12:1),Math.min(date.getDate(),28));
    if(event.key==='PageDown') next=new Date(date.getFullYear(),date.getMonth()+(event.shiftKey?12:1),Math.min(date.getDate(),28));
    if(next) { event.preventDefault(); moveFocus(next); }
    if(event.key==='Enter'||event.key===' ') { event.preventDefault(); selectDate(date); }
  }
  function renderMonth(month:Date,monthIndex:number) {
    const days=monthDays(month);
    const monthId='calendar-month-'+month.getFullYear()+'-'+month.getMonth();
    const inRange=(day:Date)=>rangeMode&&rangeValue.start&&rangeValue.end&&dateOnly(day)>dateOnly(rangeValue.start)&&dateOnly(day)<dateOnly(rangeValue.end);
    return <section className="calendar__month" key={monthId} aria-label={monthLabel(month,locale)}>
      {rangeMode&&<div className="calendar__month-title" id={monthId}>{monthLabel(month,locale)}</div>}
      <div className="calendar__grid" role="grid" aria-label={monthLabel(month,locale)} aria-labelledby={rangeMode?monthId:undefined}>
        <div className="calendar__row calendar__weekdays" role="row">{labels.map((label,i)=><span className="calendar__weekday" role="columnheader" key={i}>{label}</span>)}</div>
        {Array.from({length:6},(_,week)=><div role="row" className="calendar__row" key={week}>{days.slice(week*7,week*7+7).map((day,col)=>{
          const key=dateKey(day),other=day.getMonth()!==month.getMonth(),today=sameDay(day,new Date());
          const outOfBounds=!!((props.minDate&&dateOnly(day)<dateOnly(props.minDate))||(props.maxDate&&dateOnly(day)>dateOnly(props.maxDate)));
          const selected=rangeMode ? sameDay(rangeValue.start,day)||sameDay(rangeValue.end,day) : sameDay(dateValue,day);
          const focused=sameDay(focusDate,day);
          const duplicate=rangeMode&&monthIndex===1&&day.getMonth()===visibleMonth.getMonth();
          return <div role="gridcell" aria-selected={selected||undefined} className="calendar__cell" data-in-range={inRange(day)||undefined} key={key+'-'+col}>
            <button ref={element=>{if(element&&!duplicate) dayRefs.current.set(key,element);}} type="button" className="calendar__day" data-other-month={other||undefined} data-today={today||undefined} data-selected={selected||undefined} data-in-range={inRange(day)||undefined} data-out-of-bounds={outOfBounds||undefined} tabIndex={focused&&!duplicate?0:-1} aria-disabled={outOfBounds||undefined} aria-label={new Intl.DateTimeFormat(locale,{dateStyle:'full'}).format(day)} onFocus={()=>setFocusDate(dateOnly(day))} onKeyDown={event=>onDayKeyDown(event,day)} onClick={()=>{if(outOfBounds)return;setFocusDate(dateOnly(day));selectDate(day);}}>
              <span>{day.getDate()}</span>{today&&<i aria-hidden="true"/>}
            </button>
          </div>;
        })}</div>)}
      </div>
    </section>;
  }
  return <div className={['calendar',rangeMode?'calendar--range':'',className].filter(Boolean).join(' ')} data-type={rangeMode?'date-range':'date'}>
    <div className="calendar__header">
      <button type="button" className="calendar__nav" aria-label="Previous month" onClick={()=>changeMonth(addMonths(visibleMonth,-1))}><Icon name="chevron-left" size={24}/></button>
      {!rangeMode&&<span className="calendar__header-title">{monthLabel(visibleMonth,locale)}</span>}
      <button type="button" className="calendar__nav" aria-label="Next month" onClick={()=>changeMonth(addMonths(visibleMonth,1))}><Icon name="chevron-right" size={24}/></button>
    </div>
    <div className="calendar__months">{months.map(renderMonth)}</div>
  </div>;
}
