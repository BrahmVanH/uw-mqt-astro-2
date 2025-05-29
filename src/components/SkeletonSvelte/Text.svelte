<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="18" x="25" y="15" rx="4" ry="4" fill="#9e9e9e">
    <animate
      attributeName="opacity"
      values="0.5;0.7;0.5"
      dur="1.5s"
      repeatCount="indefinite"
    ></animate>
  </rect>

  <rect width="350" height="12" x="25" y="62" rx="4" ry="4" fill="#9e9e9e">
    <animate
      attributeName="opacity"
      values="0.5;0.7;0.5"
      dur="1.5s"
      repeatCount="indefinite"
      begin="0.1s"
    ></animate>
  </rect>

  <rect width="300" height="12" x="25" y="80" rx="4" ry="4" fill="#9e9e9e">
    <animate
      attributeName="opacity"
      values="0.5;0.7;0.5"
      dur="1.5s"
      repeatCount="indefinite"
      begin="0.2s"
    ></animate>
  </rect>

  <rect width="250" height="12" x="25" y="98" rx="4" ry="4" fill="#9e9e9e">
    <animate
      attributeName="opacity"
      values="0.5;0.7;0.5"
      dur="1.5s"
      repeatCount="indefinite"
      begin="0.3s"
    ></animate>
  </rect>

  <rect width="325" height="12" x="25" y="116" rx="4" ry="4" fill="#9e9e9e">
    <animate
      attributeName="opacity"
      values="0.5;0.7;0.5"
      dur="1.5s"
      repeatCount="indefinite"
      begin="0.4s"
    ></animate>
  </rect>

  <rect width="200" height="10" x="25" y="160" rx="4" ry="4" fill="#9e9e9e">
    <animate
      attributeName="opacity"
      values="0.5;0.7;0.5"
      dur="1.5s"
      repeatCount="indefinite"
      begin="0.5s"
    ></animate>
  </rect>

  <rect width="150" height="10" x="25" y="176" rx="4" ry="4" fill="#9e9e9e">
    <animate
      attributeName="opacity"
      values="0.5;0.7;0.5"
      dur="1.5s"
      repeatCount="indefinite"
      begin="0.6s"
    ></animate>
  </rect>

  <defs>
    <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#646567" stopOpacity="0">
        <animate
          attributeName="offset"
          values="-1;1"
          dur="2s"
          repeatCount="indefinite"
        ></animate>
      </stop>
      <stop offset="50%" stopColor="#cccccc" stopOpacity="0.3">
        <animate
          attributeName="offset"
          values="-0.5;1.5"
          dur="2s"
          repeatCount="indefinite"
        ></animate>
      </stop>
      <stop offset="100%" stopColor="#646567" stopOpacity="0">
        <animate
          attributeName="offset"
          values="0;2"
          dur="2s"
          repeatCount="indefinite"
        ></animate>
      </stop>
    </linearGradient>
  </defs>

  <rect
    width="350"
    height="225"
    x="25"
    y="15"
    fill="url(#shimmer)"
    rx="4"
    ry="4"
  ></rect>
</svg>
