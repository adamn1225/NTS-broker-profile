declare module 'react-lazyload' {
    import { ComponentType, ReactNode } from 'react';
  
    interface LazyLoadProps {
      height?: number | string;
      offset?: number;
      once?: boolean;
      overflow?: boolean;
      resize?: boolean;
      scroll?: boolean;
      children?: ReactNode;
      debounce?: boolean | number;
      throttle?: number;
      placeholder?: ReactNode;
      unmountIfInvisible?: boolean;
    }
  
    const LazyLoad: ComponentType<LazyLoadProps>;
  
    export default LazyLoad;
  }