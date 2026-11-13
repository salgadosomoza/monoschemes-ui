import type {Meta,StoryObj} from '@storybook/react-vite';import {Spinner} from './Spinner';
const figma={design:{type:'figma',url:'https://www.figma.com/design/XZ8yMM8VJihEwmyFaW6sCB/MonoSchemes-kit?node-id=90-657'}};
const meta={title:'Components/Spinner',component:Spinner,tags:['autodocs'],parameters:{...figma,docs:{description:{component:'A stepped loading indicator. Choose a form and size; the default size can include the Loading label.'}}}} satisfies Meta<typeof Spinner>;export default meta;type Story=StoryObj<typeof meta>;
export const Squares:Story={args:{type:'squares'}};export const Grid:Story={args:{type:'grid'}};export const Outline:Story={args:{type:'outline'}};
export const Small:Story={render:()=> <div style={{display:'flex',gap:24,alignItems:'center'}}>{(['squares','grid','outline'] as const).map(type=><Spinner key={type} type={type} size="small" showLabel={false}/>)}</div>};
export const AllTypes:Story={render:()=> <div style={{display:'grid',gap:24}}>{(['squares','grid','outline'] as const).map(type=><Spinner key={type} type={type}/>)}</div>};
export const AllTypesDark:Story={...AllTypes,globals:{theme:'dark'}};export const SmallDark:Story={...Small,globals:{theme:'dark'}};
