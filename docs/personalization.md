# Personalization

PLAY! Summit uses SitecoreAI page personalization. Authors create page variants and audiences in Page builder, and the website applies them with no extra code.

## How it works

1. `PersonalizeProxy` in `src/rendering/src/proxy.ts` asks Experience Edge whether the page has variants.
2. If it does, the proxy runs the page's personalization with the visitor's request details.
3. The proxy rewrites the request to the matching variant, and the page renders that variant's content.
4. `CdpPageView` sends the page view with the variant ID so Analyze can report on it.

A SitecoreAI environment with an Edge context ID is required. Without `SITECORE_EDGE_CONTEXT_ID`, the proxy turns itself off and visitors see the default content.

## Configuration

| Variable | Purpose |
|---|---|
| `SITECORE_EDGE_CONTEXT_ID` | Required server-side Edge context ID |
| `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID` | Required browser-side Edge context ID, used for page view events |
| `NEXT_PUBLIC_PERSONALIZE_SCOPE` | Optional. Must match `PAGES_PERSONALIZE_SCOPE` when environments share a tenant |
| `PERSONALIZE_MIDDLEWARE_EDGE_TIMEOUT` | Edge request timeout in ms. Defaults to 400 |
| `PERSONALIZE_MIDDLEWARE_CDP_TIMEOUT` | Personalization request timeout in ms. Defaults to 400 |

Geolocation conditions need the visitor's location. The proxy reads it from Vercel's `x-vercel-ip-*` headers. On other hosts, update `extractGeoDataCb` in `proxy.ts`, or those conditions won't match.

## Recreate the demo audiences

These audiences were previously stored as Sitecore Personalize flow exports in `src/personalize`. Recreate them in Page builder on each page, using the variants listed here.

| Page | Variant and audience | Condition |
|---|---|---|
| `/landing-pages/sponsored-landing-page` | Facebook Campaign | UTM value: `source` is equal to `facebook` |
| `/landing-pages/sponsored-landing-page` | LinkedIn Campaign | UTM value: `source` is equal to `linkedin` |
| `/landing-pages/sponsored-landing-page` | Google Campaign | UTM value: `source` is equal to `google` |
| `/landing-pages/Embedded Personalization Example` | From a specific campaign | UTM value: `campaign` is equal to `demoexample` |
| `/landing-pages/Embedded Personalization Example` | Visited a specific page | Page view: has visited `sessions` |
| `/` (home) | Completed Questionnaire | Custom condition, see below |

Serialized pages still contain rules for the old variant IDs. Check each page in Page builder after recreating its audiences, because a new variant can get a new ID.

### Completed Questionnaire condition

No out-of-the-box template checks for a custom event, so this audience needs a custom condition. Create it in Page builder's Personalize mode. It should return true when the current open session has an `AUDIENCE_PREFERENCE` event, which the questionnaire sends when a visitor answers it:

```js
(function () {
  var session = guest.sessions && guest.sessions[0];
  if (!session || session.status !== 'OPEN') {
    return false;
  }
  return session.events.some(function (event) {
    return event.type === 'AUDIENCE_PREFERENCE';
  });
})();
```

This is the old flow's logic. Use the condition editor's Test button to confirm that SitecoreAI exposes `guest.sessions` the same way.

## Limitations

- Personalize flows and web experiences, which ran through `callFlows` and `Boxever`, are no longer supported by this website.
- Guest profile reads and data extensions have no replacement here, so features can't read a visitor's data in the browser.
- Component-level personalization and A/B tests depend on what's enabled for your SitecoreAI tenant.
