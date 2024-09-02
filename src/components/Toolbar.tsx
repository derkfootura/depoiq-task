'use client';
import React from 'react';
import {
  DownloadOutlined,
  FileTextOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Breadcrumb, Button, Input, Tag } from 'antd';
import { useData } from './DataProvider';

const Toolbar = () => {
  const { setSearch } = useData();
  const [searchText, setSearchText] = React.useState('');

  return (
    <div className='toolbar'>
      <Breadcrumb items={[
        { title: "Cases" },
        { title: "Marvin McKinney v Miles" },
        { title: "Comparison" },
      ]} />
      <div className='toolbar-content'>
        <div className='heading'>
          <h3>Cross Deposition Analysis</h3>
          <span>
            Deponents:&nbsp;
            <Tag color='#CBE4D2' style={{ color: '#0E7F26', fontSize: 11, paddingLeft: '0.25rem', paddingRight: '0.25rem' }}>
              <UserOutlined />&nbsp;4
            </Tag>
          </span>
          <span>
            Depositions:&nbsp;
            <Tag color='#D9E5F7' style={{ color: '#0050CC', fontSize: 11, paddingLeft: '0.25rem', paddingRight: '0.25rem' }}>
              <FileTextOutlined />&nbsp;4
            </Tag>
          </span>
        </div>
        <div className='tools'>
          <Button type='primary' style={{ marginRight: 12 }}>
            <PlusOutlined />
            Add Depo
          </Button>
          <Button type='primary' style={{ marginRight: 12 }}>
            <DownloadOutlined />
          </Button>
          <Input
            placeholder="Search"
            suffix={<SearchOutlined />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setSearch(searchText)}
          />
        </div>
      </div>
    </div>
  )
};

export default Toolbar;