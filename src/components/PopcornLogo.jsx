import React from 'react';

export const PopcornLogo = () => {
  return (
    <div className="popcorn-logo-brand">
      <svg
        className="popcorn-bag-icon"
        viewBox="0 0 160 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pipocas no topo */}
        <g id="popcorn-kernels">
          <circle cx="55" cy="50" r="18" fill="#F4C430" stroke="#721121" strokeWidth="3" />
          <circle cx="80" cy="38" r="22" fill="#FFDB58" stroke="#721121" strokeWidth="3" />
          <circle cx="105" cy="50" r="18" fill="#F4C430" stroke="#721121" strokeWidth="3" />
          <circle cx="40" cy="62" r="15" fill="#FFE5B4" stroke="#721121" strokeWidth="3" />
          <circle cx="120" cy="62" r="15" fill="#FFE5B4" stroke="#721121" strokeWidth="3" />
          <circle cx="68" cy="58" r="16" fill="#FFF8E7" stroke="#721121" strokeWidth="3" />
          <circle cx="92" cy="58" r="16" fill="#FFF8E7" stroke="#721121" strokeWidth="3" />
        </g>

        {/* Pacote de pipoca de papel */}
        <g id="paper-bag">
          {/* Fundo creme do pacote */}
          <path
            d="M35 70 L125 70 L112 190 L48 190 Z"
            fill="#FFF8E7"
            stroke="#1F0508"
            strokeWidth="4"
          />

          {/* Listras vermelhas vintage */}
          <path d="M53 70 L58 190 L70 190 L67 70 Z" fill="#D32222" />
          <path d="M77 70 L79 190 L91 190 L89 70 Z" fill="#D32222" />
          <path d="M99 70 L101 190 L110 190 L111 70 Z" fill="#D32222" />

          {/* Borda superior dobrada do pacote de papel */}
          <path
            d="M30 70 C40 75 50 65 65 70 C80 75 95 65 110 70 C120 75 125 70 130 70 L125 78 L35 78 Z"
            fill="#EAD2AC"
            stroke="#1F0508"
            strokeWidth="3"
          />

          {/* Sombra de profundidade no fundo */}
          <path
            d="M48 190 L112 190 L108 196 L52 196 Z"
            fill="#1F0508"
            opacity="0.4"
          />
        </g>
      </svg>

      <span className="popcorn-text-3d">POPCORN</span>
    </div>
  );
};