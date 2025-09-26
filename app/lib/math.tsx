import katex from "katex";

export function Tex({ children, displayMode = false }) {
  return (<span
    dangerouslySetInnerHTML={{
      __html: katex.renderToString(children, { throwOnError: false, displayMode }),
    }}
  />);
};

