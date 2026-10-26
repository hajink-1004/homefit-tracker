export const KEY = 'homefit-seven-v1';
export type Tracker = {start: string|null; records: Record<string,number>};
export function localDay(d=new Date()) {return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export function dateOf(key:string){const [y,m,d]=key.split('-').map(Number);return new Date(y,m-1,d,12);}
export function addDays(key:string,n:number){const d=dateOf(key);d.setDate(d.getDate()+n);return localDay(d);}
export function dayDiff(a:string,b:string){const day=(k:string)=>{const [y,m,d]=k.split('-').map(Number);return Date.UTC(y,m-1,d)};return Math.round((day(a)-day(b))/86400000)}
export function status(n:number|undefined){return n===undefined?'empty':n>=15?'complete':n>0?'minimum':'incomplete'}
export const labels = {empty:'미기록',complete:'완료',minimum:'최소 수행',incomplete:'미완료'};
export function load():Tracker{try{const value=JSON.parse(localStorage.getItem(KEY)||'null');if(value&&/^\d{4}-\d{2}-\d{2}$/.test(value.start)&&value.records&&typeof value.records==='object'){const records:Record<string,number>={};for(const [k,v] of Object.entries(value.records))if(/^\d{4}-\d{2}-\d{2}$/.test(k)&&Number.isInteger(v)&&Number(v)>=0)records[k]=Number(v);return {start:value.start,records};}}catch{}return {start:null,records:{}}}
export function completed(data:Tracker,today:string){return data.start?Array.from({length:7},(_,i)=>addDays(data.start!,i)).filter(k=>k<=today&&(data.records[k]??0)>=15).length:0}
export function streak(data:Tracker,today:string){if(!data.start)return 0;const end=addDays(data.start,6);let key=today>end?end:today;if((data.records[key]??0)<15)key=addDays(key,-1);let n=0;while(key>=data.start&&(data.records[key]??0)>=15){n++;key=addDays(key,-1)}return n}
