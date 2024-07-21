import Head from 'next/head';
import { PageWithLayout } from '@/lib/types/page';
import { ReactElement } from 'react';
import Layout from '@/lib/components/Layouts/Layout';
import { useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Cart from '@/lib/components/Cart/Cart';
import { trpc } from '@/utils/trpc';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

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
    props: {}
  };
};

const CartPage: PageWithLayout = () => {
  const { data: session, status } = useSession();
  const {
    data: cartItems,
    isLoading: loadingCartItems,
    error: cartItemsError
  } = trpc.cart.getCartItems.useQuery();
  const {
    data: cartPrice,
    isLoading: loadingCartPrice,
    error: cartPriceError
  } = trpc.cart.getCartItemsPrice.useQuery();

  if (loadingCartItems || loadingCartPrice) {
    return <div>Loading...</div>;
  }

  if (cartItemsError || cartPriceError) {
    return <div>Error loading cart data</div>;
  }

  return (
    <div className="p-6 min-h-screen min-w-full text-white">
      <Head>
        <title>My Cart | StrathMall</title>
        <meta name="description" content="An ecommerce store" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Cart items={cartItems ?? []} price={cartPrice ?? '0'} />
    </div>
  );
};

CartPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CartPage;
