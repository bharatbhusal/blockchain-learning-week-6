import { useEffect, useState } from 'react';
import { useAppContext } from '../context/useAppContext';

export const useRequestIds = () => {
  // Accessing signer and withdrawContract from the AppContext
  const { signer, withdrawContract } = useAppContext();

  // State to store requestIds and finalizedRequestId
  const [requestIds, setRequestIds] = useState('');
  const [finalizedRequestId, setFinalizedRequestId] = useState(0);

  // Function to fetch requestIds and next finalized request ID
  const fetchRequestIds = async () => {
    try
    {
      const userRequestIds = await withdrawContract.getRequestIdsByUser(signer.address);
      const nextFinalizedId = await withdrawContract.nextRequestIdToFinalize();

      // Update state with fetched data
      setFinalizedRequestId(parseInt(nextFinalizedId));
      setRequestIds(userRequestIds.toString());
    } catch (error)
    {
      console.error("Error fetching request IDs:", error);
    }
  };

  // Function to update requestIds on component mount and when dependencies change
  const updateRequestIds = async () => {
    try
    {
      if (withdrawContract && signer.address)
      {
        await fetchRequestIds();
      }
    } catch (error)
    {
      console.error(error.message)
    }
  };

  // Effect to update requestIds on component mount and when dependencies change
  useEffect(() => {
    updateRequestIds();
  }, [withdrawContract, signer]);

  // Returning state and update function
  return { requestIds, finalizedRequestId, updateRequestIds };
};
