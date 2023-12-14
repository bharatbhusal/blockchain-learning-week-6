import { useContext, useEffect, useState } from 'react';
import { useAppContext } from '../context/useAppContext';


export const useRequestIds = () => {

  const { selectedAccount, withdrawContract } = useAppContext()
  const [requestIds, setRequestId] = useState("");
  const [finalizedRequestId, setfinalizedRequestId] = useState(0);

  const fetchRequestIds = async () => {
    try
    {
      const requestIds = await withdrawContract.getRequestIdsByUser(selectedAccount);
      const nextFinalizedId = await withdrawContract.nextRequestIdToFinalize();
      setfinalizedRequestId(parseInt(nextFinalizedId))
      setRequestId(requestIds.toString());
    } catch (error)
    {
      console.error("Error fetching balance:", error);
    }
  };

  const updateRequestIds = async () => {
    if (withdrawContract && selectedAccount)
    {
      await fetchRequestIds();
    }
  };

  useEffect(() => {
    updateRequestIds();
  }, [withdrawContract, selectedAccount]);

  return { requestIds, finalizedRequestId, updateRequestIds };
};