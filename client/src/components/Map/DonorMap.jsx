import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import cityCoordinates from "../../data/cityCoordinates";

// Blood group color mapping
const bloodGroupColors = {
  "A+": "#ef4444",  // red
  "A-": "#f97316",  // orange
  "B+": "#3b82f6",  // blue
  "B-": "#6366f1",  // indigo
  "O+": "#22c55e",  // green
  "O-": "#14b8a6",  // teal
  "AB+": "#a855f7", // purple
  "AB-": "#ec4899", // pink
};

// Create a custom blood-drop SVG marker
function createBloodDropIcon(bloodGroup, available) {
  const color = available ? (bloodGroupColors[bloodGroup] || "#ef4444") : "#6b7280";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
      <path d="M16 0 C16 0 0 18 0 26 C0 34 7.2 42 16 42 C24.8 42 32 34 32 26 C32 18 16 0 16 0Z" fill="${color}" stroke="#fff" stroke-width="2"/>
      <text x="16" y="30" text-anchor="middle" fill="white" font-size="10" font-weight="bold" font-family="Arial">${bloodGroup}</text>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: "donor-marker",
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -42],
  });
}

// Component to fit map bounds to markers
function FitBounds({ donors }) {
  const map = useMap();

  useEffect(() => {
    if (!donors || donors.length === 0) return;

    const validCoords = donors
      .map((d) => cityCoordinates[d.city])
      .filter(Boolean);

    if (validCoords.length === 0) return;

    if (validCoords.length === 1) {
      map.setView([validCoords[0].lat, validCoords[0].lng], 10);
    } else {
      const bounds = L.latLngBounds(validCoords.map((c) => [c.lat, c.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    }
  }, [donors, map]);

  return null;
}

function DonorMap({ donors = [], onMarkerClick }) {
  const mapRef = useRef(null);

  // Pakistan center coordinates
  const pakistanCenter = [30.3753, 69.3451];

  // Group donors by city to avoid overlapping markers
  const donorsByCity = {};
  donors.forEach((donor) => {
    const coords = cityCoordinates[donor.city];
    if (coords) {
      const key = donor.city;
      if (!donorsByCity[key]) {
        donorsByCity[key] = { coords, donors: [] };
      }
      donorsByCity[key].donors.push(donor);
    }
  });

  // For cities with multiple donors, slightly offset markers
  const markersData = [];
  Object.entries(donorsByCity).forEach(([cityName, { coords, donors: cityDonors }]) => {
    cityDonors.forEach((donor, index) => {
      const offset = index * 0.003; // Small offset to avoid exact overlap
      const angle = (index * 137.5 * Math.PI) / 180; // Golden angle distribution
      markersData.push({
        donor,
        position: [
          coords.lat + offset * Math.cos(angle),
          coords.lng + offset * Math.sin(angle),
        ],
      });
    });
  });

  if (donors.length === 0) {
    return (
      <div className="w-full rounded-xl overflow-hidden border border-gray-700 mb-8">
        <MapContainer
          center={pakistanCenter}
          zoom={5}
          style={{ height: "450px", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
        <div className="bg-gray-800/80 text-center py-3 text-gray-400 text-sm">
          Search for donors to see them on the map
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl overflow-hidden border border-gray-700 mb-8 shadow-lg">
      {/* Legend */}
      <div className="bg-gray-800/90 px-4 py-2 flex flex-wrap items-center gap-3 text-xs">
        <span className="text-gray-300 font-semibold mr-1">Blood Groups:</span>
        {Object.entries(bloodGroupColors).map(([bg, color]) => (
          <span key={bg} className="inline-flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: color }}
            />
            <span className="text-gray-300">{bg}</span>
          </span>
        ))}
        <span className="inline-flex items-center gap-1 ml-2">
          <span className="w-3 h-3 rounded-full inline-block bg-gray-500" />
          <span className="text-gray-400">Unavailable</span>
        </span>
      </div>

      <MapContainer
        ref={mapRef}
        center={pakistanCenter}
        zoom={5}
        style={{ height: "450px", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds donors={donors} />

        {markersData.map(({ donor, position }, index) => (
          <Marker
            key={donor._id || index}
            position={position}
            icon={createBloodDropIcon(donor.bloodGroup, donor.available !== false)}
            eventHandlers={{
              click: () => {
                if (onMarkerClick) onMarkerClick(donor, index);
              },
            }}
          >
            <Popup>
              <div className="text-sm min-w-[180px]">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${donor.name}`}
                    alt={donor.name}
                    className="w-10 h-10 rounded-full border-2 border-red-400"
                  />
                  <div>
                    <p className="font-bold text-gray-800">{donor.name}</p>
                    <span
                      className="inline-block text-xs font-bold text-white px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor:
                          bloodGroupColors[donor.bloodGroup] || "#ef4444",
                      }}
                    >
                      {donor.bloodGroup}
                    </span>
                  </div>
                </div>
                <div className="space-y-1 text-gray-600">
                  <p>
                    <span className="font-semibold">City:</span> {donor.city}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span> {donor.phone}
                  </p>
                  <p>
                    <span className="font-semibold">Donations:</span>{" "}
                    {Array.isArray(donor.donationCount)
                      ? donor.donationCount.length
                      : donor.donationCount || 0}
                  </p>
                  <p className="flex items-center gap-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        donor.available !== false ? "bg-green-500" : "bg-gray-400"
                      }`}
                    />
                    {donor.available !== false ? "Available" : "Unavailable"}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="bg-gray-800/80 text-center py-2 text-gray-400 text-xs">
        Showing {markersData.length} of {donors.length} donors on map
        {markersData.length < donors.length && " (some cities not mapped)"}
      </div>
    </div>
  );
}

export default DonorMap;
