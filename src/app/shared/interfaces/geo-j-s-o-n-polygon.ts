export interface GeoJSONPolygon {
  type: 'FeatureCollection';
  features: {
    properties: {
      produto: string;
      slug: string;
      turno: number;
      zona: number;
    },
    type: 'Feature',
    geometry: {
      type?: 'Polygon' | 'MultiPolygon',
      coordinates?: number[][] | number[]
    }
  }[];
}
