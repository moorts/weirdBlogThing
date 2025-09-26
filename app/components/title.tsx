import { chalkFont } from '../lib/tools.tsx';

export function Title({value}) {
  return (
    <div className={`underline underline-offset-6 text-5xl text-center my-8 ${chalkFont.className}`}>
      {value}
    </div>
  );
}
