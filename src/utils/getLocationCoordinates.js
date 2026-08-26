export function getLocationCoordinates(cityObject) {
  const {latitude, longitude, name} = cityObject;

  return {latitude, longitude, name};
}
