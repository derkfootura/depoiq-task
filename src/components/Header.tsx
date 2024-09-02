import React from 'react';
import Logo from './Logo';
import { Tabs } from 'antd';

const Header = () => {
  return (
    <div className='header'>
      <Tabs
        items={[
          { label: 'Cases', key: 'case' },
          { label: 'Deponents', key: 'deponent' },
        ]}
        tabBarExtraContent={{
          left: <Logo />
        }}
      />
    </div>
  );
}

export default Header;
