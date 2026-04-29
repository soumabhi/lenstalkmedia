import React from 'react';

interface PokemonCardProps {
  name: string;
  stage?: string;
  hp?: number;
  textColor?: string;
  panelBackground?: string;
  typeColor?: string;
  bgGradient?: string;
  innerGradient?: string;
  attack1Name?: string;
  attack1Damage?: string;
  attack2Name?: string;
  attack2Desc?: string;
  attack2Damage?: string;
  illustratorInfo?: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  stage = "Basic Creative",
  hp = 100,
  textColor = "#1A2B5E",
  panelBackground = "rgba(255, 255, 255, 0.65)",
  typeColor = "#f8d030",
  bgGradient = "linear-gradient(to bottom right, #ffe76b, #cba922)",
  innerGradient = "radial-gradient(circle at center, #f4d742 20%, #f8d030 80%)",
  attack1Name = "Fast Turnaround",
  attack1Damage = "24h",
  attack2Name = "Global Vision",
  attack2Desc = "High quality production that captures your brand's unique story.",
  attack2Damage = "100",
  illustratorInfo = "LensTalk Media • 01/04"
}) => {
  const primary = textColor;
  const secondary = `${textColor}E6`; // 90%
  const muted = `${textColor}D9`; // 85%
  const hpColor = '#FF4D4D'; // Agency Red

  return (
    <div className="card-container scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100">
      <div className="hover-zone tl"></div>
      <div className="hover-zone tr"></div>
      <div className="hover-zone bl"></div>
      <div className="hover-zone br"></div>

      <div className="playing-card" style={{ background: bgGradient }}>
        <div className="shimmer"></div>

        <div className="card-inner-content" style={{ background: innerGradient }}>
          <div className="card-header">
            <div className="header-left">
              <span className="stage-label" style={{ color: secondary }}>{stage}</span>
              <span className="pokemon-name uppercase" style={{ color: primary }}>{name}</span>
            </div>
            <div className="header-right" style={{ color: hpColor, fontWeight: 600 }}>
              <span className="hp-label" style={{ color: hpColor }}>HP</span>{hp}
              <div className="type-icon-header" style={{ backgroundColor: '#FFD700', borderColor: 'rgba(0,0,0,0.2)' }}>
                <svg className="icon-svg" viewBox="0 0 24 24" style={{ color: primary }}>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="art-box">
            <div className="bg-clipper">
              <div className="parallax-layer layer-sky"></div>
              <div className="parallax-layer layer-grass">
                <div className="grass-shape"></div>
              </div>
            </div>            <div className="parallax-layer layer-pokemon">
              {/* Simplified Cow SVG for Brand Impact */}
              <svg
                className="main-svg-image"
                height="150px"
                width="300px"
                viewBox="0 0 512 512"
              >
                <g>
                  <path style={{ fill: '#ECE1D4' }} d="M302.324,473.485h-60.715V512h60.715c10.628,0,19.258-8.618,19.258-19.251 C321.582,482.121,312.952,473.485,302.324,473.485z" />
                  <path style={{ fill: '#F8EDE2' }} d="M199.625,473.485c-10.622,0-19.251,8.636-19.251,19.263c0,10.634,8.63,19.251,19.251,19.251h41.984 v-38.515H199.625z" />
                  <path style={{ fill: '#F8DBC0' }} d="M183.806,86.173c-35.953,0-71.888-42.786-58.198-75.307c5.129-11.961-1.713-15.393-15.409-3.413 c-13.684,11.993-39.373,82.152,44.508,119.803L183.806,86.173z" />
                  <path style={{ fill: '#6F6254' }} d="M19.484,110.571c12.844-3.426,63.33-8.567,102.69,13.696c10.787,6.1,16.261,8.574,25.68-0.864 c15.424-15.418,0.614,76.171-6.855,76.171c-10.268,0-35.934,0-54.76,0c-29.101,0-56.196-15.819-68.478-30.805 C2.359,149.938-13.758,119.433,19.484,110.571z" />
                  <path style={{ fill: '#6F6254' }} d="M183.756,77.962c-0.301,0-0.739,0-1.04,0c-17.447,0-23.798,7.941-30.145,22.213 c-6.338,14.266-24.233,71.161-28.557,80.874c-6.344,14.285-6.319,30.148-6.319,50.764c0,20.623,0,100.571,0,124.361 c0,10.427,6.717,21.756,17.326,32.265c2.135,2.129,4.402,4.215,6.679,6.25C277.055,257.108,215.056,116.276,183.756,77.962z" />
                  <path style={{ fill: '#FFFDF9' }} d="M183.756,77.962c31.3,38.314,93.299,179.146-42.056,316.728 c12.215,10.935,25.147,20.516,25.147,26.528c0,12.688-6.331,22.207-6.331,39.648c0,17.447,15.581,29.434,43.7,29.434 c14.279,0,56.232,0,56.232,0V77.962C241.728,77.962,201.711,77.962,183.756,77.962z" />
                  <path style={{ fill: '#EFCDAE' }} d="M318.244,86.173c35.947,0,71.894-42.786,58.191-75.307c-5.142-11.961,1.716-15.393,15.4-3.413 c13.702,11.993,39.372,82.152-44.489,119.803L318.244,86.173z" />
                  <path style={{ fill: '#8B7B67' }} d="M371.964,238.684c0.645,1.835,1.052,3.758,1.052,5.812c0,9.92-8.054,17.986-17.974,17.986 c-9.932,0-17.98-8.066-17.98-17.986c0-0.419,0.107-0.827,0.138-1.234C350.177,232.484,363.322,236.054,371.964,238.684z" />
                  <path style={{ fill: '#F8EDE2' }} d="M356.828,119.802c-2.975-8.517-5.618-15.706-7.365-19.627 c-6.343-14.272-12.681-22.213-30.122-22.213c-17.467,0-58.693,0-77.731,0V490.3c0,0,41.94,0,56.219,0 c28.125,0,43.706-11.987,43.706-29.434c0-14.022-4.052-22.939-5.661-32.484C227.731,285.878,306.495,145.673,356.828,119.802z" />
                  <path style={{ fill: '#625549' }} d="M367.029,388.44c10.602-10.509,17.328-21.838,17.328-32.265c0-23.791,0-103.738,0-124.361 c0-20.616,0.019-36.479-6.325-50.764c-3.131-7.039-13.389-38.833-21.205-61.248c-50.332,25.871-129.096,166.076-20.955,308.58 c-0.401-2.323-0.676-4.672-0.676-7.164C335.197,414.079,353.427,401.942,367.029,388.44z" />
                  <path style={{ fill: '#8B7B67' }} d="M46.867,161.918c-5.997-5.993-8.555-23.973,6.848-22.238c15.409,1.69,54.772,17.097,54.772,23.947 C108.487,170.479,77.127,192.185,46.867,161.918z" />
                  <path style={{ fill: '#625549' }} d="M489.437,110.571c-12.851-3.426-63.34-8.567-102.705,13.696c-10.778,6.1-16.264,8.574-25.677-0.864 c-15.431-15.418-0.607,76.171,6.864,76.171c10.258,0,35.922,0,54.747,0c29.102,0,56.206-15.819,68.481-30.805 C506.552,149.938,522.659,119.433,489.437,110.571z" />
                  <path style={{ fill: '#8B7B67' }} d="M462.031,161.918c6.006-5.993,8.561-23.973-6.839-22.238c-15.406,1.69-54.772,17.097-54.772,23.947 C400.421,170.479,431.79,192.185,462.031,161.918z" />
                  <path style={{ fill: '#342928' }} d="M130.077,238.684c-0.633,1.835-1.049,3.758-1.049,5.812c0,9.92,8.051,17.986,17.98,17.986 c9.917,0,17.967-8.066,17.967-17.986c0-0.419-0.088-0.827-0.132-1.234C151.867,232.484,138.719,236.054,130.077,238.684z" />
                  <path style={{ fill: '#342928' }} d="M371.964,238.684c0.645,1.835,1.052,3.758,1.052,5.812c0,9.92-8.054,17.986-17.974,17.986 c-9.932,0-17.98-8.066-17.98-17.986c0-0.419,0.107-0.827,0.138-1.234C350.177,232.484,363.322,236.054,371.964,238.684z" />
                  <path style={{ fill: '#4F4B4A' }} d="M204.147,431.407c15.725-6.056,18.63,30.649,10.101,33.686 C198.517,470.711,189.542,437.012,204.147,431.407z" />
                  <path style={{ fill: '#4F4B4A' }} d="M292.442,431.407c-15.731-6.056-18.643,30.649-10.107,33.686 C298.06,470.711,307.052,437.012,292.442,431.407z" />
                </g>
              </svg>
            </div>
          </div>

          <div className="info-strip uppercase font-titillium">Creative Media Agency • Est. 2020 • High Impact</div>

          <div className="attacks-panel" style={{ backgroundColor: panelBackground }}>
            <div className="attacks-container">
              <div className="attack-row">
                <div className="energy-cost">
                  <div className="energy-orb colorless" style={{ backgroundColor: '#FFD700', borderColor: 'rgba(0,0,0,0.1)' }}>
                    <svg className="icon-svg" viewBox="0 0 24 24" style={{ color: primary }}>
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                </div>
                <div className="attack-mid">
                  <div className="attack-name uppercase font-display" style={{ color: primary }}>{attack1Name}</div>
                </div>
                <div className="attack-damage font-display" style={{ color: primary }}>{attack1Damage}</div>
              </div>

              <div className="attack-row">
                <div className="energy-cost">
                  <div className="energy-orb colorless" style={{ backgroundColor: '#FFD700', borderColor: 'rgba(0,0,0,0.1)' }}>
                    <svg className="icon-svg" viewBox="0 0 24 24" style={{ color: primary }}>
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                </div>
                <div className="attack-mid">
                  <div className="attack-name uppercase font-display" style={{ color: primary }}>{attack2Name}</div>
                  <div className="attack-desc font-titillium" style={{ color: muted }}>
                    {attack2Desc}
                  </div>
                </div>
                <div className="attack-damage font-display" style={{ color: primary }}>{attack2Damage}</div>
              </div>
            </div>
          </div>

          <div className="bottom-metadata font-titillium" style={{ color: primary }}>
            <div className="illustrator uppercase">
              {illustratorInfo}
              <svg className="icon-svg star-svg" viewBox="0 0 24 24" style={{ color: '#FFD700' }}>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
