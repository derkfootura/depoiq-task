'use client';
import React from 'react';
import { Tag } from 'antd';
import {
  BookFilled,
  CheckSquareFilled,
  ExclamationCircleFilled,
  FundFilled,
  MenuOutlined,
  TagFilled,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';

const tags = [
  { label: 'Page:Line', icon: <MenuOutlined /> },
  { label: 'Topical', icon: <BookFilled /> },
  { label: 'Exibits', icon: <TagFilled />, count: 7 },
  { label: 'Admissions', icon: <CheckSquareFilled />, count: 7 },
  { label: 'Objections', icon: <ExclamationCircleFilled />, count: 99 },
  { label: 'Contradictions', icon: <FundFilled />, count: 30 },
  { label: 'Discrepanices', icon: <VerticalAlignMiddleOutlined />, count: 4 },
];

const Tagsbar = () => {
  const [selectedTags, setSelectedTags] = React.useState(['Page:Line']);

  const handleChange = (tag: string, checked: boolean) => setSelectedTags(
    checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag)
  );

  return (
    <div className='tagsbar'>
      {tags.map(tag => (
        <Tag.CheckableTag
          key={tag.label}
          checked={selectedTags.includes(tag.label)}
          onChange={(checked) => handleChange(tag.label, checked)}
        >
          {tag.icon}&nbsp;&nbsp;
          {tag.label}
          {!!tag.count && (
            <span className='count'>{tag.count}</span>
          )}
        </Tag.CheckableTag>
      ))}
    </div>
  );
}

export default Tagsbar;
