import Head from 'next/head';
import { PageWithLayout } from '@/lib/types/page';
import { ReactElement } from 'react';
import Layout from '@/lib/components/Layouts/Layout';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';
import Cart from '@/lib/components/Cart/Cart';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {
    props: {} // You can return additional props here if needed
  };
};

const CartPage: PageWithLayout = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>; // Optionally show a loading state
  }

  if (!session) {
    return <div>Access denied. Please log in.</div>; // Optionally handle unauthorized access
  }

  return (
    <div className="p-6 min-h-screen min-w-full text-white">
      <Head>
        <title>My Cart | StrathMall</title>
        <meta name="description" content="An ecommerce store" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Cart />
    </div>
  );
};

CartPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CartPage;
