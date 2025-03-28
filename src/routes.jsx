import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Dashboard from './components/dashboard/Dashboard';
import DeviceControl from './components/devices/DeviceControl';
import MediaControl from './components/media/MediaControl';
import LightingSystem from './components/lighting/LightingSystem';
import IrrigationSystem from './components/irrigation/IrrigationSystem';
import AdvancedIrrigationSystem from './components/irrigation/AdvancedIrrigationSystem';
import ClimateControl from './components/climate/ClimateControl';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'devices',
        element: <DeviceControl />,
      },
      {
        path: 'media',
        element: <MediaControl />,
      },
      {
        path: 'lighting',
        element: <LightingSystem />,
      },
      {
        path: 'irrigation',
        element: <IrrigationSystem />,
      },
      {
        path: 'advanced-irrigation',
        element: <AdvancedIrrigationSystem />,
      },
      {
        path: 'climate',
        element: <ClimateControl />,
      },
    ],
  },
]);

export default router;