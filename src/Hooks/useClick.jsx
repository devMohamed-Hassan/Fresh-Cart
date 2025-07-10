import { useEffect } from "react";

export default function useClickOutside(ref, callback, active = true, ignoreRef = null) {
     useEffect(() => {
          if (!active) return;

          function handleClick(event) {
               const clickedOutside = ref.current && !ref.current.contains(event.target);
               const clickedIgnored = ignoreRef?.current && ignoreRef.current.contains(event.target);

               if (clickedOutside && !clickedIgnored) {
                    callback();
               }
          }

          document.addEventListener("mousedown", handleClick);
          return () => document.removeEventListener("mousedown", handleClick);
     }, [ref, callback, active, ignoreRef]);
}
