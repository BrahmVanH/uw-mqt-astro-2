<script lang="ts">
	import { onMount } from 'svelte';
	import { LatLng } from 'leaflet';

	import LeafletMap from './MapView.svelte';
	import Panel from './Panel.svelte';

	import Icon from '@iconify/svelte';

	import pantries from '../../lib/data/food-pantries-3.json';
	import zipcodes from '../../lib/data/zipcodes.json';

	import { getDistance, getGeoJsonGroupCenter, pantriesToPantryFeatures, sortPantriesByClosest } from '@/lib/utils';
	import type { FoodPantry, UserGeo } from '@/types/alice';
	import type { Point } from 'geojson';
	import LoadingSpinner from '../LoadingSpinner.svelte';

	// Convert pantries to GeoJSON features
	const pantryFeatures = pantriesToPantryFeatures(pantries);

	// Props
	let { initialUserGeoData }: { initialUserGeoData: UserGeo } = $props();

	// State
	let isClient = $state<boolean>(false);
	let zipcode = $state<string>('');
	let userDefinedLocation = $state<LatLng>(new LatLng(initialUserGeoData.latitude, initialUserGeoData.longitude));
	let selectedPantryLocation = $state<LatLng | null>(null);
	let closePopups = $state(false);

	let mapCenter = $derived(selectedPantryLocation ?? userDefinedLocation);
	let sortedPantries = $derived(sortPantriesByClosest(mapCenter, pantries));

	let selectedPantryId = $state(null);

	async function requestPreciseLocation() {
		if (!navigator.geolocation) {
			return;
		}
		try {
			const position: GeolocationPosition = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject, {
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0,
				});
			});

			if (!position) {
				return;
			}

			userDefinedLocation = new LatLng(position.coords.latitude, position.coords.longitude);

			mapCenter = new LatLng(position.coords.latitude, position.coords.longitude);
		} catch (error) {
		}
	}

	// Handlers
	function handleSetUserDefinedLocation(coordinates: number[]) {
		userDefinedLocation = new LatLng(coordinates[1], coordinates[0]);
	}

	function handleSetMapCenter(latLng: LatLng) {
		mapCenter = latLng;
	}

	function setMapCenterWithZip(zip: string) {
		if (zip.length === 5 && zipcodes[zip as keyof typeof zipcodes]) {
			const [zipLng, zipLat] = zipcodes[zip as keyof typeof zipcodes];
			const zipLatLng = new LatLng(parseFloat(zipLng), parseFloat(zipLat));

			const sorted = sortPantriesByClosest(zipLatLng, pantries);
			handleSetMapCenter(new LatLng(sorted[0].geo.lat, sorted[0].geo.lng));
		}
	}

	function handleSelectPantry(pantry: Point) {
		const latLng = new LatLng(pantry.coordinates[1], pantry.coordinates[0]);
		handleSetMapCenter(latLng);
		triggerClosePopup();
	}

	function handleOnChange(event: Event) {
		zipcode = (event.target as HTMLInputElement).value;
	}

	const triggerClosePopup = () => {
		closePopups = true;
	};

	const resetClosePopups = () => {
		closePopups = false;
	};

	function handleSelectPantryFromPanel(pantry: any) {
		// Update map center
		const latLng = new LatLng(pantry.geo.lat, pantry.geo.lng);
		handleSetMapCenter(latLng);

		// Set the selected pantry ID to trigger popup
		selectedPantryId = pantry.id || `${pantry.geo.lat},${pantry.geo.lng}`;
	}
	const handleEnterKey = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			setMapCenterWithZip(zipcode);
		}
	};

	// Initialize component
	onMount(() => {
		isClient = true;
		requestPreciseLocation();

		document.addEventListener('keydown', handleEnterKey);

		return () => {
			document.removeEventListener('keydown', handleEnterKey);
		};
	});
</script>

<div class="w-full xl:h-min flex flex-row">
	<h2 class="text-xl mb-1">Food Pantries</h2>
	<div class="border-2 border-primary-blue-4 rounded-sm m-2">
		<input
			value={zipcode}
			oninput={handleOnChange}
			maxlength={5}
			type="text"
			class="text-sm leading-none border-none m-[.25rem] focus:ring-0 focus:border-0 focus:outline-none focus:leading-none focus:placeholder:text-transparent placeholder:text-md"
			placeholder="zip code"
		/>
		<button onclick={() => setMapCenterWithZip(zipcode)}>
			<Icon icon="line-md:search" class="text-primary-blue-2 bg-transparent w-2 h-2" />
		</button>
	</div>
</div>

<div class="w-full max-w-[90vw] flex flex-col xl:grid xl:grid-cols-8 xl:max-h-[600px]">
	<div class="h-full xl:col-span-5" >
		{#if isClient}
			<LeafletMap {selectedPantryId} {mapCenter} {userDefinedLocation} pantries={pantryFeatures} {handleSelectPantry} />
		{:else}
			<LoadingSpinner />
		{/if}
	</div>
	<div class="xl:col-span-3 min-h-[200px] xl:h-[600px] xl:max-h-[600px]">
		{#if isClient}
			<Panel {sortedPantries} handleFocusPantryLocation={handleSetMapCenter} />
		{:else}
			<LoadingSpinner />
		{/if}
	</div>
</div>
