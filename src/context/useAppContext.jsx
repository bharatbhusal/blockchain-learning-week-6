import { useContext } from 'react';
import { AppContext } from './AppContext';

/**
 * Custom hook to conveniently access the AppContext.
 * Throws an error if used outside the AppContextProvider.
 *
 * @returns {Object} The context values from AppContext.
 */
export const useAppContext = () => {
    const context = useContext(AppContext);

    // Ensure the hook is used within the AppContextProvider
    if (context === undefined)
    {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }

    return context;
};
