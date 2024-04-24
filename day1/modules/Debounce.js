export default function Debounce(fn, delay =1000){
  let timer;
  return function (...args) {
    if(timer){
      clearTimeout(timer);
    }
       
    timer = setTimeout(()=>{fn(...args);},delay);
  };
};