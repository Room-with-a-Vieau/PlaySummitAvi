import type { Metadata } from 'next';
import SearchPageContent from './SearchPageContent';

export const metadata: Metadata = {
  title: 'PLAY! Summit - Search',
};

export default function SearchPage() {
  return <SearchPageContent />;
}
