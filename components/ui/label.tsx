'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@/lib/utils';

function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const ref = React.useRef<HTMLLabelElement>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLLabelElement>) => {
    if (e.pointerType === 'pen') {
      e.preventDefault();
      ref.current?.click();
    }
    props.onPointerDown?.(e);
  };
  return (
    <LabelPrimitive.Root
      ref={ref}
      onPointerDown={handlePointerDown}
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

export { Label };
