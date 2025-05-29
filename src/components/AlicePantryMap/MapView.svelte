<script lang="ts">
	import * as L from 'leaflet';
	import Skeleton from '../ui/skeleton/skeleton.svelte';
	import type { FoodPantryGeoFeatureCollection } from '@/types/alice';
	import { onDestroy, onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';
	import type { Feature, Point } from 'geojson';
	import { getDistance } from '@/lib/utils';

	let {
		mapCenter,
		userDefinedLocation,
		pantries,
		handleSelectPantry,
		selectedPantryId,
	}: {
		mapCenter: L.LatLng;
		pantries: FoodPantryGeoFeatureCollection;
		userDefinedLocation: L.LatLng;
		handleSelectPantry: (pantry: Point) => void;
		selectedPantryId: string | null;
	} = $props();

	let map = $state<L.Map | null>(null);
	let mapContainer: HTMLElement;
	let mapLoaded = $state(false);
	let markers = $state<Record<string, L.Marker>>({});

	// Constants
	const upBounds: L.LatLngBoundsExpression = [
		[38.4956, -94.739], // Southwest corner with 500 mile padding
		[54.7221, -77.1121], // Northeast corner with 500 mile padding
	];

	const initializeMap = () => {
		if (!mapContainer) {
			console.error('Map container not found');
			return;
		}
		try {
			let zoom = 10;

			map = L.map(mapContainer, {
				center: mapCenter,
				zoom: zoom,
				minZoom: 7,
				maxZoom: 19,
				maxBounds: upBounds,
				maxBoundsViscosity: 1.0,
				scrollWheelZoom: true,
			});

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
			}).addTo(map);

			if (pantries?.features?.length) {
				addMarkers();
			}

			return true;
		} catch (error) {
			console.error('Error initializing map:', error);
			return false;
		}
	};

	// Create custom marker icon
	const createIcon = () => {
		return L.icon({
			iconUrl: '/images/map-pin-base-icon.svg',
			iconRetinaUrl: '/images/map-pin-retina-icon.svg',
			shadowUrl: '/images/map-pin-shadow.svg',
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],
			shadowSize: [41, 41],
		});
	};

	// Add markers for all pantries
	const addMarkers = () => {
		if (!map || !pantries?.features) return;

		// Clear existing markers
		clearMarkers();

		// Create new markers
		pantries.features.forEach((pantry) => {
			if (!pantry?.geometry || !pantry?.properties?.id) return;

			const coordinates = (pantry.geometry as Point).coordinates;
			const marker = L.marker<{ latlng: L.LatLngExpression; options?: L.MarkerOptions }>([coordinates[1], coordinates[0]], {
				icon: createIcon(),
			}).addTo(map!);

			// Add popup
			marker.bindPopup(createPopupContent(pantry));

			// Add click handler
			marker.on('click', () => {
				handleSelectPantry(pantry.geometry as Point);
			});

			// Store marker with a unique ID (use properties.id or create one)
			const pantryId = pantry.properties.id || `${coordinates[1]},${coordinates[0]}`;
			markers[pantryId as keyof typeof markers] = marker;
		});
	};

	const openPopupById = (pantryId: string) => {
		if (markers[pantryId]) {
			markers[pantryId].openPopup();
		}
	};

	// Clear all existing markers
	const clearMarkers = () => {
		const ms = Object.values(markers);
		if (ms && ms.length) {
			ms.forEach((marker) => {
				if (marker) marker.remove();
			});
			markers = {};
		}
	};

	// Create popup content
	function createPopupContent(pantry: Feature) {
		const coordinates = (pantry.geometry as Point).coordinates;
		const distanceText = userDefinedLocation ? `${getDistance({ lat: coordinates[1], lng: coordinates[0] } as L.LatLng, userDefinedLocation).toFixed(2)} miles away` : '';

		const popupContent = L.DomUtil.create('div', 'popup-content');

		// Create HTML content
		popupContent.innerHTML = `
      <p class="pantry-name">${pantry?.properties?.name || ''}</p>
      <p>${pantry?.properties?.street || ''}</p>
      <p>
        ${pantry?.properties?.city || ''}, ${pantry?.properties?.state || ''}
        ${pantry?.properties?.zip || ''}
      </p>
      <p>${pantry?.properties?.phone || ''}</p>
      ${distanceText ? `<p class="distance">${distanceText}</p>` : ''}
    `;

		// Add click event listener to the popup
		L.DomEvent.on(popupContent, 'click', (e) => {
			handleSelectPantry(pantry.geometry as Point);
			e.stopPropagation();
		});

		return popupContent;
	}

	const openPopupByCoordinates = (lat: number, lng: number) => {
		if (!map || Object.keys(markers).length === 0) return;

		let closestMarker: L.Marker | undefined;
		let closestDistance = Infinity;

		Object.values(markers).forEach((marker: L.Marker) => {
			const markerLatLng = marker.getLatLng();
			const distance = Math.sqrt(Math.pow(markerLatLng.lat - lat, 2) + Math.pow(markerLatLng.lng - lng, 2));

			if (distance < closestDistance) {
				closestDistance = distance;
				closestMarker = marker;
			}
		});

		if (closestMarker && closestDistance < 0.001) {
			closestMarker.openPopup();
		}
	};

	onMount(() => {
		let attempts = 0;
		const maxAttempts = 5;

		function tryInitializeMap() {
			attempts++;
			if (initializeMap()) {
				setTimeout(() => {
					if (map) {
						map.invalidateSize(true);
						// document.addEventListener("click", handleClickOffMap);
					}
				}, 200);
			} else if (attempts < maxAttempts) {
				setTimeout(tryInitializeMap, attempts * 100);
			} else {
				console.error('Failed to initialize map after multiple attempts');
			}
		}

		setTimeout(tryInitializeMap, 100);

		return () => {
			if (map) {
				map.remove();
			}
		};
	});

	$effect(() => {
		if (!map) return;
		map.setView(mapCenter);
	});

	$effect(() => {
		if (selectedPantryId) {
			openPopupById(selectedPantryId);
		}
	});

	// Watch for mapCenter changes to possibly open nearest popup
	$effect(() => {
		if (mapCenter && map) {
			// Small delay to let the map settle after panning
			setTimeout(() => {
				openPopupByCoordinates(mapCenter.lat, mapCenter.lng);
			}, 300);
		}
	});
</script>

<div class="map-container" bind:this={mapContainer}>
	{#if !map}
		<Skeleton />
	{/if}
</div>

<style>
	.map-container {
		width: 100% !important;
		height: 600px !important;
		position: relative;
		min-height: 600px; /* Ensure minimum height */
		overflow: hidden; /* Prevent any unexpected overflow */
	}

	.loading-container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		background-color: #f5f5f5;
	}

	:global(.popup-content) {
		padding: 8px;
		cursor: pointer;
		min-width: 200px;
	}

	:global(.popup-content p) {
		margin: 4px 0;
	}

	:global(.pantry-name) {
		font-weight: bold;
		margin-bottom: 8px;
	}

	:global(.distance) {
		margin-top: 8px;
		font-style: italic;
		color: #666;
	}

	/* Ensure Leaflet container takes full height */
	:global(.leaflet-container) {
		height: 100%;
		width: 100%;
	}
</style>
