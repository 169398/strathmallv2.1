import Link from 'next/link';

function Logo({ className, name = 'StrathMall' }: { name?: string; className?: string }) {
  return (
    <Link href="/">
      <div className="flex w-full pt-8 pb-16 h-full lg:pb-4 justify-center items-start text-blue font-logo text-6xl text-blue-600">
        {name}
      </div>
    </Link>
  );
}

export default Logo;
