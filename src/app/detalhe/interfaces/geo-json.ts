export interface GeoJSON {
  type: 'FeatureCollection';
  features: {
    properties: object,
    type: 'Feature',
    geometry: {
      type?: 'Polygon' | 'MultiPolygon',
      coordinates?: number[][] | number[]
    }
  }[];
}
