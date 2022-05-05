import { useEffect } from 'react';

// set title for component
function useTitle(title = 'Phuot Culture', isOverride = false) {
    useEffect(() => {
        if (isOverride) {
            document.title = title;
        } else {
            document.title = title !== 'Phuot Culture' ? `${title} - Phuot Culture` : title;
        }
    }, [isOverride, title]);

    return null;
}

export default useTitle;