import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import xBlue from '@/icons/x-blue.svg';

import { cn } from '@/lib/utils';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent: React.FC<React.ComponentProps<typeof PopoverPrimitive.Content>> = ({ className, align = 'center', sideOffset = 4, children, ...props }) => (
	<PopoverPrimitive.Portal>
		<PopoverPrimitive.Content
			align={align}
			sideOffset={sideOffset}
			className={cn(
				'z-50 w-72 border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				className
			)}
			{...props}>
			{children}
			<PopoverPrimitive.Close className='absolute right-4 top-4'>
				<img className='bg-transparent aspect-auto ' src={xBlue.src} height={12} width={12} alt='close icon' />
				<span className='sr-only'>Close</span>
			</PopoverPrimitive.Close>
		</PopoverPrimitive.Content>
	</PopoverPrimitive.Portal>
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
