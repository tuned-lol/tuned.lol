interface Props {
  className?: string;
}

export function Logo({ className }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='200'
      height='200'
      viewBox='0 0 200 200'
      fill='none'
      className={className}
    >
      <title>tuned</title>
      <g clipPath='url(#rect)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M100 184c7 8 14 16 27 16 31 0 40-42 40-73 0-13 9-20 17-27s16-14 16-27c0-31-42-40-73-40-13 0-20-9-27-17S86 0 73 0C42 0 33 42 33 73c0 13-9 20-17 27S0 114 0 127c0 31 42 40 73 40 13 0 20 9 27 17Zm0-47a37 37 0 1 0 0-74 37 37 0 0 0 0 74Z'
          fill='url(#grad)'
        />
      </g>
      <defs>
        <linearGradient
          id='grad'
          x1='100'
          x2='100'
          y1='0'
          y2='200'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#93c5fd' />
          <stop offset='1' stopColor='#c4b5fd' />
        </linearGradient>
        <clipPath id='rect'>
          <rect width='200' height='200' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

export function FilledLogo({ className }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='200'
      height='200'
      viewBox='0 0 200 200'
      fill='currentColor'
      className={className}
    >
      <title>tuned</title>
      <path
        fill-rule='evenodd'
        d='M100 184c7 8 14 16 27 16 31 0 40-42 40-73 0-13 9-20 17-27s16-14 16-27c0-31-42-40-73-40-13 0-20-9-27-17S86 0 73 0C42 0 33 42 33 73c0 13-9 20-17 27S0 114 0 127c0 31 42 40 73 40 13 0 20 9 27 17Zm0-47a37 37 0 1 0 0-74 37 37 0 0 0 0 74Z'
      />
    </svg>
  );
}
