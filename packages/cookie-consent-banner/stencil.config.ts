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
      outDir: '../cookie-consent-banner-react/lib/components/stencil-generated/',
    }),
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: "www",
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserHeadless: true,
  },
};
