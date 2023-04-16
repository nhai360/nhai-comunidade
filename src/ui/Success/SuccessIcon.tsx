import { theme } from "@/../stitches.config";

export function SuccessIcon() {
  return (
    <svg
      width="188"
      height="185"
      viewBox="0 0 188 185"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_169_5703)">
        <ellipse
          cx="94.0001"
          cy="99.8356"
          rx="54.4"
          ry="44.88"
          fill={theme.colors.greenMedium.value}
        />
      </g>
      <circle
        cx="94"
        cy="68.5557"
        r="68"
        fill={theme.colors.greenMedium.value}
      />
      <path
        d="M94.0001 31.1558C73.3927 31.1558 56.6001 47.9484 56.6001 68.5558C56.6001 89.1632 73.3927 105.956 94.0001 105.956C114.607 105.956 131.4 89.1632 131.4 68.5558C131.4 47.9484 114.607 31.1558 94.0001 31.1558ZM111.877 59.9538L90.6715 81.1596C90.1479 81.6832 89.4373 81.9824 88.6893 81.9824C87.9413 81.9824 87.2307 81.6832 86.7071 81.1596L76.1229 70.5754C75.0383 69.4908 75.0383 67.6956 76.1229 66.611C77.2075 65.5264 79.0027 65.5264 80.0873 66.611L88.6893 75.213L107.913 55.9894C108.997 54.9048 110.793 54.9048 111.877 55.9894C112.962 57.074 112.962 58.8318 111.877 59.9538Z"
        fill={theme.colors.neutral100.value}
      />
      <defs>
        <filter
          id="filter0_f_169_5703"
          x="0.160099"
          y="15.5156"
          width="187.68"
          height="168.64"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="19.72"
            result="effect1_foregroundBlur_169_5703"
          />
        </filter>
      </defs>
    </svg>
  );
}
