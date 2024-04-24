export default function Debounce(fn, delay =2000){
  let timer;
  return (...args)=>{
    if(!timer){
        fn.apply(this,args);
    }
    clearTimeout(timer);
    timer = setTimeout(()=>{timer=undefined},delay);
  }
}