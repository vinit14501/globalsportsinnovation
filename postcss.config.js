import postcssImport from "postcss-import"
import tailwindcss from "tailwindcss"
import tailwindNesting from "tailwindcss/nesting/index.js"
import postcssPresetEnv from "postcss-preset-env"
import autoprefixer from "autoprefixer"
import cssnano from "cssnano"
import postcssMediaQueries from "postcss-sort-media-queries"

export default {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    "postcss-preset-env": {
      stage: 3,
      features: {
        "nesting-rules": true,
      },
    },
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production"
      ? {
          cssnano: {
            preset: "advanced",
            plugins: [
              [
                "cssnano-preset-advanced",
                {
                  discardComments: { removeAll: true },
                  colormin: true,
                  reduceIdents: true,
                  mergeLonghand: true,
                  mergeRules: true,
                  minifySelectors: true,
                  minifyParams: true,
                },
              ],
            ],
          },
          "postcss-sort-media-queries": {},
        }
      : {}),
  },
}
