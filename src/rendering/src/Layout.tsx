import { JSX } from 'react';
import { AppPlaceholder, DesignLibraryApp, Page } from '@sitecore-content-sdk/nextjs';
import SitecoreHead from 'src/SitecoreHead';
import componentMap from '.sitecore/component-map';
import PageEffects from './PageEffects';

interface LayoutProps {
  page: Page;
}

const Layout = ({ page }: LayoutProps): JSX.Element => {
  const { layout, mode } = page;
  const { route } = layout.sitecore;
  const mainClassPageEditing = mode.isEditing ? 'editing-mode' : 'prod-mode';
  // Adds a CSS class when Sitecore editors are active
  const editorActiveClass = mode.isEditing || mode.isPreview ? 'experience-editor-active' : '';

  return (
    <>
      <SitecoreHead page={page} />
      <PageEffects />
      <div className={mainClassPageEditing}>
        {mode.isDesignLibrary ? (
          route && (
            <DesignLibraryApp
              page={page}
              rendering={route}
              componentMap={componentMap}
              loadServerImportMap={() => import('.sitecore/import-map.server')}
            />
          )
        ) : (
          <>
            <header className={editorActiveClass}>
              {route && (
                <AppPlaceholder
                  page={page}
                  componentMap={componentMap}
                  name="headless-header"
                  rendering={route}
                />
              )}
            </header>
            <main className={editorActiveClass}>
              {route && (
                <AppPlaceholder
                  page={page}
                  componentMap={componentMap}
                  name="headless-main"
                  rendering={route}
                />
              )}
            </main>
            <footer>
              {route && (
                <AppPlaceholder
                  page={page}
                  componentMap={componentMap}
                  name="headless-footer"
                  rendering={route}
                />
              )}
            </footer>
          </>
        )}
      </div>
    </>
  );
};

export default Layout;
