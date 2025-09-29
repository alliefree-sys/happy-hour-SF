// Initialize map
let map = L.map('map').setView([37.7749, -122.4194], 13);

// Dark map style
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// Sample bar data
let happyHours = [
  { name: "The Beehive", day: "Friday", time: "4-6pm", lat: 37.7649, lng: -122.4212 },
  { name: "El Techo", day: "Friday", time: "5-7pm", lat: 37.7561, lng: -122.4194 },
  { name: "Smuggler’s Cove", day: "Tuesday", time: "5-7pm", lat: 37.775, lng: -122.423 },
  { name: "Zeitgeist", day: "Monday", time: "4-7pm", lat: 37.7702, lng: -122.422 }
];

let markers = [];

// Show bars for a selected day
function showDay(day) {
  // Remove old markers
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  // Filter by day
  let todaysBars = happyHours.filter(place => place.day === day);

  // Add markers
  todaysBars.forEach(place => {
    let marker = L.marker([place.lat, place.lng])
      .addTo(map)
      .bindPopup(`<b>${place.name}</b><br>${place.time}`);
    markers.push(marker);
  });

  // Zoom to fit
  if (todaysBars.length > 0) {
    let group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.2));
  }
}
