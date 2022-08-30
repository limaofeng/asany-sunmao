---
nav:
  title: 流程编辑器
  path: /flow-editor
---

## 基础

```jsx
import React, { useEffect } from 'react';
import { Sunmao, FlowEditor, SunmaoProvider, EditorLibrary } from '@asany/sunmao';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function FlowEditorDemo() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const sunmao = new Sunmao();

  useEffect(() => {
    sunmao.addLibrary(new EditorLibrary());
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        margin: 0,
        zIndex: 1000,
        background: '#fff',
      }}
    >
      <SunmaoProvider sunmao={sunmao}>
        <DndProvider backend={HTML5Backend}>
          <FlowEditor />
        </DndProvider>
      </SunmaoProvider>
    </div>
  );
}

export default FlowEditorDemo;
```
