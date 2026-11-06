import { ComponentParams, ComponentRendering, Page } from '@sitecore-content-sdk/nextjs';
import { PropsWithChildren } from 'react';

/**
 * Shared component props
 */
export type ComponentProps = {
  rendering: ComponentRendering;
  params: ComponentParams & {
    RenderingIdentifier?: string;
    styles?: string;
    EnabledPlaceholders?: string;
  };
};

/**
 * Component props with context
 * @example const { page } = useSitecore()
 */
export type ComponentWithContextProps = ComponentProps & {
  page: Page;
};

/**
 * Component props with React children
 */
export type ComponentWithChildrenProps = PropsWithChildren<ComponentProps>;
