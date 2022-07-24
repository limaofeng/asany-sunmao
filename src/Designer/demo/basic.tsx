/**
 * title: 基本
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */

import React from 'react';
import { Designer } from '@asany/sunmao';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DemoPlugin from './mock/plugin';

export default () => {
  return (
    <DndProvider backend={HTML5Backend}>
      sdfsdfsdfsdf
      {/*<AsanyEditor
        ref={api}
        plugins={[DemoPlugin]}
        onSave={(data) => console.log(data)}
        project={{
          id: 'test',
          name: (<div style={{ color: '#727d83', fontSize: 16 }}>项目名称展示区域</div>) as any,
          type: 'demo',
          data: {
            id: '111',
            props: [],
          },
        }}
      />*/}
    </DndProvider>
  );
};
