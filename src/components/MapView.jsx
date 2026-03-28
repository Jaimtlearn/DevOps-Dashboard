const LOCATION = {
  name: 'Ahmedabad Airport Circle',
  description: 'Ahmedabad, Gujarat, India',
  query: 'Airport+Circle,+Ahmedabad,+Gujarat,+India',
};

export default function MapView() {
  return (
    <div className="map-wrapper">
      <iframe
        className="map-iframe"
        title="Location Map"
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5!2d72.6266!3d23.0734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b3f42a0e6cd%3A0x73e3456bc6d1dcd1!2sAirport%20Circle!5e0!3m2!1sen!2sin!4v1`}
        width="100%"
        height="220"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="map-label">
        <span className="map-label-dot" />
        {LOCATION.name}
      </div>
    </div>
  );
}
