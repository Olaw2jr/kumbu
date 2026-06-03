export interface KumbuPalette {
  paper: string;
  paperDeep: string;
  paperEdge: string;
  ink: string;
  inkSoft: string;
  inkMute: string;
  inkFaint: string;
  line: string;
  lineSoft: string;
  hanko: string;
  hankoSoft: string;
}

export const paperPalette: KumbuPalette = {
  paper: '#FAFAF6',
  paperDeep: '#F2EEE4',
  paperEdge: '#ECE7DA',
  ink: '#1A1612',
  inkSoft: '#5C564E',
  inkMute: '#8A847A',
  inkFaint: '#BFB9AD',
  line: '#E4DFD2',
  lineSoft: '#ECE7DA',
  hanko: '#C4452F',
  hankoSoft: '#E8C7BF',
};

export const nightPalette: KumbuPalette = {
  paper: '#14120F',
  paperDeep: '#1C1A16',
  paperEdge: '#232017',
  ink: '#F2EEE4',
  inkSoft: '#B8B2A6',
  inkMute: '#7A746A',
  inkFaint: '#4A453C',
  line: '#2A2620',
  lineSoft: '#221F1A',
  hanko: '#D45A45',
  hankoSoft: '#4A2620',
};
