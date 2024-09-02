import React from 'react';
import Logo from './Logo';
import { Tabs } from 'antd';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';

const Header = () => {
  return (
    <div className='header'>
      <Tabs
        items={[
          { label: 'Cases', key: 'case' },
          { label: 'Deponents', key: 'deponent' },
        ]}
        tabBarExtraContent={{
          left: (
            <div className='flex flex-row items-center'>
              <OrganizationSwitcher />
              <Logo />
            </div>
          ),
          right: (
            <div className='flex flex-row items-center gap-3'>
              <UserButton  />
            </div>
          )
        }}
      />
    </div>
  );
}

export default Header;
