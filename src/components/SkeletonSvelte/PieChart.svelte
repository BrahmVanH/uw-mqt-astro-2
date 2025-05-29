<script lang="ts">
  interface PieChartProps {
    width?: number | string;
    height?: number | string;
    className?: string;
  }

  let { width = 300, height = 300, className = "" }: PieChartProps = $props();

  const widthStr = typeof width === "number" ? `${width}px` : width;
  const heightStr = typeof height === "number" ? `${height}px` : height;
</script>


<svg
  viewBox="0 0 300 300"
  xmlns="http://www.w3.org/2000/svg"
  width={widthStr}
  height={heightStr}
  class={className}
  preserveAspectRatio="xMidYMid meet"
>
  <path
    d="M150,50 A100,100 0 0,1 236.6,200"
    fill="none"
    stroke="#9e9e9e"
    stroke-width="8"
    stroke-linecap="butt"
  >
    <animate
      attributeName="opacity"
      values="0.5;0.7;0.5"
      dur="1.5s"
      repeatCount="indefinite"
      begin="0s"
    ></animate>
  </path>
  <path
    d="M236.6,200 A100,100 0 0,1 63.4,200"
    fill="none"
    stroke="#9e9e9e"
    stroke-width="8"
    stroke-linecap="butt"
  >
    <animate
      attributeName="opacity"
      values="0.5;0.7;0.5"
      dur="1.5s"
      repeatCount="indefinite"
      begin="0.5s"
    ></animate>
  </path>
  <path
    d="M63.4,200 A100,100 0 0,1 150,50"
    fill="none"
    stroke="#9e9e9e"
    stroke-width="8"
    stroke-linecap="butt"
  >
    <animate
      attributeName="opacity"
      values="0.5;0.7;0.5"
      dur="1.5s"
      repeatCount="indefinite"
      begin="1s"
    ></animate>
  </path>

  <line x1="150" y1="46" x2="150" y2="54" stroke="#646567" stroke-width="2"
  ></line>
  <line
    x1="232.9"
    y1="198.3"
    x2="239.8"
    y2="201.5"
    stroke="#646567"
    stroke-width="2"
  ></line>
  <line
    x1="66.9"
    y1="198.0"
    x2="59.9"
    y2="202.0"
    stroke="#646567"
    stroke-width="2"
  ></line>

  <defs>
    <linearGradient id="pieShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#646567" stop-opacity="0">
        <animate
          attributeName="offset"
          values="-1;1"
          dur="2s"
          repeatCount="indefinite"
        ></animate>
      </stop>
      <stop offset="50%" stop-color="#cccccc" stop-opacity="0.3">
        <animate
          attributeName="offset"
          values="-0.5;1.5"
          dur="2s"
          repeatCount="indefinite"
        ></animate>
      </stop>
      <stop offset="100%" stop-color="#646567" stop-opacity="0">
        <animate
          attributeName="offset"
          values="0;2"
          dur="2s"
          repeatCount="indefinite"
        ></animate>
      </stop>
    </linearGradient>
  </defs>
  <circle
    cx="150"
    cy="150"
    r="105"
    fill="none"
    stroke="url(#pieShimmer)"
    stroke-width="2"
    opacity="0.5"
  ></circle>
</svg>
