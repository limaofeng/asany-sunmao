import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import Moveable from 'react-moveable';
import { useEditorDispatch, useEditorSelector } from "../../../hooks";
import { ActionType } from "../../../reducers/actions";
import { jsx as _jsx } from "react/jsx-runtime";

function MoveableManager(props) {
  var ref = useRef(null);
  var container = props.container;
  var dispatch = useEditorDispatch();
  var snaps = useEditorSelector(function (state) {
    return state.ui.scena.snaps;
  });
  var moveableData = useEditorSelector(function (state) {
    return state.ui.scena.moveable.data;
  });
  var selectedTargets = useEditorSelector(function (state) {
    return state.ui.scena.moveable.selectedTargets;
  });
  var verticalGuidelines = snaps.vertical,
      horizontalGuidelines = snaps.horizontal;
  var handeWindowResize = useCallback(function () {
    ref.current && ref.current.updateRect();
  }, [ref]);
  useEffect(function () {
    dispatch({
      type: ActionType.MoveableRef,
      payload: ref
    });
  }, [dispatch]);
  useEffect(function () {
    window.addEventListener('resize', handeWindowResize);
    return function () {
      window.removeEventListener('resize', handeWindowResize);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var elementGuidelines = Array.from(moveableData.getTargets()).filter(function (el) {
    return selectedTargets.indexOf(el) === -1;
  });
  var draggable = useMemo(function () {
    return selectedTargets.length === 1 && !!selectedTargets[0].dataset['draggable'];
  }, [selectedTargets]);
  var resizable = useMemo(function () {
    return selectedTargets.length === 1 && !!selectedTargets[0].dataset['resizable'];
  }, [selectedTargets]);
  var handleResizeStart = useCallback(function (e) {
    moveableData.onResizeStart(e);
    var event = new CustomEvent('moveable.resizeStart', {
      detail: e
    });
    e.target.dispatchEvent(event);
  }, [moveableData]);
  var handleResize = useCallback(function (e) {
    moveableData.onResize(e);
    var event = new CustomEvent('moveable.resize', {
      detail: e
    });
    e.target.dispatchEvent(event);
  }, [moveableData]);
  var handleResizeStop = useCallback(function (e) {
    var event = new CustomEvent('moveable.resizeStop', {
      detail: e
    });
    e.target.dispatchEvent(event);
  }, []);
  return /*#__PURE__*/_jsx(Moveable, {
    ref: ref,
    container: container,
    targets: selectedTargets,
    elementGuidelines: elementGuidelines,
    verticalGuidelines: verticalGuidelines,
    horizontalGuidelines: horizontalGuidelines,
    origin: false,
    draggable: draggable,
    resizable: resizable,
    onResizeStart: handleResizeStart,
    onResize: handleResize,
    onResizeEnd: handleResizeStop,
    onDragStart: moveableData.onDragStart,
    onDrag: moveableData.onDrag
  });
}

export default MoveableManager;