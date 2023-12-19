import { useContext, useEffect, useState } from 'react';
import { useAppContext } from '../context/useAppContext';


export const useRequestIds = () => {

  const { signer, withdrawContract } = useAppContext()
  const [requestIds, setRequestId] = useState("");
  const [finalizedRequestId, setfinalizedRequestId] = useState(0);

  const fetchRequestIds = async () => {
    try
    {
      const requestIds = await withdrawContract.getRequestIdsByUser(signer.address);
      const nextFinalizedId = await withdrawContract.nextRequestIdToFinalize();
      setfinalizedRequestId(parseInt(nextFinalizedId))
      setRequestId(requestIds.toString());
    } catch (error)
    {
      console.error("Error fetching balance:", error);
    }
  };

  const updateRequestIds = async () => {
    if (withdrawContract && signer.address)
    {
      await fetchRequestIds();
    }
  };

  useEffect(() => {
    updateRequestIds();
  }, [withdrawContract, signer]);

  return { requestIds, finalizedRequestId, updateRequestIds };
};