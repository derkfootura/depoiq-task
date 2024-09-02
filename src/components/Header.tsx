import React from 'react';
import Logo from './Logo';
import { Tabs } from 'antd';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';

const Header = () => {
  return (
    <div className='header flex flex-col sm:flex-row items-start'>
      <div className='flex flex-row items-center'>
        <Logo />
      </div>
      <div className='flex flex-row justify-between items-center flex-1 w-full sm:w-fit'>
        <Tabs
          items={[
            { label: 'Cases', key: 'case' },
            { label: 'Deponents', key: 'deponent' },
          ]}
        />
        <div className='flex flex-row items-center gap-3'>
          <OrganizationSwitcher />
          <UserButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
