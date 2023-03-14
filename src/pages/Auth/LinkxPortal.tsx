import React from 'react';
import { useGetAccountInfo } from '@multiversx/sdk-dapp/hooks';
export const LinkxPortal = () => {
  const { address } = useGetAccountInfo();
  return <div></div>;
};
