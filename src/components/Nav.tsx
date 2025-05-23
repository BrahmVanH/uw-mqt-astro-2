import * as React from 'react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuContent } from '@/components/ui/navigation-menu';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

import LearnMoreBtn from './LearnMoreBtn';
import ListItem from './ListItem';

import logo from '@/image/logo-mqt-2.svg';

import { cn, isExternalUrl } from '@/lib/utils';
import navContent from '@/config/nav';

import type { NavTab } from '@/types/nav';

interface Props {
	path: string;
}

interface NavItemAccordionProps {
	link: NavTab;
}

const Nav: React.FC<Props> = ({ path }) => {
	const bgColor = path === '/' ? 'transparent' : 'white';

	const { navTabs, commonStyles } = navContent;

	return (
		<nav>
			<NavigationMenu className={`w-full h-8 px-2 lg:px-4 py-4 lg:py-5 z-50 bg-${bgColor} top-0`}>
				<div className='w-full flex flex-row justify-between items-center text-lg'>
					<NavigationMenuLink data-astro-prefetch className='flex items-center' href='/'>
						{logo.src && (
							<img loading='lazy' decoding='async' className='h-[50px] xl:h-[75px] w-auto mt-1 lg:mt-2 font-heading object-cover' src={logo.src} alt='United Way Logo' width={200} height={100} />
						)}
					</NavigationMenuLink>
					{/* <MobileNav socials={socials} /> */}
					<NavigationMenuList className='hidden lg:flex' role='menubar'>
						{navTabs.map(({ title, href, navTabs }) => (
							<NavigationMenuItem key={title} role='none'>
								{!navTabs ? (
									<NavigationMenuLink
										data-astro-prefetch
										className={cn(commonStyles.navTrigger, 'group inline-flex h-full w-max items-center justify-center   px-4 py-2  transition-colors ')}
										href={href}
										role='menuitem'>
										{title}
									</NavigationMenuLink>
								) : (
									<>
										<NavigationMenuTrigger className={commonStyles.navTrigger} role='menuitem' aria-haspopup='true'>
											{title}
										</NavigationMenuTrigger>
										<NavigationMenuContent className='top-0' role='menu'>
											<div className={commonStyles.navContent}>
												<div className={commonStyles.navContentLeft}>
													<p className={commonStyles.navHeading}>{title}</p>
													<LearnMoreBtn
														data-astro-prefetch
														ariaLabel={'Learn more'}
														text='Learn more'
														color='blue'
														href={href === '/about' ? navTabs[1].href : href}
														useBg={false}
														size='md'
														openInNewTab={false}
														role='menuitem'
													/>
												</div>
												<ul className={commonStyles.navContentRight}>
													{navTabs?.map((link) =>
														link.navTabs ? (
															<NavigationMenuItem key={link.title} role='none'>
																<NavItemAccordion link={link} />
															</NavigationMenuItem>
														) : (
															<ListItem
																data-astro-prefetch
																key={link.title}
																href={link.href}
																title={link.title}
																className={commonStyles.navTrigger}
																rel={isExternalUrl(link.href) ? 'noopener noreferrer' : undefined}
																target={isExternalUrl(link.href) ? '_blank' : undefined}
																role='menuitem'
															/>
														)
													)}
												</ul>
											</div>
										</NavigationMenuContent>
									</>
								)}
							</NavigationMenuItem>
						))}

						<NavigationMenuItem role='none'>
							<LearnMoreBtn
								data-astro-prefetch
								text='Donate'
								href='/donate'
								size='md'
								className=' max-h-[20px] font-semibold'
								openInNewTab={true}
								color='black'
								useBg={false}
								ariaLabel='Make a donation to the united way of marquette county'
								role='menuitem'
							/>
						</NavigationMenuItem>
					</NavigationMenuList>
				</div>
			</NavigationMenu>
		</nav>
	);
};

const NavItemAccordion: React.FC<NavItemAccordionProps> = ({ link }) => {
	const [value, setValue] = React.useState('');

	const { commonStyles } = navContent;

	return (
		<Accordion value={value} type='single' collapsible className='hidden lg:block w-full max-w-3xl mx-auto relative' onMouseLeave={() => setValue('')} role='menu'>
			<AccordionItem value={link.title} className='group border-none flex-row transition-all duration-300lg:hover:shadow-[0_0_15px_rgba(0,68,181,0.05)]' role='none'>
				<AccordionTrigger
					className={`${commonStyles.navTrigger} py-0lg:hover:bg-accent lg:hover:text-accent-foreground lg:hover:scale-105lg:hover:transition-all focus:bg-accent focus:text-accent-foreground`}
					onMouseEnter={() => setValue(link.title)}
					openTo='left'
					role='menuitem'
					aria-haspopup='true'>
					<NavigationMenuLink data-astro-prefetch className='h-full py-2 my-0' href={link.href} role='menuitem'>
						{link.title}
					</NavigationMenuLink>
				</AccordionTrigger>
				<AccordionContent className={`${commonStyles.accordionContent} animate-slide-right`} role='menu'>
					<div className='flex flex-col bg-transparent'>
						<ul>
							{link.navTabs?.map(({ href, title }) => (
								<ListItem
									data-astro-prefetch
									className={cn(commonStyles.navTrigger, 'ml-2 xl:text-[18px] border-b-2 border-tertiary-black-3  lg:hover:scale-105 lg:hover:transition-all')}
									key={title}
									href={href}
									title={title}
									rel={isExternalUrl(href) ? 'noopener noreferrer' : undefined}
									target={isExternalUrl(href) ? '_blank' : undefined}
									role='menuitem'
								/>
							))}
						</ul>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default Nav;
