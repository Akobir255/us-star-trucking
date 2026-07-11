import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

export default function PlaceAutocomplete({ name, value, onChange, placeholder }) {
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const autocomplete = new places.Autocomplete(inputRef.current, {
      fields: ["formatted_address"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (place.formatted_address) {
        onChange({
          target: {
            name,
            value: place.formatted_address,
          },
        });
      }
    });
  }, [places, name, onChange]);

  return (
    <input
      ref={inputRef}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  );
}