declare module 'react-scroll' {
    export const animateScroll: {
      scrollToTop(options?: ScrollOptions): void;
      scrollToBottom(options?: ScrollOptions): void;
      scrollTo(offset: number, options?: ScrollOptions): void;
      scrollMore(offset: number, options?: ScrollOptions): void;
    };
  
    export interface ScrollOptions {
      duration?: number;
      delay?: number;
      smooth?: boolean | string;
      offset?: number;
      containerId?: string;
      ignoreCancelEvents?: boolean;
      spy?: boolean;
      hashSpy?: boolean;
      saveHashHistory?: boolean;
      isDynamic?: boolean;
      onSetActive?: () => void;
      onSetInactive?: () => void;
      onStart?: () => void;
      onEnd?: () => void;
    }
  }