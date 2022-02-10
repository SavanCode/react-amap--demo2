import React, { useState, useRef, useEffect } from 'react';
import {
  Map,
  APILoader,
  Marker,
  CircleMarker,
  ToolBarControl,
  MassMarks,
} from '@uiw/react-amap';
import { citys } from './points';
import { ScaleControl } from '@uiw/react-amap';

const Example = () => {
  const [show, setShow] = useState(true);
  const [viewMode, setViewMode] = useState('3D');
  const [points, setPoints] = useState(citys);
  const map = useRef();
  const marker = useRef();
  useEffect(() => {});

  const plugins = [
    'MapType',
    'Scale',
    'OverView',
    'ControlBar', // v1.1.0 新增
    {
      name: 'ToolBar',
      options: {
        visible: true, // 不设置该属性默认就是 true
        onCreated(ins) {
          console.log(ins);
        },
      },
    },
  ];
  return (
    <>
      <button onClick={() => setShow(!show)}>{show ? '隐藏' : '显示'}</button>
      <button onClick={() => setViewMode(viewMode === '3D' ? '2D' : '3D')}>
        {viewMode}地图
      </button>
      <div
        style={{ width: '100%', height: '500px' }}
        center={[114.173355, 22.320048]}
      >
        <Map
          zoom={10}
          plugins={plugins}
          viewMode={viewMode}
          pitch={viewMode === '2D' ? 0 : 70}
        >
          <ToolBarControl
            visiable={show}
            autoPosition={true}
            offset={[10, 10]}
            position="RT"
            viewMode="2D"
          />
          <ScaleControl visiable={show} offset={[60, 10]} position="RT" />
          <MassMarks
            visiable={show}
            data={points}
            onClick={(evn) => {
              if (!map.current) {
                map.current = evn.target.getMap();
                if (!marker.current) {
                  marker.current = new AMap.Marker({
                    content: 'this si the conetn ',
                    map: map.current,
                  });
                }
              }
              if (marker.current) {
                marker.current.setPosition(evn.data.lnglat);
                marker.current.setLabel({ content: evn.data.name });
              }
            }}
          />
          {/*零散点 
          <Marker
            visiable={show}
            title="將軍澳小赤沙康城路1號"
            offset={new AMap.Pixel(-13, -30)}
            label={{
              // 设置文本标注偏移量
              offset: new AMap.Pixel(2, 2),
              // 设置文本标注内容
              content: "<div class='info'>测试点2</div>",
              // 设置文本标注方位
              direction: 'right',
            }}
            position={new AMap.LngLat(114.173355, 22.324155)}
          />
          <Marker
            visiable={show}
            title="將軍澳小赤沙康城路1號"
            offset={new AMap.Pixel(-13, -30)}
            label={{
              // 设置文本标注偏移量
              offset: new AMap.Pixel(2, 2),
              // 设置文本标注内容
              content: "<div class='info'>  测试点3</div>",
              // 设置文本标注方位
              direction: 'right',
            }}
            position={new AMap.LngLat(114.173355, 22.321456)}
          />
          <Marker
            visiable={show}
            title="將軍澳小赤沙康城路1號"
            offset={new AMap.Pixel(-13, -30)}
            label={{
              // 设置文本标注偏移量
              offset: new AMap.Pixel(2, 2),
              // 设置文本标注内容
              content: "<div class='info'>  测试点4</div>",
              // 设置文本标注方位
              direction: 'right',
            }}
            position={new AMap.LngLat(114.173355, 22.431456)}
          />
            测试连续三个点  
          <Marker
            visiable={show}
            icon={
              new AMap.Icon({
                imageSize: new AMap.Size(25, 34),
                image:
                  '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png',
              })
            }
            offset={new AMap.Pixel(-13, -30)}
            position={new AMap.LngLat(114.183355, 22.431456)}
          />
          <Marker
            visiable={show}
            icon={
              new AMap.Icon({
                imageSize: new AMap.Size(25, 34),
                image:
                  '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-2.png',
              })
            }
            offset={new AMap.Pixel(-13, -30)}
            position={[114.185355, 22.431456]}
          />
          <Marker
            visiable={show}
            icon={
              new AMap.Icon({
                imageSize: new AMap.Size(25, 34),
                image:
                  '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-3.png',
              })
            }
            offset={new AMap.Pixel(-13, -30)}
            position={[114.181355, 22.431456]}
          />
          */}
          <CircleMarker
            center={[114.185355, 22.431456]}
            radius={20}
            fillColor="#ff0000"
            fillOpacity={0.5}
            bubble={true}
            cursor="pointer"
            strokeColor="white"
            clickable={true}
          />
        </Map>
      </div>
    </>
  );
};

export default function App() {
  return (
    <div>
      <APILoader akay="a7a90e05a37d3f6bf76d4a9032fc9129">
        <Example />
      </APILoader>
    </div>
  );
}
