import { Config } from "@stencil/core";
import { reactOutputTarget } from "@stencil/react-output-target";

export const config: Config = {
  namespace: "cookie-consent-banner",
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
};
