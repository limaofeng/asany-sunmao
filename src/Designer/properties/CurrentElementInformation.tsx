import React, { memo, useEffect, useReducer, useRef, useState } from 'react';

import styled from 'styled-components';
import { Checkbox } from 'antd';

import devices from '../assets/devices';
import useSelector from '../hooks/useSelector';
import useHTMLElementResize from '../hooks/useHTMLElementResize';

import ScrubbableControl from './data-entry/ScrubbableControl';
import SegmentedControl from './data-entry/SegmentedControl';
import Select from './data-entry/Select';
import IconButton from './IconButton';
import OptionButton from './OptionButton';
import RadiusAllSetting from './RadiusAllSetting';
import { IconsConst, InputText, SelectOptionGroup } from './typings';
import { inputFormat, radiusFormat, rotateFormat } from './utils';

const deviceTypes = devices.reduce((l: SelectOptionGroup[], r: any) => {
  let type = l.find((item) => item.label === r.device[1]);
  if (!type) {
    l.push(
      (type = {
        label: r.device[1],
        options: [],
      })
    );
  }
  (type.options as any).push({
    label: (
      <>
        <span className="device-name">{r.name}</span>
        <span className="device-size">{r?.size?.join('x')}</span>
      </>
    ),
    value: r.size.join('x'),
  });
  return l;
}, [] as SelectOptionGroup[]);

const CustomIcon = styled.span`
  display: flex;
  flex: 0 0 32px;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: var(--primary-disabled-color);
  font-size: 12px;
  line-height: 32px;
  pointer-events: none;
`;

const CurrentElementInformation = () => {
  // 用于状态的变更
  const state = useRef<any>({});
  const [, forceRender] = useReducer((s) => s + 1, 0);

  const screen = useSelector((state) => state.ui.scena.screen);

  // TODO: useHTMLElementResize 函数入参类型应该调整为 HTMLElement
  const { width, height, x, y, rotate, radius } = useHTMLElementResize(document.body as any);

  const [notchActive, setNotchActive] = useState<boolean>(false);
  const [radiusDisabled, setRadiusDisabled] = useState<boolean>(false);

  useEffect(() => {
    state.current = {
      [IconsConst.X]: x,
      [IconsConst.Y]: y,
      [IconsConst.W]: width,
      [IconsConst.H]: height,
      [IconsConst.Rotate]: `${rotate}°`,
      [IconsConst.Radius]: radius,
    };
    forceRender();
  }, [height, radius, rotate, width, x, y]);

  const iconsHandleChange = (type: IconsConst) => (state: boolean) => {
    switch (type) {
      case IconsConst.Semicircle:
        setRadiusDisabled(state);
        break;
      case IconsConst.Notch:
        setNotchActive(state);
        break;
      default:
        break;
    }
  };

  const handleChange = (type: IconsConst) => (value: InputText) => {
    state.current[type] = value;
    console.log(state.current);
    forceRender();
  };

  const handleFrameSizeChange = (state: any) => {
    console.log('---------', state, { label: screen.name, value: screen.id });
    // dispatch({
    //   type: UIActionType.ChangeScreenSize,
    //   payload: state,
    // });
  };

  return (
    <div className="design-current-box">
      <div className="design-rows design-colums current-box-header">
        <Select
          className="header-font design-rows-items frame-preset-dropdown"
          popoverClassName="asanyeditor-frame-preset-popover"
          renderTitle={() => '画框'}
          dropdownMatchSelectWidth={224}
          value={{ label: screen.name, value: screen.size.join('x') } as any}
          options={[...deviceTypes]}
          onChange={handleFrameSizeChange}
        />
        <SegmentedControl
          options={[
            { value: 'Portrait', icon: 'AsanyEditor/Portrait', label: '竖屏' },
            { value: 'Landscape', icon: 'AsanyEditor/Landscape', label: '横屏' },
          ]}
        />
        <IconButton className="resize-to-fit" icon="AsanyEditor/ResizeToFit" />
      </div>
      <div className="current-box-content">
        <div className="design-rows design-colums content-col">
          <ScrubbableControl
            format={inputFormat}
            onChange={handleChange(IconsConst.X)}
            value={state.current[IconsConst.X]}
            icon={<CustomIcon>X</CustomIcon>}
          />
          <ScrubbableControl
            format={inputFormat}
            onChange={handleChange(IconsConst.Y)}
            value={state.current[IconsConst.Y]}
            icon={<CustomIcon>Y</CustomIcon>}
          />
        </div>
        <div className="design-rows design-colums content-col">
          <ScrubbableControl
            format={inputFormat}
            onChange={handleChange(IconsConst.W)}
            value={state.current[IconsConst.W]}
            icon={<CustomIcon>W</CustomIcon>}
          />
          <ScrubbableControl
            format={inputFormat}
            onChange={handleChange(IconsConst.H)}
            value={state.current[IconsConst.H]}
            icon={<CustomIcon>H</CustomIcon>}
          />
          <OptionButton
            onChange={iconsHandleChange(IconsConst.Notch)}
            icon={notchActive ? 'AsanyEditor/ConstrainProportionsOn' : 'AsanyEditor/ConstrainProportionsOff'}
          />
        </div>
        <div className="design-rows design-colums content-col">
          <ScrubbableControl
            format={rotateFormat}
            onChange={handleChange(IconsConst.Rotate)}
            value={state.current[IconsConst.Rotate]}
            icon="AsanyEditor/VectorRotate"
          />
          <ScrubbableControl
            value={state.current[IconsConst.Radius]}
            format={radiusFormat}
            onChange={handleChange(IconsConst.Radius)}
            disabled={radiusDisabled}
            icon="AsanyEditor/TopLeftCornerRadius"
          />
          <OptionButton onChange={iconsHandleChange(IconsConst.Semicircle)} icon="AsanyEditor/VectorSemicircle" />
        </div>
        {radiusDisabled && (
          <RadiusAllSetting value={state.current[IconsConst.Radius]} onChange={handleChange(IconsConst.Radius)} />
        )}
        <div className="clipping-box">
          <Checkbox onChange={handleChange(IconsConst.Clipping)}>剪裁内容</Checkbox>
        </div>
      </div>
    </div>
  );
};
export default memo(CurrentElementInformation);
