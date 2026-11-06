'use client';
import type { JSX } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface SpinnerProps {
  loading?: boolean;
}
const Spinner = (props: SpinnerProps): JSX.Element => {
  return props?.loading ? <FontAwesomeIcon icon={faSpinner} className="fa-spin" /> : <></>;
};

export default Spinner;
