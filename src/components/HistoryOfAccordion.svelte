<script lang="ts">
	import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion/';

	import config from '@/config/historyOf';
	import BulletIcon from '@/icons/bullet.svg';

	interface Props {
		className?: string;
	}

	let { className }: Props = $props();

	let value = $state<string>();

	const volumes = config?.volumes;

	const handleOnValueChange = (v: string) => {
		value = v;
	};
</script>

<section class="{className} w-full flex flex-col justify-center items-center lg:p-4" aria-labelledby="history-title">
	<h2 id="history-title" class="text-xl lg:text-2xl font-bold text-primary-blue-2 text-center mb-2">
		{config.title}
	</h2>
	<Accordion type="single" {value} onValueChange={handleOnValueChange} class="w-full max-w-3xl mx-auto space-y-2">
		{#each volumes as volume, index}
			<AccordionItem value={`volume-${index}`} class="group px-4 border-none transition-all duration-300">
				<AccordionTrigger
					class="flex items-center w-full justify-between py-6 text-lg font-body transition-colors border-b-2 border-black font-bold lg:hover:no-underline lg:hover:text-primary-blue-1"
				>
					{volume.rangeString}
				</AccordionTrigger>
				<AccordionContent class="animate-fade-in text-md">
					<div class="pb-6 pt-2 space-y-4">
						{#each volume?.yearEntries as yearEntry}
							<div>
								<h3 class="text-tertiary-black-1 font-bold my-auto">
									{yearEntry?.year}
								</h3>
								<ul class="lg:pl-4 list-none">
									{#each yearEntry?.entries as entry}
										<li class="text-tertiary-black-1 flex flex-row items-start mt-4">
											<span class="mr-1 lg:mx-2 mt-1" aria-hidden="true">
												<img loading="lazy" decoding="async" src={BulletIcon.src} alt="" width={10} height={10} role="presentation" />
											</span>
											<p class="mx-0 lg:mx-2 my-auto w-full lg:w-[80%] text-md text-left leading-relaxed">
												{entry}
											</p>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				</AccordionContent>
			</AccordionItem>
		{/each}
	</Accordion>
</section>
