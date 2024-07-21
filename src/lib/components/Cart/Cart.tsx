import { trpc } from '@/utils/trpc';
import { Button, Title } from '@mantine/core';
import { ItemsSelect } from './ItemsSelect';
import Link from 'next/link';
import PricePreview from './PricePreview';

interface CartProps {
  items: any[]; // Adjust type as necessary based on actual data
  price: string; // Assuming price is a string; adjust if needed
}

function Cart({ items, price }: CartProps) {
  return (
    <div className="w-full flex justify-center">
      {!items.length && (
        <div className="w-[max(92%,1400px)] flex justify-center bg-white rounded-lg">
          <div className="flex flex-col gap-4 max-w-[300px] min-h-[500px] justify-center">
            <Title order={2} color="dark" weight={300}>
              Your Cart is Empty
            </Title>
            <Button component={Link} href="/" radius="md" className="h-[45px] font-light text-lg">
              Continue Shopping
            </Button>
          </div>
        </div>
      )}
      {items.length > 0 && (
        <div className="w-[max(92%,1400px)] ">
          <Title order={1} color="dark">
            My Cart
          </Title>
          <div className="mt-8 min-h-[600px] rounded flex gap-6 flex-col lg:flex-row">
            <div className="bg-white text-white flex-1 rounded-lg">
              {items && <ItemsSelect data={items} />}
            </div>
            <div className="bg-white text-white min-w-[300px] rounded-lg flex flex-col justify-between p-4 max-h-[300px]">
              <div className="text-black w-full">
                <PricePreview price={price} />
              </div>

              <Button
                component={Link}
                href="/checkout"
                fullWidth
                radius="md"
                className="h-[45px] font-light text-lg"
              >
                Proceed To Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
