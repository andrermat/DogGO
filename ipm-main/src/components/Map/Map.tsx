import React, { useContext, useEffect, useMemo, useState } from 'react'
import {AzureMap,AzureMapDataSourceProvider,AzureMapFeature, AzureMapHtmlMarker, AzureMapLayerProvider, AzureMapsContext, AzureMapsProvider, IAzureDataSourceChildren, IAzureMapFeature , IAzureMapHtmlMarkerEvent, IAzureMapLayerType, IAzureMapOptions, IAzureMapsContextProps} from 'react-azure-maps'
import {AuthenticationType,MapTouchEvent, data, SymbolLayerOptions} from 'azure-maps-control'


export interface Point{
    point: data.Position
}

interface MapProps{
  callback: (points: Point) => void;
  points: Point;
  viewOnly:boolean;
  zoom:number
}

function Map(props:MapProps){

    const memoizedOptions: SymbolLayerOptions = {
        textOptions: {
          textField: ['get', 'title'], //Specify the property name that contains the text you want to appear with the symbol.
          offset: [0, 1.2],
        },
      };
    
    const markersLayer:IAzureMapLayerType = 'SymbolLayer'
    const renderPoint = (coordinates?: data.Position): IAzureMapFeature => {
        const rendId = Math.random();
      
        return (
          <AzureMapFeature
            key={rendId}
            id={rendId.toString()}
            type="Point"
            coordinate={coordinates}
            properties={{
              title: 'Pin',
              icon: 'pin-round-blue',
            }}
          />
        );
      };
      
    const [marker, setMarker] = useState<Point>();
    const memoizedMarkerRender: IAzureDataSourceChildren = useMemo(
    (): any => renderPoint(marker?.point),
    [marker],
  );
  useEffect(() => {
    setMarker(props.points);
  }, [props.points]);
      
    return(
  <AzureMapsProvider>
    <div style={{ height: '100%' }}>
      <AzureMap options={   {authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: 'h4XGUDdcbDL1i6HPKRP8DeHoL9efpuEw05_A0FZAuwk' 
    },
    center: [-9.165105,38.676525],
    zoom: props.zoom,
    view: 'Auto',
    renderWorldCopies:false,
    showLogo:false,
    }} events = {{click:(e:MapTouchEvent) => {
          if(e.position && !props.viewOnly){
          props.callback({point:new data.Position(e.position[0], e.position[1])})
          }
      }}}>
          <AzureMapDataSourceProvider  id={'markersExample AzureMapDataSourceProvider'}>
          <AzureMapLayerProvider
                id={'markersExample AzureMapLayerProvider'}
                options={memoizedOptions}
                type={markersLayer}
              />
          {memoizedMarkerRender}
          </AzureMapDataSourceProvider>
        </AzureMap>

    </div>
  </AzureMapsProvider>
    )
    };

export default Map
