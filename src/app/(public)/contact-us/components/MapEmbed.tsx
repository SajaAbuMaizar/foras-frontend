const MapEmbed = () => (
    <div className="overflow-hidden rounded-lg shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3391.6039773104635!2d35.2156626!3d31.7812856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x150329d617d12959%3A0x4aa9db12776518dc!2z15HXnyDXmdeU15XXk9eUIDM0LCDXmdeo15XXqdec15nXnQ!5e0!3m2!1siw!2sil!4v1697320841644!5m2!1siw!2sil"
        width="100%"
        height="330"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
  
  export default MapEmbed;
  