import { reRender } from './main';

export const { useState } = (() => {
  let callIndex = 0;
  const stateStack: unknown[] = [];

  const useState = <T>(initialValue: T): [T, (newValue: T) => void] => {
    const state = stateStack[callIndex] || initialValue;
    stateStack[callIndex] = state;

    const setState = (() => {
      const currentIndex = callIndex;

      return (newValue: T) => {
        stateStack[currentIndex] = newValue;
        callIndex = 0;
        reRender();
      };
    })();

    callIndex++;

    return [state as T, setState];
  };

  return { useState };
})();
