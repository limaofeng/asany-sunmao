import React, { useCallback, useRef } from 'react';
import AsanyEditor, { IAsanyEditor } from '../Designer';
import { SketchProvider } from '../sunmao';
import { ReactFlowProvider } from 'react-flow-renderer';

import plugin from './plugin';

function FlowEditor() {
  const api = useRef<IAsanyEditor>(null);

  const handleSave = useCallback(() => {}, []);

  const handleBack = useCallback(() => {}, []);

  return (
    <ReactFlowProvider>
      <SketchProvider>
        <AsanyEditor
          ref={api}
          plugins={[plugin()]}
          onSave={handleSave}
          onBack={handleBack}
          className="flow-editor"
          project={{ type: 'flow' } as any}
        />
      </SketchProvider>
    </ReactFlowProvider>
  );
}

export default FlowEditor;
