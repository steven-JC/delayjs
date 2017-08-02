# tunk-delay
Sleep, Until and some other function to delay in context, asynchronously with Promise, async/await

```
npm install tunk-delay -S
```
## Usage
````javascript

import {sleep, until, delay} from 'tunk-delay';

(async () => {
  // sleep
  await sleep(1000);
  alert('hello sleep!');
  
  // until
  let count = 0;
  await until(()=>{
    count++;
    return count === 1000;
  }, 100);
  alert('hello until!');
  
  // delay，推迟执行, 在设置的时间段内重复调用传入相同delayId的delay函数都会返回false，直到最后一次到达时间点后nextStick返回true；
  const nextStick = await delay('delayId', 1000);
  if(nextStick) {
    alert('hello delay!');
  }
  
})();

````

###use with tunk
````javascript
// index.js
import tunk, {create, action} from 'tunk';
import delay from 'tunk-delay';
tunk.mixin(delay);



// module.js
@create
export default class helloDelay{
  constructor(){
    ...
  }
  @action
  async hello(){
    // sleep
    await this.sleep(1000);
    alert('hello sleep!');
    ...
  }
}
````








