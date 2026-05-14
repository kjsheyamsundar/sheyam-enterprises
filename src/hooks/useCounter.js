import { useEffect, useState } from 'react';

export function useCounter(target, duration = 1500, start = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();

    let raf;
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return value;
}
