import { useEffect } from "react";

export default function useClickOutside(ref, callback, active = true) {
     useEffect(() => {
          function handleClickOutside(event) {
               if (ref.current && !ref.current.contains(event.target)) {
                    callback();
               }
          }

          if (active) {
               document.addEventListener("mousedown", handleClickOutside);
          }

          return () => {
               document.removeEventListener("mousedown", handleClickOutside);
          };
     }, [ref, callback, active]);
}
