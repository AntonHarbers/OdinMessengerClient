import { InfinitySpin } from 'react-loader-spinner';

export default function Loading() {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center text-center text-4xl">
      <InfinitySpin
        height="300"
        width="300"
        radius="9"
        color="orange"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />{' '}
    </div>
  );
}
