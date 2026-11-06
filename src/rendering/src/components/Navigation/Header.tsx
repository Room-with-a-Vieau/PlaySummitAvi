'use client';
import type { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import HeaderContent from './HeaderContent';
import { useSitecore } from '@sitecore-content-sdk/nextjs';

export type HeaderProps = ComponentProps & {
  fields: {
    data: {
      item: {
        children: {
          results: [
            {
              displayName: string;
              field: {
                jsonValue: {
                  value: {
                    anchor?: string;
                    href: string;
                    linktype?: string;
                    target?: string;
                    text?: string;
                    url?: string;
                  };
                };
              };
            }
          ];
        };
      };
    };
  };
};

const Header = (props: HeaderProps): JSX.Element => {
  const { page } = useSitecore();
  const sitecoreContext = page.layout.sitecore.context;

  return (
    <HeaderContent
      canChangeLanguage
      sitecoreContext={sitecoreContext}
      {...props}
    />
  );
};

export const Default = Header;
