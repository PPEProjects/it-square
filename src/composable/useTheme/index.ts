export const colorsColection = [
  '#8338ec',
  '#5534A5',
  '#005555',
  '#0078AA',
  '#E94560',
  '#242F9B',
  '#464F41',
  '#3a0ca3',
  '#5f0f40',
  '#f72585',
  '#b5179e',
  '#7209b7',
  '#560bad'
]


export const useTheme = () => {
  return {
    colorFactory: () => colorsColection[Math.floor(Math.random() * colorsColection.length)]
  }
}
