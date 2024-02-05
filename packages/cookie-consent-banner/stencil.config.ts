import { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";

export const config: Config = {
  namespace: "cookie-consent-banner",
  extras: {
    // Fix issues with Vite based host projects
    // https://stenciljs.com/docs/config-extras#experimentalimportinjection
    experimentalImportInjection: true,
  },
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader",
    },
    reactOutputTarget({
      componentCorePackage: "@porscheofficial/cookie-consent-banner",
      proxiesFile:
        "../cookie-consent-banner-react/src/stencilproxy/components.ts",
      includeDefineCustomElements: true,
    }),
    {
      type: "www",
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: "new",
  },
};
