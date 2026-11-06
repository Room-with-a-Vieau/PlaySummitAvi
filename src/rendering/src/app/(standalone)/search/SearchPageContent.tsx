'use client';
import SummitLayout from 'components/NonSitecore/SummitLayout';
import SearchResultsWidget from 'components/ContentSearch/SearchResultsWidget';
import { isSearchSDKEnabled } from 'src/services/SearchSDKService';

const SearchPageContent = (): React.JSX.Element => (
  <SummitLayout>{isSearchSDKEnabled ? <SearchResultsWidget rfkId="rfkid_7" /> : <></>}</SummitLayout>
);

export default SearchPageContent;
