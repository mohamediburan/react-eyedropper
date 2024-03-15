***yet Another react-eyedropper*** (ya-react-eyedropper)

A fully controlled simple react component around [eyedropper-polyfill](https://github.com/iam-medvedev/eyedropper-polyfill).

Installation:
```
npm install ya-react-eyedropper --save
```

### Props:  

*on: boolean*  
--enables the eyedropper

*onPick: (color: Color) => unknown*  
-- returns color object. currently only supports hex.

*onPickCancel: () => unknown*  
-- called when eyedropper gets cancelled by clicking esc. similar to native eyedropper of chrome.

***Note:*** Cancel the eyedropper by clicking on escape button in keyboard.

### Usage  

```
import { useState } from "react";
import { Color, EyeDropper } from "ya-react-eyedropper";

const App = () => {
  const [on, setOn] = useState(false);
  const onPick = (color: Color) => {
    setOn(false);
    console.log({ hex: color.hex });
  };

  const onPickCancel = () => {
    setOn(false);
  };

  return (
    <EyeDropper onPick={onPick} on={on} onPickCancel={onPickCancel}>
      <button onClick={() => setOn(true)}>click me</button>
    </EyeDropper>
  );
};

export default App;
```

### Licence
[MIT](https://github.com/mohamediburan/ya-react-eyedropper/blob/main/LICENSE)

