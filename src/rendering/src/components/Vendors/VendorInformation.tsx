'use client';
import type { JSX } from 'react';
import { ComponentWithChildrenProps } from 'lib/component-props';
import { Field, Placeholder, RichText } from '@sitecore-content-sdk/nextjs';
import { removeTags } from 'src/helpers/ContentSearchHelper';

export type VendorInformationProps = ComponentWithChildrenProps & {
  fields: {
    Description: Field<string>;
  };
};

const VendorInformation = (props: VendorInformationProps): JSX.Element => {
  const sxaStyles = `${props.params?.styles || ''}`;

  const placeholder = !!props.rendering && (
    <Placeholder name="jss-entity-sidebar" rendering={props.rendering} />
  );

  return (
    <>
      <>
        <meta property="og:description" content={removeTags(props.fields?.Description?.value)} />
      </>
      <section className={`section information-section ${sxaStyles}`}>
        <div className="section-content container">
          <div className="information-grid">
            <div className="main-col">
              <div className="column-title">Vendor history:</div>
              <RichText className="rich-text" field={props.fields.Description} />
            </div>
            <div className="sidebar-col">
              <div className="column-title">Sessions:</div>
              {placeholder}
              {props.children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export const Default = VendorInformation;
