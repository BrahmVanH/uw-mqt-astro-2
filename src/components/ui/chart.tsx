import * as React from 'react';
import * as RechartsPrimitive from 'recharts';

import { cn } from '@/lib/utils';

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: '', dark: '.dark' } as const;

export type ChartConfig = {
	[k in string]: {
		label?: React.ReactNode;
		icon?: React.ComponentType;
	} & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
};

type ChartContextProps = {
	config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
	const context = React.useContext(ChartContext);

	if (!context) {
		throw new Error('useChart must be used within a <ChartContainer />');
	}

	return context;
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	config: ChartConfig;
	children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
}

const ChartContainer: React.FC<ChartContainerProps> = ({ id, className, children, config, ...props }) => {
	const uniqueId = React.useId();
	const chartId = `chart-${id ?? uniqueId.replace(/:/g, '')}`;
	const value = React.useMemo(() => ({ config }), [config]);

	return (
		<ChartContext.Provider value={value}>
			<div
				data-chart={chartId}
				className={cn(
					"flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
					className
				)}
				{...props}>
				<ChartStyle id={chartId} config={config} />
				<RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
			</div>
		</ChartContext.Provider>
	);
};

ChartContainer.displayName = 'Chart';

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
	const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color);

	if (!colorConfig.length) {
		return null;
	}

	return (
		<style
			dangerouslySetInnerHTML={{
				__html: Object.entries(THEMES)
					.map(
						([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
	.map(([key, itemConfig]) => {
		const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ?? itemConfig.color;
		return color ? `  --color-${key}: ${color};` : null;
	})
	.join('\n')}
}
`
					)
					.join('\n'),
			}}
		/>
	);
};

const ChartTooltip = RechartsPrimitive.Tooltip;

interface ChartTooltipContentProps extends React.ComponentPropsWithoutRef<'div'>, Omit<React.ComponentProps<typeof RechartsPrimitive.Tooltip>, keyof React.ComponentPropsWithoutRef<'div'>> {
	hideLabel?: boolean;
	hideIndicator?: boolean;
	indicator?: 'line' | 'dot' | 'dashed';
	nameKey?: string;
	labelKey?: string;
}

const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({
	active,
	payload,
	className,
	indicator = 'dot',
	hideLabel = false,
	hideIndicator = false,
	label,
	labelFormatter,
	labelClassName,
	formatter,
	color,
	nameKey,
	labelKey,
}) => {
	const { config } = useChart();

	const tooltipLabel = React.useMemo(() => {
		if (hideLabel || !payload?.length) {
			return null;
		}

		const [item] = payload;
		const key = `${labelKey ?? item?.dataKey ?? item?.name ?? 'value'}`;
		const itemConfig = getPayloadConfigFromPayload(config, item, key);
		const value = !labelKey && typeof label === 'string' ? config[label]?.label || label : itemConfig?.label;
		if (labelFormatter) {
			return <div className={cn('font-medium', labelClassName)}>{labelFormatter(value, payload)}</div>;
		}

		if (!value) {
			return null;
		}

		return <div className={cn('font-medium', labelClassName)}>{value}</div>;
	}, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

	if (!active || !payload?.length) {
		return null;
	}

	const nestLabel = payload.length === 1 && indicator !== 'dot';

	return (
		<div className={cn('border-black border-2 flex flex-col  items-start justify-start rounded-lg bg-background text-xs ', className)}>
			{!nestLabel ? tooltipLabel : null}
			<div className='flex flex-col'>
				{payload.map((item, index) => {
					const key = `${nameKey ?? item.name ?? item.dataKey ?? 'value'}`;
					const itemConfig = getPayloadConfigFromPayload(config, item, key);
					const indicatorColor = color ?? item.payload.fill ?? item.color;

					return (
						<div key={item.dataKey} className={cn('flex flex-col self-start  gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground', indicator === 'dot' && 'items-center')}>
							{formatter && item?.value !== undefined && item.name ? (
								formatter(item.value, item.name, item, index, item.payload)
							) : (
								<>
									{itemConfig?.icon ? (
										<itemConfig.icon />
									) : (
										!hideIndicator && (
											<div
												className={cn(' rounded-[2px] border-[--color-border] bg-[--color-bg]', {
													'h-2.5 w-2.5': indicator === 'dot',
													'w-1': indicator === 'line',
													'w-0 border-[1.5px] border-dashed bg-transparent': indicator === 'dashed',
													'my-0.5': nestLabel && indicator === 'dashed',
												})}
												style={
													{
														'--color-bg': indicatorColor,
														'--color-border': indicatorColor,
													} as React.CSSProperties
												}
											/>
										)
									)}
									<div className={cn('flex flex-col justify-between leading-none', nestLabel ? 'items-end' : 'items-center')}>
										<div className='grid gap-1.5'>
											{nestLabel ? tooltipLabel : null}
											<span className='text-muted-foreground'>{itemConfig?.label || item.name}</span>
										</div>
										{item.value && <span className='font-mono font-medium tabular-nums text-foreground'>{item.value.toLocaleString()}</span>}
									</div>
								</>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};
ChartTooltipContent.displayName = 'ChartTooltip';

const ChartLegend = RechartsPrimitive.Legend;

interface ChartLegendContentProps extends React.ComponentPropsWithoutRef<'div'>, Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> {
	hideIcon?: boolean;
	nameKey?: string;
}

const ChartLegendContent: React.FC<ChartLegendContentProps> = ({ className, hideIcon = false, payload, verticalAlign = 'bottom', nameKey }) => {
	const { config } = useChart();

	if (!payload?.length) {
		return null;
	}

	return (
		<div className={cn('flex items-center justify-center gap-4', verticalAlign === 'top' ? 'pb-3' : 'pt-3', className)}>
			{payload.map((item) => {
				const key = `${nameKey ?? item.dataKey ?? 'value'}`;
				const itemConfig = getPayloadConfigFromPayload(config, item, key);

				return (
					<div key={item.value} className={cn('flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground')}>
						{itemConfig?.icon && !hideIcon ? (
							<itemConfig.icon />
						) : (
							<div
								className='h-2 w-2 shrink-0 rounded-[2px]'
								style={{
									backgroundColor: item.color,
								}}
							/>
						)}
						{itemConfig?.label}
					</div>
				);
			})}
		</div>
	);
};
ChartLegendContent.displayName = 'ChartLegend';

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(config: ChartConfig, payload: unknown, key: string) {
	if (typeof payload !== 'object' || payload === null) {
		return undefined;
	}

	const payloadPayload = 'payload' in payload && typeof payload.payload === 'object' && payload.payload !== null ? payload.payload : undefined;

	let configLabelKey: string = key;

	if (key in payload && typeof payload[key as keyof typeof payload] === 'string') {
		configLabelKey = payload[key as keyof typeof payload] as string;
	} else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key as keyof typeof payloadPayload] === 'string') {
		configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
	}

	return configLabelKey in config ? config[configLabelKey] : config[key];
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };
