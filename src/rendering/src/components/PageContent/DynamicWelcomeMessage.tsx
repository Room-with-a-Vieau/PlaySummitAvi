'use client';
import type { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import { useI18n } from 'src/hooks/useI18n';

const DynamicWelcomeMessage = (props: ComponentProps): JSX.Element => {
  const { t } = useI18n();
  const message = t('Welcome to PLAY! Summit') || 'Welcome to PLAY! Summit';

  const sxaStyles = `${props.params?.styles || ''}`;

  return (
    <section className={`section dynamic-welcome-message ${sxaStyles}`}>
      <div className="container message-banner">
        <span>{message}</span>
      </div>
    </section>
  );
};

export const Default = DynamicWelcomeMessage;
