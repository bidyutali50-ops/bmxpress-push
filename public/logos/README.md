# Client logos

Drop logo files here (SVG preferred, PNG with transparent background also fine),
then reference them in `src/lib/data.ts`:

```ts
export const trustedBy: ClientLogo[] = [
  { name: "Flipkart", src: "/logos/flipkart.svg" },
  { name: "Pidge" },   // no src -> renders as a styled wordmark
  ...
];
```

Any client without a `src` renders its name as a wordmark, so the marquee
always looks complete even while you're still collecting logo files.

Note: only upload logos you have permission to display.
