import React from 'react';

import { useScreenSize } from '../hooks/useScreenSize';

import { DesctopTabs } from './tabs/DesctopTabs';
import { MobileTabs } from './tabs/MobileTabs';

export const TitleTabs: React.FC = (): JSX.Element => {
  const screeSize = useScreenSize();

  return (
    <>
      {screeSize.width > 767.98 && <DesctopTabs />}
      {screeSize.width < 767.98 && <MobileTabs />}
    </>
  );
};
