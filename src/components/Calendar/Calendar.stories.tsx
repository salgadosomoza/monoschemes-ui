import { useState } from 'react';
import type {Meta,StoryObj} from '@storybook/react-vite';
import {Calendar} from './Calendar';
import type {DateRange as CalendarDateRange} from './Calendar';
const figma={design:{type:'figma',url:'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=129-674'}};
function RangeDemo(){const [value,setValue]=useState<CalendarDateRange>({start:new Date(2026,10,10),end:new Date(2026,10,14)});return <Calendar type="date-range" defaultMonth={new Date(2026,10,1)} value={value} onChange={setValue}/>;}
const meta={title:'Components/Calendar',component:Calendar,tags:['autodocs'],parameters:{...figma,docs:{description:{component:'A standalone date or date-range selector. FormDate uses this calendar in its date picker overlay. Use the month controls and keyboard grid navigation to browse.'}}}} satisfies Meta<typeof Calendar>;export default meta;type Story=StoryObj<typeof meta>;
export const SingleDate:Story={args:{type:'date',defaultMonth:new Date(2026,10,1),defaultValue:new Date(2026,10,13)}};
export const DateRangeCalendar:Story={render:()=> <RangeDemo/>};
export const Empty:Story={args:{type:'date',defaultMonth:new Date(2026,10,1)}};
export const SingleDateDark:Story={...SingleDate,globals:{theme:'dark'}};
export const DateRangeDark:Story={render:()=> <RangeDemo/>,globals:{theme:'dark'}};
export const EmptyDark:Story={...Empty,globals:{theme:'dark'}};
