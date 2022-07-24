import React, { CSSProperties, useCallback, useEffect, useReducer, useRef } from 'react';

import classnames from 'classnames';
import { OnDrag, OnDragStart, drag } from '@daybrush/drag';
import { useDragDropManager, useDrop } from 'react-dnd';

import useSelector from '../hooks/useSelector';
import { calculateScaling } from '../reducers/ui.reducer/scena.reducer';

interface Gesture {
  animationFrame: number;
  type?: 'zoom' | 'mobile';
  xPoints: number[];
  yPoints: number[];
  zPoints: number[];
}

interface InfiniteViewerState {
  scrollX: number;
  scrollY: number;
  zoom: number;
}

function sum(prev: number, current: number) {
  return prev + current;
}

interface InfiniteViewerProps {
  className?: string;
  style?: CSSProperties;
  children: JSX.Element;
  drag?: boolean;
  zoom?: number;
  isZoom?: boolean;
  scrollX?: number;
  scrollY?: number;
  onScroll: (x: number, y: number) => void;
  onZoom: (zoom: number, original: number) => void;
}

interface DustbinDragObject {
  deleteable: boolean;
}

interface DustbinDropResult {
  type: string;
}

function InfiniteViewer(props: InfiniteViewerProps) {
  const { className, onZoom, onScroll, style, drag: isDrag, children } = props;

  const dustbin = useSelector((state) => state.ui.scena.viewer.dustbin);

  const ref = useRef<HTMLDivElement>(null);
  const state = useRef<InfiniteViewerState>({
    scrollX: 0,
    scrollY: 0,
    zoom: 1 * 100,
  });
  const store = useRef<Gesture>({ xPoints: [], yPoints: [], zPoints: [], animationFrame: 0 });
  const [, forceRender] = useReducer((s) => s + 1, 0);

  const { scrollX, scrollY } = state.current;
  const zoom = state.current.zoom / 100;

  const manager = useDragDropManager();

  const [{ handlerId }, connectDrop] = useDrop<DustbinDragObject, DustbinDropResult, any>({
    accept: 'dustbin',
    drop() {
      return { type: 'dustbin' };
    },
    canDrop(item, monitor) {
      return item.deleteable && monitor.isOver({ shallow: true });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      handlerId: monitor.getHandlerId(),
    }),
  });
  connectDrop(ref);

  useEffect(() => {
    if (!handlerId) {
      return;
    }
    const registry: any = manager.getRegistry();
    registry.types.set(handlerId, dustbin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlerId, dustbin.join(',')]);

  useEffect(() => {
    state.current.zoom = (props.zoom || 1) * 100;
    forceRender();
  }, [props.zoom]);

  useEffect(() => {
    state.current.scrollX = props.scrollX! || 0;
    state.current.scrollY = props.scrollY! || 0;
    forceRender();
  }, [props.scrollX, props.scrollY]);

  const handleZoom = useCallback(
    (zoom: number) => {
      const original = state.current.zoom;
      state.current.zoom = calculateScaling(state.current.zoom + zoom);
      onZoom ? onZoom(state.current.zoom / 100, original / 100) : forceRender();
    },
    [onZoom]
  );

  const handleScroll = useCallback(
    (x: number, y: number) => {
      state.current.scrollX -= x;
      state.current.scrollY -= y;
      onScroll ? onScroll(state.current.scrollX, state.current.scrollY) : forceRender();
    },
    [onScroll]
  );

  const handleGesture = useCallback(() => {
    if (store.current.zPoints.reduce(sum, 0) !== 0) {
      handleZoom(store.current.zPoints.reduce(sum, 0));
    } else {
      handleScroll(store.current.xPoints.reduce(sum, 0), store.current.yPoints.reduce(sum, 0));
    }
    store.current.xPoints = [];
    store.current.yPoints = [];
    store.current.zPoints = [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleWheel = useCallback(function (event: WheelEvent) {
    event.preventDefault();
    event.stopPropagation();
    const zoom = (event as any).wheelDeltaX + (event as any).wheelDeltaY;
    const deltaZ = zoom !== 0 && (event as any).wheelDeltaX === 0 && Math.abs((event as any).wheelDeltaY) % 120 === 0;

    store.current.xPoints.push(event.deltaX);
    store.current.yPoints.push(event.deltaY);
    store.current.zPoints.push(deltaZ ? (zoom > 0 ? 1 : -1) : 0);

    store.current.animationFrame = requestAnimationFrame(handleGesture);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const ele = ref.current;
    ele.addEventListener('wheel', handleWheel);
    return () => {
      ele.removeEventListener('wheel', handleWheel);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      cancelAnimationFrame(store.current.animationFrame);
    };
  }, [handleWheel]);

  useEffect(() => {
    if (!isDrag) {
      return;
    }
    const handleDrag = (e: OnDrag) => {
      store.current.xPoints.push(-e.deltaX);
      store.current.yPoints.push(-e.deltaY);
      handleGesture();
    };
    const handleDragStart = (e: OnDragStart) => {
      if (e.inputEvent.target.nodeName === 'A') {
        return;
      }
    };
    const dragger = drag(ref.current!, {
      dragstart: handleDragStart,
      drag: handleDrag,
    });
    return () => {
      dragger.unset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDrag]);

  return (
    <div ref={ref} style={style} className={classnames('infinite-viewer', className)}>
      {React.cloneElement(children, { scrollX, scrollY, zoom })}
    </div>
  );
}

InfiniteViewer.defaultProps = {
  scrollX: 0,
  scrollY: 0,
};

export default React.memo(InfiniteViewer);
