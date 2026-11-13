import type {Meta,StoryObj} from '@storybook/react-vite';import {ProgressBar} from './ProgressBar';
const figma={design:{type:'figma',url:'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=454-76'}};
const meta={title:'Components/ProgressBar',component:ProgressBar,tags:['autodocs'],parameters:{...figma,docs:{description:{component:'Shows progress for a task with a measurable completion value from 0 to 100.'}}}} satisfies Meta<typeof ProgressBar>;export default meta;type Story=StoryObj<typeof meta>;
export const Empty:Story={args:{value:0,label:'Upload progress'}};export const InProgress:Story={args:{value:60,label:'Upload progress'}};export const Complete:Story={args:{value:100,label:'Upload progress'}};
export const StatesDark:Story={args:{value:0,label:'Progress'},render:()=> <div style={{display:'grid',gap:20,width:320}}>{[0,60,100].map(value=><ProgressBar key={value} value={value} label={'Progress '+value+'%'}/>)}</div>,globals:{theme:'dark'}};
